import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Label,Table,Row,Col,Button, Badge, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";
import axios from 'axios'
import { Control, LocalForm, Errors } from 'react-redux-form';

import { MDBDataTableV5 } from 'mdbreact';

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

// var checked = {};

class CreateEnquiry extends Component{

    handleClassSubmit = (values) => {
        console.log(values)
        // alert(JSON.stringify(values));

        const token = localStorage.getItem('tokn')
        
        axios.post(`https://gym-erp-backend.herokuapp.com/student/enquiry`,{
                values: JSON.stringify(values),
                user:localStorage.getItem('usr')
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            })
            .then((response) => {
                console.log("Response");
                console.log(response)
                if (response.status === 200 || response.status===304) {
                    console.log("Created");
                    // alert("Created!");
                    store.addNotification({
                        title: "Success!",
                        message: "Enquiry Created Successfully!",
                        type: "success",
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
                    this.props.handleUpdate();
                }
            })
            .catch((e) => {
                // alert("Error! Sorry")
                console.log("Error is -")
                console.log(e)
            } 
        );
    }

    render(){
        return (
            <>
                <CardHeader>Create Enquiry:</CardHeader>
                <hr />
                <CardBody>
                    <LocalForm onSubmit={(values) => this.handleClassSubmit(values)}>
                        <Row className="form-group">
                            <Col md={6}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required! ',
                                        maxLength: 'Must be 15 characters or less...'
                                    }}

                                />
                            </Col>
                        
                            <Col md={6}>
                                <Control.text type="number" model=".mobile" id="mobile" name="mobile"
                                    placeholder="Mobile"
                                    className="form-control"
                                    validators={{
                                        required,  maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".mobile"
                                    show="touched"
                                    messages={{
                                        required: 'Required! ',
                                        maxLength: 'Must be 15 characters or less...'
                                    }}

                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={6}>
                                <Control.input type="date" model=".date" id="date" name="date"
                                    placeholder="Date"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".date"
                                    show="touched"
                                    messages={{
                                        required: 'Required! ',
                                        maxLength: 'Must be 15 characters or less...'
                                    }}

                                />
                            </Col>
                            <Col md={6}>
                                <Control.text model=".type" id="type" name="type"
                                    placeholder="Type of Enquiry"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".type"
                                    show="touched"
                                    messages={{
                                        required: 'Required! ',
                                        maxLength: 'Must be 15 characters or less...'
                                    }}

                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.textarea rows={3} model=".address" id="address" name="address"
                                    placeholder="Address"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".address"
                                    show="touched"
                                    messages={{
                                        required: 'Required! ',
                                        maxLength: 'Must be 15 characters or less...'
                                    }}

                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.textarea rows="4" model=".solution" id="solution" name="solution"
                                    placeholder="Solution"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".solution"
                                    show="touched"
                                    messages={{
                                        required: 'Required! ',
                                        maxLength: 'Must be 15 characters or less...'
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
                </CardBody>
            </>
        );
    }
}

class EditClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            id:this.props.selected._id,
            selected: this.props.selected
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props !== prevProps) {
          this.setState({
            id:this.props.selected._id,
            selected:this.props.selected
          });
        }
      }
    
    render(){
        console.log(this.state.selected)
        return (
            <>
                <CardHeader>Selected Enquiry:</CardHeader>
                <hr />
                <CardBody>
                    <LocalForm>
                        <Row className="form-group">
                            <Col md={6}>
                                <Control.text model=".name" id="name" name="name"
                                    value={this.state.selected.name}
                                    className="form-control"
                                    disabled
                                        />
                            </Col>
                        
                            <Col md={6}>
                                <Control.text type="number" model=".mobile" id="mobile" name="mobile"
                                    placeholder="Mobile"
                                    value={this.state.selected.mobile}
                                    className="form-control"
                                    disabled
                                        />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={6}>
                                <Control.input type="date" model=".date" id="date" name="date"
                                    value={this.state.selected.date}
                                    className="form-control"
                                    disabled
                                        />
                                
                            </Col>
                            <Col md={6}>
                                <Control.text model=".type" id="type" name="type"
                                   value={this.state.selected.type}
                                    className="form-control"
                                    disabled
                                        />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.textarea rows={3} model=".address" id="address" name="address"
                                    value={this.state.selected.address}
                                    className="form-control"
                                    disabled
                                        />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.textarea rows="4" model=".solution" id="solution" name="solution"
                                    value={this.state.selected.solution}
                                    className="form-control"
                                    disabled
                                        />
                            </Col>
                        </Row>
                    </LocalForm>
                </CardBody>
            </>
        );
    }
}

const ShowTable = (props) => {
    const [datatable, setDatatable] = React.useState({
      columns: props.columns,
      rows: props.rows,
    });
    const [checkbox1, setCheckbox1] = React.useState('');
  
    const showLogs2 = (e) => {
      setCheckbox1(e);
      props.handleSelect(e);
      
    };
    
    return (
      <>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={datatable}
          checkbox
          headCheckboxID='id4'
          bodyCheckboxID='checkboxes4'
          getValueCheckBox={(e) => {
            showLogs2(e);
          }}
        />
  
      </>
    );
  }

class ClassTable extends Component{

