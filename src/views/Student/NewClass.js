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

class CreateClass extends Component{

    handleClassSubmit = (values) => {
        // alert(JSON.stringify(values));
        const token = localStorage.getItem('tokn')
        
        axios.post(`https://gym-erp-backend.herokuapp.com/student/newclass`,{
                className: values.className,
                strength: values.strength,
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
                        message: "Class Created Successfully!",
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
                <CardHeader>Create a New Class:</CardHeader>
                <hr />
                <CardBody>
                    <LocalForm onSubmit={(values) => this.handleClassSubmit(values)}>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.text model=".className" id="className" name="className"
                                    placeholder="Class Name"
                                    className="form-control"
                                    validators={{
                                        required, maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".className"
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
                                <Control.text type="number" model=".strength" id="strength" name="strength"
                                    placeholder="Strength"
                                    className="form-control"
                                    validators={{
                                        required,  maxLength: maxLength(15)
                                    }}
                                        />
                                <Errors 
                                    className="text-danger"
                                    model=".className"
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
            className:this.props.selected.className,
            strength: this.props.selected.strength
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props !== prevProps) {
          this.setState({
            id:this.props.selected._id,
            className: this.props.selected.className,
            strength: this.props.selected.strength
          });
        }
      }
    handleClassUpdate = (values) => {
        // alert("Updating to - " + JSON.stringify(values))
        axios.put(`https://gym-erp-backend.herokuapp.com/student/class/update/${this.state.id}`,
            {
                strength:values.strength
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('tokn')}`
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
                    message: "Class Updated Successfully!",
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
                this.props.handleUpdate();
            }
        }).catch((e) => {
            // alert("Error! Sorry")
            console.log("Error is -")
            console.log(e)
        });
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value})
    }
    handleDelete = async() => {
        // alert("Deleting " + JSON.stringify(this.state))
        var result = window.confirm("Are you sure to delete selected Class?"); 
        if (result === true) { 
            
            axios.delete(`https://gym-erp-backend.herokuapp.com/student/class/delete/${this.state.id}`,
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
                        message: "Class Deleted Successfully!",
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
                    this.props.handleUpdate();
                }
            }).catch((e) => {
                // alert("Error! Sorry")
                console.log("Error is -")
                console.log(e)
            });
           
        } else { 
            // alert("Cancelled!"); 
        } 
    }
    render(){
        return (
            <>
                <CardHeader>Update/Delete selected Class:</CardHeader>
                <hr />
                <CardBody>
                    <LocalForm onSubmit={(values) => this.handleClassUpdate(values)}>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.text model=".className" id="className" name="className"
                                    value={this.state.className}
                                    className="form-control"
                                    disabled
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.text type="number" model=".strength" id="strength" name="strength"
                                    value={this.state.strength}
                                    onChange={this.handleChange}
                                    className="form-control"
                                    validators={{
                                        required,  maxLength: maxLength(15)
                                    }}
                                />
                                <Errors 
                                    className="text-danger"
                                    model=".className"
                                    show="touched"
                                    messages={{
                                        required: 'Required! Not updated..',
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
        const dataReceived = await axios.get(`https://gym-erp-backend.herokuapp.com/student/class/fetch`)
        
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
            label: 'ClassName',
            field: 'className',
            sort: 'asc'
            
            },
            {
            label: 'Strength',
            field: 'strength',
            sort: 'asc'
            
            }
        ];
        return (
            <>  

                <CardHeader>List of Existing Classes:</CardHeader>
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



class NewClass extends Component {
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
                    <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem>
                    <BreadcrumbItem active>New Class</BreadcrumbItem>
                </Breadcrumb>

                <Row>
                    <Col md={4}>
                        <Row>
                            <Col md={12}>
                                <Card>
                                    <CreateClass handleUpdate={this.handleUpdate}/>
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
                            <ClassTable refresher={this.state.refresher} handleSelect={this.handleSelect} handleDelete={this.handleDelete} />
                        </Card>
                    </Col>
                </Row>
                
            </div>
         );
    }
}
 
export default NewClass;