import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col,Button, Badge, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";

class User extends Component {
    // state = {  }
    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem>
                    <BreadcrumbItem active>User Login/SignUp</BreadcrumbItem>
                </Breadcrumb>
            </div>
         );
    }
}
 
export default User;