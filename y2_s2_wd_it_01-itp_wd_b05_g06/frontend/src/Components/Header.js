import React from "react";
import { Link } from "react-router-dom";

function Header() {

  return (

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ color: "red" }}>
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Patient Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="/" className="dropdown-item">Patient Home</Link></li>
                <li><Link to="/alladmin" className="dropdown-item">Admin Home</Link></li>
                <li><Link to="/add" className="dropdown-item">Create Patient</Link></li>
                <li><Link to="/add/admin" className="dropdown-item">Create Admin</Link></li>
                <li><Link to="/allappointment" className="dropdown-item" aria-current="page">All Appointments</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Doctor Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="/alldoctor" className="dropdown-item" aria-current="page" >Doctor Home</Link></li>
                <li><Link to="/add/doctor" className="dropdown-item">Create Doctor</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Employee Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="employee/list" className="dropdown-item" aria-current="page"> Employee List </Link></li>
                <li><Link to="employee/approval" className="dropdown-item">Approval</Link></li>
                <li><Link to="employee/attendance/list" className="dropdown-item">Approve Employee</Link></li>               
              </ul>
            </li>

            
            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Transport Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="/Transport/view" className="dropdown-item">View Transport</Link></li>
                <li><Link to="/Transport/add" className="dropdown-item">Add Transport</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Payment Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="/allpayment" className="dropdown-item" aria-current="page"> All Payments </Link></li>
                <li><Link to="/add/payment" className="dropdown-item">Create Payment</Link></li>                
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="/view" className="dropdown-item">All Inventory</Link></li>
                <li><Link to="/Medicine/add" className="dropdown-item" aria-current="page"> Create Inventory </Link></li>                
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link
                to="/"
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Support Admin
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li><Link to="/analytics" className="dropdown-item" aria-current="page"> All Tickets </Link></li>              
              </ul>
            </li>


          </ul>
        </div>
      </div>
    </nav>    
              
  );

}

export default Header;
