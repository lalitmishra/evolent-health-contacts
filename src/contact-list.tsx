import React from 'react';
import {Contacts} from './mock-contacts';

interface iPropsCList {
    editContact: Function;
    deleteContact: Function;
    addContact: Function;
}

function ContactCards (props: any) {
    return(
        props.contacts.map( (item: any, key: any) => {
            return (
                <div className="card margin-1px" key={item.phone}>
                    <div className="card-body no-padding">
                        <h4 className="card-title text-dark margin-top-2P">{item.firstName + ' ' + item.lastName}</h4>
                        <h6 className="card-subtitle float-left lead text-dark margin-1px">Phone: {item.phone}</h6>
                        <h6 className="card-subtitle float-left lead text-dark margin-1px">Email: {item.email}</h6>
                        <h6 className="card-subtitle float-left lead text-dark margin-1px">Status: {item.status ? 'Active': 'Inactive'}</h6>
                        <button className="btn btn-outline-danger btn-reset-right" data-phone={item.phone} onClick={props.deleteContact}>Delete</button>
                        <button className="btn btn-outline-dark btn-reset-right" data-phone={item.phone} onClick={props.editContact} >Edit</button>
                    </div>
                </div>
            )    
        })
    )
}


class ContactList extends React.Component <iPropsCList, {}> {
    constructor(props: iPropsCList){
        super(props);
        this.editContact = this.editContact.bind(this);
        this.addContact = this.addContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
    }

    editContact ( event: any ) {
       this.props.editContact(event.target.attributes.getNamedItem('data-phone').value);
    };

    addContact ( ) {
        this.props.addContact();
    }

    deleteContact ( event: any ) {
        this.props.deleteContact(event.target.attributes.getNamedItem('data-phone').value);
    }

    render() {
        return (
            <div>
                <h1 className='col-12'>Contacts List 
                    <button className="btn btn-primary btn-reset-right" onClick={this.addContact}>Add Contact</button>
                </h1>
                <div className="col-12">
                    <ContactCards editContact={this.editContact} deleteContact={this.deleteContact} contacts={Contacts}/>
                </div>
            </div>
        )
    }
}

export default ContactList;