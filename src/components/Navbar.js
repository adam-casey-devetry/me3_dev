import React, { Component } from "react";
import { Auth } from "aws-amplify";
import ASUFullLogo from "../ASU Photos/ASU full logo.png";
import Me3BWLogo from "../Logos/Me3_Logo_BW.png";
import "../App.css";

export default class Navbar extends Component {
  handleLogOut = async event => {
    event.preventDefault();
    try {
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src={ASUFullLogo} width="112" height="28" alt="ASU logo" />
          </a>
        </div>
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img
              src={Me3BWLogo}
              width="35"
              height="45"
              alt="Me3 logo"
              style={{ paddingLeft: 0 }}
            />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>Username: {this.props.auth.user.username}</p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a
                      href="/register"
                      className="button is-primary"
                      style={{ backgroundColor: "#8E0C3A" }}
                    >
                      <strong>Register</strong>
                    </a>
                    <a
                      href="/login"
                      className="button is-light"
                      style={{ backgroundColor: "#FFC72C" }}
                    >
                      Log in
                    </a>
                  </div>
                )}
                {/* If user is logged in, show the Log Out button */}
                {this.props.auth.isAuthenticated && (
                  <div>
                    <a
                      href="/"
                      onClick={this.handleLogOut}
                      className="button is-primary"
                      style={{ backgroundColor: "#8E0C3A" }}
                    >
                      Log Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
