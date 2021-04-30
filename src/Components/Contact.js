import React, { Component } from 'react';

import * as emailjs from 'emailjs-com'
import apiKeys from '../apikeys';



class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      showLoader: false, 
      showSuccess: false, 
      showWarning: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // onSubmit=(e)=>{
  //   e.preventDefault()// Prevents default refresh by the browser
  //   console.log(e.target, apiKeys);
  //   emailjs.send('gmail', apiKeys.TEMPLATE_ID, e.target, apiKeys.USER_ID)c
  //   .then(result => {
  //     alert('Message Sent, I\'ll get back to you shortly', result.text);
  //     },
  //     error => {
  //     alert( 'An error occured, Plese try again',error.text)
  //   })
  // }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
    const { showLoader, showSuccess, showWarning } = this.state;
    console.log(e.target);
    //  emailjs.send(
    //   apiKeys.SERVICE_ID,
    //   apiKeys.TEMPLATE_ID,
    //   templateParams,
    //   apiKeys.USER_ID
    //  ).then(result => {
    //   alert('Message Sent, I\'ll get back to you shortly', result.text);
    //   this.resetForm();
    //   },
    //   error => {
    //   alert( 'An error occured, Plese try again',error.text)
    // });
     e.preventDefault();
     this.setState({
            showLoader: true
          });
      emailjs.sendForm('gmail', apiKeys.TEMPLATE_ID, e.target, apiKeys.USER_ID)
      .then((result) => {  

   //             $('#image-loader').fadeOut();
   //             $('#message-warning').hide();
   //             $('#contactForm').fadeOut();
   //             $('#message-success').fadeIn(); 
          this.setState({
            showLoader: false,
            showWarning: false,
            showSuccess: true
          });
          this.resetForm();
      }, (error) => {
          this.setState({
            showLoader: false,
            showWarning: true
          });
      });
  }

  resetForm() {
    this.setState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  }

  handleChange = (param, e) => {
    this.setState({ [param]: e.target.value })
  }

  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var city = this.props.data.address.city;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

            <div className="ten columns">

                  <p className="lead">{message}</p>

            </div>

         </div>

         <div className="row">
            <div className="eight columns">

               <form id="contactForm" className='form' onSubmit={this.handleSubmit}>
					<fieldset>

                  <div>
						   <label htmlFor="contactName">Name <span className="required">*</span></label>
						   <input type="text" value={this.state.name} size="35" id="contactName" name="contactName" onChange={this.handleChange.bind(this, 'name')}/>
                  </div>

                  <div>
						   <label htmlFor="contactEmail">Email <span className="required">*</span></label>
						   <input type="text" value={this.state.email} size="35" id="contactEmail" name="contactEmail" onChange={this.handleChange.bind(this, 'email')}/>
                  </div>

                  <div>
						   <label htmlFor="contactSubject">Subject</label>
						   <input type="text" value={this.state.subject} size="35" id="contactSubject" name="contactSubject" onChange={this.handleChange.bind(this, 'subject')}/>
                  </div>

                  <div>
                     <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                     <textarea 
                        cols="50" rows="15"
                        value={this.state.message}
                        id="contactMessage" name="contactMessage" onChange={this.handleChange.bind(this, 'message')}></textarea>
                  </div>

                  <div>
                     <button className="submit">Submit</button>
                     <span id="image-loader" className={this.state.showLoader ? 'show' : ''}>
                        <img alt="" src="images/loader.gif" />
                     </span>
                  </div>
					</fieldset>
				   </form>

           <div id="message-warning" className={this.state.showWarning ? 'show' : ''}> Error </div>
				   <div id="message-success" className={this.state.showSuccess ? 'show' : ''}>
                  <i className="fa fa-check"></i>Your message was sent, thank you!<br />
				   </div>
           </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Contact Info</h4>
					   <p className="address">
						   {name}<br />
						   {city}<br />
						   <span>{phone}</span>
					   </p>
				   </div>
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
