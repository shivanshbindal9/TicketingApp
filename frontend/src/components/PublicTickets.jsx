import React, { Component } from 'react';
import {connect} from 'react-redux';
import { auth, publictickets} from "../actions"
import {Link} from "react-router-dom";

console.log("hey");

class PublicTickets extends Component {

    componentDidMount() {
        console.log("hey");
        this.props.fetchPublicTickets();
}


    render() {
       return (
           <div>

             <h3>All Tickets</h3>
                <table>
                    <tbody>
                        {this.props.publictickets.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{note.text}</td>
                                <td>{note.title}</td>
                                <td>{note.domain}</td>
                                <td>{note.category}</td>
                                <td>{note.statusi}</td>
                                <td>{note.owner}</td>
                                <td><button onClick={() => this.selectForEdit(id)}>change status</button></td>
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
} 
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicTickets);

