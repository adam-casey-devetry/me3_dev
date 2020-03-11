import React, { Fragment, useState, useEffect } from "react";
import PhotoGrid from "./PhotoGrid";
import { API, Auth } from "aws-amplify";
import "../index.css";

export default function Home(props) {
  const [jwToken, setJWToken] = useState(null);

  async function getData() {
    let idToken = {
      headers: {
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    };
    setJWToken(idToken.headers.Authorization);
  }

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      console.log("User is authenticated");
      getData().then(console.log("jwToken: " + jwToken));
      let apiName = "adamTestAPI_West";
      let path = "/user/1";
      let myInit = {
        // OPTIONAL
        headers: {
          "Content-Type": "application/json",
          Authorization: jwToken
        }, // OPTIONAL
        response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
      };
      if (jwToken !== null) {
        API.get(apiName, path, myInit)
          .then(response => {
            console.log("GET response: " + JSON.stringify(response.data));
          })
          .catch(error => {
            console.log("Error: " + error);
          });
      }
    } else {
      console.log("User is NOT authenticated");
    }
  }, [jwToken]);

  return (
    <Fragment>
      <div className="box cta">
        <p className="has-text-centered"></p>
        <PhotoGrid />
      </div>
    </Fragment>
  );
}
