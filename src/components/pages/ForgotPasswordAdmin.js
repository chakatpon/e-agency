import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import apiTestService from "../../libs/service.apiTest";
import * as Utils  from '../../assets/js/Utils'
import Swal from "sweetalert2";
import { Redirect } from 'react-router';
const CONFIG = require("../../configs/api.config.json");


function ForgotPasswordAdmin() {

   
    const [valEmail, setValEmail] = useState("");
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        var strLoginName = $("input[name='loginName']").val();
        var strEmail = $("input[name='Email']").val();
        //console.log('strEmail=',strEmail)
        var msg = "";
        if (strLoginName == "") {
            msg += "- รหัสผู้ใช้ (loginname)<BR>"
        }
        if (strEmail == "") {
            msg += "- อีเมลแอดเดรส<BR>"
        }

        if (msg != "") {
            
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: "กรุณาระบุ<BR>" + msg,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
              });
        } 
        else if(Utils.ValidateEmail(strEmail) != "")
        {
            //alert("รูปแบบอีเมลแอดเดรสไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง")

            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "รูปแบบอีเมลแอดเดรสไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง",
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
              });
        }
        else {

            const params = { method: 'GET', url: CONFIG.AGENCY_APIS.URL + '/Admin/ForgotPassword?LoginName=' + strLoginName + '&Email=' + strEmail }
            //console.log(params);
            try {
                const response = await apiTestService(params);

                if (response.data.msgOutput == 'Success') {
                   // alert(response.data.msgOutput);

                    Swal.fire({
                        icon: "success",
                        title: "เปลี่ยนรหัสผ่านเรียบร้อย \nกรุณาตรวจสอบอีเมล",
                        showConfirmButton: true,
                        confirmButtonText: "OK",
                        showDenyButton: false
                      }).then(function () {                       
                        window.location.href = "/login-admin";
                    });
                } else {
                    //alert(response.data.msgOutput);

                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text:response.data.msgOutput,
                        showConfirmButton: false,
                        showDenyButton: true,
                        denyButtonText: "ลองอีกครั้ง"
                      });
                }

            } catch (error) {
                const errorString = await String(error);

                console.log(errorString);
            }
        }
    }

    return(
        <Layout className="renew-password-page">
            
            <div className="renew-password-content" >
                <Banner user="e-agency System" />
                <h2 className="title">{"ตั้งค่ารหัสผ่านใหม่"}</h2>
                <div className="blog" >
                    <form className="pd-t-2" >

                        <div className="form-group row">
                            <label htmlFor="loginName" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสผู้ใช้ (loginname) :"}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="loginName"  name="loginName"  />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="newEmail" className="col-sm-4 col-form-label text-left text-sm-right">{"อีเมลแอดเดรส :"}</label>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" id="Email"  name="Email" value={valEmail}
                                onChange={e => setValEmail(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))} />
                            </div>
                        </div>

                       

                     


                        <div className="form-group row" >
                            <div className="col-sm-12 btn-wrapper-center mg-t-2 mg-b-2" >
                                <button onClick={(e) => handleForgotPassword(e)}  className="button button-viriyah text-3" >{"ส่งรหัสผ่าน"}
                                
                                </button>
                            </div>
                        </div>



                        <div className="form-group row">
                            <label htmlFor="notation" className="col-sm-4 col-form-label text-left text-sm-right">{"หมายเหตุ :"}</label>
                            <div className="col-sm-8">
                                <div>
                                <p className="text-left" id="notation1">{"กรุณาใส่รหัสผู้ใช้ (loginname) และอีเมลแอดเดรสของท่าน แล้วคลิกที่ปุ่ม ส่งรหัสผ่าน ระบบ e-Agency จะ Generate รหัสผ่านให้ท่านใหม่แล้วส่งไปยังอีเมลแอดเดรสที่ได้ลงทะเบียนไว้"}</p>
                                </div>
                                <div>
                                <p className="text-left" id="notation2">{"* หากไม่ทราบรหัสผู้ใช้หรืออีเมลแอดเดรส กรุณาติดต่อเจ้าหน้าที่ดูแลระบบ e-Agency" }</p>
                                </div>
                            </div>

                            
     
                           
                        </div>


                    </form>
                </div>
                <TopLinks />
            </div>
        </Layout>

    )
}

export default ForgotPasswordAdmin;
