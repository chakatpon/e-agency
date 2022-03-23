import React, { useState, useEffect } from 'react';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import ContactForm from '../shares/ContactForm';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import SideMenuAdmin from '../shares/SideMenuAdmin';
import Swal from "sweetalert2";
const CONFIG = require("../../configs/api.config.json");

function Contact() {
    const loginData = UserProfile.getLoginDetails();

    return (
        <Layout id="contact-page" >
            {/* {loginData != null ? (
                <div className="content">
                    <SideMenu></SideMenu>

                    <TopLinks></TopLinks>
                </div>
            ) : (
                    <div className="contact-content" >
                        <TopLinks></TopLinks>

                    </div>
                )} */}
            
                {loginData ?
                    <>
                        <SideMenu></SideMenu>
                        <div className="content" >
                            <Banner></Banner>
                            <ContactForm></ContactForm>
                            <TopLinks></TopLinks>
                        </div>
                        
                    </>
                    : (
                        <div className="contact-content" >
                            <ContactForm></ContactForm>
                            <TopLinks></TopLinks>
                        </div>
                    )}
                    
                    
                    
            






        </Layout>

    )
}

export default Contact;
