import React, { Component, Fragment } from 'react';
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer'
import Invoice from './reports/Invoice'
import ReactPDF from '@react-pdf/renderer';
import { BlobProvider } from '@react-pdf/renderer'
import NewWindow from 'react-new-window'
// import InvoiceData from './data/InvoiceData'

// import logo from './logo.svg';
// import './App.css';

const invoiceData = {
    id: "5df3180a09ea16dc4b95f910",
    invoice_no: "201906-28",
    balance: "$2,283.74",
    company: "MANTRIX",
    email: "susanafuentes@mantrix.com",
    phone: "+1 (872) 588-3809",
    address: "922 Campus Road, Drytown, Wisconsin, 1986",
    trans_date: "2019-09-12",
    due_date: "2019-10-12",
    items: [
      {
        sno: 1,
        desc: "ad sunt culpa occaecat qui",
        qty: 5,
        rate: 405.89,
      },
      {
        sno: 2,
        desc: "cillum quis sunt qui aute",
        qty: 5,
        rate: 373.11,
      },
      {
        sno: 3,
        desc: "ea commodo labore culpa irure",
        qty: 5,
        rate: 458.61,
      },
      {
        sno: 4,
        desc: "nisi consequat et adipisicing dolor",
        qty: 10,
        rate: 725.24,
      },
      {
        sno: 5,
        desc: "proident cillum anim elit esse",
        qty: 4,
        rate: 141.02,
      },
    ],
  };

class App extends Component {

  MyDocd = (
    // <Fragment>
    //     <PDFViewer width="1000" height="600" className="app" >
            <Invoice invoice={invoiceData}/>
    //     </PDFViewer>
    // </Fragment>
  );

  printReceipt() {
    window.print();
  }

  render() {
    const MyDoc = (
        // <Fragment>
        //     <PDFViewer width="1000" height="600" className="app" >
                <Invoice invoice={invoiceData}/>
        //     </PDFViewer>
        // </Fragment>
      );
    const MyDocNew = (
        <NewWindow>
            <PDFViewer width="1000" height="600" className="app" >
                <Invoice invoice={invoiceData}/>
            </PDFViewer>
      </NewWindow>
      );
    return (

      <div style={{marginTop:"100px"}}>
      <PDFViewer width="100%" style={{minHeight:"100vh"}} className="app" >
        <Invoice invoice={invoiceData}/>
      </PDFViewer>
  </div>

        // <Fragment>
        //     <PDFViewer width="1000" height="600" className="app" >
        //       <Invoice invoice={invoiceData}/>
        //     </PDFViewer>
        // </Fragment>

      //   <NewWindow>
      //       <PDFViewer width="1000" height="600" className="app" >
      //           <Invoice invoice={invoiceData}/>
      //       </PDFViewer>
      // </NewWindow>


        // <button class="hide-on-print" onClick={this.printReceipt}>Print</button>
        //open in new tab
        // <BlobProvider document={MyDoc}>
        //   {({ url }) => (
        //     <a className="button" href={url} target="_blank" rel="noopener noreferrer">
        //       Open in New Tab
        //     </a>
        //   )}
        // </BlobProvider>




        // <div>
        //   <PDFDownloadLink document={MyDoc} fileName="somename.pdf">
        //       {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
        //   </PDFDownloadLink>
        // </div>
    );
  }
}
export default App;
