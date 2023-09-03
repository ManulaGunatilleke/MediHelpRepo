import React from "react";
import { Link } from 'react-router-dom';
import Medihelp from '../Images/allImg/LogoMH.png';
//import { BsPersonCircle } from 'react-icons/bs';

function Header() {

    return(
        <nav className ="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" style={{color: "red"}}><img className="d-block w-100" src={Medihelp} alt="First slide" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page" >Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add/appointment" className="nav-link" >Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link" >About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/support" className="nav-link" >Contact Us</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav" style={{marginLeft: "50%"}}>
                        <li><center><span class="bi bi-person-circle"></span></center></li>
                        <tr><center>
                            <li className="nav-item">
                                <Link to="/add" className="nav-link" >Login / Signup</Link>
                            </li>
                        </center></tr>
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default Header;