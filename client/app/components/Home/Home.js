import React, {
  Component
} from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

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
      signUpStudentID: '',
      signUpEmail: '',
      signUpPassword: ''
    };

    //bind onChange functions to react component
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpStudentID = this.onTextboxChangeSignUpStudentID.bind(this);

    //bind onClick functions to react component
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
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

  onTextboxChangeSignUpStudentID(event) {
    this.setState({
      signUpStudentID: event.target.value,
    });
  }

  onSignUp() {
    //grab state
    const {
      signUpFirstName,
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
          setInStorage('the_main_app', { token: json.token });
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



  render() {
    const {
      isLoading,
      token,
      sigInError,
      signUpError,
      signInEmail,
      signInPassword,
      signUpFirstName,
      signUpStudentID,
      signUpEmail,
      signUpPassword
    } = this.state;

    if (isLoading) {
      return ( <div> <p> Loading... </p></div> );
    }

    if (!token) {
      return ( 
      <div>
        <div> 
          {
            (sigInError) ? ( 
              <p> {signInError}</p>
            ) : (null)
          }

        <p> Sign In </p> 
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
        
        <div > 
          {
          (signUpError) ? (
            <p> {signUpError} </p>
          ) : (null)
        }

        <p > Sign Up </p>
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
      );
    }

    return ( 
      <div>
        <p> Logged into Dashboard! </p>
        <button onClick = {this.logout}>Log Out</button> 
      </div>
    );
  }
}

export default Home;
