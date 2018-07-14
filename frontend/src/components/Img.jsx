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
 margin : '3%',
  background:'linear-gradient(141deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)',
 color:'#f3f3f3',
 boxShadow: '10px 10px 5px #b7c8cc'

},
navbar:{
backgroundColor: 'black',
color:'white'
},
gen:{
background:'linear-gradient(to bottom right, #0fb8ad 0% ,#215ca0)',
boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.79)',
borderRadius : '5%',
borderColor : '#1158aa'
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

            <Menu fluid fixed="top" style={styles.navbar} >
        <Menu.Menu>
        <Menu.Item style={styles.navbar}>
        <div> TicketingApp </div>
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
        <Menu.Item >
          <Link to="/" > Home </Link>
        </Menu.Item>
        <Menu.Item >
          <Link to="/users" > All Users </Link>
        </Menu.Item>
        <Menu.Item  style={styles.navbar}>
          U are admin
        </Menu.Item>


        </Menu.Menu>
        </Menu>

            <Grid centered style={styles.root} textAlign='center'>
            <Grid.Column width={8}>
             <form onSubmit={this.submitNote}>
           <fieldset style={styles.gen}>
                       <legend style={{ color:'white'}}> Edit</legend>
                 <p style={{ color:'white'}}><b> Description :</b> </p>
                 <textarea rows="4" cols="50"
                     value={this.state.text}
                     placeholder={this.state.text}
                     disabled />
                 <br /> 
                 <p style={{ color:'white'}}><b> Current Status :</b> </p>
                 <input
                     value={this.state.statusi}
                     placeholder={this.state.statusi}
                     disabled />
                  <br />

                  <p style={{ color:'white'}}><b> Update To  :</b> </p>
                  <fieldset id="group2">
                    <div onChange={this.setCategory.bind(this)} style={{ color:'white'}}>
                        <input type="radio" value="Received" name="group2" defaultChecked/>Received

                        <input type="radio" value="Under Process" name="group2" /> Under Process
                        <input type="radio" value="Already Working" name="group2" />Already working <br />
                        <input type="radio" value="Infeasible" name="group2" />Infeasible
                        <input type="radio" value="Resolved" name="group2" />Resolved
                   </div> 
                   </fieldset>
                   <Button fluid onClick={this.resetForm} basic color='black' style={styles.root}>Reset</Button>
                   <Button type="submit" fluid basic color='black' value="Change Note Status" style={styles.root}> Change note status </Button>   
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

