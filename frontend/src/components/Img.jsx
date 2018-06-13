import React, { Component } from 'react';
import {connect} from 'react-redux';
import {imgnotes, auth} from "../actions"


class ImgNote extends Component {

    componentDidMount() {
        this.props.fetchImgNotes();
}


    render() { 
       return (
           <div>
             <h3>Notes</h3>
                <table>
                    <tbody>
                        {this.props.imgnotes.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{note.text}</td>
                                <td>{note.title}</td>
                                <td>{note.domain}</td>
                                <td>{note.category}</td>
                                <td>{note.status}</td>
                                <td>{note.owner}</td>
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
            dispatch(imgnotes.fetchImgNotes());
},
} 
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNote);

