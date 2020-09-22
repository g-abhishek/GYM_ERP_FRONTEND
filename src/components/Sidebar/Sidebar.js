
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// import logo from "logo.svg";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              {/* <img src={logo} alt="react-logo" /> */}
            </div>
          </a>
          <a
            href="/"
            className="simple-text logo-normal"
          >
            GYM-ERP
          </a>
          {/* <form>
            <InputGroup className="no-border" style={{backgroundColor: "rgb(255, 250, 250)"}} >
              <Input placeholder="Search..."/>
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form> */}
        </div>
        
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.props.routes.map((prop, key) => {
              // console.log(prop)
              return (
                <li
                  className={
                    this.activeRoute(prop.layout + prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
