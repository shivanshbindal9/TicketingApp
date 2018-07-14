import React, { Component } from 'react';
import { Button, Card, Image, Menu, Grid ,Form, Message } from 'semantic-ui-react';
import {connect} from 'react-redux';
import { auth, publictickets} from "../actions"
import {Link, Redirect} from "react-router-dom";

console.log("hey");
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

}

class PublicTickets extends Component {

    componentDidMount() {
        console.log("hey");
        this.props.fetchPublicTickets();
}


    render() {
        if (!this.props.user.username) {
            return <Redirect to="/" />
        }

       return (
           <div>
             <Menu fluid fixed="top" style={styles.navbar}>
        <Menu.Menu>
        <Menu.Item style={styles.navbar}>
        <div> TicketingApp </div>
        </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
        <Menu.Item >
          <Link to="/" > Home </Link>
        </Menu.Item>

        </Menu.Menu>
        </Menu>


            <div style={{margin:'3%',marginLeft:'47%' }}> <h3>All Tickets</h3></div>
                <table>
                    <tbody>
                    <Card.Group>
                        {this.props.publictickets.map((note, id) => (
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
        publictickets: state.publictickets,
        user: state.auth.user,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        fetchPublicTickets: () => {
            console.log("hii");
            dispatch(publictickets.fetchPublicTickets());
        },
       logout: () => dispatch(auth.logout()),
} 
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicTickets);

