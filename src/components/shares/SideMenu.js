import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import avatarImg from '../../assets/img/manAvatar.png';
import UserProfile from '../shares/UserProfile';


function SideMenu() {


    var loginData = UserProfile.getLoginDetails();

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
                        <div className="col-12 text-left font-weight-bold p-0" >{"รหัสตัวแทน :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.sale_code}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"ชื่อตัวแทน :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.sale_name}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"สาขา :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.branch_code + ' ' + loginData.branch_name}</div>
                    </div>
                    <div className="row menu-item" >
                        <div className="col-12 text-left font-weight-bold p-0" >{"อีเมล :"}</div>
                        <br />
                        <div className="col-12 text-left p-0" >{loginData.email}</div>
                    </div>
                </div>

                <div className="info-blog">



                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={loginData.status == "1" ? "/Change-Password" : "/home"}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"หน้าแรก"}</span>
                            </NavLink>
                        </div>

                    </div>




                    {loginData.issub != "Y" ? (
                        <>
                            <div className="row" >
                                <div className="menu-item text-start" >
                                    <NavLink
                                        to={loginData.status == "1" ? "/Change-Password" : "/approval"}
                                        className="menu-link text-viriyah"
                                        activeClassName="active"
                                        exact
                                    >
                                        <span>{"ขอเพิ่มสิทธิ"}</span>
                                    </NavLink></div>

                            </div>
                            <div className="row" >
                                <div className="menu-item text-start" >
                                    <NavLink
                                        to={loginData.status == "1" ? "/Change-Password" : "/subgent-access"}
                                        className="menu-link text-viriyah"
                                        activeClassName="active"
                                        exact
                                    >
                                        <span>{"จัดการสิทธิ์ตัวแทนย่อย"}</span>
                                    </NavLink></div>

                            </div>
                        </>
                    ) : null}


                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={"/change-password"}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"เปลี่ยนรหัสผ่าน"}</span>
                            </NavLink></div>

                    </div>

                    <div className="row" >
                        <div className="menu-item text-start" >
                            <NavLink
                                to={loginData.status == "1" ? "/Change-Password" : "/change-email"}
                                className="menu-link text-viriyah"
                                activeClassName="active"
                                exact
                            >
                                <span>{"เปลี่ยนอีเมล"}</span>
                            </NavLink></div>

                    </div>




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

export default withRouter(SideMenu)