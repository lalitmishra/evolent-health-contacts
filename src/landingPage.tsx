import React from 'react';
import ContactForm from './contact-form';
import ContactList from './contact-list';
import {Contacts} from './mock-contacts';

interface iStateLandPg {
    showForm: boolean;
}

class LandingPage extends React.Component <{}, iStateLandPg> {
    constructor(props: any){
        super(props);
        this.state = {
            showForm: false
        }
        this.details = {};
        this.updateContacts = this.updateContacts.bind(this);
        this.editContact = this.editContact.bind(this);
        this.deleteContact = this.deleteContact.bind(this);
        this.addContact = this.addContact.bind(this);
        this.backButtonClk = this.backButtonClk.bind(this);
    }
    details = {};

    updateContacts ( data: any ) {
        let index = -1;
        for(let i = 0; i < Contacts.length; i++){
            if(Contacts[i].phone === data.phone){
                index = i;
                break;
            }
        }
        if(index > -1) {
            Contacts[index] = data;
        } else {
            Contacts.push(data);
        }
        this.setState({showForm: false});
    };

    editContact ( input: string) {
        this.details = Contacts.filter((item) => item.phone == input)[0];
        this.setState({showForm: true});
    }

    addContact () {
        this.details = {};
        this.setState({showForm: true});
    }

    backButtonClk () {
        this.setState({showForm: false});
    }

    deleteContact ( input: string ) {
        let index = -1;
        for(let i=0; i < Contacts.length; i++) {
            if(Contacts[i].phone == input){
                index = i;
                break;
            }
        }
        Contacts.splice(index, 1);
        this.setState({...this.state});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    {!this.state.showForm && <ContactList addContact={this.addContact} editContact={this.editContact} deleteContact={this.deleteContact}/>}
                    {this.state.showForm && <ContactForm backButtonClk={this.backButtonClk} updateContacts={this.updateContacts} details={this.details}/>}
                </header>
                </div>
        )
    }


}

export default LandingPage;