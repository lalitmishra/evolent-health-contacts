import React from 'react';

interface iProps {
    updateContacts: Function;
    backButtonClk: Function;
    details: any;
}

interface iState {
    firstName:  string;
    lastName: string;
    email: string;
    phone: string;
    status: boolean;
    isValidName: boolean;
    isValidLName : boolean;
    isValidEMail : boolean;
    isValidPhone : boolean;
    isValidStatus : boolean;
}

class ContactForm extends React.Component <iProps, iState > {
    constructor(props: iProps) {
        super(props);
        props = {
            updateContacts  : this.props.updateContacts,
            backButtonClk   : this.props.backButtonClk,
            details         : {}
        }
        this.state = {
            firstName: this.props.details.firstName || '',
            lastName: this.props.details.lastName || '',
            email: this.props.details.email || '',
            phone: this.props.details.phone || '',
            status: this.props.details.status || '',
            isValidName     : false,
            isValidLName    : false,
            isValidEMail    : false,
            isValidPhone    : false,
            isValidStatus   : false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.resetButtonClick = this.resetButtonClick.bind(this);
        this.submitButtonClick = this.submitButtonClick.bind(this);
        this.backButtonClick = this.backButtonClick.bind(this);
    }

    handleChange (event: any) {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        switch (targetName) {
            case 'firstName':
                this.setState({firstName: targetValue});
                break;
            case 'lastName':
                this.setState({lastName: targetValue});
                break;
            case 'email':
                this.setState({email: targetValue});
                break;
            case 'phone':
                this.setState({phone: targetValue});
                break;
            case 'status':
                this.setState({status: !this.state.status});
                break;
            default:
                break;
        }
    }

    resetButtonClick () {
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            status: true,
            isValidEMail: false,
            isValidPhone: false,
            isValidName: false,
            isValidLName: false,
        });
    }

    submitButtonClick () {
        let allDetailsValid = true;
        if(!this.state.firstName) {
            this.setState({isValidName: true});
            allDetailsValid = false;
        }
        if(!this.state.lastName) {
            this.setState({isValidLName: true});
            allDetailsValid = false;
        }
        if(!this.state.phone) {
            this.setState({isValidPhone: true});
            allDetailsValid = false;
        }
        if(this.state.phone) {
            const phoneno = /^\d{10}$/;
            if(!this.state.phone.match(phoneno))
            {
                this.setState({isValidPhone: true});
                allDetailsValid = false;
            }
        }
       
        if(!this.state.email) {
            this.setState({isValidEMail: true});
            allDetailsValid = false;
        }
        
        if(allDetailsValid) {
            this.props.updateContacts(this.state);
        }
    }

    backButtonClick () {
        this.props.backButtonClk();
    }

    render() {
        return (            
                        
            <div className="d-flex flex-wrap justify-content-center position-absolute w-100 h-100 align-items-center align-content-center"> 
                <form autoComplete="off">
                    <h1 style={{display: 'block'}}>Contact Form</h1>
                    <div className="input-group margin-top-2P">
                        <div className="input-group-prepend">
                            <span className="input-group-text">First Name</span>
                        </div>
                        <input type="text" className="form-control" id="firstName"
                            required name="firstName" onChange={this.handleChange} value={this.state.firstName}/>
                    </div>
                    {this.state.isValidName && <div className="alert alert-danger Alert-height">
                        First Name is required
                    </div>}

                    <div className="input-group margin-top-2P">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Last Name</span>
                        </div>
                        <input type="text" className="form-control" id="lastName"
                            name="lastName"  onChange={this.handleChange} value={this.state.lastName}/>
                    </div>
                    {this.state.isValidLName && <div className="alert alert-danger Alert-height">
                        Last Name is required
                    </div>}

                    <div className="input-group margin-top-2P">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Email</span>
                        </div>
                        <input type="email" className="form-control" id="email" name="email"  onChange={this.handleChange} value={this.state.email}/>
                    </div>
                    {this.state.isValidEMail && <div  className="alert alert-danger Alert-height">
                        Email is required
                    </div>}

                    <div className="input-group margin-top-2P">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Phone</span>
                        </div>
                        <input type="tel" className="form-control" id="phone"
                            name="phone"  onChange={this.handleChange} value={this.state.phone}/>
                    </div>
                    {this.state.isValidPhone && <div className="alert alert-danger Alert-height">
                        Phone is required
                    </div>}

                    <div className="input-group margin-top-2P">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Active</span>
                        </div>
                        <div className="input-group-text">
                            <input name='status' type="checkbox" aria-label="Checkbox for following text input"  onChange={this.handleChange} checked={this.state.status}/>
                        </div>
                    </div>
                    <br/>
                    <button className="btn btn-success-left back-button btn-outline-light" onClick={this.backButtonClick}>Back</button>
                    <button className="btn btn-outline-warning btn-success-left" onClick={this.resetButtonClick}>Reset</button>
                    <button type="submit" className="btn btn-success btn-reset-right " onClick={this.submitButtonClick}>Submit</button>
                </form>                
            </div>
        )
    }
}

export default ContactForm;