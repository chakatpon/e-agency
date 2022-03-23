import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import Utility from '../../libs/Utility';
import Swal from "sweetalert2";
import Select from "react-select";
import { SendSMSTypes } from "../mocking/mocking";
import { NavLink } from 'react-router-dom';
// import "react-datepicker/dist/react-datepicker.css";
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
import MomentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from "material-ui-thai-datepickers";
import 'moment/locale/th';
import moment from 'moment'
const md5 = require('md5');
const CONFIG = require("../../configs/api.config.json");


export default function SendSMS() {

    const loginData = UserProfile.getLoginDetails();
    const [sendSmsTypeSelect, setSendSmsTypeSelect] = useState(SendSMSTypes[0]);
    const [isSendTimer, setIsSendTimer] = useState(false);
    const [nowDate, setNowDate] = useState(new Date());
    const [nowTime, setNowTime] = useState(new Date());
    const [disDatePicker, setDisDatePicker] = useState(true);
    const [disTimePicker, setDisTimePicker] = useState(true);

    const handleOnKeyUp = async (e) => {
        e.preventDefault();
        KeyPressOnShow();     
        $("#cntMsg").text($("#example").val().length);  
    }

    const handleOnkeypress = async (e) => {
        if (e.target.id == "senderTel") {
            var regex = /^[0-9\b]+$/;
            if (!regex.test(e.key)) {
                e.preventDefault();
            }
        } else if (e.target.id == "mobile") {
            var regex = /^[0-9,\b]+$/;
            if (!regex.test(e.key)) {
                e.preventDefault();
            }
        }


    }
    const handleOnchange = async (e) => {
        setSendSmsTypeSelect(SendSMSTypes[e.index]);
        var textTemplate = e.template;
        $("#messageSMS").val(textTemplate);
        KeyPressOnShow();
        $("#cntMsg").text($("#example").val().length);
       
    }
    const handleOnclick = async (e) => {
        if (e.target.value == 'true') {
            setIsSendTimer(true);
            setDisDatePicker(false);
            setDisTimePicker(false);
        }
        else {
            setIsSendTimer(false);
            setDisDatePicker(true);
            setDisTimePicker(true);
        }
    }

    function KeyPressOnShow() {
        var senderName = $("#sender").val();
        var senderTel = $("#senderTel").val();
        var messageSMS = $("#messageSMS").val();
        var smsFooter = " [ตัวแทน " + loginData.sale_code + "]"
        $("#example").val(messageSMS + " " + senderName + " " + senderTel + smsFooter);
        
    }

    function checkmobile(inpelem) {
        var result = "";
        var testPattern1 = /(08|09|06)\d{8}/;
        if (!testPattern1.test(inpelem) || (inpelem.length < 10 || inpelem.length > 10)) {
            result = " - เบอร์มือถือผู้รับให้ถูกต้อง<BR/>";
        }
        return result;
    }

    const handleOnSubmitSendSMS = async (e) => {
        var strSender = $("#sender").val();
        var strSenderTel = $("#senderTel").val();
        var strMobile = $("#mobile").val();
        var strMessageSMS = $("#messageSMS").val();
        var newStrMobile = "";
        var strDateSend = Utility.formatDateENtoTH($("#dateSend").val());
        var strTimeSend = $("#timeSend").val();
        var mm = moment(strDateSend + " " + strTimeSend, 'yyyy-MM-DD HH:mm', 'th');
        var dateTimeSending;
        var toDay = moment(new Date(), 'yyyy-MM-DD HH:mm', 'th');

        if (isSendTimer)
            dateTimeSending = mm.locale('en').format('yyyy-MM-DD HH:mm:ss');
        else
            dateTimeSending = toDay.locale('en').format('yyyy-MM-DD HH:mm:ss');

        var msg = "";
        if (strSender == "") {
            msg += " - ชื่อผู้ส่ง<BR>"
        }
        // if (strSenderTel == "") {
        //     msg += " - เบอร์โทรศัพท์ผู้ส่ง<BR>"
        // }

        if (strMobile == "" || strMobile.replace(/,/g, '').trim() == "") {
            msg += " - เบอร์มือถือผู้รับ<BR>"
        }
        else {
            // console.log('strMobile',strMobile.replace(/,/g, ' ').trim());
            // var firstChar = strMobile.charAt(0);
            // if(firstChar == ",")
            //     var ffff = strMobile.substring(1);
            // console.log('ffff',ffff);return false;


            // var lastChar = strMobile.substr(strMobile.length - 1);
            // if (lastChar == ",")
            //     newStrMobile = strMobile.slice(0, -1);
            // else
            //     newStrMobile = strMobile;
            //newStrMobile = strMobile.replace(/,/g, ' ').trim();

            var res = strMobile.split(',');
            console.log(res);
            newStrMobile = "";
            for (var i = 0; i < res.length; i++) {
                if (res[i] != "") {
                    msg += checkmobile(res[i]);
                    if (msg != "") {
                        break;
                    }
                    newStrMobile += res[i] + ","
                }
            }

            newStrMobile = newStrMobile.slice(0, -1);
        }

        if (strMessageSMS == "") {
            msg += " - ข้อความ<BR>"
        }

        if (msg != "") {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                html: "กรุณาระบุ<BR/> " + msg,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
            });

        }
        else {

            var strMsgExample = $("#example").val();
            var md5Hash = md5("PostSendSMS" + strSender + strSenderTel + newStrMobile + strMsgExample + dateTimeSending + CONFIG.AGENCY_APIS.APPNAME + loginData.sale_code + loginData.branch_code + loginData.loginname + CONFIG.AGENCY_APIS.SSID);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Sender: strSender,
                    SenderTel: strSenderTel,
                    Mobile: newStrMobile,
                    Message: strMsgExample,
                    Timerstring: dateTimeSending,
                    AppName: CONFIG.AGENCY_APIS.APPNAME,
                    SaleCode: loginData.sale_code,
                    BranchCode: loginData.branch_code,
                    LoginName: loginData.loginname,
                    seckey: md5Hash,
                    ssid: CONFIG.AGENCY_APIS.SSID
                })
            };
            // console.log(requestOptions);return false;
            fetch(CONFIG.AGENCY_APIS.URL + '/SendSMS/PostSendSMS', requestOptions)
                .then(async response => {
                    const data = await response.json();
                    if (data.msgOutput == "Success") {

                        Swal.fire({
                            icon: "success",
                            title: "ระบบได้จัดส่งข้อความ SMS ไปยังเบอร์มือถือผู้รับตามที่ท่านระบุเรียบร้อยแล้ว",
                            html: "(กรณีเลือกตั้งเวลา ระบบจะจัดส่งข้อความ SMS ตามที่ท่านกำหนด)",
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



    return (
        <Layout id="sendsms-page" >
            <SideMenu></SideMenu>
            <div className="content" >
                {/* <Banner></Banner> */}
                <h2 className="title">{"ส่งข้อความ SMS"}</h2>
                <div className="blog" >
                    <div className="form-group">
                        {/* <div className="col-sm-4">
                            <div className="form-group row">
                                <label htmlFor="example" className="font-weight-bold">{"ตัวอย่างข้อความ"}</label>
                            </div>
                            <div className="form-group row">
                                <textarea id="example" name="example" className="form-control font-weight-bold" rows="5" readOnly={true} />
                            </div>
                        </div> */}

                        <React.Fragment>
                            <div className="form-group row">
                                <label htmlFor="sender" className="col-sm-4 col-form-label text-left text-sm-right">{"ชื่อผู้ส่ง:"}
                                    <label className="text-danger">{"* "}</label>
                                </label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="sender" name="sender" onKeyUp={(e) => handleOnKeyUp(e)} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="senderTel" className="col-sm-4 col-form-label text-left text-sm-right">{"เบอร์โทรศัพท์ผู้ส่ง:"}</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control" id="senderTel" name="senderTel" onKeyPress={(e) => handleOnkeypress(e)} maxLength="10" onKeyUp={(e) => handleOnKeyUp(e)} />
                                </div>
                            </div>
                            <div className="row">
                                <label htmlFor="mobile" className="col-sm-4 col-form-label text-left text-sm-right">{"เบอร์มือถือผู้รับ:"}
                                    <label className="text-danger">{"* "}</label>
                                </label>
                                <div className="col-sm-4">
                                    <textarea id="mobile" name="mobile" className="form-control" rows="5" maxLength="109" onKeyPress={(e) => handleOnkeypress(e)} onKeyUp={(e) => handleOnKeyUp(e)} />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <p className="col-sm-8 col-form-label text-left text-sm-left text-secondary">
                                    * กรุณาใส่ , (Comma) คั่นเบอร์มือถือผู้รับ กรณีต้องการส่งมากกว่า 1 เบอร์
                                    <br />(ตัวอย่าง : 0912345678, 0923456789, 0934567890) สามารถใส่ได้สูงสุด 10 เบอร์ต่อครั้ง
                                </p>
                            </div>
                            <div className="row">
                                <label htmlFor="sendSmsType" className="col-sm-4 col-form-label text-left text-sm-right">{"ข้อความ:"}
                                    <label className="text-danger">{"* "}</label>
                                </label>
                                <div className="col-sm-3 text-left">
                                    <Select
                                        id="sendSmsType"
                                        placeholder={"เลือกข้อมูล"}
                                        options={SendSMSTypes}
                                        value={sendSmsTypeSelect}
                                        onChange={(e) => handleOnchange(e)}
                                        className="form-control-select"
                                    />

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4">
                                    <textarea id="messageSMS" name="messageSMS" className="form-control textarea-sms" rows="4" maxLength="201" onKeyUp={(e) => handleOnKeyUp(e)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <p className="col-sm-8 col-form-label text-left text-sm-left text-secondary">
                                    * ข้อความที่ต้องการส่ง มีความยาวได้ไม่เกิน 201 ตัวอักษร
                                    <br />*  0     -  70 chars. = 1 SMS, 71   - 134 chars. = 2 SMS, 135 - 201 chars. = 3 SMS
                                </p>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="mobile" className="col-sm-4 col-form-label text-left text-sm-right">{"เวลาส่ง:"}</label>
                                <div className="col-sm-4 text-left">
                                    <div className="pretty p-default p-curve styradio">
                                        <input type="radio" name="smsTimeSending" onClick={(e) => handleOnclick(e)} value={false} defaultChecked />
                                        <div className="state p-primary-o">
                                            <label>{"ส่งทันที"}</label>
                                        </div>
                                    </div>
                                    <div className="pretty p-default p-curve styradio">
                                        <input type="radio" name="smsTimeSending" onClick={(e) => handleOnclick(e)} value={true} />
                                        <div className="state p-primary-o">
                                            <label>{"ตั้งเวลา"}</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-2 text-left">
                                    {/* <DatePicker
                                            selected={startDate}
                                            onChange={date => setStartDate(date)}
                                            minDate={new Date()}
                                            portalId="root-portal"
                                            dateFormat="dd/MM/yyyy"
                                            className="form-control"
                                        /> */}
                                    <MuiPickersUtilsProvider utils={MomentUtils} locale={'th'}>
                                        <DatePicker
                                            id="dateSend"
                                            label="วันที่"
                                            format="DD/MM/yyyy"
                                            yearOffset={543}
                                            minDate={new Date()}
                                            onChange={(date) => { setNowDate(date._d); }}
                                            autoOk={true}
                                            value={nowDate}
                                            disabled={disDatePicker}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-sm-2 text-left">
                                    <MuiPickersUtilsProvider utils={MomentUtils} locale={'th'}>
                                        <TimePicker
                                            id="timeSend"
                                            label="เวลา"
                                            format="HH:mm"
                                            onChange={(date) => { setNowTime(date._d); }}
                                            value={nowTime}
                                            minutesStep={5}
                                            disabled={disTimePicker}
                                            className="form-control"

                                        />
                                    </MuiPickersUtilsProvider>

                                    {/* <DatePicker
                                            selected={now}
                                            onChange={date => setStartDate2(date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="เวลา"
                                            dateFormat="HH:mm"
                                            className="form-control"
                                            minTime={setMinutes(now, 0)}
                                            maxTime={setHours(setMinutes(now, 45), 23)}
                                        /> */}
                                </div>
                            </div>
                            <div className="form-group row" >
                                <label htmlFor="mobile" className="col-sm-4 col-form-label text-left text-sm-right">{"ตัวอย่างข้อความ:"}</label>

                                <div className="col-sm-4 text-left">
                                    <textarea id="example" name="example" className="form-control font-weight-bold textarea-sms" rows="5" readOnly={true} />
                                </div>


                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                </div>
                                <p className="col-sm-8 col-form-label text-left text-sm-left text-danger">
                                    ความยาวข้อความจำนวน <span id="cntMsg">0</span> ตัวอักษร
                                </p>
                            </div>
                            <div className="form-group row" >
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4 btn-wrapper-center mg-t-2 mg-b-2" >
                                    <button onClick={(e) => handleOnSubmitSendSMS(e)} className="button button-viriyah text-3" >{"ส่งข้อความ"}</button>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-4">
                                </div>
                                <div className="col-sm-4 text-center">
                                    <NavLink
                                        to={'/sendsms-report'}
                                        className="menu-link text-viriyah"
                                        activeclassname="active"
                                        exact
                                    >
                                        <span>{"รายงานสรุปการส่งข้อความ SMS"}</span>
                                    </NavLink>
                                </div>

                            </div>
                        </React.Fragment>
                    </div>

                </div>
                <TopLinks></TopLinks>
            </div>
        </Layout>
    )
}