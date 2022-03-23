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
import { Link } from 'react-router-dom'
function UserManual() {
    const test = CONFIG.UserManualUrl.URL;
    const loginData = UserProfile.getLoginDetails();

    console.log("loginData", test);

    return (
        <Layout className="usermanual-page">

            {(loginData.isAdmin) ? (
                <SideMenuAdmin></SideMenuAdmin>
            ) : (
                <SideMenu></SideMenu>
            )}

            <div className="content" >
                <Banner user="e-Agency System" />
                <h2 className="title">{"คู่มือการใช้งาน e-Agency"}</h2>
                {(loginData.isAdmin) ? (

                    (loginData.admintype_name == "APPADMIN" || loginData.admintype_name == "MIS_CENTRAL") ? (
                        <div className="list-item"  >
                        <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_eAgency_ForAdmin.pdf'} rel='noopener noreferrer'>
                            {"คู่มือการใช้งาน ระบบ e-Agency สำหรับเจ้าหน้าที่ดูแลระบบ"}</a>
                        </div>
                       
                    ) : (
                        (loginData.admintype_name == "AO") ? (
                            <div className="list-item"  >
                            <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_eAgency_ForAO.pdf'} rel='noopener noreferrer'>
                                {"คู่มือการใช้งาน ระบบ e-Agency สำหรับเจ้าหน้าที่ AO (Head)"}</a>
                            </div>
                           
                        ) : (
                            (loginData.admintype_name == "OU") ? (
                                <div className="list-item"  >
                                <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_eAgency_ForUnderwrite.pdf'} rel='noopener noreferrer'>
                                    {"คู่มือการใช้งาน ระบบ e-Agency สำหรับเจ้าหน้าที่ AO (User)"}</a>
                                </div>
                               
                            ) : (
                                (loginData.admintype_name == "OFFICE_BRANCH") ? (
                                    <div className="list-item"  >
                                        <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_eAgency_ForOFB.pdf'} rel='noopener noreferrer'>
                                            {"คู่มือการใช้งาน ระบบ e-Agency สำหรับเจ้าหน้าที่สำนักงาน (สาขา)"}</a>
                                    </div>
                                ) : (
                                    (loginData.admintype_name == "OFFICE_CENTER") ? (
                                        <div className="list-item"  >
                                             <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_eAgency_ForOFC.pdf'} rel='noopener noreferrer'>
                                            {"คู่มือการใช้งาน ระบบ e-Agency สำหรับเจ้าหน้าที่สำนักงาน (ส่วนกลาง)"}</a>
                                        </div>
                                    ) : (
                                        null
                                    )
                                )
                            )
                        )

                    )


                    

                ) : (
                    <div className="list-item"  >
                        <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_eAgency_ForAgent.pdf'} rel='noopener noreferrer'>
                        {"คู่มือการใช้งาน ระบบ e-Agency สำหรับตัวแทน"}</a>
                    </div>
                )}


                <div className="list-item"  >
                    <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_VMI_V2.pdf'} rel='noopener noreferrer'>
                        {"คู่มือการใช้งาน ระบบประกันภัยรถยนต์ภาคสมัครใจ (VMI)"}</a>

                </div>

                <div className="list-item"  >
                   <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_CMI_V2.pdf'} rel='noopener noreferrer'>
                        {"คู่มือการใช้งาน ระบบประกันภัยรถยนต์ภาคบังคับ (CMI)"}</a>
                </div>

                <div className="list-item"  >
                    <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_Covid.pdf'} rel='noopener noreferrer'>
                        {"คู่มือการใช้งาน ระบบประกันภัยโควิด-ประกันภัยวัคซีน"}</a>
                </div>
                
                <div className="list-item"  >
                   <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_VSmart_Android.pdf'} rel='noopener noreferrer'>
                        {"คู่มือการใช้งาน แอพพลิเคชั่น VSmart สำหรับระบบปฏิบัติการ Android"}</a>
                </div>

                <div className="list-item"  >
                    <a className="item text-viriyah" target="blank" href={CONFIG.UserManualUrl.URL+'/UserManual_VSmart_IOS.pdf'} rel='noopener noreferrer'>
                        {"คู่มือการใช้งาน แอพพลิเคชั่น VSmart สำหรับระบบปฏิบัติการ IOS"}</a>
                </div>

               

                <TopLinks />
            </div>
        </Layout>
    )
}

export default UserManual;