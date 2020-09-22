import React, { Component } from 'react';
import { Card,CardHeader,CardBody,CardFooter,CardTitle,Row,Col,Button, Badge, Breadcrumb, BreadcrumbItem} from "reactstrap";
import { Link } from "react-router-dom";

class AdmissionForm extends Component {
    // state = {  }
    render() { 
        return ( 
            <div className="content">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/admin/student'>Student</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Admission Form</BreadcrumbItem>
                </Breadcrumb>

                <Col md={3}>
                    <Card>
                        <CardHeader>Admission Form Download:</CardHeader>
                        <hr />
                        <CardBody>
                            <p>
                                Admission Form1: {' '}<Button color="primary" outline href={require('./../../assets/pdf/PaymentReceipt.pdf')} download>Download</Button>
                            </p>
                            <p>
                                Admission Form2: {' '}<Button color="primary" outline href={require('./../../assets/pdf/PaymentReceipt.pdf')} download>Download</Button>
                            </p>
                            <p>
                                Admission Form3: {' '}<Button color="primary" outline href={require('./../../assets/pdf/PaymentReceipt.pdf')} download>Download</Button>
                            </p>
                        </CardBody>
                    </Card>
                </Col>
            </div>
         );
    }
}
 
export default AdmissionForm;