import Dashboard from "views/Dashboard.js";
import Contact from "views/Contact.js";
import UserManual from "views/UserManual";
import StudentHome from './views/Student/StudentHome'
import NewClass from './views/Student/NewClass'
import User from './views/Student/User'
import Registration from './views/Student/Registration'
import ProfilePage from './views/Student/ProfilePage'
import AdmissionForm from './views/Student/AdmissionForm'
import AdmissionReports from './views/Student/AdmissionReports'
import Records from './views/Student/Records'
import AlreadyAdmissions from './views/Student/AlreadyAdmissions.js'
import LeaveManagement from './views/Student/LeaveManagement.js'
import IdCard from './views/Student/IdCard.js'
import Enquiry from "views/Student/Enquiry";
import StaffHome from "views/Student/StaffHome";
import InvoiceLayout from 'views/InvoiceComponent/App'

export var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },{
    path: "/registration",
    name: "Registration",
    icon: "nc-icon nc-book-bookmark",
    component: Registration,
    layout: "/admin",
  },{
    path: "/fee-slip",
    name: "Fee Slip",
    icon: "nc-icon nc-book-bookmark",
    component: InvoiceLayout,
    layout: "/admin",
  },{
    path: "/already-admissions",
    name: "Already Admissions Control Portal",
    icon: "nc-icon nc-book-bookmark",
    component: AlreadyAdmissions,
    layout: "/admin",
  },
  {
    path: "/user-manual",
    name: "User Guide",
    icon: "nc-icon nc-paper",
    component: UserManual,
    layout: "/admin",
  },
  {
    path: "/enquiry",
    name: "Enquiry",
    icon: "nc-icon nc-chat-33",
    component: Enquiry,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "nc-icon nc-satisfied",
    component: StudentHome,
    layout: "/admin",
  },
  ,
  {
    path: "/staff",
    name: "Staff",
    icon: "nc-icon nc-circle-10",
    component: StaffHome,
    layout: "/admin",
  },
  {
    path: "/student/newclass",
    name: "New Class Design",
    icon: "nc-icon nc-book-bookmark",
    component: NewClass,
    layout: "/admin",
  },
  {
    path: "/student/signup-login",
    name: "User Login/Signup",
    icon: "nc-icon nc-book-bookmark",
    component: User,
    layout: "/admin",
  },
  
  {
    path: "/student/admission-form",
    name: "Admission Form",
    icon: "nc-icon nc-book-bookmark",
    component: AdmissionForm,
    layout: "/admin",
  },
  {
    path: "/student/admission-reports",
    name: "Admission Reports",
    icon: "nc-icon nc-book-bookmark",
    component: AdmissionReports,
    layout: "/admin",
  },
  {
    path: "/student/records",
    name: "Records",
    icon: "nc-icon nc-book-bookmark",
    component: Records,
    layout: "/admin",
  },
  
  {
    path: "/student/leave",
    name: "Leave Management Portal",
    icon: "nc-icon nc-book-bookmark",
    component: LeaveManagement,
    layout: "/admin",
  },
  {
    path: "/student/idcard",
    name: "Id Card Generation Portal",
    icon: "nc-icon nc-book-bookmark",
    component: IdCard,
    layout: "/admin",
  },
       
  {
    path: "/account",
    name: "Account",
    icon: "nc-icon nc-chart-bar-32",
    component: UserManual,
    layout: "/admin",
  },{
    path: "/dues",
    name: "Dues",
    icon: "nc-icon nc-alert-circle-i",
    component: UserManual,
    layout: "/admin",
  },{
    path: "/fees",
    name: "Fees",
    icon: "nc-icon nc-tap-01",
    component: UserManual,
    layout: "/admin",
  },{
    path: "/penalty",
    name: "Penalty",
    icon: "nc-icon nc-money-coins",
    component: UserManual,
    layout: "/admin",
  },{
    path: "/customers/:id",
    name: "Profile",
    icon: "nc-icon nc-money-coins",
    component: ProfilePage,
    layout: "/admin",
  },
  // {
  //   path: "/customers/:id/progress",
  //   name: "Progress",
  //   icon: "nc-icon nc-money-coins",
  //   component: ProgressPage,
  //   layout: "/admin",
  // }
  
  
];



export var sidebarRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/registration",
    name: "Registration",
    icon: "nc-icon nc-book-bookmark",
    component: Registration,
    layout: "/admin",
  },
  // {
  //   path: "/user-manual",
  //   name: "User Guide",
  //   icon: "nc-icon nc-paper",
  //   component: UserManual,
  //   layout: "/admin",
  // },
  {
    path: "/enquiry",
    name: "Enquiry",
    icon: "nc-icon nc-chat-33",
    component: Enquiry,
    layout: "/admin",
  },{
    path: "/fee-slip",
    name: "Fee Slip",
    icon: "nc-icon nc-book-bookmark",
    component: InvoiceLayout,
    layout: "/admin",
  },{
    path: "/already-admissions",
    name: "Already Admissions",
    icon: "nc-icon nc-book-bookmark",
    component: AlreadyAdmissions,
    layout: "/admin",
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "nc-icon nc-satisfied",
    component: StudentHome,
    layout: "/admin",
  },
  {
    path: "/staff",
    name: "Staff",
    icon: "nc-icon nc-circle-10",
    component: StaffHome,
    layout: "/admin",
  }
  
  
];
