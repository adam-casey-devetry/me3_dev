import React, { Component } from "react";
import axios from "axios";
import Amplify, { API } from "aws-amplify";
const BASE_URL = "http://localhost:3000";
var todos = [];

export default class MainGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
          {'url': 'https://en.pimg.jp/018/206/992/1/18206992.jpg'},
          {'url': 'https://image.shutterstock.com/image-photo/image-250nw-625571954.jpg'}
      ]
    };
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init();
  }

  init() {
    var self = this;
    axios
      .get(BASE_URL + "/todos/getAll")
      .then(function(response) {
        self.setState({ todos: response.data.result.Items });
      })
      .catch(function(error) {
        self.setState({ todos: [{}, {}] });
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Select the image which appeals to you the most</h1>
        </div>
        {this.makeChoices()}
      </div>
    );
  }
}
