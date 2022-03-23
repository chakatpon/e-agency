import { CollectionsBookmarkRounded } from '@material-ui/icons';
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import avatarImg from '../../assets/img/manAvatar.png';
import UserProfile from './UserProfile';

function GetAdminType(admintype_name) {
    var admintype = "";
    switch (admintype_name) {
        case "MIS_CENTRAL":
            admintype = "เจ้าหน้าที่สารสนเทศส่วนกลาง"
            break;
        case "MIS_BRANCH":
            admintype = "เจ้าหน้าที่สารสนเทศสาขาฯ";
            break;
        case "CHECKPOLICY":
            admintype = "ตรวจสอบกรมธรรม์ได้เท่านั้น";
            break;
        case "ACCOUNT":
            admintype = "เจ้าหน้าที่ดูแลบัญชีผู้ใช้ใน eAgency";
            break;
        case "APPADMIN":
            admintype = "เจ้าหน้าที่ดูแลระบบงานใน eAgency";
            break;
        case "AO":
            admintype = "AO (Head)";
            break;
        case "SUPERVISOR":
            admintype = "Supervisor";
            break;
        case "OU":
            admintype = "AO (User)";
            break;
        case "INQUIRY":
            admintype = "เจ้าหน้าที่ส่วนกลาง Inquiry";
            break;
        case "NONMOTOR_ADMIN":
            admintype = "เจ้าหน้าที่ non motor";
            break;
        case "FINANCE_HEAD":
            admintype = "เจ้าหน้าที่การเงิน(ส่วนกลาง)";
            break;
        case "MB":
            admintype = "เจ้าหน้าที่การตลาด(สาขา)";
            break;
        case "OFFICE_BRANCH":
            admintype = "เจ้าหน้าที่สำนักงาน (สาขา)";
            break;
        case "OFFICE_CENTER":
            admintype = "เจ้าหน้าที่สำนักงาน (ส่วนกลาง)";
            break;
        default:
            admintype = "อื่น ๆ";
            break;
    }
    return admintype;
}

function SideMenuAdmin() {


    var loginData = UserProfile.getLoginDetails();

    if (loginData.status == "1") {
        //window.location.href="/change-password";
    }




    return (
        <div className="sidemenu">
            <div className="avatar-wrapper text-center">
                <img src={avatarImg} className="avatar"></img>
            </div>
            <div className="username" >{"ข้อมูลผู้ใช้ระบบ"}</div>
            <div className="info-wrapper">
                <div className="info-blog mb-3" >
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"รหัสผู้ใช้ :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.loginname}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"รหัสพนักงาน :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.empcode}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"ชื่อ :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.adminfullname}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"สาขา :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.branch_code == null ? "" : loginData.branch_code + ' ' + loginData.branch_name == null ? "" : loginData.branch_name}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"ประเภท :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.admintype_desc}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"อีเมล :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.adminemail}</div>
                    </div>
                </div>

                <div className="info-blog">


                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={loginData.status == "1" ? "/Change-Password" : "/Admin"}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"หน้าแรก"}</span>
                            </NavLink>
                        </div>

                    </div>


                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={'/change-password'}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"เปลี่ยนรหัสผ่าน"}</span>
                            </NavLink></div>

                    </div>



                    {/* <div className="row" >
                                <div className="menu-item text-start" >
                                <NavLink
                                    to={'/home'}
                                    className="menu-link text-viriyah"
                                    activeClassName="active"
                                    exact
                                >
                                    <span>{"ดาวน์โหลด"}</span>
                                </NavLink></div>

                            </div> */}
                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={loginData.status == "1" ? "/Change-Password" : "/UserManual"}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"คู่มือการใช้งาน e-Agency"}</span>
                            </NavLink></div>

                    </div>

                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={'/Logout'}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"ออกจากระบบ"}</span>
                            </NavLink></div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default withRouter(SideMenuAdmin)