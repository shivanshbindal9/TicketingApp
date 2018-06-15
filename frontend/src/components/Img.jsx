import React, { Component } from 'react';
import {connect} from 'react-redux';
import {imgnotes, auth,} from "../actions"
import {Link} from "react-router-dom";


class ImgNote extends Component {

    componentDidMount() {
        this.props.fetchImgNotes();
}

    state = {
        statusi : "Received",
        updateNoteId: null,
        text : "",
    }
    setCategory(event) {
    console.log(event.target.value);
    this.setState({
      statusi:event.target.value
      });

  }


    selectForEdit = (id) => {
        let note = this.props.imgnotes[id];
        this.setState({statusi: note.statusi,text: note.text, updateNoteId: id,});
        
}
    resetForm = () => {
        this.setState({text: "", updateNoteId: null});
}
   
    submitNote = (e) => {
        e.preventDefault();
        console.log(this.state.statusi); 
        this.props.updateImgNote(this.state.updateNoteId, this.state.text, this.state.statusi).then(this.resetForm);
        
}
 
    render() { 
       return (
           <div>
             <form onSubmit={this.submitNote}>
                 <h5> Note Text : </h5>
                 <input
                     value={this.state.text}
                     placeholder={this.state.text}
                     disabled />
                 <br /> 
                 <h5> Current Status : </h5>
                 <input
                     value={this.state.statusi}
                     placeholder={this.state.statusi}
                     disabled />
                  <br />

                  <h4> Update To </h4>
                  <fieldset id="group2">
                    <div onChange={this.setCategory.bind(this)}>
                        <input type="radio" value="Received" name="group2" defaultChecked/>Received

                        <input type="radio" value="Under Process" name="group2" /> Under Process
                        <input type="radio" value="Already Working" name="group2" />Already working <br />
                        <input type="radio" value="Infeasible" name="group2" />Infeasible
                        <input type="radio" value="Resolved" name="group2" />Resolved
                   </div> 
                   </fieldset>
                   <button onClick={this.resetForm}>Reset</button>
                   <input type="submit" value="Change Note Status" />   
             </form>
             <p>
                 <Link to="/users">Go to all users</Link>
             </p>

             <h3>Notes</h3>
                <table>
                    <tbody>
                        {this.props.imgnotes.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{note.text}</td>
                                <td>{note.title}</td>
                                <td>{note.domain}</td>
                                <td>{note.category}</td>
                                <td>{note.statusi}</td>
                                <td>{note.owner}</td>
                                <td><button onClick={() => this.selectForEdit(id)}>change status</button></td>
                                <td><button onClick={() => this.props.deleteImgNote(id)}>delete</button></td>
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
        imgnotes: state.imgnotes,
        user: state.auth.user,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchImgNotes: () => {
            console.log("hii");
            dispatch(imgnotes.fetchImgNotes());
        },
        deleteImgNote: (id) => {
            console.log("hello");
            dispatch(imgnotes.deleteImgNote(id));
        },
        updateImgNote: (id, text, statusi) => {
            console.log("hell");
            return dispatch(imgnotes.updateImgNote(id, text, statusi));
        },
} 
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNote);

