import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes, auth} from "../actions";
import {Link} from "react-router-dom";


class PonyNote extends Component {

    componentDidMount() {
        this.props.fetchNotes();
    }

    state = {
        text: "",
        title: "",
        category: "Bug Report",
        domain: "Public",
        updateNoteId: null,
    }
    setDomain(event) {
    console.log(event.target.value);
    this.setState({
      domain:event.target.value
      });

  }

    setCategory(event) {
    console.log(event.target.value);
    this.setState({
      category:event.target.value
      });

  }

    resetForm = () => {
        this.setState({text: "",title:"", updateNoteId: null});
    }

    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({text: note.text, updateNoteId: id,title: note.title,category:note.category,domain:note.domain});
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text,this.state.title,this.state.domain,this.state.category).then(this.resetForm)
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text,this.state.title,this.state.domain,this.state.category).then(this.resetForm);
        }
    }

    render() {
        return (
            <div>
                <h2>Welcome to TicketingApp!</h2>
                <hr />
                <div style={{textAlign: "right"}}>
                    {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
                </div>

                <h3>Add new ticket</h3>
                <form onSubmit={this.submitNote}>
                    <br />
                    <input
                        value={this.state.title}
                        placeholder="Enter title here..."
                        onChange={(e) => this.setState({title: e.target.value})}
                        required /> <br />
                    <input
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
                    <br />
                    <p> Set Domain : </p>
                    <fieldset id="group1">
                    <div onChange={this.setDomain.bind(this)}>
                        <input type="radio" value="Public" name="group1" defaultChecked /> Public 
                        <input type="radio" value="Private" name="group1" /> Private
                    </div>
                    </fieldset>
                    <p> Category </p>
                    <fieldset id="group2">
                    <div onChange={this.setCategory.bind(this)}>

                        <input type="radio" value="Bug Report" name="group2" defaultChecked/>Bug Report
                        <input type="radio" value="Feature Request" name="group2" />Feature Request <br />
                        <input type="radio" value="Personnel Account Issue" name="group2" />Personnel Account Issue
                        <input type="radio" value="Other" name="group2" />Other
                   </div> 
                   </fieldset>
                    <button onClick={this.resetForm}>Reset</button>
                    <input type="submit" value="Save Note" />
                </form>
                <p>
                        <Link to="/img">Go to admin view</Link>
                </p>

                <h3>All Tickets</h3>
                <table>
                    <tbody>
                        {this.props.notes.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{note.text}</td>
                                <td>{note.title}</td>
                                <td>{note.domain}</td>
                                <td>{note.category}</td>
                                <td>{note.statusi}</td>
                                <td><button onClick={() => this.selectForEdit(id)}>edit</button></td>
                                <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        addNote: (text,title,domain,category) => {
            return dispatch(notes.addNote(text,title,domain,category));
        },
        updateNote: (id, text,title,domain,category) => {
            return dispatch(notes.updateNote(id, text,title,domain,category));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);


