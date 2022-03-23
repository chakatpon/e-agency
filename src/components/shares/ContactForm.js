import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Select from "react-select";
import { contactTypeGroups } from "../mocking/mocking";
const CONFIG = require("../../configs/api.config.json");
import Swal from "sweetalert2";
const md5 = require('md5');
import * as Utils from '../../assets/js/Utils';
import UserProfile from '../shares/UserProfile';

function ContactForm() {
    const loginData = UserProfile.getLoginDetails();

    useEffect(() => {

        return () => {

        };
    }, []);

    const [contactTypeSelect, setContactTypeSelect] = useState(contactTypeGroups[0]);
    const [valEmail, setValEmail] = useState();
    const handleContactForm = async (e) => {
        e.preventDefault();


        var strSubject = $("#subject").val();
        var strMessage = $("#message").val();
        var strFullName = $("#fullName").val();
        var strEmail = $("#Email").val();
        var strTelno = $("#telno").val();
        var strSaleCode = $("#saleCode").val();




        var msg = "";
        var validate = "";
        if (strSubject == "") {
            msg += " - หัวข้อติดต่อ<BR>"
        }
        if (strMessage == "") {
            msg += " - ข้อความ<BR>"
        }
        if (strFullName == "") {
            msg += " - ชื่อ-นามสกุล<BR>"
        }
        if (strFullName != "") {
            validate += Utils.ValidateFullName(strFullName);
        }
        if (strEmail == "") {
            msg += " - อีเมล<BR>"
        }
        if (strTelno == "") {
            msg += " - โทรศัพท์<BR>"
        }

        if (strSaleCode != "") {
            if (Utils.ValidateSaleCode(strSaleCode) != "") {
                validate += Utils.ValidateSaleCode(strSaleCode);
            }
        }
        if (strEmail != "") {
            if (Utils.ValidateEmail(strEmail) != "") {
                validate += Utils.ValidateEmail(strEmail);
            }
        }
        if (strTelno != "") {
            if (Utils.ValidateTelno(strTelno) != "") {
                validate += Utils.ValidateTelno(strTelno);
            }
        }

        if (msg != "") {

            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: "กรุณาระบุ<BR> " + msg,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });

        }
        else {
            if (validate != "") {
                Swal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด",
                    text: "" + validate,
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonText: "ลองอีกครั้ง",

                });
               // console.log(validate)

            }

            else {

                var md5Hash = md5("PostAgencyContact" + contactTypeSelect.value + strSubject + strMessage + strFullName + strSaleCode + strEmail + strTelno + CONFIG.AGENCY_APIS.SSID);
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ContactType: contactTypeSelect.value,
                        Subject: strSubject,
                        Message: strMessage,
                        Fullname: strFullName,
                        SaleCode: strSaleCode,
                        Email: strEmail,
                        TelNo: strTelno,
                        seckey: md5Hash,
                        ssid: CONFIG.AGENCY_APIS.SSID
                    })
                };
                // console.log(requestOptions);return false;
                fetch(CONFIG.AGENCY_APIS.URL + '/Contact/PostAgencyContact', requestOptions)
                    .then(async response => {
                        const data = await response.json();
                        if (data.msgOutput == "Success") {

                            Swal.fire({
                                icon: "success",
                                title: "ระบบส่งแบบฟอร์มติดต่อของท่านให้เจ้าหน้าที่เรียบร้อยแล้ว",
                                showConfirmButton: true,
                                confirmButtonText: "ตกลง",
                                confirmButtonColor: '#3085d6',
                                showDenyButton: false

                            }).then(function () {
                                //window.location.href = "/Contact";
                                window.location.reload();
                            });
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "เกิดข้อผิดพลาด",
                                html: data.msgOutput,
                                showConfirmButton: false,
                                showDenyButton: true,
                                denyButtonText: "ลองอีกครั้ง"
                            });
                        }


                    })
                    .catch(error => {
                        this.setState({ errorMessage: error.toString() });
                        console.error('There was an error!', error);
                    });
            }
        }



    }

    return (
        <form className="contact-form" >
            <h1 className="title">{"ติดต่อเจ้าหน้าที่"}</h1>
            <div className="blog" >
                <div className="form-group">
                    <React.Fragment>
                        <div className="row">
                            <label htmlFor="contactType" className="col-sm-4 col-form-label text-left text-sm-right">{"ประเภทการติดต่อ:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3 text-left">
                                <Select
                                    id="contactType"
                                    placeholder={"เลือกข้อมูล"}
                                    options={contactTypeGroups}
                                    value={contactTypeSelect}
                                    onChange={select => setContactTypeSelect(select)}
                                    className="form-control-select"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="subject" className="col-sm-4 col-form-label text-left text-sm-right">{"หัวข้อติดต่อ:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-5">
                                <input id="subject" name="subject" type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="message" className="col-sm-4 col-form-label text-left text-sm-right">{"ข้อความ:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-5">
                                <textarea id="message" name="message" className="form-control" rows="4" />
                            </div>
                        </div>
                        <div className="form-group"></div>
                        <div className="row">
                            <label htmlFor="fullName" className="col-sm-4 col-form-label text-left text-sm-right">{"ชื่อ-นามสกุล:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-5">
                                <input id="fullName" name="fullName" type="text" className="form-control" defaultValue={loginData != null ? loginData.sale_name : ""} />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="saleCode" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสตัวแทน 5 หลัก: (ถ้ามี):"}
                                <label className="text-white">{"* "}</label>
                            </label>
                            <div className="col-sm-2">
                                <input id="saleCode" name="saleCode" type="text" className="form-control" maxLength="5" placeholder="* รหัสตัวแทนของท่าน" defaultValue={loginData != null ? loginData.sale_code : ""} readOnly={loginData != null ? true : false} />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="Email" className="col-sm-4 col-form-label text-left text-sm-right">{"อีเมลแอดเดรส:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" id="Email" name="Email" defaultValue={loginData != null ? loginData.email : ""}
                                    onChange={e => setValEmail(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))} placeholder="username@domainname.com" />
                            </div>
                        </div>
                        <div className="row">
                            <label htmlFor="telno" className="col-sm-4 col-form-label text-left text-sm-right">{"โทรศัพท์:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-3">
                                <input id="telno" name="telno" type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group"></div>
                        <div className="row">
                            <div className="col-sm-4"></div>
                            <div className="col-sm-3 btn-wrapper-center text-center" >
                                <button onClick={(e) => handleContactForm(e)} className="button button-viriyah text-3" >{"ตกลง"}</button>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            </div>



        </form>
    )
}

export default ContactForm