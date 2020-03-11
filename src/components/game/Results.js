import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import '../../css/results.css';
import photography from '../../ASU Photos/stubs/careers/photography.png'; // todo: refactor with DB call
import setDesign from '../../ASU Photos/stubs/careers/setDesign.png';
import makeup from '../../ASU Photos/stubs/careers/makeup.png';

const apiName = 'adamTestAPI_West'; //todo: ENV variable?
const myInit = {
  headers: {
    'Content-Type': 'application/json'
  }, // OPTIONAL
  response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
};

export default class MainGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      careerResults: [ // specific to User, will be 25 total
        { 'name': 'Photographers', 'img': photography },
        { 'name': 'Set and Exhibit Design', 'img': setDesign },
        { 'name': 'Makeup Artists, Theatrical and Performance', 'img': makeup },
      ],
      majors: [ // not tied to user, will fetch entire list
        { 'name': 'Journalism and Mass Communication' },
        { 'name': 'Sports Journalism' },
        { 'name': 'Art (Photography)' },
      ],
    };
    this.init = this.init.bind(this);
    this.getUserResults = this.getUserResults.bind(this);
    this.getUserResults = this.getUserResults.bind(this);
    this.getAllMajors = this.getAllMajors.bind(this);
    this.showResults = this.showResults.bind(this);
    this.getAllMajors = this.getAllMajors.bind(this);
  }

  componentDidMount() { //todo: refactor
    this.init();
  }

  init() {
    this.getUserResults();
    this.getAllMajors();
  }

  getUserResults() {
    //const userId = this.props.auth.user.userId; //todo: confirm this param
    //const path = `/users/${userId}`;
    const path = `/users/1`;
    API.get(apiName, path, myInit)
      .then(response => {
        console.log('GET response: ' + JSON.stringify(response));
        if (response.data && response.data.results) {
          this.setState({
            results: response.data.results
          });
        }
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  }

  getAllMajors() {
    //let path = `/majors/${process.env.TENENT}`; //todo: how is this set?
    let path = '/majors/arizonaStateU';
    API.get(apiName, path, myInit)
      .then(response => {
        console.log('GET response: ' + JSON.stringify(response));
        if (response.data && response.data.majors) {
          this.setState({
            majors: response.data.majors,
            isLoading: false
          });
        }
      })
      .catch(error => {
        console.log('Error: ' + error); //todo: error state
        this.setState({
          isLoading: false
        });
      });
  }

  showResults() {
    const { careerResults } = this.state;
    let images = careerResults.map(career => { // todo: dynamic text
      return <img key={career.name} src={career.img} alt={career.name} className='career-img' />
    });

    return (
      <div className='career-container'>
        {images}
      </div>
    );
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
      <div id='results'>
        <div className='results-header'>
          <h1>Your Top 3 Results!</h1>
        </div>
        {this.showResults()}
      </div>
    );
  }
}
