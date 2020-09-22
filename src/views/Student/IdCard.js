import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Row, Col, Card, CardHeader, CardBody, Button} from 'reactstrap'

import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';

import {Link} from 'react-router-dom';
import Pdf from "react-to-pdf";

const ref = React.createRef();
const required = (val) => val && val.length;

class IdCard extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            class:"",
            section:"",
            contact:"",
            img: require('./../../assets/img/default-avatar.png')
        }
    }

    handleUserFetch = async(values) => {
        const dataReceived = await axios.get(`https://gym-erp-backend.herokuapp.com/student/fetch/${values.urn}`)
		console.log("Data recieved is - ");
        console.log(dataReceived.data);
        
        if(dataReceived.data.length!==0){
            this.setState({
                firstName: dataReceived.data[0].firstName,
                lastName: dataReceived.data[0].lastName,
                class: dataReceived.data[0].class,
                section: dataReceived.data[0].section,
                contact: dataReceived.data[0].contact,
                img: dataReceived.data[0].picture
            })
        }else{
            alert("Invalid Regist. No.")
        }
        
    }

    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Id Card</BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    {/* <Col md={12}>
                        <Pdf targetRef={ref} filename="code-example.pdf">
                            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
                        </Pdf>
                    </Col> */}
                    <Col md={6}>
                        <Card>
                            <CardHeader>Id Card Generation:</CardHeader>
                            <hr />
                            <CardBody>
                                <Row>
                                    <Col md={6}>
                                        <LocalForm onSubmit={(values) => this.handleUserFetch(values)}>
                                            <Row className="form-group">
                                                <Col md={12}>
                                                    <Control.text model=".urn" id="urn" name="urn"
                                                        placeholder="Regist. No."
                                                        className="form-control"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".urn"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Button type="submit" block outline color="primary">
                                                        Fetch Details &amp; Gen. Id Card
                                                    </Button>
                                                </Col>
                                                <Col>
                                                    <Pdf targetRef={ref} filename="IDCARD.pdf">
                                                        {({ toPdf }) => <Button outline color="success" block onClick={toPdf}>Download Shown ID Card</Button>}
                                                    </Pdf>
                                                </Col>
                                            </Row>
                                        </LocalForm>
                                    </Col>
                                    {/* <Col>
                                        
                                    </Col> */}
                                </Row>
                                
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <div ref={ref} className="idcard d-flex justify-content-center">
                            <div className="id-card">
                                <img src={this.state.img} alt="Your Photo" style={{width:"100%"}} />
                                <hr />
                                <h6>Name: {this.state.firstName+" "+this.state.lastName}</h6>
                                <p className="id-title">Class: {this.state.class}, Section: {this.state.section} </p>
                                <p>Harvard University</p>
                                {/* <a href="#"><i className="fa fa-dribbble"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-linkedin"></i></a>
                                <a href="#"><i className="fa fa-facebook"></i></a> */}
                                <p><button className="id-button">Contact: {this.state.contact} </button></p>
                            </div>
                        </div>
                    </Col>
                </Row>
                
            </div>
        );
    }
}
 
export default IdCard;