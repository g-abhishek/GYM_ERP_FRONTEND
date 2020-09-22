import React, { Component } from 'react';
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";
// reactstrap components
import { Card, CardBody, CardFooter, CardTitle, Row, Col, Breadcrumb, BreadcrumbItem, CardHeader } from "reactstrap";
// core components
import { StudentCards } from './Data'
import $ from 'jquery';
import { MDBDataTable, MDBDataTableV5 } from 'mdbreact';
import axios from 'axios'



const Users = [
  {
    Customer_name: "Abhishek",
    mobile: 8830073205,
    package_period: "6",
    Status: "active",
  },
  {
    Customer_name: "Firoz",
    mobile: 5698236471,
    package_period: "2",
    Status: "active",
  },
  {
    Customer_name: "Nasim",
    mobile: 8830073205,
    package_period: "6",
    Status: "active",
  },
  {
    Customer_name: "Rahul",
    mobile: 8830073205,
    package_period: "6",
    Status: "active",
  },
  {
    Customer_name: "Abhhek",
    mobile: 8830073205,
    package_period: "6",
    Status: "active",
  },
  {
    Customer_name: "Ravi",
    mobile: 8830073205,
    package_period: "5",
    Status: "active",
  },
  {
    Customer_name: "Suraj",
    mobile: 8830073205,
    package_period: "6",
    Status: "active",
  },
  {
    Customer_name: "Abdul",
    mobile: 8830073205,
    package_period: "6",
    Status: "active",
  },
]


function WithCheckBoxesEnd(props) {

  const [datatable, setDatatable] = React.useState({
    columns: props.columns,
    rows: props.rows
  });


  const [checkbox1, setCheckbox1] = React.useState('');

  const showLogs2 = (e) => {
    setCheckbox1(e);
  };

  //   $(document).ready(function () {

  //     $("thead:not([data-test*='table-foot'])").remove()
  // });

  return (
    <>
      <MDBDataTable
        // striped
        hover
        bordered
        small
        data={datatable}
      />
      {/* <MDBDataTableV5
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
        // checkboxFirstColumn
        // proCheckboxes
        // filledCheckboxes
        // proSelect
      /> */}

      <div> {checkbox1 && <p>{JSON.stringify(delete checkbox1.checkbox && checkbox1)}</p>}</div>
      {console.log(checkbox1)}
    </>
  );
}

class StudentHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isDataReturned: false
    }
  }

  getClassData = async () => {
    const dataReceived = await axios.get(`https://gym-erp-backend.herokuapp.com/student/registrations/fetch`)

    console.log(dataReceived)



    let rowsData = []
    for (var index = 0; index < dataReceived.data.length; index++) {
      let rowItem = dataReceived.data[index]
      const id = dataReceived.data[index]._id

      rowItem["profile"] = <Link to={`/admin/customers/${id}`}>View</Link>
      rowsData.push(rowItem)

    }
    console.log(rowsData)

    this.setState({
      data: rowsData,
      isDataReturned: true

    })

  }

  componentWillMount = async () => {
    await this.getClassData();
  }

  componentDidMount() {

    var x = document.getElementsByTagName("tr");
    console.log(x)
    $(x).click(function (e) {
      console.log(e.target);
    })


    // $(document).ready(function(){
    //   do
    // })
  }


  render() {

    const columns = [
      {
        label: 'Sr No.',
        field: 'urn',
        sort: 'asc'

      },
      {
        label: 'Name',
        field: 'customerName',
        sort: 'asc'

      },
      {
        label: 'Contact',
        field: 'contact',
        sort: 'asc'
      },
      {
        label: 'Batch',
        field: 'batch',
        sort: 'asc'
      },
      {
        label: 'Profile',
        field: 'profile'
      }
    ];

    return (
      <>
        <div className="content">
          <div>
            <Breadcrumb>
              <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Customers</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <Card>
            <CardHeader>
              <h4 className="mt-3 mb-0">Customers</h4>
            </CardHeader>
            <CardBody>
              {this.state.isDataReturned ? <WithCheckBoxesEnd columns={columns} rows={this.state.data} /> : ""}

            </CardBody>
          </Card>
          <hr />

        </div>
      </>
    );
  }
}

export default StudentHome;