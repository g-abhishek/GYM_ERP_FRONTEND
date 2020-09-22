
import React from "react";
import {Members} from '../components/Shared/MemberData';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import FadeIn from "react-fade-in";

class Contact extends React.Component {

  componentDidMount(){
    store.addNotification({
      title: "Team 4: Amigos de Sordos!",
      message: "Made with ♥ for I4SG",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
    });
  }


  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Team 4: Amigos de Sordos</CardTitle>
                </CardHeader>
                <CardBody>
                <FadeIn>
                <Row>
                  
                    {Members.map(teamMember=> {
                      return(
                        <Col lg="4" md="4">

                          <div className="team-player">
                            <div className="flip-box-front">
                              <img
                                alt={teamMember.name}
                                className="rounded-circle img-fluid img-raised mx-auto d-block"
                                src={teamMember.src}
                                style={{maxWidth:"180px",borderRadius:"100%"}}
                              ></img>
                            </div>
                          </div>
                          <h4 style={{textAlign:"center"}}>{teamMember.name}</h4>
                        </Col>
                      );
                    })}
                  
                  </Row>
                  </FadeIn>
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card className="card-plain">
                <CardHeader>
                  <CardTitle tag="h4">Other Contacts</CardTitle>
                  <p className="card-category">
                    Supported by WinVinaya Foundation
                  </p>
                </CardHeader>
                <CardBody>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Contact;
