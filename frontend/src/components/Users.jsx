import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {allusers, auth,} from "../actions"
import { Button, Card, Image, Menu, Grid ,Form, Message } from 'semantic-ui-react';

const styles = {
navbar:{
backgroundColor: 'black',
color:'white'
},
}

class AllUsers extends Component{
   
   componentDidMount() {
        this.props.fetchUsers();
}
    state = {
        is_superuser: false,
        updateNoteId: null,
        username : "",
        is_staff: false
    }

   constructor() {
    super()
    this.handleCheckBox = this.handleCheckBox.bind(this)
  }
   
  
  handleCheckBox(e) {
    this.setState({
      is_superuser: e.target.checked,
      is_staff: e.target.checked
    })
  }



    selectForEdit = (id) => {
        let user = this.props.allusers[id];
        this.setState({is_superuser:user.is_superuser,is_staff:user.is_staff, username:user.username, updateNoteId: id,});
        
}
    resetForm = () => {
        this.setState({username: "",is_superuser:false, updateNoteId: null});
}
   
    submitNote = (e) => {
        e.preventDefault();
        console.log(this.state.is_superuser); 
        this.props.updateAllUsers(this.state.updateNoteId, this.state.is_superuser, this.state.is_staff).then(this.resetForm);
        
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
          <Link to="/img" > All Tickets </Link>
        </Menu.Item>
        <Menu.Item  style={styles.navbar}>
          U are admin
        </Menu.Item>


        </Menu.Menu>
        </Menu>
             <div> Ticketing App </div> 
             <div style={{ margin: " 40px"}}>
             <form onSubmit={this.submitNote}>
                  User Name : 
                 <input
                     value={this.state.username}
                     placeholder={this.state.username}
                     disabled />
                 <br /> 
                 Is Admin :   
                 <input
                     value={this.state.is_superuser}
                     placeholder={this.state.is_superuser}
                     disabled />
                  <br />

                  Make Admin  : 
                   <input type="checkbox" onChange={this.handleCheckBox} checked={this.state.is_superuser} />
                   <br />
                   <button onClick={this.resetForm}>Reset</button>
                   <input type="submit" value="Apply Changes" />   
</form> </div>

             <h3>UserList is here</h3>
                <table>
                  <tbody>
                    <tr>
                      <td> <h6> Username </h6> </td>
                    </tr>
                  </tbody>
                </table>
                <table>
                    <tbody>
                        {this.props.allusers.map((user, id) => (
                            <tr key={`user_${user.id}`}>
                                <td>{user.username}</td>
                               
                                <td>{user.is_active}</td>
                                <td>{user.date_joined}</td>
                               
                                <td><button onClick={() => this.selectForEdit(id)}>user rights</button></td>
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
        allusers: state.allusers,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => {
            console.log("hii");
            dispatch(allusers.fetchUsers());
       },
        updateAllUsers: (id, is_superuser, is_staff) => {
            console.log("hell");
            return dispatch(allusers.updateAllUsers(id, is_superuser, is_staff));
       },
}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);

