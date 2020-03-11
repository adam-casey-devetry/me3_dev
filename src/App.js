import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LogIn from "./components/auth/LogIn";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification";
import ChangePassword from "./components/auth/ChangePassword";
import ChangePasswordConfirm from "./components/auth/ChangePasswordConfirm";
import Welcome from "./components/auth/Welcome";
import MainGame from "./components/game/MainGame";
import Results from "./components/game/Results";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import { Auth } from "aws-amplify";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

library.add(faEdit);

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  };

  // Helper functions to change state when user is logged in
  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = user => {
    this.setState({ user: user });
  };

  async componentDidMount() {
    try {
      // Retrieve session object from local storage
      const session = await Auth.currentSession();
      // Set isAuthenticated flag
      this.setAuthStatus(true);
      console.log(session);
      // Load the current authenticated used
      const user = await Auth.currentAuthenticatedUser();
      // Set the user in state
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }

  get routes() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    let routes = [ // default routes
      <Route
        exact
        path="/forgotpasswordverification"
        render={props => (
          <ForgotPasswordVerification
            {...props}
            auth={authProps}
          />
        )}
      />,
      <Route
        exact
        path="/changepasswordconfirmation"
        render={props => (
          <ChangePasswordConfirm {...props} auth={authProps} />
        )}
      />
    ];

    if (authProps.isAuthenticated) { // only visible if logged in
      routes = routes.concat([
        <Route
          exact
          path="/"
          render={props => <Home {...props} auth={authProps} />}
        />,
        <Route
          exact
          path="/changepassword"
          render={props => (
            <ChangePassword {...props} auth={authProps} />
          )}
        />,
        <Route
          exact
          path="/welcome"
          render={props => <Welcome {...props} auth={authProps} />}
        />,
        <Route
          exact
          path="/game"
          render={props => <MainGame {...props} auth={authProps} />}
        />,
        <Route
          exact
          path="/results"
          render={props => <Results {...props} auth={authProps} />}
        />,
      ])
    } else {
      routes = routes.concat([ // only visible if not logged in
        <Route
          exact
          path="/login"
          render={props => <LogIn {...props} auth={authProps} />}
        />,
        <Route
          exact
          path="/register"
          render={props => <Register {...props} auth={authProps} />}
        />,
        <Route
          exact
          path="/forgotpassword"
          render={props => (
            <ForgotPassword {...props} auth={authProps} />
          )}
        />,
      ])
    };
    return routes;
  }

  get fallbackRoute() {
    if (this.state.isAuthenticated) return "/"; // home
    if (!this.state.isAuthenticated) return "/login";
    return "/login";
  }

  render() {
    if (this.state.isAuthenticating) {
      return (
        <div className="loader">
          <div className="mySpinner" />
          <p>Loading...</p>
        </div>
      );
    }
    const authProps = { // todo: consolidate
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    };
    return (
      <Fragment>
        <div className="App">
          <Router>
            <div>
              <Navbar auth={authProps} />
              <Layout>
                <Switch>
                  {this.routes.map(r => Object.assign({}, r, { key: r.props.path }))}
                  <Route render={() => <Redirect to={this.fallbackRoute} />} />
                </Switch>
              </Layout>
              <Footer />
            </div>
          </Router>
        </div>
      </Fragment>
    );
  }
}

export default App;
