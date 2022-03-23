import React, { useState, useEffect } from 'react';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import SideMenuAdmin from '../shares/SideMenuAdmin';
import Swal from "sweetalert2";
const CONFIG = require("../../configs/api.config.json");
import ChangePasswordForm from '../shares/ChangePasswordForm';

function ChangePassword() {

    const loginData = UserProfile.getLoginDetails();

    return (
        <Layout className="change-password-page">
            {loginData ?
                <>
                    {(loginData.isAdmin) ? (
                        <SideMenuAdmin></SideMenuAdmin>
                    ) : (
                            <SideMenu></SideMenu>
                        )}
                    <div className="content" >
                        <Banner></Banner>
                        <ChangePasswordForm></ChangePasswordForm>
                        <TopLinks></TopLinks>
                    </div>
                </>
                : (
                    <div className="contact-content" >
                        <ChangePasswordForm></ChangePasswordForm>
                        <TopLinks></TopLinks>
                    </div>
                )}


            


        </Layout>
    )
}

export default ChangePassword;