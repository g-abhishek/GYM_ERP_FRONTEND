import React, { Component } from 'react';
import { Card,CardHeader,CardBody,Alert,CardTitle,Row,Col,Button, Badge, Breadcrumb, BreadcrumbItem, Label,Modal,ModalHeader, ModalBody,ModalFooter, Table} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';
import $ from 'jquery'
import BarChart from 'react-bar-chart';
import { MDBDataTableV5 } from 'mdbreact';

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { appendText } from 'gulp-append-prepend';
// const override = css`
//   filter: blur(-3px);
  
// `;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

const data = [
    {text: 'Initial', value: 500}, 
    {text: 'Final', value: 300} 
  ];
   
  const margin = {top: 20, right: 20, bottom: 30, left: 50};
   
  class Example extends Component {
    constructor(props){
        super(props);
        this.state={
            width: 350
        }
    }

    componentDidMount = () => {
        // window.onresize = () => {
        //  this.setState({width: this.refs.root.offsetWidth}); 
        // };
    }
    handleBarClick=(element, id)=>{ 
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }
    render() {
        return (
            <div ref='root'>
                {/* <div style={{width: '50%'}}>  */}<hr />
                <Alert color="success"><h6>Checkout the improvements here:</h6></Alert>
                <Row>
                    
                    <Col md={6}>
                        <Card>
                            <CardHeader>Progress <Badge color="primary">(Height)</Badge>:</CardHeader><hr />
                            <CardBody>
                                <BarChart ylabel='Feet' style={{width:'70%'}}
                                    width={this.state.width}
                                    height={300}
                                    margin={margin}
                                    data={
                                        [
                                            {text: 'Initial', value: this.props.data.height2}, 
                                            {text: 'Final', value: this.props.data.height} 
                                        ]
                                    }
                                    onBarClick={this.handleBarClick}/>

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <CardHeader>Progress <Badge color="info">(Weight)</Badge>:</CardHeader><hr />
                            <CardBody>
                                <BarChart ylabel='Kg(s)'
                                    width={this.state.width}
                                    height={300}
                                    margin={margin}
                                    data={
                                        [
                                            {text: 'Initial', value: this.props.data.weight2}, 
                                            {text: 'Final', value: this.props.data.weight} 
                                        ]
                                    }
                                    onBarClick={this.handleBarClick}/>

                            </CardBody>
                        </Card>
                    </Col>
                        
                </Row>
                <Alert color="danger"><h6>Work hard in silence, let your success make noice!</h6></Alert>
                {/* </div> */}
            </div>
        );
      }
  }
   

