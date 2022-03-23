import React, { useState, useEffect } from "react";
import SideMenuAdmin from '../shares/SideMenuAdmin';
import TopLinks from '../shares/TopLinks';
import Banner from '../shares/Banner';
import Layout from "../shares/Layout";
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import { NavLink, withRouter, useHistory } from 'react-router-dom';

export default function Admin() {
    useEffect(() => {



        fetch(urlAPI).then(function (response) {
            response.json().then(function (parsedJson) {
                // console.log("parsedJson : ", parsedJson)
                setMenuList(parsedJson)

                // console.log('This is the menuList', menuList);
            })
        });
        return () => { };
    }, []);


    function CheckPermission(inpmenu, inprole) {
        var acceptroles = "";

        switch (inpmenu) {
            case "AGENCY_REGISTER_LIST":
                acceptroles = "roles=MIS_CENTRAL, ACCOUNT";
                break;
            case "AGENCY_REGISTER_REJECT":
                acceptroles = "roles=MIS_CENTRAL, ACCOUNT";
                break;
            case "AGENCY_ACCOUNT":
                acceptroles = "roles=MIS_CENTRAL, ACCOUNT";
                break;

            case "APP_APPROVE":
                acceptroles = "roles=MIS_CENTRAL, APPADMIN";
                break;

            case "APP_APPROVED":
                acceptroles = "roles=MIS_CENTRAL, APPADMIN";
                break;

            case "ADMINMGR_LIST":
                acceptroles = "roles=MIS_CENTRAL";
                break;

            case "ADMINMGR_ADD":
                acceptroles = "roles=MIS_CENTRAL";
                break;

            case "PR":
                acceptroles = "roles=MIS_CENTRAL";
                break;

            case "HELP1":
                acceptroles = "roles=MIS_CENTRAL";
                break;

            case "HELP2":
                acceptroles = "roles=MIS_CENTRAL";
                break;

            case "ADMIN_SETEMAILAGENCY":
                acceptroles = "roles=MIS_CENTRAL, MIS_BRANCH, APPADMIN";
                break;
            case "ADMIN_TERMINATE":
                acceptroles = "roles=MIS_CENTRAL, ACCOUNT, APPADMIN";
                break;

            case "ADMIN_APPROVE_ALL":
                acceptroles = "roles=MIS_CENTRAL, APPADMIN";
                break;
            case "EMAIL_APP_EAGENCY":
                acceptroles = "roles=MIS_CENTRAL, AO";
                break;
            case "ADMINMGR_LIST_NEW":
                acceptroles = "roles=MIS_CENTRAL, APPADMIN";
                break;
          
            default:
                acceptroles = "roles=MIS_CENTRAL, MIS_BRANCH, CHECKPOLICY, ACCOUNT, APPADMIN";
                break;
        }


         //console.log('inprole=',inprole)
        //console.log('acceptroles.indexOf(inprole)=',inpmenu,acceptroles.indexOf(inprole))
        if (acceptroles.indexOf(", " + inprole) > 0 || acceptroles.indexOf("=" + inprole) > 0) {
            return true;
        }
        else {
            return false;
        }

    }






    const loginData = UserProfile.getLoginDetails();


    //console.log(CheckPermission("ADMIN_SETEMAILAGENCY", loginData.admintype_name));
    //const [loginData, setLoginData ] = useState(UserProfile.getLoginDetails())

    if (loginData == null) {
        window.location.href = "/login-admin";
    }
    else {
        if (localStorage.getItem("AdminStatus") != "Y" || localStorage.getItem("AdminStatus") == null) {
            localStorage.removeItem('loginData');
            localStorage.removeItem('AdminStatus');
            localStorage.removeItem('AgentStatus');
            window.location.href = "/login-admin";
        }
    }

    const CONFIG = require("../../configs/api.config.json");
    const [result, setResult] = useState("Response show here.");
    const [menuList, setMenuList] = useState([])
    const urlAPI = CONFIG.AGENCY_APIS.URL + '/Applist/GetAdminAppList?adminLoginName=' + loginData.loginname;
    const ssidEncode = encodeURIComponent(loginData.currentsession);
    // console.log('This is the ssidEncode', ssidEncode);
    // console.log('This is the loginData.isAdmin', loginData.isAdmin);

    // console.log('This is the admintype_name', loginData.admintype_name);
    // console.log("adminStatus ", localStorage.getItem("AdminStatus"));
    // console.log("agentStatus ", localStorage.getItem("AgentStatus"));




    return <Layout id="admin-page">
        <SideMenuAdmin></SideMenuAdmin>
        <div className="content" >
            <Banner />

            <div className="content-list">
                <div className="content-header" >
                    <h3 className="content-topic">{"ระบบงาน"}</h3>
                </div>



                {menuList.length > 0 ? menuList.map((appList, index) => {
                    return (
                        <div key={index}>
                            {appList.appid != "0009" ? (
                                <div className="list-item"  >
                                    <a className="item text-viriyah" href={appList.recorddata + "?adminName=" + loginData.loginname + "&currentSession=" + ssidEncode} target="blank">{appList.appname}</a>
                                </div>
                            ) : null}
                        </div>
                    )


                    // return (<div className="list-item" key={index} >
                    //     <a className="item text-viriyah" href={appList.recorddata + "?adminName=" + loginData.loginname + "&currentSession=" + ssidEncode} target="blank">{appList.appname}</a>
                    // </div>)

                }) : null}





                <div className="content-header" >
                    <h3 className="content-topic">{"สำหรับผู้ดูแลระบบงาน"}</h3>
                </div>


                {CheckPermission("ADMIN_SETEMAILAGENCY", loginData.admintype_name) ? (
                    <div className="list-item"  >
                        <a className="item text-viriyah" href={CONFIG.AGENCYWEB_ADMINREDIRECT.URL + "?adminname=" + loginData.loginname + "&currentSession=" + ssidEncode + "&menu=ADMIN_SETEMAILAGENCY"} target="blank">
                            {loginData.admintype_name == 'MIS_BRANCH' ? "ข้อมูลบัญชีตัวแทน" : "จัดการบัญชีตัวแทน"}</a>

                    </div>
                ) : (
                    null
                )}


                {CheckPermission("ADMIN_APPROVE_ALL", loginData.admintype_name) ? (
                    <div className="list-item"  >
                        <a className="item text-viriyah" href={CONFIG.AGENCYWEB_ADMINREDIRECT.URL + "?adminname=" + loginData.loginname + "&currentSession=" + ssidEncode + "&menu=ADMIN_APPROVE_ALL"} target="blank">{"การอนุมัติสิทธิ์ให้ใช้ระบบงาน"}</a>
                    </div>
                ) : (
                    null
                )}



                {CheckPermission("ADMINMGR_LIST_NEW", loginData.admintype_name) ? (
                    <div className="list-item"  >
                        <a className="item text-viriyah" href={CONFIG.AGENCYWEB_ADMINREDIRECT.URL + "?adminname=" + loginData.loginname + "&currentSession=" + ssidEncode + "&menu=ADMINMGR_LIST_NEW"} target="blank">
                            {"บัญชีเจ้าหน้าที่"}</a>
                    </div>
                ) : (
                    null
                )}
                {CheckPermission("ADMIN_TERMINATE", loginData.admintype_name) ? (
                    <div className="list-item"  >
                        <a className="item text-viriyah" href={CONFIG.AGENCYWEB_ADMINREDIRECT.URL + "?adminname=" + loginData.loginname + "&currentSession=" + ssidEncode + "&menu=ADMIN_TERMINATE"} target="blank">{"ระงับสิทธิ์บัญชีเจ้าหน้าที่"}</a>
                    </div>
                ) : (
                    null
                )}

                {/* {CheckPermission("EMAIL_APP_EAGENCY", loginData.admintype_name) ? (
                    <div className="list-item"  >
                        <NavLink
                            to={'/change-password'}
                            className="menu-link text-viriyah"
                            activeclassname="active"
                            exact
                        >
                            <span>{"จัดการอีเมลของระบบงานใน eAgency"}</span>
                        </NavLink>

                    </div>
                ) : (
                        null
                    )} */}



            </div>


            <TopLinks />
        </div>




        {/* <button  className="login-form-btn" onClick={getLoginDetail}>{"ทดสอบ"}</button> */}
    </Layout>;
}
