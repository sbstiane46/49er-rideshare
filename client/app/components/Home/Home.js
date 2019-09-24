import React, {
  Component
} from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

import GoogleApiWrapper from '../GoogleApiWrapper/GoogleApiWrapper';
import Toolbar from '../Toolbar/Toolbar';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../Backdrop/Backdrop';
import './Home.scss';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      sigInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpAddress: '',
      signUpPhoneNumber: '',
      signUpStudentID: '',
      signUpEmail: '',
      signUpPassword: '',
      sideDrawerOpen: false,
    };

    //bind onChange functions to react component
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpPhoneNumber = this.onTextboxChangeSignUpPhoneNumber.bind(this);
    this.onTextboxChangeSignUpAddress = this.onTextboxChangeSignUpAddress.bind(this);
    this.onTextboxChangeSignUpStudentID = this.onTextboxChangeSignUpStudentID.bind(this);

    //bind onClick functions to react component
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.drawerToggleClickHandler = this.drawerToggleClickHandler.bind(this);
    this.backdropClickHandler = this.backdropClickHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    
    if (obj && obj.token) {
      const { token } = obj;
      //verify the token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,

            });
          }
        });
    } else {
      //There's no token
      this.setState({
        isLoading: false
      });
    }
  }


  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextboxChangeSignUpAddress(event) {
    this.setState({
      signUpAddress: event.target.value,
    });
  }

  onTextboxChangeSignUpPhoneNumber(event) {
    this.setState({
      signUpPhoneNumber: event.target.value,
    });
  }

  onTextboxChangeSignUpStudentID(event) {
    this.setState({
      signUpStudentID: event.target.value,
    });
  }

  onSignUp() {
    //grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpAddress,
      signUpPhoneNumber,
      signUpStudentID,
      signUpEmail,
      signUpPassword
    } = this.state;

    this.setState({
      isLoading: true,
    });

    //POST request to backend
    fetch('/api/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: signUpFirstName,
          lastName: signUpLastName,
          address: signUpAddress,
          phoneNumber: signUpPhoneNumber,
          studentID: signUpStudentID,
          email: signUpEmail,
          password: signUpPassword
        }),
      }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: '',
            signUpPhoneNumber: '',
            signUpAddress: '',
            signUpStudentID: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }

      });

  }

  onSignIn() {
    //grab state
    const {
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true,
    });

    //POST request to backend
    fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signInEmail,
          password: signInPassword
        }),
      }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token, user: json.user });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,

          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }

      });

  }

  logout() {
    this.setState({
      isLoading: true,
    });
    
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
          const { token } = obj;
          //verify the token
          fetch('/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                this.setState({
                  token: '',
                  isLoading: false
                });
              } else {
                this.setState({
                  isLoading: false,
    
                });
              }
            });
        } else {
          //There's no token
          this.setState({
            isLoading: false
          });
        }
      }

  drawerToggleClickHandler() {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    });
  };

  backdropClickHandler() {
    this.setState({sideDrawerOpen: false});
  };



  render() {
    
    //Backdrop 
    let backdrop;



    // Sign up/in
    const {
      isLoading,
      token,
      sigInError,
      signUpError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpAddress,
      signUpPhoneNumber,
      signUpStudentID,
      signUpEmail,
      signUpPassword
    } = this.state;

    //Backdrop
    if(this.state.sideDrawerOpen) {
      backdrop= <Backdrop click={this.backdropClickHandler} />;
    }
    
    // Sign up/in
    if (isLoading) {
      return ( <div> 
        <iframe src="https://giphy.com/embed/xTkcEQACH24SMPxIQg" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen>
          </iframe>
        </div> );
    }

    if (!token) {
      return ( 
      <div className='base-container'>
      
      <div className='left-image'></div>  

      <div className='header'>
          <img src='https://mk0teamcolorcodtgc6i.kinstacdn.com/wp-content/uploads/2018/08/unc_charlotte_logo_colors-279x300.png' />
          <h1>Rideshare</h1>
      </div>
      <div className='form'>
        <div className='signin'> 
          {
            (sigInError) ? ( 
              <p> {signInError}</p>
            ) : (null)
          }

        <p> Member Login </p> 
        <input 
          type = "email"
          placeholder = "Email"
          value = {signInEmail}
          onChange = {
            this.onTextboxChangeSignInEmail
          } 
        /> 

          <br />

        <input 
          type = "password"
          placeholder = "Password"
          value = {signInPassword}
          onChange = {
            this.onTextboxChangeSignInPassword
          } 
        /> 
          
        <br />

        <button onClick = {this.onSignIn} > Sign In </button> 
      </div> 


        <br />
        <br />
        
      <div className='register'> 
          {
          (signUpError) ? (
            <p> {signUpError} </p>
          ) : (null)
        }

        <p > Register </p>
        <input
         type = "text"
        placeholder = "First Name"
        value = {signUpFirstName}
        onChange = {
          this.onTextboxChangeSignUpFirstName
        }
        /> 
        <br />

        <input
         type = "text"
        placeholder = "Last Name"
        value = {signUpLastName}
        onChange = {
          this.onTextboxChangeSignUpLastName
        }
        /> 
        <br />

        <input
         type = "text"
        placeholder = "Address"
        value = {signUpAddress}
        onChange = {
          this.onTextboxChangeSignUpAddress
        }
        /> 
        <br />

        <input
         type = "text"
        placeholder = "Phone Number"
        value = {signUpPhoneNumber}
        onChange = {
          this.onTextboxChangeSignUpPhoneNumber
        }
        /> 
        <br />
        
        <input
         type = "text"
         placeholder = "Student ID"
         value = {signUpStudentID}
         onChange = {
          this.onTextboxChangeSignUpStudentID
         }
        /> 
        <br />
        
        <input
         type = "email"
         placeholder = "Email"
         value = {signUpEmail}
         onChange = {
          this.onTextboxChangeSignUpEmail
         }
        /> 
        <br />
        <input
         type = "password"
         placeholder = "Password"
         value = {signUpPassword}
         onChange = {
          this.onTextboxChangeSignUpPassword
         }
        /> 
        <br />
        <button onClick = {this.onSignUp}> Sign Up </button> 
        
        </div>

      </div>
    </div>
      );
    }

    return ( 
      <div style={{height: '100%'}}>
        {/* <p> Logged into Dashboard! </p> */}
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} logoutClickHandler={this.logout}/>
        <GoogleApiWrapper />
        <SideDrawer show={this.state.sideDrawerOpen} getDriverLocation={this.getDriverLocation}/>
        {backdrop}
      </div>
    );
  }
}

export default Home;
