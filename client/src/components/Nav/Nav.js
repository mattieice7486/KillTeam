import React from "react";
import { auth, provider } from '../../utils/Firebase';
import "./Nav.css";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  };

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  };

  render() {
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <a className="navbar-brand" href="/">
          Killteam
        </a>
        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/squad">Squad</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/current">Current</a>
            </li>
          </ul>
            {this.state.user ?
              <div className="profilePic">
                  <img className="us" src={this.state.user.photoURL} alt="avatar" style={{borderRadius : "50%", height : "50px", width : "auto"}}/>
              </div>
              :
              <p className="text-light" id="loginStatement">You must be logged in to save your squad.</p>
            }
            {this.state.user ?
              <button className="btn logout" onClick={this.logout}>Logout</button>                
              :
              <button className="btn login" onClick={this.login}>Log In</button>              
            }
        </div>
      </nav>
    )
  }
};

export default Nav;
