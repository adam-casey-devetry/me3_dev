import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBIcon,
  MDBIframe
} from "mdbreact";

class IframePage extends Component {
  state = {
    modal11: true
  };

  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      ...this.state,
      [modalNumber]: !this.state[modalNumber]
    });
  };

  render() {
    return (
      <MDBRow>
        <MDBModal
          size="lg"
          isOpen={this.state.modal11}
          toggle={this.toggle(11)}
        >
          <MDBModalBody className="mb-0 p-0">
            <MDBIframe
              title="This is a unique title"
              src="https://player.vimeo.com/video/268111200?autoplay=1&amp;loop=1&amp;autopause=0&amp;background=1"
            />
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <span className="mr-4">Spread the word!</span>
            <MDBBtn tag="a" size="sm" floating social="fb">
              <MDBIcon fab icon="facebook" />
            </MDBBtn>
            <MDBBtn tag="a" size="sm" floating social="tw">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>
            <MDBBtn tag="a" size="sm" floating social="gplus">
              <MDBIcon fab icon="google-plus" />
            </MDBBtn>
            <MDBBtn tag="a" size="sm" floating social="li">
              <MDBIcon fab icon="linkedin" />
            </MDBBtn>
            <MDBBtn
              color="primary"
              outline
              rounded
              size="md"
              className="ml-4"
              onClick={this.toggle(11)}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBRow>
    );
  }
}

export default IframePage;
