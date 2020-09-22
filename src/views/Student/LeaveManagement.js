import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardTitle,Row,Col,Button, Breadcrumb, BreadcrumbItem, Label, ListGroup, ListGroupItem, Badge} from "reactstrap";
import { Link } from "react-router-dom";
// import readXlsxFile from 'read-excel-file'
import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

const required = (val) => val && val.length;

class LeaveList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isDataReturned: false,
            data:[]
        }
    }
    getData = async() => {
        const dataReceived = await axios.get(`https://gym-erp-backend.herokuapp.com/${JSON.parse(localStorage.getItem('usr'))._id}/leaves/fetch`)
        console.log(dataReceived)
        this.setState({
            isDataReturned: true,
            data: dataReceived.data
        });

        console.log(this.state.data)
    }
    async componentWillMount(){
        await this.getData();
    }

    async componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.refresher !== prevProps.refresher) {
            this.setState({
                isDataReturned: false
            });
            await this.getData();
        }
    }

    render() { 
        return ( 
            <>
            <Card>
                <CardHeader>Latest Leave Status:</CardHeader>< hr/>
                <CardBody>
                {this.state.isDataReturned ? (

                        this.state.data.length !== 0?
                            
                                    <ListGroup>
                                        {this.state.data.reverse().map((item, index) => {
                                            return (
                                                <ListGroupItem>
                                                    <Row>
                                                        <Col md={6}>
                                                            <p>Start Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.startDate)))}</p>
                                                        </Col>
                                                        <Col md={6}>
                                                            <p>End Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.endDate)))}</p>
                                                        </Col>
                                                        <Col md={6}>
                                                            <p>Requested At: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.createdAt)))} </p>
                                                        </Col>
                                                        <Col md={6}>
                                                            <p>Status: {item.status==="Success" ?
                                                                    <Badge color="success">Approved</Badge>
                                                                    :
                                                                    <Badge color="warning">Pending</Badge>
                                                                } 
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <p>Reason: {item.reason} </p>
                                                    
                                                </ListGroupItem>
                                            );
                                        })}
                                    </ListGroup>
                               
                        :
                        <>No data to show...</>
                    )
                    
                :
                <>
                    <ClipLoader
                        // css={override}
                        size={35}
                        color={"#009dff"}
                        loading={true}
                    />
                </>
                }
                </CardBody>
                <hr />
            </Card>
            </>
        );
    }
}

class LeaveManagement extends Component {

    constructor(props){
        super(props);
        this.state = {
            refresher:0
        }
    }

    handleRefresh = () => {
        this.setState({
            refresher: this.state.refresher + 1
        })
    }

    handleLeaveSubmit = (values) => {

        var body = {
            class: values.class,
            contact:values.contact,
            endDate:values.endDate,
            guardianName:values.guardianName,
            name:localStorage.getItem('usr'),
            userId: JSON.parse(localStorage.getItem('usr'))._id,
            reason:values.reason,
            section:values.section,
            startDate:values.startDate,
            urn:values.urn
        }

        console.log(body)

        axios.post(`https://gym-erp-backend.herokuapp.com/student/leave/submit`, body , 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('tokn')}` 
                }
            })
            .then((response) => {
                console.log("Response");
                console.log(response)
                if (response.status === 200 || response.status===304) {
                    console.log("Created");
                    // alert("Created!");
                    
                    // Resset the form!
                    document.getElementById("reset").click();

                    // handle refresh
                    this.handleRefresh();
                }
            })
            .catch((e) => {
                // alert("Error! Sorry")
                console.log("Error is -")
                console.log(e)
            } 
        );
    }

    render() { 
        console.log(localStorage.getItem('usr'))
        
        return ( 
            <>
                <div className="content">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Leave Management</BreadcrumbItem>
                    </Breadcrumb>
                    
                    <Row>
                        <Col md={5}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Request New Leave:</CardTitle>
                                    {/* <p className="card-category">Submit data using given excel template</p>                 */}
                                </CardHeader>
                                <hr />
                                <CardBody>
                                        <LocalForm resetOnSubmit={true} onSubmit={(values) => this.handleLeaveSubmit(values)}>
                                            <Row className="form-group">
                                                <Col md={6}>
                                                    <Control.text model=".name" id="name" name="name"
                                                        className="form-control"
                                                        // placeholder="Name"
                                                        disabled
                                                        defaultValue={JSON.parse(localStorage.getItem('usr')).name}
                                                        value={JSON.parse(localStorage.getItem('usr')).name}
                                                        // validators={{
                                                        //     required
                                                        // }}
                                                    />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".name"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Control.text model=".urn" id="urn" name="urn"
                                                        className="form-control"
                                                        placeholder="Regist. No."
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
                                            </Row>
                                            <Row className="form-group">
                                                <Col md={3}>
                                                    <Control.text model=".class" id="class" name="class"
                                                        className="form-control"
                                                        placeholder="Class"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".class"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                                <Col md={3}>
                                                    <Control.text model=".section" id="section" name="section"
                                                        className="form-control"
                                                        placeholder="Section"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".section"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Control.text model=".guardianName" id="guardianName" name="guardianName"
                                                        className="form-control"
                                                        placeholder="Guardian Name"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".guardianName"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Label md={4} htmlFor="startDate" style={{fontSize:"1.0em"}}>Start Date:</Label>
                                                <Col md={6}>
                                                    {/* <input type="datetime-local"></input> */}
                                                    <Control.input type="date" model=".startDate" id="startDate" name="startDate"
                                                        className="form-control"
                                                        defaultValue="2020-12-12"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".startDate"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Label md={4} htmlFor="endDate" style={{fontSize:"1.0em"}}>End Date:</Label>
                                                <Col md={6}>
                                                    {/* <input type="datetime-local"></input> */}
                                                    <Control.input type="date" model=".endDate" id="endDate" name="endDate"
                                                        className="form-control"
                                                        defaultValue="2020-12-12"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".endDate"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Col md={4}>
                                                    <Control.text type="number" model=".contact" id="contact" name="contact"
                                                        className="form-control"
                                                        placeholder="Contact"
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".contact"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Number Required! '
                                                        }}

                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Control.textarea model=".reason" id="reason" name="reason"
                                                        className="form-control"
                                                        placeholder="Reason"
                                                        rows={2}
                                                        validators={{
                                                            required
                                                        }}
                                                            />
                                                    <Errors 
                                                        className="text-danger"
                                                        model=".reason"
                                                        show="touched"
                                                        messages={{
                                                            required: 'Required! '
                                                        }}

                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="form-group">
                                                <Col md={6}>
                                                    <Button color="danger" block outline id="reset" type="reset">Reset</Button>
                                                </Col>
                                                <Col md={6}>
                                                    <Button type="submit" block outline color="primary">
                                                        Submit
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </LocalForm>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <LeaveList refresher={this.state.refresher} />
                        </Col>
                    </Row>
                </div>        
            </>
        );
    }
}
 
export default LeaveManagement;