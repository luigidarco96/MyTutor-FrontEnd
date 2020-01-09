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
            modal: false,
            modalContent: ''
        }
    }

    setModal = (content) => {
        this.setState({ modal: !this.state.modal, modalContent: content })
    }

    handleClose = () => this.setState({
        modal: false,
    });

    componentDidMount() {
        setTimeout(() => {
            const { assignmentsJSON } = this.props;
            if (assignmentsJSON) {
                assignmentsJSON.map(el => {
                    el.student = []
                })
                this.setState({ assignments: assignmentsJSON })
            } if (!assignmentsJSON || assignmentsJSON.length == 0) {
                this.handleAddAssignments()
            }
        }, 1000)
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
        let user = JSON.parse(localStorage.getItem('user'));
        let promiseList = []

        const iterateStudents = (ass) => {
            const list = ass.student
            list.forEach((st) => {
                const studentPromise = axios({
                    url: 'http://localhost:3001/api/users/search',
                    method: 'POST',
                    data: {
                        param: {
                            role: 'Student',
                            name: st.name,
                            surname: st.surname
                        }
                    },
                    headers: {
                        Authorization: token
                    }
                })
                    .then((result) => {
                        return {
                            student: result.data.list[0],
                            assignment_id: ass.id,
                            titles_score: st.titles_score,
                            interview_score: st.interview_score,
                        }
                    })
                promiseList.push(studentPromise)
            })
        }

        assignments.forEach(iterateStudents)

        Promise.all(promiseList)
            .then((ratingList) => {
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
                        this.setModal('Tabella creata con successo!')
                    }
                }).catch(err => {
                    if (err.response.data.error) {
                        this.setModal(err.response.data.error)
                    }
                })
            })
            .catch((err) => {
                if (err.response.data.error) {
                    this.setModal(err.response.data.error)
                }
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
                                    style={{ marginTop: '20px' }}
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
                        style={{ marginTop: '60px' }}
                        bsStyle='primary'
                        block={true}
                        className='create-notice-csbutton '
                        disabled={!this.validateForm()}
                    >
                        Conferma
                            </CustomButton>
                    <Modal style={{ borderRadius: '6px', overflow: 'hidden', marginTop: '15%', left: '35%', position: 'absolute', height: '200px', width: '350px' }} show={modal} onHide={this.handleClose} animation={false}>
                        <Modal.Header style={{ width: '350px' }} closeButton />
                        <Modal.Body id='modalBody' style={{ width: '350px', padding: '7px' }}>{modalContent}</Modal.Body>
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