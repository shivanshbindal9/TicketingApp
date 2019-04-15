import React, { Component } from 'react';
import { connect } from 'react-redux';
import { imgnotes, auth, } from "../actions"
import { Link } from "react-router-dom";
import { Button, Card, Image, Menu, Grid, Form, Message, Input, TextArea } from 'semantic-ui-react';

const styles = {
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

class ImgNote extends Component {

    componentDidMount() {
        this.props.fetchImgNotes();
    }

    state = {
        statusi: "Received",
        updateNoteId: null,
        text: "",
        title: "",
    }
    setCategory(event, { value }) {
        this.setState({
            statusi: value
        });

    }


    selectForEdit = (id) => {
        let note = this.props.imgnotes[id];
        this.setState({ statusi: note.statusi, text: note.text, updateNoteId: id, title: note.title });

    }
    resetForm = () => {
        this.setState({ text: "", updateNoteId: null, statusi: "Received", title: "" });
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
                        <Menu.Item style={styles.navbar}>
                            U are admin
        </Menu.Item>


                    </Menu.Menu>
                </Menu>

                {/* <Grid centered style={styles.root} textAlign='center'>
                    <Grid.Column width={8}>
                        <form onSubmit={this.submitNote}>
                            <fieldset style={styles.gen}>
                                <legend style={{ color: 'white' }}> Edit</legend>
                                <p style={{ color: 'white' }}><b> Description :</b> </p>
                                <textarea rows="4" cols="50"
                                    value={this.state.text}
                                    placeholder={this.state.text}
                                    disabled />
                                <br />
                                <p style={{ color: 'white' }}><b> Current Status :</b> </p>
                                <input
                                    value={this.state.statusi}
                                    placeholder={this.state.statusi}
                                    disabled />
                                <br />

                                <p style={{ color: 'white' }}><b> Update To  :</b> </p>
                                <fieldset id="group2">
                                    <div onChange={this.setCategory.bind(this)} style={{ color: 'white' }}>
                                        <input type="radio" value="Received" name="group2" checked={this.state.statusi === 'Received'} />Received
                
                        <input type="radio" value="Under Process" name="group2" checked={this.state.statusi === 'Under Process'} /> Under Process
                        <input type="radio" value="Already Working" name="group2" checked={this.state.statusi === 'Already Working'} />Already working <br />
                                        <input type="radio" value="Infeasible" name="group2" checked={this.state.statusi === 'Infeasible'} />Infeasible
                        <input type="radio" value="Resolved" name="group2" checked={this.state.statusi === 'Resolved'} />Resolved
                   </div>
                                </fieldset>
                                <Button fluid onClick={this.resetForm} basic color='black' style={styles.root}>Reset</Button>
                                <Button type="submit" fluid basic color='black' value="Change Note Status" style={styles.root}> Change note status </Button>
                            </fieldset>
                        </form>
                    </Grid.Column>
                </Grid> */}
                <Grid centered style={{ marginTop: '20px' }}>
                    <Grid.Column width={10}>
                        <Form>
                            <Form.Field control={Input} label='Title'
                                placeholder='Title goes here' value={this.state.title} />
                            <Form.Field control={TextArea} label='Description' value={this.state.text}
                                placeholder="Ticket Description"
                            />
                            <Form.Field control={Input} label='Status'
                                placeholder='Resolved' value={this.state.statusi} />
                            <Form.Group inline>
                                <label>Update to</label>
                                <Form.Radio
                                    label='Received'
                                    value="Received"
                                    checked={this.state.statusi === 'Received'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Under Process'
                                    value='Under Process'
                                    checked={this.state.statusi === 'Under Process'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Already Working'
                                    value="Already Working"
                                    checked={this.state.statusi === 'Already Working'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Infeasible'
                                    value='Infeasible'
                                    checked={this.state.statusi === 'Infeasible'}
                                    onChange={this.setCategory.bind(this)}
                                />
                                <Form.Radio
                                    label='Resolved'
                                    value='Resolved'
                                    checked={this.state.statusi === 'Resolved'}
                                    onChange={this.setCategory.bind(this)}
                                />
                            </Form.Group>
                            <Button fluid onClick={this.resetForm} style={styles.root}>Reset</Button>
                            <Button fluid onClick={this.submitNote} color='olive' style={{ marginTop: '10px' }} value="Change Note Status"> Change note status </Button>

                        </Form>
                    </Grid.Column>
                </Grid>
                <Grid centered>
                    <Grid.Column width={10}>
                        <h3>All Tickets</h3>
                        <table>
                            <tbody>
                                <Card.Group>
                                    {this.props.imgnotes.map((note, id) => (
                                        <tr key={`note_${note.id}`}>
                                            <Card style={styles.tic} >
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
                    </Grid.Column>
                </Grid>
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

