import React, { Fragment } from "react";
import PhotoGrid from "./PhotoGrid";
import { API } from "aws-amplify";
import "../index.css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.init = this.init.bind(this);
    this.playGame = this.playGame.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    if (this.props.auth.isAuthenticated) {
      console.log("User is authenticated");
      let apiName = "adamTestAPI_West";
      let path = "/user/1";
      let myInit = {
        // OPTIONAL
        headers: {
          "Content-Type": "application/json"
        }, // OPTIONAL
        response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
      };
      API.get(apiName, path, myInit)
        .then(response => {
          console.log("GET response: " + JSON.stringify(response));
        })
        .catch(error => {
          console.log("Error: " + error);
        });
    } else {
      console.log("User is NOT authenticated");
    }
  }

  playGame() {
    this.props.history.push("/game");
  }

  render() {
    return (
      <Fragment>
        <div className="box cta">
          <p className="has-text-centered"></p>
          <PhotoGrid />
          <button onClick={this.playGame}>
            <p>Play Game</p>
          </button>
        </div>
      </Fragment>
    );
  }
}
