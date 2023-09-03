
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css'; 
import MediHelpNotice from '../Images/allImg/MediHelpNotice.jpg';
import Manage_Profile from '../Images/allImg/User_Profile.png';
import Doctor from '../Images/allImg/Doctor.png';
import Report from '../Images/allImg/Report.png';
import Appontment from '../Images/allImg/Schedule_Appointment.png';
import Location from '../Images/allImg/View Location.png';
import Other from '../Images/allImg/Others.png';
import CSS from '../css/style.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


//import {Route, Link, Routes, useParams} from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Autoplay]);



function PatientHome() {
  return (
    <html>
    <head>
        <link rel="stylesheet" href={CSS}></link>
    </head>
    
    <main className="body">
    
        <div className="content">
            <div className="input-group" id="search">
                <div className="form-outline">
                    <input
                    type="search"
                    id="form1"
                    className="form-control"
                    placeholder="search"
                    />
                </div>
                <button type="button" className="btn btn-info">
                    <span className="glyphicon glyphicon-search"></span> Search
                </button>
            </div>
        </div>

        <div className="slidContainer">
            <Swiper
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            >
            <SwiperSlide>
                <img
                className="d-block w-100"
                src={MediHelpNotice}
                alt="First slide"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="d-block w-100"
                src={MediHelpNotice}
                alt="Second slide"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="d-block w-100"
                src={MediHelpNotice}
                alt="Third slide"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="d-block w-100"
                src={MediHelpNotice}
                alt="Fourth slide"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="d-block w-100"
                src={MediHelpNotice}
                alt="Fifth slide"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                className="d-block w-100"
                src={MediHelpNotice}
                alt="Sixth slide"
                />
            </SwiperSlide>
            </Swiper>
        </div>

        <div className="about-container">
        <caption class="cart-caption"></caption><center><h1 class="about-hedding">About_us</h1></center>     
                <h3 class="about-content">Medihelp Hospitals is renowned as one of the leading healthcare providers in Sri Lanka today. In a journey extending over three and a half decades so far, we have expanded our medical-facility network considerably to now include inpatient and outpatient care facilities, laboratories and sample collection centers, pharmacies, and medical imaging units. Medihelp’s distinct healthcare offering is modelled on our patient-focused approach, affordability, accessibility, as well as the comprehensive facilities and high-quality medical expertise on offer. Our presence in several key locations across the island allows us to consistently deliver on our promise of providing quality affordable healthcare for all Sri Lankans.</h3>
        </div>

        <div className="PKGSection">
            <section className="home-packages">
                <h1 className="heading-title"> Our Services </h1>
                <div className="box-container">
                    <div className="box">
                        <div className="image">
                        <img className="d-block w-100" src={Manage_Profile} alt="First slide" />
                        </div>
                        <div className="content">
                        <h3>Manage_Profile</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, sint!</p>
                        <a href="book.php" className="btn">Search</a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                        <img className="d-block w-100" src={Doctor} alt="First slide" />
                        </div>
                        <div className="content">
                        <h3>View Doctor Details</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, sint!</p>
                        <a href="book.php" className="btn">Search</a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                        <img className="d-block w-100" src={Report} alt="First slide" />
                        </div>
                        <div className="content">
                        <h3>View or Request Report</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, sint!</p>
                        <a href="book.php" className="btn">Search</a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                        <img className="d-block w-100" src={Appontment} alt="First slide" />
                        </div>
                        <div className="content">
                        <h3>Schedule Appointment</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, sint!</p>
                        <Link to="/doctordetails" className="btn">Search</Link>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                        <img className="d-block w-100" src={Location} alt="First slide" />
                        </div>
                        <div className="content">
                        <h3>View Locations</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, sint!</p>
                        <a href="book.php" className="btn">Search</a>
                        </div>
                    </div>
                    <div className="box">
                        <div className="image">
                        <img className="d-block w-100" src={Other} alt="First slide" />
                        </div>
                        <div className="content">
                        <h3>Others</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos, sint!</p>
                        <a href="book.php" className="btn">Search</a>
                        </div>
                    </div>
                </div>
                <div className="load-more">
                <a href="package.php" className="btn">load more...</a>
                </div>
            </section>
        </div>
    </main>
    
    </html>
    );
}

export default PatientHome;