import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import * as Utils from '../../assets/js/Utils'
import Swal from "sweetalert2";
const CONFIG = require("../../configs/api.config.json");

function ChangeEmail() {

    const [valEmail, setValEmail] = useState("");
    const loginData = UserProfile.getLoginDetails();

    if (loginData == null) {
        window.location.href = "/";
    }
    else {
        if (localStorage.getItem("AgentStatus") != "Y" || localStorage.getItem("AgentStatus") == null) {
            localStorage.removeItem('loginData');
            localStorage.removeItem('AdminStatus');
            localStorage.removeItem('AgentStatus');
            window.location.href = "/";
        }
    }

    const handleChangeEmail = async (e) => {
        e.preventDefault();

        var strLoginName = loginData.loginname;
        var strNewEmail = $("input[name='newEmail']").val();
       
        var msg = "";
        var validate = "";

        if (strNewEmail == "") {
            msg += "- อีเมลแอดเดรส<BR>"
            
        }
        if (strNewEmail != "") {
            if (Utils.ValidateEmail(strNewEmail) != "") {
                validate += Utils.ValidateEmail(strNewEmail);
            }
        }


       
        if (msg != "") {
            //alert("กรุณาระบุ\n" + msg)

            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: "กรุณาระบุ<BR> " + msg,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });

        }
        else if (validate != "") {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "" + validate,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง",

            });
            console.log(validate)

        }
        else {
            const params = { method: 'GET', url: CONFIG.AGENCY_APIS.URL + '/Agents/RequestChangeEmail?LoginName=' + strLoginName + '&NewEmail=' + strNewEmail }
            console.log(params);
            try {
                const response = await apiTestService(params);

                if (response.data.msgOutput == 'Success') {
                    Swal.fire({
                        icon: "success",
                        title: "ระบบ e-Agency ได้ส่งอีเมลไปยัง inbox ของท่านที่อีเมลแอดเดรส " + strNewEmail + " แล้ว กรุณาคลิกที่ลิงค์ในอีเมลเพื่อยืนยันอีกครั้งหนึ่ง..",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        showDenyButton: false,
                    }).then(function () {
                        window.location.href = "/home";
                        //window.location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: response.data.msgOutput,
                        showConfirmButton: false,
                        showDenyButton: true,
                        denyButtonText: "ลองอีกครั้ง"
                    });
                }

            } catch (error) {
                const errorString = await String(error);

                console.log('error');
            }
        }
    }
    return (
        <Layout className="change-email-page">
            <SideMenu> </SideMenu>
            <div className="content" >
                <Banner user="e-agency System" />
                <h2 className="title">{"เปลี่ยนอีเมลแอดเดรส"}</h2>
                <div className="blog" >
                    <form className="pd-t-2" >
                        <div className="form-group row">
                            <label htmlFor="loginName" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสผู้ใช้ (loginname) :"}</label>
                            <div className="col-sm-4">
                                <input type="text" readOnly className="form-control" id="loginName" value={loginData.loginname} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="newEmail" className="col-sm-4 col-form-label text-left text-sm-right">{"อีเมลแอดเดรสใหม่ :"}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="newEmail" name="newEmail" value={valEmail}
                                    onChange={e => setValEmail(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="notation" className="col-sm-4 col-form-label text-left text-sm-right" >{"หมายเหตุ :"}</label>
                            <div className="col-sm-8">
                                <p className="text-left" id="notation">{"ระบบ e-Agency จะส่งลิงค์ไปยัง inbox ของอีเมลแอดเดรสตามที่ระบุไว้ในแบบฟอร์มนี้ กรุณาตรวจสอบ inbox และคลิกที่ลิงค์ในจดหมาย เพื่อยืนยันอีเมลแอดเดรสของท่าน (ระบบจะยังไม่เปลี่ยนข้อมูลของท่าน จนกว่าจะมีการยืนยันตามที่ระบบได้ส่งให้ในจดหมาย)"}</p>
                            </div>
                        </div>


                        <div className="form-group row" >
                            <div className="col-sm-12 btn-wrapper-center mg-t-2 mg-b-2" >
                                <button onClick={(e) => handleChangeEmail(e)} className="button button-viriyah text-3" >{"เปลี่ยนอีเมลแอดเดรส"}</button>
                            </div>
                        </div>
                    </form>
                </div>
                <TopLinks />
            </div>
        </Layout>
    )
}


export default ChangeEmail
