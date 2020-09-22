import React from "react";

import { Link } from "react-router-dom";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components

// import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

class UserManual extends React.Component {

//   componentDidMount(){
//     store.addNotification({
//       title: "User Manual!",
//       message: "- For effective use of the App",
//       type: "danger",
//       insert: "top",
//       container: "top-right",
//       animationIn: ["animated", "fadeIn"],
//       animationOut: ["animated", "fadeOut"],
//       dismiss: {
//         duration: 3000,
//         onScreen: true
//       }
//     });
//   }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            {/* <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-caps-small text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Text to ISL</p>
                        <Link to="/admin/text2isl">
                            <Button color="primary" outline style={{fontSize:".35em", lineHeight:"0.35em", padding:"10px 10px"}}>
                                English to ISL
                            </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" /> Check Out Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-circle-10 text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">ISL to Text</p>
                        <Link to="/admin/isl2text">
                            <Button color="warning" outline style={{fontSize:".35em", lineHeight:"0.35em", padding:"10px 10px"}}>
                                ISL to English
                            </Button>
                        </Link>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" /> Check Out Now
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="2" md="12" sm="12"> */}
              {/* <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Errors</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" /> In the last hour
                  </div>
                </CardFooter>
              </Card> */}
            {/* </Col> */}
            {/* <Col lg="4" md="12" sm="12">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Dynamic Dataset</p>
                        <CardTitle tag="p">500+</CardTitle>
                        <p className="card-category">Videos</p>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    {/* <i className="fas fa-sync-alt" /> Update now */}
                  {/* </div>
                </CardFooter>
              </Card>
            </Col> */}
          </Row>

          <Row>

            <Col md={12}>
                <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">Overview</CardTitle>
                    <div className="icon-big text-center icon-warning" style={{position:"absolute", right:"10px"}}>
                        <i className="nc-icon nc-favourite-28 text-danger" />
                    </div>

                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="9" xs="7">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">English to ISL | ISL to Text (Static) | ISL to Text (Dynamic)</p>
                          <p />
                        </div>
                      </Col>
                      {/* <Col md="3" xs="5">
                        <div className="icon-big text-center icon-warning">
                          <i className="nc-icon nc-settings text-danger" />
                        </div>
                      </Col> */}
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
            <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">
                        <Link to="/admin/text2isl" style={{color:"#fbc658", textDecoration:"none"}}>
                            English to ISL{"  "}
                        </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="12">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">
                                <ul>
                                    <li>Consists of ISL animations of almost 1000+ English words..</li><br />
                                    <li>Uses synonym feature for words not present in dictionary</li><br />
                                    <li>Spells out the complicated words</li>
                                </ul>
                              </p>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
            <Col md={4}>
            <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">
                        <Link to="/admin/isl2text" style={{color:"#6bd098", textDecoration:"none"}}>
                            ISL to English (Static){"  "}
                        </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="12">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">
                                <ul>
                                    <li>Can predict the geture of single digit numbers</li><br />
                                    <li>Can predict the gesture of alphabets except H and Y (since there gesture is dynamic..)</li><br />
                                    <li>Fast processing based on Image classification</li>
                                </ul>
                              </p>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="card-stats">
                  <CardHeader>
                    <CardTitle tag="h5">
                        <Link to="/admin/isl2text" style={{color:"#ef8157", textDecoration:"none"}}>
                            ISL to English (Dynamic){"  "}
                        </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row> 
                      <Col md="12">
                        <div className="numbers" style={{textAlign:"left"}}>
                          {/* <p className="card-category">(Images Used : 1000+)</p> */}
                          <p className="card-category">
                                <ul>
                                    <li>Can predict the geture except those alphabets and numbers</li><br />
                                    {/* <li>Can predict the gesture of alphabets except H and Y (since there gesture is dynamic..)</li><br /> */}
                                    <li>Takes relatively more time as it's based on video classification</li>
                                </ul>
                              </p>
                          <p />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="stats">
                      {/* <i className="fas fa-sync-alt" /> Update now */}
                    </div>
                  </CardFooter>
                </Card>
            </Col>
          </Row>
          
        </div>
      </>
    );
  }
}

export default UserManual;
