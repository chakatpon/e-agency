import React, { useState, useEffect } from 'react';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import SideMenuAdmin from '../shares/SideMenuAdmin';
import Swal from "sweetalert2";
import HelpFormV2 from "../shares/HelpFormV2";
const CONFIG = require("../../configs/api.config.json");
import 'semantic-ui-css/semantic.min.css'
function Help() {
    useEffect(() => {

        return () => {

        };
    }, []);

    const loginData = UserProfile.getLoginDetails();
    // console.log(loginData);

    return (

        <Layout id="Help-page" >

            {/* {loginData != null ? (
                <div className="content">
                    <SideMenu></SideMenu>

                    <TopLinks></TopLinks>
                </div>
            ) : (
                    <div className="Help-content" >
                        <TopLinks></TopLinks>

                    </div>
                )} */}

            {loginData ?
                <>
                    <SideMenu></SideMenu>
                    <div className="content" >
                        <Banner></Banner>
                        <h1 className="title">{"ช่วยเหลือ / FAQ"}</h1>
                        
                            <HelpFormV2 />
                        
                        <TopLinks className="body"></TopLinks>
                    </div>

                </>
                : (
                    <div className="Help-content" >
                        <h1 className="title">{"ช่วยเหลือ / FAQ"}</h1>
                     
                            <HelpFormV2 />
                        
                        <TopLinks></TopLinks>
                    </div>
                )}










        </Layout>

    )
}

export default Help;
