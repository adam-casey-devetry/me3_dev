import React, { Component } from "react";
import axios from "axios";
import Amplify, { API } from "aws-amplify";
import "../../css/main-game.css";
import guitar from '../../ASU Photos/stubs/game_pics/guitar.png'; // todo: refactor with DB call
import leadership from '../../ASU Photos/stubs/game_pics/leadership.png';

const apiName = "adamTestAPI_West"; //todo: ENV variable?
const myInit = {
  headers: {
    "Content-Type": "application/json"
  }, // OPTIONAL
  response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
};

export default class MainGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [ //todo: refactor with game functionality
        { 'img': guitar },
        { 'img': leadership }
      ],
      isLoading: true,
      results: {} // todo: populate with selections
    };
    this.init = this.init.bind(this);
    this.makeChoices = this.makeChoices.bind(this);
    this.saveResults = this.saveResults.bind(this);
  }

  componentDidMount() { //refactor?
    this.init();
  }

  init() {
    if (this.props.auth.isAuthenticated) {
      console.log("User is authenticated");
      let path = "/pictures"; // get picture choices for game
      API.get(apiName, path, myInit)
        .then(response => {
          console.log("GET response: " + JSON.stringify(response));
          if (response.data && response.data.pictures) {
            this.setState({
              pictures: response.data.pictures,
              isLoading: false
            });
          }
        })
        .catch(error => {
          console.log("Error: " + error); //todo: error state
          this.setState({
            isLoading: false
          });
        });
    } else {
      console.log("User is NOT authenticated");
    }
  }

  makeChoices() { //todo: refactor with game functionality
    const { pictures } = this.state;
    const src1 = pictures[0].img;
    const src2 = pictures[1].img;
    return (
      <div className='picture-container'>
        <img src={src1} alt='choice one' />
        <img src={src2} alt='choice two' />
      </div>
    )
  }

  saveResults() {
    const { results } = this.state;
    const userId = this.props.auth.user.userId; //todo: confirm this param
    const path = `/users/${userId}`;
    const updateInit = {
      headers: {
        "Content-Type": "application/json"
      }, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: { //todo: confirm this param, refactor with Aurora
        results: results
      }
    };
    API.put(apiName, path, updateInit)
      .then(response => {
        console.log("GET response: " + JSON.stringify(response));
        this.props.history.push("/results");
      })
      .catch(error => {
        console.log("Error: " + error);
        this.props.history.push("/results"); //todo: implement error state, this is placeholder
      });
  }

  submitChoices() { // shorcut until game implemented
    return (
      <div className="button-container">
      <button className="submit" onClick={this.saveResults}>
        <p>(See Results)</p>
      </button>
      </div>
    )
  }

  render() {
    if (this.state.isLoading) {
      return ( // todo
        <div>
          <div className='mySpinner' />
          <p>Loading...</p>
        </div>
      );
    }
    return (
      <div id='main-game'>
        <div className="header">
          <h1>Select the image which appeals to you the most</h1>
        </div>
        {this.makeChoices()}
        {this.submitChoices()}
      </div>
    );
  }
}
