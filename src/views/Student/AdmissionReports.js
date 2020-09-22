import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";

import {
    // dashboard24HoursPerformanceChart,
    dashboardEmailStatisticsChart,
    dashboardNASDAQChart,
  } from "variables/charts.js";

class AdmissionReports extends Component {
    // state = {  }
    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Admission Reports</BreadcrumbItem>
                </Breadcrumb>

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

                {/* <Row>
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
                </Row> */}
            </div>
         );
    }
}
 
export default AdmissionReports;