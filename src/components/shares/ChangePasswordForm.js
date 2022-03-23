import React, { useEffect, useState } from 'react'
import $ from 'jquery';
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import Select from "react-select";
import { contactTypeGroups } from "../mocking/mocking";
import UserProfile from '../shares/UserProfile';
import Swal from "sweetalert2";
const CONFIG = require("../../configs/api.config.json");
import apiTestService from "../../libs/service.apiTest";

function ChangePasswordForm() {
    useEffect(() => {

        return () => {

        };
    }, []);


    const [isSendMail, setIsSendMail] = useState(true);
    const [showPassOld, setShowPassOld] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [showPassCF, setShowPassCF] = useState(false)
    const [valOldPassword, setValOldPassword] = useState("");
    const [valNewPassword, setValNewPassword] = useState("");
    const [valConfirmPassword, setValConfirmPassword] = useState("");
    const onShowPass = (e) => {
        if (e.target.id == "oldPassword-view") {
            if (!showPassOld) {
                setShowPassOld(true)
            } else {
                setShowPassOld(false)
            }
        }
        if (e.target.id == "newPassword-view") {
            if (!showPass) {
                setShowPass(true)
            } else {
                setShowPass(false)
            }
        }
        if (e.target.id == "confirmPassword-view") {
            if (!showPassCF) {
                setShowPassCF(true)
            } else {
                setShowPassCF(false)
            }
        }
    }
    const loginData = UserProfile.getLoginDetails();

    const handleChangePassword = async (e) => {
        e.preventDefault();

       // console.log('isSendMail=', $("input[name='emailSending']").val());
        //console.log('isSendMail222=', isSendMail);

        var oldPW = $("input[name='oldPassword']").val();
        var newPW1 = $("input[name='newPassword']").val();
        var newPW2 = $("input[name='confirmPassword']").val();

        var msg = "";
        if (oldPW.length < 8) {
            msg += "- รหัสผ่านเก่า<BR>"
        }
        if (newPW1.length < 8) {
            msg += "- รหัสผ่านใหม่<BR>"
        }
        if (newPW2.length < 8) {
            msg += "- ยืนยันรหัสผ่าน<BR>"
        }

        if (msg != "") {
            //alert("กรุณาใส่รหัสผ่าน มีความยาวไม่น้อยกว่า 8 ตัวอักษร\n" + msg)
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: "กรุณาใส่รหัสผ่าน มีความยาวไม่น้อยกว่า 8 ตัวอักษร<BR>" + msg,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });

        } else {
            var checkPassworkOK = checkpwd1();

            if (checkPassworkOK) {
                checkPassworkOK = checkpwd2();
            }



            if (checkPassworkOK) {

                var strLoginName = loginData.loginname;
                var strOldPassword = $("input[name='oldPassword']").val();
                var strNewPassword = $("input[name='newPassword']").val();
                //var isSendEMail = $("input[name='emailSending']").val();



                var apiName = "";
                if (loginData.isAdmin)
                    apiName = "/Admin/UpdatePassword";
                else
                    apiName = "/Agents/UpdatePassword";


                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        LoginName: strLoginName,
                        OldPassword: strOldPassword,
                        NewPassword: strNewPassword,
                        SendMail: Boolean(isSendMail)
                    })
                };

                try {
                    fetch(CONFIG.AGENCY_APIS.URL + apiName, requestOptions)
                        .then(async response => {
                            const data = await response.json();
                            console.log(data);
                            if (data.msgOutput == "Success") {

                                Swal.fire({
                                    icon: "success",
                                    title: "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว <br/>กรุณาเข้าสู่ระบบใหม่อีกครั้งค่ะ",
                                    showConfirmButton: true,
                                    confirmButtonText: "OK",
                                    showDenyButton: false,
                                }).then(function () {
                                    window.location.href = "/Logout";
                                });
                            }
                            else {
                                Swal.fire({
                                    icon: "error",
                                    title: "เกิดข้อผิดพลาด",
                                    text: data.msgOutput,
                                    showConfirmButton: false,
                                    showDenyButton: true,
                                    denyButtonText: "ลองอีกครั้ง"
                                });
                            }


                        });

                } catch (error) {
                    const errorString = await String(error);
                    console.log(errorString);
                }


            }
        }

    }


    function checkpwd1() {
        var valid = false;
        var newPW1 = $("input[name='newPassword']").val();
        if (newPW1.length > 0) {
            valid = validatePW(newPW1);

            if (!valid) {
                //clearNewPW1();
                return false;
            } else {
                return true;
            }

        } else {


            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "กรุณากรอกรหัสผ่านเดิม",
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });
            return false;

        }

    }

    function checkpwd2() {
        var newPW1 = $("input[name='newPassword']").val();
        var newPW2 = $("input[name='confirmPassword']").val();

        if (newPW2.length > 0) {
            if (newPW2 != newPW1) {

                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "กรุณายืนยันรหัสผ่านใหม่อีกครั้ง (รหัสผ่านที่คุณยืนยันไม่ตรงกัน)",
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonText: "ลองอีกครั้ง"
                });

                //clearNewPW2();
                return false;
            } else {
                var valid = validatePW(newPW1);
                if (!valid) {
                    //clearNewPW2();
                    return false;
                } else {
                    return true;

                }

            }
        }
    }


    function validatePW(inpval) {

        var counter = 0;
        if (inpval.length < 8) {

            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "กรุณาใส่รหัสผ่าน มีความยาวไม่น้อยกว่า 8 ตัวอักษร",
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });


            return false;
        } else if (inpval.indexOf($("input[name='loginName']").val()) != -1) {

            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "ห้ามมี รหัสผู้ใช้ (loginname) ของตัวเองใน รหัสผ่านใหม่",
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });

            return false;

        }
        else {

            if (/[a-z]/.test(inpval)) {
                // If string contain at least one lowercase alphabet character
                counter++;
            }
            if (/[A-Z]/.test(inpval)) {
                counter++;
            }
            if (/[0-9]/.test(inpval)) {
                counter++;
            }
            if (/[-\/\\^$*+?._@!#%&()|[\]{}]/.test(inpval)) {
                counter++;
            }

            if (counter < 3) {

                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "'กรุณาใส่รหัสผ่าน ที่ประกอบไปด้วย \n - ตัวอักษรตัวเล็ก ตัวใหญ่ ตัวเลข หรืออักขระพิเศษ'",
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonText: "ลองอีกครั้ง"
                });
                return false;
            } else {
                return true;
            }
        }

    }


    function clearNewPW1() {
        setTimeout(function () { $("input[name='newPassword']").focus(); }, 10);
        // $("input[name='newPassword']").val("");
        setValNewPassword("");
    }
    function clearNewPW2() {
        setTimeout(function () { $("input[name='confirmPassword']").focus(); }, 10);
        // $("input[name='confirmPassword']").val("");
        setValConfirmPassword("");
    }

    function clearOldPW() {
        setTimeout(function () { $("input[name='oldPassword']").focus(); }, 10);
        // $("input[name='oldPassword']").val("");
        setValOldPassword("");
    }


    return (
        <form className="changepassword-form" >
            <h2 className="title">{"เปลี่ยนรหัสผ่าน"}</h2>
            <div className="blog" >
                <div className="pd-t-2" >
                    <div className="form-group">

                        <div className="form-group row">
                            <label htmlFor="loginName" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสผู้ใช้ (loginname) :"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3">
                                <input type="text" readOnly className="form-control" id="loginName" value={loginData.loginname} readOnly />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="oldPassword" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสผ่านเดิม :"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3">
                                <span className="btn-show-pass">
                                    <span className="material-icons" id="oldPassword-view" onClick={(e) => onShowPass(e)}>{showPassOld ? "visibility" : "visibility_off"}</span>
                                </span>
                                <input
                                    className="form-control"
                                    name="oldPassword" id="oldPassword"
                                    placeholder="old password"
                                    type={showPassOld ? "text" : "password"}
                                    value={valOldPassword}
                                    onChange={e => setValOldPassword(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))}
                                />

                            </div>
                        </div>


                        <div className="form-group row">
                            <label htmlFor="newPassword" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสผ่านใหม่ :"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3">
                                <span className="btn-show-pass">
                                    <span className="material-icons" id="newPassword-view" onClick={(e) => onShowPass(e)}>{showPass ? "visibility" : "visibility_off"}</span>
                                </span>
                                <input
                                    className="form-control"
                                    name="newPassword" id="newPassword"
                                    placeholder="new password"
                                    type={showPass ? "text" : "password"}
                                    value={valNewPassword}
                                    onChange={e => setValNewPassword(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="confirmPassword" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสผ่านใหม่(อีกครั้ง) :"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3">
                                <span className="btn-show-pass">
                                    <span className="material-icons" id="confirmPassword-view" onClick={(e) => onShowPass(e)}>{showPassCF ? "visibility" : "visibility_off"}</span>
                                </span>
                                <input
                                    className="form-control"
                                    name="confirmPassword" id="confirmPassword"
                                    placeholder="confirm new password"
                                    type={showPassCF ? "text" : "password"}
                                    value={valConfirmPassword}
                                    onChange={e => setValConfirmPassword(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))}
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-left text-sm-right">{"ต้องการให้ส่งอีเมลหรือไม่ ? :"}</label>
                            <div className="col-sm-8 text-left">
                                <div className="pretty p-default p-curve styradio">
                                    <input type="radio" name="emailSending" onClick={() => setIsSendMail(true)} value={isSendMail} />
                                    <div className="state p-primary-o">
                                        <label>{"ต้องการ"}</label>
                                    </div>
                                </div>
                                <div className="pretty p-default p-curve styradio">
                                    <input type="radio" name="emailSending" onClick={() => setIsSendMail(false)} value={isSendMail} />
                                    <div className="state p-primary-o">
                                        <label>{"ไม่ต้องการ"}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="notation" className="col-sm-4 col-form-label text-left text-sm-right" >{"หมายเหตุ :"}</label>

                            <div className="col-sm-8">
                                <div>
                                    <p className="text-left" id="notation">{"1. รห้สผ่านมีความยาวไม่น้อยกว่า 8 ตัวอักษร"}</p>
                                </div>
                                <div>
                                    <p className="text-left" id="notation">{"2. รหัสผ่านเป็นแบบใหม่ คือ ต้องประกอบไปด้วย ตัวอักษรตัวเล็ก ตัวใหญ่ ตัวเลข หรืออักขระพิเศษ"}</p>
                                </div>
                                <div>
                                    <p className="text-left" id="notation">{"3. ข้อห้าม คือ ห้ามมีรหัสผู้ใช้ของตัวเองในรหัสผ่านใหม่"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row" >
                            <div className="col-sm-12 btn-wrapper-center mg-t-2 mg-b-2" >
                                <button onClick={(e) => handleChangePassword(e)} className="button button-viriyah text-3" >{"เปลี่ยนรหัสผ่าน"}</button>
                            </div>
                        </div>


                    </div>



                </div>
            </div>


        </form>
    )
}

export default ChangePasswordForm