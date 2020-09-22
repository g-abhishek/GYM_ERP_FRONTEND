import React, { Component } from 'react';
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';
// reactstrap components
import { Card,CardBody,Button, Modal,ModalHeader, ModalBody,ModalFooter,Label,Row,Col, Breadcrumb, BreadcrumbItem, CardHeader} from "reactstrap";
// core components
import {StudentCards} from './Data'
import $ from 'jquery';



const required = (val) => val && val.length;

const Users = [
  {
    Customer_name: "Binod",
    mobile: 8830073205,
    package_period:"6",
    Status: "active",
  },
  {
    Customer_name: "Firoz",
    mobile: 5698236471,
    package_period:"2",
    Status: "active",
  },
  {
    Customer_name: "Vinay",
    mobile: 8830073205,
    package_period:"6",
    Status: "active",
  },
  {
    Customer_name: "Rahul",
    mobile: 8830073205,
    package_period:"6",
    Status: "active",
  },
  {
    Customer_name: "Abhhek",
    mobile: 8830073205,
    package_period:"6",
    Status: "active",
  },
  {
    Customer_name: "Prashant",
    mobile: 8830073205,
    package_period:"5",
    Status: "active",
  },
  {
    Customer_name: "Suraj",
    mobile: 8830073205,
    package_period:"6",
    Status: "active",
  },
  {
    Customer_name: "Abdul",
    mobile: 8830073205,
    package_period:"6",
    Status: "active",
  },
]

class StaffHome extends Component {

  constructor(props){
          super(props);
          this.state = {
              isModalOpen: false,
              isDataRetured: false
          }
      }
      
      toggleModal = () =>{
          this.setState({isModalOpen: !this.state.isModalOpen})
      }
  
      // fetchVacancy = async() => {
      //     const response = await axios.get(`http://${window.location.hostname}:5555/teacher/vacancy/fetch`);
      //     console.log(response.data);
  
      //     this.setState({
      //         data: response.data,
      //         isDataRetured: true
      //     })
      // }
  
      // componentDidMount = async() => {
      //     await this.fetchVacancy();
      // }
  
      handleVacancySubmit = (values) => {
          // alert(JSON.stringify(values));
          console.log(values)
  
          const token = localStorage.getItem('tokn')
          
          // axios.post(`http://${window.location.hostname}:5555/teacher/vacancy`,values, 
          //     {
          //         headers: {
          //             'Authorization': `Bearer ${token}` 
          //         }
          //     })
          //     .then((response) => {
          //         console.log("Response");
          //         console.log(response)
          //         if (response.status === 200 || response.status===304) {
          //             console.log("Created");
  
          //             //handle refresh
          //             this.setState({
          //                 isDataRetured: false
          //             });
          //             this.fetchVacancy();
  
          //             this.toggleModal();
          //             alert("Created!");
          //         }
          //     })
          //     .catch((e) => {
          //         alert("Error! Sorry")
          //         console.log("Error is -")
          //         console.log(e)
          //     } )
      }


  componentDidMount(){
    $(document).ready(function () {
      console.log('yes')
      $("#myInput").on("keyup", function (){
          console.log('keyup')
          var value = $(this).val().toLowerCase();
          $("#myTable tr").filter(function () {
              $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
          });
      });
  });

  // $(document).ready(function () {
  //   $('#dtBasicExample').DataTable();
  //   $('.dataTables_length').addClass('bs-select');
  // });

  }

    render() {

    //   const activeDot = (
    //     <p className="activeDot text-center mb-0">&#9679;</p>
    // )
    // const inActiveDot = (
    //     <p className="inActiveDot text-center mb-0">&#9679;</p>
    // )

        return (
          <>
            <div className="content">
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Staffs</BreadcrumbItem>
                    </Breadcrumb>
                    

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Add Vacancy:</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleVacancySubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Control.text model=".postName" id="postName" name="postName"
                                            placeholder="Post Name"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                                />
                                        <Errors 
                                            className="text-danger"
                                            model=".postName"
                                            show="touched"
                                            messages={{
                                                required: 'Required! '
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Control.text model=".eligibility" id="eligibility" name="eligibility"
                                            placeholder="Eligibility"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                                />
                                        <Errors 
                                            className="text-danger"
                                            model=".eligibility"
                                            show="touched"
                                            messages={{
                                                required: 'Required! '
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Control.text model=".salary" id="salary" name="salary"
                                            placeholder="Scale of Pay or Salary"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                                />
                                        <Errors 
                                            className="text-danger"
                                            model=".salary"
                                            show="touched"
                                            messages={{
                                                required: 'Required! '
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Control.text model=".department" id="department" name="department"
                                            placeholder="Department or College Name"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                                />
                                        <Errors 
                                            className="text-danger"
                                            model=".department"
                                            show="touched"
                                            messages={{
                                                required: 'Required! '
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label md={6} htmlFor="startDate" style={{fontSize:"1.0em"}}>Start Date of Applying:</Label>
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
                                    <Label md={6} htmlFor="endDate" style={{fontSize:"1.0em"}}>End Date of Applying:</Label>
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
                                    <Col md={12}>
                                        <Control.text type="number" model=".vacancy" id="vacancy" name="vacancy"
                                            placeholder="Number of Vacancy"
                                            className="form-control"
                                            validators={{
                                                required
                                            }}
                                                />
                                        <Errors 
                                            className="text-danger"
                                            model=".vacancy"
                                            show="touched"
                                            messages={{
                                                required: 'Number Required! '
                                            }}

                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col>
                                        <Button type="submit" outline block color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                        <ModalFooter>
                            {/* <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button> */}
                        </ModalFooter>
                    </Modal>

                </div>

            <Card>
              <CardHeader>
                <h4 className="mt-3 mb-0">Staffs:</h4>
                <Button onClick={this.toggleModal} style={{position:"absolute", top:"0", right:"5px"}} outline color="primary">
                    <div className="d-block d-sm-block d-md-none">
                        <span style={{fontSize:"18px"}} className="fas fa-plus-circle"></span> {" "} &nbsp;
                    </div>
                    <div className="d-none d-sm-none d-md-block">
                        <span style={{fontSize:"18px"}} className="fas fa-plus-circle"></span> {" "} &nbsp;
                        <span className="">Add Staff</span>
                    </div>
                </Button>
              </CardHeader>
              <CardBody>
                <div className="users mt-3 animated fadeIn">
                  <div className="search-input w-25 float-right mb-2">
                      <input className="form-control" id="myInput" type="text" placeholder="Search.." />
                  </div>                
                  <br/>
                  <table className="table table-striped table-bordered table-sm" id="dtBasicExample" cellspacing="0" width="100%">
                      <thead>                        
                      <tr>
                          <th>Sr no.</th>
                          <th>Name</th>
                          <th>Mobile</th>
                          <th>Since</th>
                          <th>Status</th>
                          <th>Edit</th>
                      </tr>
                      </thead>
                      <tbody id="myTable">
                          {Users.map((user, index) => {
                              return ( <tr>
                                  <td>{index+1}</td>
                                  <td>{user.Customer_name}</td>
                                  <td>{user.mobile}</td>
                                  <td>{user.package_period} Months</td>
                                  <td>{user.Status}</td>
                                  <td><Link to={"/edit/"+user._id} >edit</Link></td>
                              </tr>);
                          })}
                      </tbody>
                  </table>
              </div>
              </CardBody>
            </Card>


              {/* <Row>
              
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
              
            </div>
          </>
        );
      }
    }
 
export default StaffHome;