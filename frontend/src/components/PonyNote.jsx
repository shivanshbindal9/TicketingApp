import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { notes, auth } from "../actions";
import { Link } from "react-router-dom";
import { Button, Card, Image, Menu, Grid, Form, Message, Input, TextArea } from 'semantic-ui-react';
import { browserHistory } from 'react-router';

const styles = {
    root: {
        margin: '1%',
    },
    tic: {
        margin: '22px',
    },
    navbar: {
        backgroundColor: 'black',
        color: 'white'
    },
    gen: {
        background: 'linear-gradient(to bottom right, #0fb8ad 0% ,#215ca0)',
        boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.79)',
        borderRadius: '5%',
        borderColor: '#1158aa'
    }
}

class PonyNote extends Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

        console.log(this.props.user.username);
        this.props.fetchNotes();
    }


    state = {
        text: "",
        title: "",
        category: "Bug Report",
        domain: "Public",
        updateNoteId: null,
    }
    setDomain(event, { value }) {
        this.setState({
            domain: value
        });

    }

    setCategory(event, { value }) {
        this.setState({
            category: value
        });

    }
    handleClick = (id) => {
        var roomName = id;
        var m = '/chat/' + roomName + '/';
        //    if(id !== 0){
        //    console.log(id);
        //    return <Redirect to="/chat" />;}
    }

    resetForm = () => {
        this.setState({ text: "", title: "", updateNoteId: null, category: "Bug Report", domain: "Public" });
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({ text: note.text, updateNoteId: id, title: note.title, category: note.category, domain: note.domain });
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text, this.state.title, this.state.domain, this.state.category).then(this.resetForm)
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text, this.state.title, this.state.domain, this.state.category).then(this.resetForm);
        }
    }

    render() {

        let urllink;


        if (this.props.user.is_superuser) {
            console.log(this.props.user.is_superuser);
            urllink = '/img';
        }
        else {
            console.log(this.props.user.is_superuser);
            urllink = '/publictickets';
        }

        return (
            <div>
                <h2>Welcome to TicketingApp!</h2>
                <hr />
                <Menu fluid fixed="top" style={styles.navbar}>
                    <Menu.Menu>
                        <Menu.Item style={styles.navbar}>
                            <div> TicketingApp </div>
                        </Menu.Item>
                    </Menu.Menu>
                    <Menu.Menu position="right">
                        <Menu.Item onClick={this.props.logout} style={styles.navbar}>
                            {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
        </Menu.Item>
                        <Menu.Item onClick={() => browserHistory.push({ urllink })}>
                            <Link to={urllink}>View all tickets</Link>
                        </Menu.Item>
                        {this.props.user.is_superuser ?
                            <Menu.Item >
                                <Link to="/users" > All Users </Link>
                            </Menu.Item>
                            : null}
                    </Menu.Menu>
                </Menu>


                {/* <h3>Add new ticket</h3>
                <Grid centered style={styles.root} textAlign='center'>
                    <Grid.Column width={8}>
                        <form onSubmit={this.submitNote}>
                            <fieldset style={styles.gen}>
                                <legend style={{ color: 'white' }}> Add OR Edit</legend>
                                <br />
                                <p style={{ color: 'white' }}> <strong> Title </strong></p>
                                <input
                                    value={this.state.title}
                                    placeholder="Enter title here..."
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                    required /> <br />
                                <p style={{ color: 'white' }}><strong> Description </strong></p>
                                <textarea rows="4" cols="50"
                                    value={this.state.text}
                                    placeholder="Enter note here..."
                                    onChange={(e) => this.setState({ text: e.target.value })}
                                    required />
                                <br />
                                <p style={{ color: 'white' }}><strong> Set Domain :</strong> </p>
                                <fieldset id="group1">
                                    <div onChange={this.setDomain.bind(this)} style={{ color: 'white' }}>
                                        <input type="radio" value="Public" name="group1" checked={this.state.domain === 'Public'} /> Public
                        <input type="radio" value="Private" name="group1" checked={this.state.domain === 'Private'} /> Private
                    </div>
                                </fieldset>
                                <p style={{ color: 'white' }}><strong> Category</strong> </p>
                                <fieldset id="group2">
                                    <div onChange={this.setCategory.bind(this)} style={{ color: 'white' }}>

                                        <input type="radio" value="Bug Report" name="group2" checked={this.state.category === 'Bug Report'} />Bug Report
                        <input type="radio" value="Feature Request" name="group2" checked={this.state.category === 'Feature Request'} />Feature Request
                        <input type="radio" value="Personnel Account Issue" name="group2" checked={this.state.category === 'Personnel Account Issue'} />Personnel Account Issue
                        <input type="radio" value="Other" name="group2" checked={this.state.category === 'Other'} />Other
                   </div>
                                </fieldset>

                                <Button fluid style={styles.root} onClick={this.resetForm} color='purple' size='medium'>Reset</Button>
                                <Button type="submit" fluid style={styles.root} value="Save Note" color='green' size='medium'> Save Note </Button >
                            </fieldset>
                        </form>
                    </Grid.Column>
                </Grid> */}
                <Grid centered>
                    <Grid.Column width={10}>
                        <h3>ADD NEW TICKET</h3>
                        <Form>
                            <Form.Field control={Input} label='Title'
                                placeholder='Title goes here' value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} required />
                            <Form.Field control={TextArea} label='Description' value={this.state.text}
                                placeholder="Enter note here..."
                                onChange={(e) => this.setState({ text: e.target.value })}
                                required />
                            <Form.Group inline>
                                <label>Set Domain</label>
                                <Form.Radio
                                    label='Public'
                                    value='Public'
                                    checked={this.state.domain === 'Public'}
                                    onChange={this.setDomain.bind(this)}
                                />
                                <Form.Radio
                                    label='Private'
                                    value='Private'
                                    checked={this.state.domain === 'Private'}
                                    onChange={this.setDomain.bind(this)}
                                />
                            </Form.Group>
                            <Form.Group inline>
                                <label>Category   </label>
                                <Form.Radio
                                    label='Bug Report'
                                    value="Bug Report"
                                    checked={this.state.category === 'Bug Report'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Feature Request'
                                    value='Feature Request'
                                    checked={this.state.category === 'Feature Request'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Personnel Account Issue'
                                    value="Personnel Account Issue"
                                    checked={this.state.category === 'Personnel Account Issue'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Other'
                                    value='Other'
                                    checked={this.state.category === 'Other'}
                                    onChange={this.setCategory.bind(this)}
                                />
                            </Form.Group>
                            <Button fluid onClick={this.resetForm} style={{ marginTop: '5px' }}>Reset</Button>
                            <Button fluid onClick={this.submitNote} value="Save Note" color='green' style={{ marginTop: '10px' }}> Save Ticket </Button >
                        </Form>
                    </Grid.Column>
                </Grid>

                {/* <p>
                    <Link to={urllink}>View all tickets</Link>
                </p> */}
                <Grid centered>
                    <Grid.Column width={10}>
                        <h3>All Tickets</h3>
                        <table>
                            <tbody>
                                <Card.Group>
                                    {this.props.notes.map((note, id) => (
                                        <tr key={`note_${note.id}`}>
                                            <Card color='yellow'
                                                style={styles.tic}
                                            >
                                                <Card.Content>
                                                    <Card.Header>{note.title}</Card.Header>
                                                    <br />
                                                    <Card.Meta><b>Category: </b>{note.category}</Card.Meta>
                                                    <Card.Meta><b>Domain: </b>{note.domain}</Card.Meta>
                                                    <Card.Meta><b>Status: </b>{note.statusi}</Card.Meta>
                                                    <Card.Description>
                                                        {note.text}
                                                    </Card.Description>
                                                </Card.Content>
                                                <Card.Content extra>
                                                    <div className='ui two buttons'>
                                                        <Button basic color='green' onClick={() => this.selectForEdit(id)}>
                                                            Edit
                                     </Button>
                                                        <Button basic color='red' onClick={() => this.props.deleteNote(id)}>
                                                            Delete
                                 </Button>
                                                    </div>
                                                </Card.Content>
                                            </Card>
                                        </tr>
                                    ))}
                                </Card.Group>
                            </tbody>
                        </table>
                    </Grid.Column></Grid>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        addNote: (text, title, domain, category) => {
            return dispatch(notes.addNote(text, title, domain, category));
        },
        updateNote: (id, text, title, domain, category) => {
            return dispatch(notes.updateNote(id, text, title, domain, category));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);


