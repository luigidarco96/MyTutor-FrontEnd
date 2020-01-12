import React, { Component } from 'react'
import CustomButton from '../components/CustomButton/CustomButton';
import {
    FormControl,
    OverlayTrigger,
    Tooltip,
    Table,
    Form,
    Modal
} from 'react-bootstrap';
import axios from 'axios';
const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);

export default class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: [],
            regex: {
                titles_score: /^[0-9]+$/,
                interview_score: /^[0-9]+$/
            },
            modalSuccess: false,
            modalError: false,
            modalContent: ''
        }
    }

    setModalSuccess = (content) => {
        this.setState({ modalSuccess: !this.state.modalSuccess, modalContent: content })
    }


    setModalError = (content) => {
        this.setState({ modalError: !this.state.modalError, modalContent: content })
    }
    handleClose = () => this.setState({
        modalSuccess: false,
        modalError: false
    });

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        var user = JSON.parse(localStorage.getItem('user'));
        let token = localStorage.getItem('token')

        if (
            user != null &&
            (user.role === 'Professor')
        ) {
            axios(`http://localhost:3001/api/notices/${params.id}`, {
                headers: {
                    Authorization: token
                },
                method:'GET'
            }).then(res => {
                let ass = res.data.notices[0].assignments

                ass.map(el => {
                    el.student = []
                })

                this.setState({
                    assignments: ass
                });
            })
        } else {
            axios(`http://localhost:3001/api/notices/${params.id}`, {method:'GET'})
                .then(res => {
                    let assignments = res.data.notices[0].assignments

                    assignments.map(el => {
                        el.student = []
                    })

                    this.setState({
                        assignments: assignments
                    });
                })
        }
        if (this.state.assignments.length == 0) {
            let ass = this.state.assignments
            this.handleAddAssignments()
            ass.map(el => {
                el.student = []
            })
        }
    }

    handleAddAssignments = () => {
        const { assignments } = this.state;

        assignments.push({
            code: '',
            n_assignments: 0,
            n_hour: 0
        })

        this.setState({ assignments: assignments })
    }

    handleAddStudent = (e, i) => {
        const { assignments } = this.state;

        assignments[i].student.push({
            surname: '',
            name: '',
            titles_score: 0,
            interview_score: 0,
            error: {
                titles_score: '',
                interview_score: ''
            }
        })

        this.setState({ assignments: assignments })
    }

    handleChangeStudents = (e, i) => {
        const { assignments, regex } = this.state

        let index = e.target.id.split('_')[0]
        let value = e.target.value
        let name = e.target.name
        let students = assignments[i].student;

        let val = parseInt(value)
        if ((name == 'interview_score' || name == 'titles_score') && Number.isInteger(val)) {
            let match = value.match(regex[name])
            if (match) {
                students[index][name] = val;
                students[index]['error'][name] = ''
            } else {
                students[index]['error'][name] = 'Il campo può contenere solo numeri maggiori di 0'
            }
        } else {
            students[index][name] = value;
        }
        this.setState({ students: students })
    }

    handleRemoveStudent = (e, i) => {
        const { assignments } = this.state
        let students = assignments[i].student;
        let index = e.target.id.split('_')[0]
        if (index == students.length - 1) {
            students.pop()
        } else {
            students.forEach((curr, currIndex) => {
                if (currIndex >= index) {
                    students[currIndex] = students[currIndex + 1]
                }
            })
            students.pop()
        }

        this.setState({ assignments: assignments })
    }


    handleSubmit = (e) => {
        const { assignments } = this.state
        e.preventDefault()

        let token = localStorage.getItem('token');

        axios({
            url: `http://localhost:3001/api/candidatures/`,
            method: 'GET',
            headers: {
                Authorization: token
            },
            params: {
                protocol: assignments[0].notice_protocol
            }
        }).then((result) => {
            if (result.status == '200') {
                if (result.data.candidatures && result.data.candidatures.length > 0) {
                    let candidatureList = result.data.candidatures;
                    let ratingList = []
                    assignments.forEach(ass => {
                        ass.student.forEach(st => {
                            let student = null
                            candidatureList.forEach(candidature => {
                                if (candidature.student.name == st.name && candidature.student.surname == st.surname) {
                                    student = candidature.student;
                                }
                            })
                            if (student) {
                                ratingList.push({
                                    student: student,
                                    assignment_id: ass.id,
                                    titles_score: st.titles_score,
                                    interview_score: st.interview_score,
                                })
                            }
                        })
                    })
                    
                    axios({
                        url: 'http://localhost:3001/api/ratings',
                        method: 'PUT',
                        data: {
                            ratingList: ratingList
                        },
                        headers: {
                            Authorization: token
                        }
                    }).then(response => {
                        if (response.status == '200') {
                            this.setModalSuccess('Tabella creata con successo!')
                        }
                    }).catch(err => {
                        if (err.response.data.error) {
                            this.setModalError(err.response.data.error)
                        }
                    })
                }
                else {
                    this.setModalError('ATTENZIONE! Non sono stati rilevati candidati per questo bando')
                    return []
                }
            }
        }).catch(err => {
            this.setModalError(err.response.data.error + 'Riprovare più tardi o controllare i candidati al bando!')
        })


      
    }

    validateForm = () => {
        const { assignments } = this.state;

        let valid = true;

        assignments.map((ass, assIndex) => {
            ass.student.map(async (st, stIndex) => {
                for (let err in st.error) {
                    if (st.error[err] == '') {
                        valid = valid && true;
                    } else {
                        valid = valid && false;
                    }
                }
            })
        })
        return valid;
    }

    render() {
        const {
            assignments,
            modal,
            modalContent } = this.state
        return (
            <div className='content'>
                <Form onSubmit={e => this.handleSubmit(e)}>
                    {assignments.map((el, i) => {
                        return (
                            <div className='content' style={{
                                border: 'solid 1px',
                                borderColor: '#81818175',
                                borderRadius: '6px',
                                marginBottom: '60px'
                            }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Codice
                                        </th>
                                            {/*<th>
                                            N. Assegni Banditi
                                        </th>*/}
                                            <th>
                                                N. Ore assegno
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <FormControl
                                                    defaultValue={el.code}
                                                    onFocus={e => this.handleFocus(e)}
                                                    onBlur={e => this.handleBlur(e)}
                                                    onMouseEnter={e => this.handleMouseEnter(e)}
                                                    onMouseOut={e => this.handleMouseOut(e)}
                                                    onChange={e => { e.target.value = el.code }}
                                                />
                                            </td>
                                            {/*<td>
                                            <FormControl
                                                defaultValue={el.n_assignments}
                                                name='n_assignments'
                                                placeholder="Inserisci il numero di assegni..."
                                                type='number'
                                                onFocus={e => this.handleFocus(e)}
                                                onBlur={e => this.handleBlur(e)}
                                                onMouseEnter={e => this.handleMouseEnter(e)}
                                                onMouseOut={e => this.handleMouseOut(e)}
                                                onChange={e => this.handleChangeAssignment(e,i)}
                                            />
                                        </td>*/}
                                            <td>
                                                <FormControl
                                                    disabled
                                                    defaultValue={el.total_number_hours}
                                                    onFocus={e => this.handleFocus(e)}
                                                    onBlur={e => this.handleBlur(e)}
                                                    onMouseEnter={e => this.handleMouseEnter(e)}
                                                    onMouseOut={e => this.handleMouseOut(e)}
                                                    onChange={e => { e.target.value = el.total_number_hours }}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table responsive='sm'>
                                    <thead>
                                        <tr>
                                            <th>
                                                Cognome
                                </th>
                                            <th>
                                                Nome
                                </th>
                                            <th>
                                                Punteggio titoli
                                </th>
                                            <th>
                                                Colloquio
                                </th>
                                            <th>
                                                Totale
                                </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {el.student.map((obj, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <FormControl
                                                            id={index + '_surname'}
                                                            name='surname'
                                                            placeholder='Inserisci il cognome dello studente...'
                                                            type='text'
                                                            onFocus={e => this.handleFocus(e)}
                                                            onBlur={e => this.handleBlur(e)}
                                                            onMouseEnter={e => this.handleMouseEnter(e)}
                                                            onMouseOut={e => this.handleMouseOut(e)}
                                                            onChange={e => this.handleChangeStudents(e, i)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <FormControl
                                                            id={index + '_name'}
                                                            name='name'
                                                            placeholder='Inserisci il nome dello studente...'
                                                            type='text'
                                                            onFocus={e => this.handleFocus(e)}
                                                            onBlur={e => this.handleBlur(e)}
                                                            onMouseEnter={e => this.handleMouseEnter(e)}
                                                            onMouseOut={e => this.handleMouseOut(e)}
                                                            onChange={e => this.handleChangeStudents(e, i)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <FormControl
                                                            id={index + '_titles_score'}
                                                            name='titles_score'
                                                            placeholder='Inserisci il punteggio...'
                                                            type='number'
                                                            onFocus={e => this.handleFocus(e)}
                                                            onBlur={e => this.handleBlur(e)}
                                                            onMouseEnter={e => this.handleMouseEnter(e)}
                                                            onMouseOut={e => this.handleMouseOut(e)}
                                                            onChange={e => this.handleChangeStudents(e, i)}
                                                        />
                                                        {obj.error && obj.error.titles_score.length > 0 &&
                                                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{obj.error.titles_score}</span>}
                                                    </td>
                                                    <td>
                                                        <FormControl
                                                            id={index + '_interview_score'}
                                                            name='interview_score'
                                                            placeholder='Inserisci il punteggio...'
                                                            type='number'
                                                            onFocus={e => this.handleFocus(e)}
                                                            onBlur={e => this.handleBlur(e)}
                                                            onMouseEnter={e => this.handleMouseEnter(e)}
                                                            onMouseOut={e => this.handleMouseOut(e)}
                                                            onChange={e => this.handleChangeStudents(e, i)}
                                                        />
                                                        {obj.error && obj.error.interview_score.length > 0 &&
                                                            <span style={{ fontSize: '10px', color: 'red' }} className='error'>{obj.error.interview_score}</span>}
                                                    </td>
                                                    <td>
                                                        <FormControl
                                                            disabled
                                                            value={obj.interview_score + obj.titles_score}
                                                            id={index + '_total_score'}
                                                            name='total_score'
                                                            placeholder='Punteggio totale...'
                                                            onFocus={e => this.handleFocus(e)}
                                                            onBlur={e => this.handleBlur(e)}
                                                            onMouseEnter={e => this.handleMouseEnter(e)}
                                                            onMouseOut={e => this.handleMouseOut(e)}
                                                        />
                                                    </td>
                                                    <td style={{ maxWidth: '2px' }}>
                                                        <OverlayTrigger placement="top" overlay={remove}>
                                                            <CustomButton
                                                                id={index + '_remove'}
                                                                bsStyle="danger"
                                                                simple
                                                                type="button"
                                                                bsSize="xs"
                                                                onClick={e => { this.handleRemoveStudent(e, i) }}
                                                            >
                                                                <i className="fa fa-times"></i>
                                                            </CustomButton>
                                                        </OverlayTrigger>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                                <CustomButton
                                    style={{ marginTop: '20px', borderColor: '#274F77', color: '#274F77' }}
                                    bsStyle='primary'
                                    block={true}
                                    className='btn-clolor-blue '
                                    block={true}
                                    className='create-notice-csbutton pull-right'
                                    onClick={e => this.handleAddStudent(e, i)}
                                >
                                    Aggiungi studente
                            </CustomButton>
                            </div >
                        )
                    })}
                    <CustomButton
                        type='submit'
                        bsStyle='success'
                        disabled={!this.validateForm()}
                    >
                        Conferma
                    </CustomButton>
                    <Modal
                        style={{
                            borderRadius: '6px',
                            overflow: 'hidden',
                            marginTop: '13%',
                            left: '10%',
                            position: 'absolute'
                        }}
                        dialogClassName="myClass"
                        show={this.state.modalSuccess}
                        onHide={() => this.handleClose()}
                        animation={false}
                    >
                        <Modal.Header style={{ width: '350px' }} closeButton>
                            <Modal.Title style={{ color: '#274F77' }}>Info</Modal.Title>
                        </Modal.Header>

                        <Modal.Body
                            id='modalBodyError'
                            style={{ width: '350px', padding: '7px', wordBreak: 'break-all' }}>
                            {modalContent}
                        </Modal.Body>
                        <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
                            <CustomButton
                                className='btn-color-blue'
                                bsStyle='primary'
                                onClick={() => this.handleClose()}
                            >
                                Chiudi
                        </CustomButton>

                        </Modal.Footer>

                    </Modal>


                    <Modal
                        style={{
                            borderRadius: '6px',
                            overflow: 'hidden',
                            marginTop: '13%',
                            left: '10%',
                            position: 'absolute'
                        }}
                        dialogClassName="myClass"
                        show={this.state.modalError}
                        onHide={() => this.handleClose()}
                        animation={false}
                    >
                        <Modal.Header style={{ width: '350px' }} closeButton>
                            <Modal.Title style={{ color: 'red' }}>Errore</Modal.Title>
                        </Modal.Header>

                        <Modal.Body id='modalBodyError' style={{ width: '350px', padding: '7px', wordBreak: 'break-all' }}>
                            {modalContent}
                        </Modal.Body>
                        <Modal.Footer style={{ width: '350px', paddingTop: '20px' }}>
                            <CustomButton
                                className='btn-color-blue'
                                bsStyle='primary'
                                onClick={() => this.handleClose()}
                            >
                                Chiudi
                        </CustomButton>

                        </Modal.Footer>

                    </Modal>



                </Form>
            </div >
        )
    }

    handleFocus(e) {
        let el = e.target;

        el.className += ' typing';
    }

    handleBlur(e) {
        const el = e.target;

        let value = '' + el.value;
        el.disabled = el.name !== 'ht_fund' ? value.length > 0 : true;

        el.className = el.className.replace('typing', '');
        el.className = el.className.trim();
    }

    handleMouseEnter(e) {
        e.target.disabled = false;
    }

    handleMouseOut(e) {
        let el = e.target;
        let elClass = el.className;

        if (elClass.includes('typing')) {
            return;
        } else {
            let value = '' + el.value;
            el.disabled = value.length > 0;
        }
    }
}