    constructor(props){
        super(props);
        this.state = {
            data:[],
            isDataReturned:false
        }
    }

    getClassData = async() => {
        const dataReceived = await axios.get(`https://gym-erp-backend.herokuapp.com/student/enquiry/fetch`)
        
        console.log(dataReceived)
        
        this.setState({
            data:dataReceived.data,
            isDataReturned:true
        })
    
    }

    componentWillMount = async() => {
        await this.getClassData();
    }


    async componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
        if (this.props.refresher !== prevProps.refresher) {
            this.setState({
                data:this.props.data,
                isDataReturned:this.props.isDataReturned
            });
            await this.getClassData();
        }
    }

    render(){
        // console.log(this.state.data)
        const columns = [
            {
            label: 'Name',
            field: 'name',
            sort: 'asc'
            
            },
            {
            label: 'Mobile',
            field: 'mobile',
            sort: 'asc'
            
            },
            {
                label: 'Date',
                field: 'date',                
            },
            {
                label: 'Enquiry Type',
                field: 'type'
            }
        ];
        return (
            <>  

                <CardHeader>List of Existing Enquiries:</CardHeader>
                <hr />
                <CardBody>
                    {this.state.isDataReturned ? 
                        <ShowTable handleSelect={this.props.handleSelect} rows={this.state.data} columns={columns}/>
                        : 
                        <>
                            <div className="sweet-loading text-center">
                                <ClipLoader
                                    // css={override}
                                    size={35}
                                    color={"#009dff"}
                                    loading={true}
                                />
                            </div>
                        </>
                    }
                </CardBody>
            </>
        );
    }
}



class Enquiry extends Component {
    // state = {  }
    constructor(props){
        super(props);
        this.state = {
            selected: {},
            refresher:0
        };
    }

    handleSelect = (obj) => {
        this.setState({selected:obj});
    }

    handleUpdate = () => {
        this.setState({
            refresher: this.state.refresher+1,
            selected: {}
        })
    }

    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    {/* <BreadcrumbItem><Link to='/admin/enquiry'>Enquiry</Link></BreadcrumbItem> */}
                    <BreadcrumbItem active>Enquiry</BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                                <Card>
                                    <CreateEnquiry handleUpdate={this.handleUpdate} />
                                </Card>  
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Card>
                                    {JSON.stringify(this.state.selected) !== '{}' ? <EditClass handleUpdate={this.handleUpdate} selected={this.state.selected} /> : <></>}
                                </Card>  
                            </Col>
                        </Row> 
                    </Col>
                    <Col>
                        <Card>
                            <ClassTable refresher={this.state.refresher} 
                                handleSelect={this.handleSelect} 
                                // handleDelete={this.handleDelete} 
                            />
                        </Card>
                    </Col>
                </Row>
                
            </div>
         );
    }
}
 
export default Enquiry;