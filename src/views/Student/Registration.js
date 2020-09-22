import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col,Button, Badge, Breadcrumb, BreadcrumbItem, Label,  Modal,ModalHeader, ModalBody,ModalFooter, Table} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';

import { MDBDataTableV5 } from 'mdbreact';
import $ from 'jquery'

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
// const override = css`
//   filter: blur(-3px);
  
// `;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

class Registration extends Component {
    constructor(props){
        super(props);
        this.state = {
            src : require('./../../assets/img/default-avatar.png'),
            selectedFile:null,
            isModalOpen: false,
            package_amount: 0,
            otp:0,
        }
    }

    toggleModal = () =>{
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    handleImageUpload = (e) => {
        e.preventDefault();
        this.setState({
            src: URL.createObjectURL(e.target.files[0]),
            selectedFile: e.target.files[0]
        });
        console.log(e.target.files[0])
    }

    handleSubmit = (values) => {

        console.log(values)
        alert(JSON.stringify(values))

        const formData = new FormData();
        formData.append("values", JSON.stringify(values));
        formData.append("amount", this.state.package_amount);
        formData.append("otp", this.state.otp);
        formData.append("file", this.state.selectedFile);
        formData.append("user", localStorage.getItem('usr'));

        axios.post(`https://gym-erp-backend.herokuapp.com/student/registration`, formData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('tokn')}` 
            } 
        })  
        .then((response) => {
            // setResponse(response.data);
            console.log("Response");
            console.log(response)
            if (response.status === 200) {
                console.log("Created");
                alert("Created!");

                // Resset the form!
                document.getElementById("reset").click();
                this.setState({src: require('./../../assets/img/default-avatar.png')});
                document.getElementById('picture').value = '';
            }
        }).catch((error) => {
            console.log("error");
            console.log(error)
        })
    }

    onSelectedOption =(e)=>{
        this.setState({
            package_amount: parseInt($(e.target.options[e.target.selectedIndex]).attr("data-amount")),
            otp: $(e.target.options[e.target.selectedIndex]).attr("data-otp"),
        })
    }



    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    {/* <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem> */}
                    <BreadcrumbItem active>Registration</BreadcrumbItem>
                </Breadcrumb>
                
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row>

                    <Col md={3}>
                        <Card>
                            <CardHeader>Upload Picture:</CardHeader>
                            <CardBody>
                                <div className="team-player">
                                    <div className="flip-box-front">
                                    <img
                                        alt=""
                                        className="rounded-circle img-fluid img-raised mx-auto d-block"
                                        src={this.state.src}
                                        style={{width:"150px", height:"150px", overflow:"hidden",maxWidth:"100%",borderRadius:"100%", maxHeight:"100%"}}
                                    ></img>
                                    </div>
                                </div>
                                <hr />
                                <Row className="form-group">
                                    <Col>
                                        <Control.file model=".picture" id="picture" name="picture"
                                            placeholder="First Name"   
                                            className="form-control"
                                            onChange={this.handleImageUpload}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".picture"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                    <Card>
                        {/* <CardHeader>New Student Registration:</CardHeader>
                        <hr /> */}
                        <CardBody>
                                <p>Customers' Details:</p>
                                <hr />
                                <Row className="form-group">
                                    {/* <Label md={2} style={{fontSize:"1.23em"}}>Student:</Label> */}
                                    
                                    <Col md={4}>
                                        <Control.text model=".customerName" id="customerName" name="customerName"
                                            placeholder="Customer Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".customerName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".fathersName" id="fathersName" name="fathersName"
                                            placeholder="Fathers Name"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fathersName"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".email" id="email" name="email"
                                            placeholder="Email"   
                                            className="form-control"
                                            validators={{
                                                required,validEmail
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                validEmail:'Invali Email'
                                            }}

                                        />
                                    </Col>
                                
                                </Row>
                                <Row className="form-group">
                                    <Col md={3}>
                                        <Control.text type="number" model=".urn" id="urn" name="urn"
                                            placeholder="Serial No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".urn"
                                            show="touched"
                                            messages={{
                                                required: 'Number Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Control.text type="number" model=".contact" id="contact" name="contact"
                                            placeholder="Contact No."
                                            className="form-control"
                                            validators={{
                                                required, maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".contact"
                                            show="touched"
                                            messages={{
                                                required: 'Number Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Control.text model=".fitnessGoal" id="fitnessGoal" name="fitnessGoal"
                                            placeholder="Fitness Goal"
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".fitnessGoal"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} style={{fontSize:"1.2em"}}>Joining Date:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".joiningDate" id="joiningDate" name="joiningDate"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".joiningDate"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Label md={3} style={{fontSize:"1.2em"}}>Date Of Birth:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".dob" id="dob" name="dob"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".dob"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    
                                    <Col md={3}>
                                        <Control.select model=".gender" id="gender" name="gender"
                                            // placeholder="Unique Reg. No."
                                            defaultValue="male"
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Control.select>
                                        <Errors 
                                            className="text-danger"
                                            model=".gender"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Col>
                                        <Control.textarea model=".address" id="address" name="address"
                                            placeholder="Residential Address"
                                            className="form-control"
                                            rows={3}
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".address"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <hr />
                                <p>Health Profile:</p>
                                <hr />
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text model=".dietPlan" id="dietPlan" name="dietPlan"
                                            placeholder="Diet Plan"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".dietPlan"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".nutrients" id="nutrients" name="nutrients"
                                            placeholder="Nutrients/Vitamins"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".nutrients"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".batch" id="batch" name="batch"
                                            placeholder="Batch"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".batch"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text type="number" model=".weight" id="weight" name="weight"
                                            placeholder="Weight"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".weight"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text type="number" model=".height" id="height" name="height"
                                            placeholder="Height"   
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".height"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <hr />

                                <p>Packages: <Button outline color="primary" className="btn btn-sm" onClick={this.toggleModal}>View Details</Button></p>
                                <hr />
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.select model=".package" id="package" name="package"
                                                // placeholder="Unique Reg. No."
                                                defaultValue="male"
                                                className="form-control"
                                                onChange={this.onSelectedOption}
                                                validators={{
                                                    required,  maxLength: maxLength(15)
                                                }}
                                            >
                                                <option data-otp="200" data-amount="1000" value="Package1">Package 1</option>
                                                <option data-otp="200" data-amount="2500" value="Package2">Package 2</option>
                                                <option data-otp="200" data-amount="4500" value="Package3">Package 3</option>
                                                <option data-otp="200" data-amount="8000" value="Package4">Package 4</option>
                                                <option data-otp="400" data-amount="4000" value="PackageA">Package A</option>
                                                <option data-otp="400" data-amount="7000" value="PackageB">Package B</option>
                                                <option data-otp="400" data-amount="12000" value="PackageC">Package C</option>
                                            </Control.select>
                                            <Errors 
                                                className="text-danger"
                                                model=".package"
                                                show="touched"
                                                messages={{
                                                    required: 'Required!',
                                                    maxLength: 'Must be 15 characters or less...'
                                                }}

                                            />
                                    </Col>
                                    <Col md={4}>
                                    <Control.text type="number" model=".amount" id="amount" name="amount"
                                            placeholder="Amount"   
                                            value={this.state.package_amount}
                                            // defaultValue={this.state.package_amount}
                                            className="form-control"
                                            
                                        />
                                        {/* <Errors 
                                            className="text-danger"
                                            model=".amount"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        /> */}
                                    </Col>
                                    <Col md={4}>
                                    <Control.text type="number" model=".otp" id="otp" name="otp"
                                            placeholder="OTP"   
                                            value={this.state.otp}
                                            // defaultValue={this.state.otp}
                                            className="form-control"
                                           
                                        />
                                        {/* <Errors 
                                            className="text-danger"
                                            model=".otp"
                                            show="touched"
                                            messages={{
                                                required: 'Required!'
                                            }}

                                        /> */}
                                    </Col>
                                    
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} style={{fontSize:"1.2em"}}>Start Date:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".startDate" id="startDate" name="startDate"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".startDate"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                    <Label md={3} style={{fontSize:"1.2em"}}>End Date:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".endDate" id="endDate" name="endDate"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            validators={{
                                                required,  maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".endDate"
                                            show="touched"
                                            messages={{
                                                required: 'Required!',
                                                maxLength: 'Must be 15 characters or less...'
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <hr />
                                
                                <Row className="form-group">
                                    <Col md={6}>
                                        <Button color="danger" id="reset" block type="reset">Reset</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button type="submit" outline block color="success">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                           
                        </CardBody>
                    </Card>
                    </Col>
                    </Row>
                
                </LocalForm>
                
                <Modal isOpen={this.state.isModalOpen} size="lg" toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Packages</ModalHeader>
                        <ModalBody className="text-center">
                            <h4>Nawab The Fitness Empire</h4>
                            <hr />
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Package</th>
                                        <th>Months</th>
                                        <th>Fees</th>
                                        <th>Registration<br/> (One Time Payment)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Package 1</td>
                                        <td>1 months</td>
                                        <td>1000</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>Package 2</td>
                                        <td>3 months</td>
                                        <td>2500</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>Package 3</td>
                                        <td>6 months</td>
                                        <td>4500</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>Package 4</td>
                                        <td>12 months</td>
                                        <td>8000</td>
                                        <td>200</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <hr />
                            <h5>Couples Offers (Blood Relation)</h5>
                            <hr />
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Package</th>
                                        <th>Months</th>
                                        <th>Fees</th>
                                        <th>Registration<br/> (One Time Payment)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Package A</td>
                                        <td>3 months</td>
                                        <td>4000</td>
                                        <td>400</td>
                                    </tr>
                                    <tr>
                                        <td>Package B</td>
                                        <td>6 months</td>
                                        <td>7000</td>
                                        <td>400</td>
                                    </tr>
                                    <tr>
                                        <td>Package C</td>
                                        <td>12 months</td>
                                        <td>12000</td>
                                        <td>400</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            {/* <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button> */}
                        </ModalFooter>
                    </Modal>
                

            </div>
         );
    }
}
 
export default Registration;