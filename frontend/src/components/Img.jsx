import React, { Component } from 'react';
import {connect} from 'react-redux';
import {imgnotes, auth,} from "../actions"
import {Link} from "react-router-dom";
import { Button, Card, Image, Menu, Grid ,Form, Message } from 'semantic-ui-react';

const styles = {
root: {
 margin: '1%'
},
tic:{
 margin : '3%'
}
}

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

            <Menu fluid fixed="top">
        <Menu.Menu>
        <Menu.Item>
        <div> TicketingApp </div>
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
        <Menu.Item >
          <Link to="/" > Home </Link>
        </Menu.Item>

        </Menu.Menu>
        </Menu>

            <Grid centered style={styles.root} textAlign='center'>
            <Grid.Column width={8}>
             <form onSubmit={this.submitNote}>
           <fieldset>
                       <legend> Edit</legend>
                 <p> Description : </p>
                 <textarea rows="4" cols="50"
                     value={this.state.text}
                     placeholder={this.state.text}
                     disabled />
                 <br /> 
                 <p> Current Status : </p>
                 <input
                     value={this.state.statusi}
                     placeholder={this.state.statusi}
                     disabled />
                  <br />

                  <p> Update To  : </p>
                  <fieldset id="group2">
                    <div onChange={this.setCategory.bind(this)}>
                        <input type="radio" value="Received" name="group2" defaultChecked/>Received

                        <input type="radio" value="Under Process" name="group2" /> Under Process
                        <input type="radio" value="Already Working" name="group2" />Already working <br />
                        <input type="radio" value="Infeasible" name="group2" />Infeasible
                        <input type="radio" value="Resolved" name="group2" />Resolved
                   </div> 
                   </fieldset>
                   <Button fluid onClick={this.resetForm} basic color='blue' style={styles.root}>Reset</Button>
                   <Button type="submit" fluid basic color='blue' value="Change Note Status" style={styles.root}> Change note status </Button>   
             </fieldset>
             </form>
             </Grid.Column>
             </Grid>
             <p>
                 <Link to="/users">Go to all users</Link>
             </p>

             <h3>All Tickets</h3>
                <table>
                    <tbody>
                    <Card.Group>
                        {this.props.imgnotes.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <Card style ={styles.tic} >
                     <Card.Content>
                       <Card.Header>{note.title}</Card.Header>
                            <Card.Meta>{note.category}</Card.Meta>
                            <Card.Meta>{note.domain}</Card.Meta>
                            <Card.Meta>{note.statusi}</Card.Meta>
                             <Card.Description>
                                <strong>{note.text}</strong>
                                   </Card.Description>
                                    </Card.Content>
                                  <Card.Content extra>
                                  <div className='ui two buttons'>
                                 <Button basic color='green' onClick={() => this.selectForEdit(id)}>
                                      Edit Status
                                     </Button>
                                 <Button basic color='red' onClick={() => this.props.deleteImgNote(id)}>
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

