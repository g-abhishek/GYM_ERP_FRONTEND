import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
// reactstrap components
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

import {ImportantCards, StudentCards, AccountCards} from './../components/Shared/CardDetails.js'

class Dashboard extends React.Component {

  componentDidMount(){
    store.addNotification({
      title: "Welcome " + JSON.parse(localStorage.getItem('usr')).name +"!",
      message: "- by Dream Advance!",
      type: "default",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 1000,
        onScreen: true
      }
    });
  }

  render() {
    return (
      <>
        <div className="content">
        <h4>Important:</h4>
          <Row>
          
          {ImportantCards.map((item)=>{

            return (
              <Col lg="3" md="6" sm="6" key={item.id}>
                <Link to={item.link} style={{textDecoration:"none"}}>
                  <Card className="card-stats">
                    <CardBody style={{fontSize:"0.7em"}}>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className={item.icon} /> 
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <CardTitle>{item.label}</CardTitle>
                            <p className="card-category">{item.tag}</p>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <Link to={item.link}>
                          <i className="fas fa-sync-alt" /> {item.linkName}
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </Col>
            );
            
          })}
        </Row>

        {/* <hr />
        <h4>Students:</h4>
        <Row>
          
          {StudentCards.map((item)=>{

            return (
              <Col lg="3" md="6" sm="6" key={item.id}>
                <Link to={item.link} style={{textDecoration:"none"}}>
                  <Card className="card-stats">
                  <CardBody style={{fontSize:"0.7em"}}>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className={item.icon} /> 
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <CardTitle>{item.label}</CardTitle>
                            <p className="card-category">{item.tag}</p>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <Link to={item.link}>
                          <i className="fas fa-sync-alt" /> {item.linkName}
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </Col>
            );
            
          })}
        </Row> */}


        <hr />
        <h4>Accounts:</h4>
        <Row>
          
          {AccountCards.map((item)=>{

            return (
              <Col lg="3" md="6" sm="6" key={item.id}>
                <Link to={item.link} style={{textDecoration:"none"}}>
                  <Card className="card-stats">
                  <CardBody style={{fontSize:"0.7em"}}>
                      <Row>
                        <Col md="4" xs="5">
                          <div className="icon-big text-center icon-warning">
                            <i className={item.icon} /> 
                          </div>
                        </Col>
                        <Col md="8" xs="7">
                          <div className="numbers">
                            <CardTitle>{item.label}</CardTitle>
                            <p className="card-category">{item.tag}</p>
                            <p />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                    <CardFooter>
                      <hr />
                      <div className="stats">
                        <Link to={item.link}>
                          <i className="fas fa-sync-alt" /> {item.linkName}
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </Col>
            );
            
          })}
        </Row>
        <hr />

          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Datasets Distribution</CardTitle>
                  <p className="card-category">Based on Validation accuracy</p>
                </CardHeader>
                <CardBody>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" style={{padding:"5px"}} /> Art{"   "}
                    <i className="fa fa-circle text-warning" style={{padding:"5px"}}/> Deaf{"   "}
                    <i className="fa fa-circle text-danger" style={{padding:"5px"}}/> I{"   "}
                    <i className="fa fa-circle text-gray" style={{padding:"5px"}}/> Clear
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            
            <Col md="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                  <p className="card-category">Line Chart with Points</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Users Behavior</CardTitle>
                  <p className="card-category">24 Hours performance</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-history" /> Updated 3 minutes ago
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

export default Dashboard;
