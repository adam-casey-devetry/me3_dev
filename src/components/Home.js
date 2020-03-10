import React, { Fragment } from "react";
import PhotoGrid from "./PhotoGrid";
//eslint-disable-next-line
import Amplify, { API } from "aws-amplify";
//eslint-disable-next-line
import awsconfig from "../aws-exports";
import "../index.css";

export default function Home(props) {
  // Configure Amplify
  //API.configure(awsconfig);
  /*   Amplify.configure({
    API: {
      endpoints: [
        {
          name: "adamTestAPI_West",
          endpoint: "https://7p22l6lnfj.execute-api.us-west-2.amazonaws.com/dev"
        }
      ]
    }
  }); */

  if (props.auth.isAuthenticated) {
    console.log("User is authenticated");
    let apiName = "adamTestAPI_West";
    let path = "/user/2";
    let myInit = {
      // OPTIONAL
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }, // OPTIONAL
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    };
    API.get(apiName, path, myInit)
      .then(response => {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader(
          "Access-Control-Allow-Methods",
          "GET,HEAD,OPTIONS,POST,PUT"
        );
        response.setHeader(
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        );
        console.log("GET response: " + JSON.stringify(response));
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  } else {
    console.log("User is NOT authenticated");
  }

  return (
    <Fragment>
      <div className="box cta">
        <p className="has-text-centered"></p>
        <PhotoGrid />
      </div>
    </Fragment>
  );
}
