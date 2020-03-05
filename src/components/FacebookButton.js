import React, { Component } from "react";
import { Auth } from "aws-amplify";
import config from "../config";

class FacebookButton extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn;
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    console.log("FB button is mounted");
    this.loadFacebookSDK();
    this.createScript();
    this.setState({ isLoading: false });
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: config.social.FB,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v6.0"
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  // #1
  signIn = () => {
    const fb = window.FB;
    fb.getLoginStatus(response => {
      if (response.status === "connected") {
        console.log("You're already connected");
        this.getAWSCredentials(response.authResponse);
      } else {
        fb.login(
          response => {
            if (!response || !response.authResponse) {
              return;
            }
            console.log(
              "response.authResponse: " +
                JSON.stringify(response.authResponse, null, 2)
            );
            this.getAWSCredentials(response.authResponse);
          },
          {
            // The authorized scopes
            scope: "public_profile,email"
          }
        );
      }
    });
  };

  // #2
  getAWSCredentials(response) {
    console.log("Get AWS credentials response: " + response);
    const { accessToken, expiresIn } = response;
    const date = new Date();
    // eslint-disable-next-line
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    const fb = window.FB;
    try {
      fb.api("/me", { fields: "name,email" }, response => {
        const user = {
          name: response.name,
          email: response.email
        };
        console.log("Auth.federatedSignIn attempt");
        try {
          Auth.federatedSignIn(
            "facebook",
            { token: accessToken, expires_at },
            user
          )
            .then(credentials => {
              console.log("User Name: " + user.name);
              console.log("User Email: " + user.email);
              console.log(credentials);
            })
            .catch(error => alert(error.message));
        } catch (error) {
          console.log("Auth.federateSignIn error: " + error);
        }
        console.log("After Auth.federatedSignIn attempt");
      });
      this.props.onLogin();
    } catch (error) {
      console.log("FB API error: " + error);
    }
  }

  fbAsyncInit() {
    // Init the fb sdk client
    const fb = window.FB;
    fb.init({
      appId: config.social.FB,
      cookie: true,
      xfbml: true,
      version: "v6.0"
    });
  }

  initFB() {
    // eslint-disable-next-line
    const fb = window.FB;
    console.log("FB SDK inited");
  }

  createScript() {
    // Load the sdk
    window.fbAsyncInit = this.fbAsyncInit;
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    //script.onload = this.initFB;
    document.body.appendChild(script);
  }

  handleError(error) {
    console.log("Error encountered: " + error);
    alert(error);
  }

  render() {
    return (
      <div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
            onClick={this.signIn}
            disabled={this.state.isLoading}
          >
            Login With Facebook
          </button>
        </div>
      </div>
    );
  }
}
FacebookButton.displayName = "FacebookButtonComponent";
export default FacebookButton;
