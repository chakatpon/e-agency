import React, { useState, useEffect } from 'react';
import Layout from '../shares/Layout';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom'
import queryString from 'query-string';
const CONFIG = require("../../configs/api.config.json");

export default class ChangeEmailActive extends React.Component {
    state = {
        isActive: false
    };
    componentDidMount() {
        const { search } = this.props.location
        const parsed = queryString.parse(search);        

        localStorage.removeItem('loginData');
        localStorage.removeItem('AdminStatus');
        localStorage.removeItem('AgentStatus');

        // loginname=13511098&activatekey=D7FD6264EB2BA4EABE15FBB582208303
        fetch(CONFIG.AGENCY_APIS.URL + '/Agents/ChangeEmailActive?LoginName=' + parsed.loginname + '&ActivateKey=' + parsed.activatekey)
            .then(async response => {
                const data = await response.json();
                if (data.msgOutput == "Success") {
                    this.setState({ isActive: true });
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

        console.log("isActive", this.state.isActive);
    }
    render() {
        return (
            <Layout id="change-email-active-page" >
                <div className="change-email-active-content" >
                    <form className="change-email-active-form" >
                        <h1 className="title">{"ผลการยืนยันการเปลี่ยนอีเมลแอดเดรส"}</h1>
                        <div className="blog" >
                            <div className="form-group">
                                <React.Fragment>
                                    {this.state.isActive ? (
                                        <div className="row change-email-active">
                                            <label className="col-sm-12 f-30px text-error text-center text-sm-center">{"ท่านได้ยืนยันการเปลี่ยนอีเมลแอดเดรสเรียบร้อยแล้ว"}</label>
                                        </div>
                                    ) : (
                                        <div className="row change-email-inactive">
                                            <label className="col-sm-12 f-30px text-error text-center text-sm-center" >{"ขออภัย ไม่สามารถยืนยันการเปลี่ยนอีเมลแอดเดรสได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง.."}</label>
                                        </div>
                                    )}
                                    <br />
                                    <div className="row text-center">
                                        <Link className="col-sm-12 text-viriyah"
                                            to={{
                                                pathname: "/home"
                                            }} >{"กรุณาคลิกที่นี่เพื่อเข้าสู่ระบบ e-Agency"}</Link>
                                    </div>
                                </React.Fragment>

                            </div>
                        </div>
                    </form>
                    {/* <TopLinks></TopLinks> */}
                </div>
            </Layout>
        );
    }
}