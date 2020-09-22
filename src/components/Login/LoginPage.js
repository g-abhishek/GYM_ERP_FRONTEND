import React, { Component } from "react";
import axios from 'axios'

import {Control, LocalForm, Errors } from 'react-redux-form';
//import { Link } from 'react-router-dom';
import {Button,  Card,  CardBody,  CardGroup,  Col,  Container, Row } from "reactstrap";

const required = (val) => val && val.length;



class LoginPage extends Component {

  handleSubmit = (values) => {
      // alert(JSON.stringify(values))

      axios.post(`https://gym-erp-backend.herokuapp.com/signIn`,{
            email: values.email,
            password: values.password
        })
        .then(response => {

            console.log("Response is - ")
            console.log(response)
            
                if(response.status!== 401 && response.status !== 400 ){
                   
                    if(response.data.user.email) { 
                        console.log(response.data);
                        // console.log("Token is " + response.data.token)
                        localStorage.setItem('tokn', response.data.token)
                        localStorage.setItem('usr',JSON.stringify(response.data.user))
                        if(response.data.user.role === 1){
                          window.location.href='/'
                        }else{
                          window.location.href='/'
                        }

                    }
                }

        }).catch(function(err){      
            console.log("catch err is ");
            console.log(err)  
            alert("Invalid Credentials.Please try Again!");
     
   });

  }


  render() {
    return (
      <div className="app login-page flex-row align-items-center" style={{paddingTop:"50px"}}>
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-3" style={{border:"2px solid #51cbce"}}>
                  <CardBody>
                      <h3>GYM-ERP Login</h3><hr style={{border:"1px solid #51cbce"}}/>
                      <p className="">Please Sign In to your account:</p>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.text model=".email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger"
                                        show="touched"
                                        model=".email"
                                        messages={{
                                            required: 'This is a Required Field!'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.password model=".password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required
                                        }} 
                                    />
                                    <Errors 
                                        className="text-danger"
                                        show="touched"
                                        model=".password"
                                        messages={{
                                            required: 'This is a Required Field!'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="outline-primary">
                                        Submit
                                    </Button>
                                </Col>
                                
                            </Row>
                        </LocalForm>
                     
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginPage;