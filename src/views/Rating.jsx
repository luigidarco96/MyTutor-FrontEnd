import React, { Component } from 'react'
import CustomButton from '../components/CustomButton/CustomButton';
import {
    FormControl,
    OverlayTrigger,
    Tooltip,
    Table,
    Alert
} from 'react-bootstrap';
import axios from 'axios';
const remove = (<Tooltip id="remove_tooltip">Remove</Tooltip>);

export default class Rating extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assignments: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const { assignmentsJSON } = this.props;
            console.log(assignmentsJSON)
            if (assignmentsJSON) {
                assignmentsJSON.map(el => el.student = [])
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
            title_score: 0,
            meeting_score: 0
        })

        this.setState({ assignments: assignments })
    }

    handleChangeAssignment = (e, i) => {
        const { assignments } = this.state
        let value = e.target.value
        let name = e.target.name

        assignments[i][name] = value;
        this.setState({ assignments: assignments })
    }

    handleChangeStudents = (e, i) => {
        const { assignments } = this.state
    
        let index = e.target.id.split('_')[0]
        let value = e.target.value
        let name = e.target.name
        let students = assignments[i].student;

        let val = parseInt(value)
        if ((name == 'meeting_score' || name == 'title_score') && Number.isInteger(val)) {
            students[index][name] = val;
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
        const { students, assignment } = this.state
        e.preventDefault()

        this.findAssignment(assignment)
    }

    render() {
        const { students, assignments } = this.state
        return (
            <div className='content'>
                {assignments.map((el, i) => {
                    return (
                        <div className='content'>
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
                                                name='code'
                                                placeholder="Inserisci il codice dell'assegno..."
                                                type='text'
                                                onFocus={e => this.handleFocus(e)}
                                                onBlur={e => this.handleBlur(e)}
                                                onMouseEnter={e => this.handleMouseEnter(e)}
                                                onMouseOut={e => this.handleMouseOut(e)}
                                                onChange={e => this.handleChangeAssignment(e, i)}
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
                                                defaultValue={el.total_number_hours}
                                                name='hour'
                                                placeholder='Inserisci il numero di ore previste...'
                                                type='text'
                                                onFocus={e => this.handleFocus(e)}
                                                onBlur={e => this.handleBlur(e)}
                                                onMouseEnter={e => this.handleMouseEnter(e)}
                                                onMouseOut={e => this.handleMouseOut(e)}
                                                onChange={e => this.handleChangeAssignment(e, i)}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Table>
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
                                                        id={index + '_title_score'}
                                                        name='title_score'
                                                        placeholder='Inserisci il punteggio...'
                                                        type='number'
                                                        onFocus={e => this.handleFocus(e)}
                                                        onBlur={e => this.handleBlur(e)}
                                                        onMouseEnter={e => this.handleMouseEnter(e)}
                                                        onMouseOut={e => this.handleMouseOut(e)}
                                                        onChange={e => this.handleChangeStudents(e, i)}
                                                    />
                                                </td>
                                                <td>
                                                    <FormControl
                                                        id={index + '_meeting_score'}
                                                        name='meeting_score'
                                                        placeholder='Inserisci il punteggio...'
                                                        type='number'
                                                        onFocus={e => this.handleFocus(e)}
                                                        onBlur={e => this.handleBlur(e)}
                                                        onMouseEnter={e => this.handleMouseEnter(e)}
                                                        onMouseOut={e => this.handleMouseOut(e)}
                                                        onChange={e => this.handleChangeStudents(e, i)}
                                                    />
                                                </td>
                                                <td>
                                                    <FormControl
                                                        disabled
                                                        value={obj.meeting_score + obj.title_score}
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
                                bsStyle='secondary'
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
                    style={{ marginTop: '60px' }}
                    bsStyle='primary'
                    block={true}
                    className='create-notice-csbutton '
                    onClick={e => this.handleSubmit(e)}
                >
                    Conferma
                            </CustomButton>
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