class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:this.props.match.params.id,
            src : require('./../../assets/img/default-avatar.png'),
            selectedFile:null,
            data: [],
            isDataReturned: false,
            package_amount: 0,
            otp:0,
            height:0,
            height2:0,
            weight:0,
            weight2:0,
            isModalOpen: false,
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

    getData = async() => {
        const dataReceived = await axios.get(`https://gym-erp-backend.herokuapp.com/student/fetch/${this.state.id}`);
        
        
        console.log(dataReceived)
        
        this.setState({
            data:dataReceived.data,
            package_amount:dataReceived.data.amount,
            otp:dataReceived.data.otp,
            isDataReturned:true,
            height: dataReceived.data.height,
            height2: dataReceived.data.height2,
            weight: dataReceived.data.weight, 
            weight2: dataReceived.data.weight2,
        })

        if(dataReceived.data.picture){
            this.setState({
                src: dataReceived.data.picture
            })
        }
        // console.log()
    }
    async componentDidMount(){
        await this.getData();
    }

    handleImageUpload = (e) => {
        e.preventDefault();
        this.setState({
            src: URL.createObjectURL(e.target.files[0]),
            selectedFile: e.target.files[0]
        });
        console.log(e.target.files[0])
    }

    handleUpdate = (values) => {
        console.log(values)
        alert("Updating to - " + JSON.stringify(values))

        var picture = (values.picture!==undefined);
        
        console.log(picture)

        if(picture){
            console.log(values)
            // alert(JSON.stringify(values))
            console.log("checksd")

            const formData = new FormData();
            formData.append("values", JSON.stringify(values));
            
            formData.append("amount", this.state.package_amount);
            formData.append("otp", this.state.otp);
            formData.append("file", this.state.selectedFile);
            formData.append("user", localStorage.getItem('usr'));

            axios.post(`https://gym-erp-backend.herokuapp.com/student/update/picture/${this.state.id}`, formData, {
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
                    store.addNotification({
                        title: "Success!",
                        message: "Profile Updated Successfully!",
                        type: "default",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                        duration: 2000,
                        onScreen: true
                        }
                    });
                    document.getElementById('picture').value = '';
                }
            }).catch((error) => {
                console.log("error");
                console.log(error)
            })
        }else{
            axios.post(`https://gym-erp-backend.herokuapp.com/student/update/${this.state.id}`,  
            {
                values:JSON.stringify(values),
                amount: this.state.package_amount,
                otp: this.state.otp
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('tokn')}`
                    }
                }
            ).then((response) => {
                console.log("Response");
                console.log(response)
                if (response.status === 200 || response.status===304) {
                    console.log("Update Success");
                    // alert("Update success!");
                    store.addNotification({
                        title: "Success!",
                        message: "Profile Updated Successfully!",
                        type: "default",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                        duration: 2000,
                        onScreen: true
                        }
                    });
                    // window.location.reload();
                    // this.props.handleUpdate();
                }
            }).catch((e) => {
                // alert("Error! Sorry")
                console.log("Error is -")
                console.log(e)
            });
        }

        
    }

    handleDelete = async() => {
        // alert("Deleting " + JSON.stringify(this.state))
        var result = window.confirm("Are you sure to delete selected user?"); 
        if (result === true) { 
            
            axios.delete(`https://gym-erp-backend.herokuapp.com/student/delete/${this.state.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('tokn')}`
                    }
                }
            ).then((response) => {
                console.log("Response");
                console.log(response)
                if (response.status === 200 || response.status===304) {
                    console.log("Del Success");
                    // alert("Del success!");
                    store.addNotification({
                        title: "Success!",
                        message: "Profile Deleted Successfully!",
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                          duration: 2000,
                          onScreen: true
                        }
                      });
                    // window.location.reload();
                    // this.props.handleUpdate();
                    window.location.href="/admin/customers";
                }
            }).catch((e) => {
                // alert("Error! Sorry")
                console.log("Error is -")
                console.log(e)
            });
           
        } else { 
            alert("Cancelled!"); 
        } 
    }

    onSelectedOption =(e)=>{
        this.setState({
            package_amount: parseInt($(e.target.options[e.target.selectedIndex]).attr("data-amount")),
            otp: $(e.target.options[e.target.selectedIndex]).attr("data-otp"),
        })
    }

    handleBarClick = (element, id) => { 
        console.log(`The bin ${element.text} with id ${id} was clicked`);
    }

    render() { 

        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/admin/customers'>Customer</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Profile</BreadcrumbItem>
                </Breadcrumb>
                {this.state.isDataReturned? 
                <LocalForm onSubmit={(values) => this.handleUpdate(values)}>
                <Row>

                    <Col md={3}>
                        <Row>
                            <Col md={12}>
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
                                                    
                                                />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col>
                                <Button block color="primary" href="#progress">View Progress</Button>
                            </Col>
                            
                        </Row>
                       
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
                                            // value={this.state.data.customerName}
                                            defaultValue={this.state.data.customerName}
                                            className="form-control"
                                            
                                        />
                                    
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".fathersName" id="fathersName" name="fathersName"
                                            placeholder="Fathers Name" 
                                            defaultValue={this.state.data.fathersName}  
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".email" id="email" name="email"
                                            placeholder="Email"   
                                            defaultValue={this.state.data.email} 
                                            className="form-control"
                                            validators={{
                                                validEmail
                                            }}
                                        />
                                        <Errors 
                                            className="text-danger"
                                            model=".email"
                                            show="touched"
                                            messages={{
                                                validEmail:'Invalid Email'
                                            }}

                                        />
                                    </Col>
                                
                                </Row>
                                <Row className="form-group">
                                    <Col md={3}>
                                        <Control.text type="number" model=".urn" id="urn" name="urn"
                                            placeholder="Serial No."
                                            defaultValue={this.state.data.urn} 
                                            className="form-control"
                                           
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <Control.text type="number" model=".contact" id="contact" name="contact"
                                            placeholder="Contact No."
                                            defaultValue={this.state.data.contact} 
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Control.text model=".fitnessGoal" id="fitnessGoal" name="fitnessGoal"
                                            placeholder="Fitness Goal"
                                            defaultValue={this.state.data.fitnessGoal} 
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} style={{fontSize:"1.2em"}}>Joining Date:</Label>
                                    {console.log((this.state.data.joiningDate).substring(0,10))}
                                    <Col md={3}>
                                        <Control.text type="date" model=".joiningDate" id="joiningDate" name="joiningDate"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            defaultValue={(this.state.data.joiningDate).substring(0,10)}
                                            
                                        />
                                    </Col>
                                    <Label md={3} style={{fontSize:"1.2em"}}>Date Of Birth:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".dob" id="dob" name="dob"
                                            // placeholder="Unique Reg. No."
                                            className="form-control"
                                            defaultValue={(this.state.data.dob).substring(0,10)}
                                           
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    
                                    <Col md={3}>
                                        <Control.select model=".gender" id="gender" name="gender"
                                            // placeholder="Unique Reg. No."
                                            defaultValue="male"
                                            defaultValue={this.state.data.gender} 
                                            className="form-control"
                                            
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </Control.select>
                                        
                                    </Col>
                                    <Col>
                                        <Control.textarea model=".address" id="address" name="address"
                                            placeholder="Residential Address"
                                            defaultValue={this.state.data.address} 
                                            className="form-control"
                                            rows={3}
                                            
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
                                            defaultValue={this.state.data.dietPlan} 
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".nutrients" id="nutrients" name="nutrients"
                                            placeholder="Nutrients/Vitamins"   
                                            defaultValue={this.state.data.nutrients} 
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text model=".batch" id="batch" name="batch"
                                            placeholder="Batch"   
                                            defaultValue={this.state.data.batch} 
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={4}>
                                        <Control.text type="number" model=".weight" id="weight" name="weight"
                                            placeholder="Weight"   
                                            defaultValue={this.state.data.weight}
                                            className="form-control"
                                            
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Control.text type="number" model=".height" id="height" name="height"
                                            placeholder="Height" 
                                            defaultValue={this.state.data.height}  
                                            className="form-control"
                                            
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
                                                defaultValue={this.state.data.package}
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
                                            defaultValue={this.state.data.amount}
                                            value={this.state.package_amount}
                                            className="form-control"
                                            

                                        />
                                    </Col>
                                    <Col md={4}>
                                    <Control.text type="number" model=".otp" id="otp" name="otp"
                                            placeholder="OTP"   
                                            defaultValue={this.state.data.otp}
                                            value={this.state.otp}
                                            className="form-control"
                                            

                                        />
                                    </Col>
                                    
                                </Row>
                                <Row className="form-group">
                                    <Label md={3} style={{fontSize:"1.2em"}}>Start Date:</Label>
                                    <Col md={3}>
                                        <Control.text type="date" model=".startDate" id="startDate" name="startDate"
                                            // placeholder="Unique Reg. No."
                                            defaultValue={(this.state.data.startDate).substring(0,10)}
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
                                            defaultValue={(this.state.data.endDate).substring(0,10)}
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
                                
                                <Row className="form-group">
                                    <Col md={6}>
                                        <Button color="danger" block onClick={this.handleDelete}>Delete</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button type="submit" outline block color="success">
                                            Update
                                        </Button>
                                    </Col>
                                </Row>
                           
                        </CardBody>
                    </Card>
                    </Col>
                    </Row>
                    <Row id="progress">
                        <Col>
                            <Example data={this.state.data} />
                            
                        </Col>
                    </Row>
                
                </LocalForm>
                :<></>}
                
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
 
export default ProfilePage;