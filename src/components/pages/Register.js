import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Layout from '../shares/Layout';
import TopLinks from '../shares/TopLinks';
import Modal from 'react-modal';
import * as Utils from '../../assets/js/Utils'
import apiTestService from "../../libs/service.apiTest";
import Swal from "sweetalert2";
const CONFIG = require("../../configs/api.config.json");

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

function Register() {
    useEffect(() => {
        setpersonType("1");

        $("input[name='personType']").find("input[value='1']").prop("checked", true);

        return () => { };
    }, []);


    const [personType, setpersonType] = useState(true)

    const [isModalOpen, setModalOpen] = useState(true)

    const closeModal = () => {
        setModalOpen(!isModalOpen)
    }


    const handleRegisterAgent = async (e) => {
        e.preventDefault();

        var strSaleCode = $("input[name='saleCode']").val();
        var countSaleCode = strSaleCode.length;
        var strEmail = $("input[name='emailAddress']").val();
        var strRegisterType = personType;
        var strcardID = $("input[name='cardID']").val();
        var strTaxID = $("input[name='taxID']").val();
        // console.log('strTaxID : ', strTaxID)
        // console.log('strcardID : ', strcardID)
        // console.log('personType=' , personType);

        var strPreferenceData = personType == "1" ? $("input[name='cardID']").val() : $("input[name='taxID']").val();
        // console.log('strPreferenceData = ', strPreferenceData);
        var strResultLoginName = "";
        var strResultPassword = "";



        var msg = "";
        var validate = "";

        if (strRegisterType == "") {
            msg += " - ประเภทผู้ใช้งาน<BR/>"
        }
        if (strSaleCode == "") {
            //Radtanaporn
            // msg += " รหัสตัวแทน<BR>"
            msg += " - รหัสตัวแทน<BR/>"
        }
        if (strSaleCode != "") {
            validate += Utils.ValidateSaleCode(strSaleCode);

        }
        if (strEmail == "") {
            msg += " - อีเมลแอดเดรส<BR/>"
        }
        if (strPreferenceData == "") {
            msg += personType == "1" ? " - เลขบัตรประจำตัวประชาชน(13 หลัก)<BR/>" : " - เลขบัตรประจำตัวผู้เสียภาษี<BR/>";
        }
        if (strEmail != "") {

            if (Utils.ValidateEmail(strEmail) != "") {
                validate += Utils.ValidateEmail(strEmail);
            }

        }
        if (strcardID != "" && strTaxID == undefined) {
            if (Utils.ValidateCardID(strcardID) != "") {
                validate += Utils.ValidateCardID(strcardID);
            }
        }
        if (strTaxID != "" && strcardID == undefined) {
            if (Utils.ValidateTaxID(strTaxID) != "") {
                validate += Utils.ValidateTaxID(strTaxID);
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
                //console.log(validate)

            }
            else {
                const params = {
                    method: 'GET', url: CONFIG.AGENCY_APIS.URL + '/Register/RegisterAgent?SaleCode=' + strSaleCode
                        + '&Email=' + strEmail + '&RegisterType=' + strRegisterType + '&PreferenceData=' + strPreferenceData
                }
                //console.log(params);
                try {
                    const response = await apiTestService(params);
                    //console.log(response);
                    if (response.data.getRegisterDetail.msgOutput == 'Success') {
                        //alert(response.data.msgOutput);

                        strResultLoginName = response.data.getRegisterDetail.result.loginname;
                        strResultPassword = response.data.getRegisterDetail.result.password;

                        Swal.fire({
                            icon: "success",
                            title: "ลงทะเบียนสำเร็จ",
                            //text: "กรุณาระบุ " + msg,
                            showConfirmButton: true,
                            confirmButtonText: "OK",
                            showDenyButton: false,
                            //denyButtonText: "ลองอีกครั้ง"
                        });


                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "เกิดข้อผิดพลาด",
                            text: response.data.getRegisterDetail.msg,
                            showConfirmButton: false,
                            showDenyButton: true,
                            denyButtonText: "ลองอีกครั้ง"

                        });


                    }

                } catch (error) {
                    const errorString = await String(error);


                }
            }
        }
    }

    return (
        <Layout id="register-page" >
            <div className="register-content" >

                <h1 className="title">{"ลงทะเบียน"}</h1>
                <div className="register-blog" >
                    <form className="pt-2" >
                        <div className="form-group row">
                            <label className="col-sm-4 col-form-label text-left text-sm-right">{"ประเภทผู้ใช้งาน :"}</label>
                            <div className="col-sm-8 radio-wrapper text-left pt-3 p2">

                                <div className="pretty p-default p-curve">
                                    <input type="radio" name="personType" value={"1"} onClick={() => setpersonType("1")} defaultChecked

                                    />
                                    <div className="state p-primary-o">
                                        <label>{"บุคคลธรรมดา"}</label>
                                    </div>
                                </div>

                                <div className="pretty p-default p-curve">
                                    <input type="radio" name="personType" value={"2"} onClick={() => setpersonType("2")}

                                    />
                                    <div className="state p-primary-o">
                                        <label>{"นิติบุคคล"}</label>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="loginName" className="col-sm-4 col-form-label text-left text-sm-right">{"รหัสตัวแทน 5 หลัก :"}</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" maxLength="5" id="saleCode" name="saleCode" placeholder="* รหัสตัวแทนของท่าน" />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="emailAddress" className="col-sm-4 col-form-label text-left text-sm-right">{"อีเมลแอดเดรส :"}</label>
                            <div className="col-sm-3">
                                <input type="text" className="form-control" id="emailAddress" name="emailAddress" placeholder="username@domainname.com" />
                            </div>
                        </div>
                        {personType == "1"
                            ? (<div className="form-group row">
                                <label htmlFor="cardID" className="col-sm-4 col-form-label text-left text-sm-right">{"เลขบัตรประจำตัวประชาชน(13 หลัก) :"}</label>
                                <div className="col-sm-3">
                                    <input type="text" className="form-control" id="cardID" name="cardID" placeholder="* เพื่อยืนยันการลงทะเบียน" />
                                </div>
                            </div>)
                            : (<div className="form-group row">
                                <label htmlFor="taxID" className="col-sm-4 col-form-label text-left text-sm-right">{"เลขบัตรประจำตัวผู้เสียภาษี :"}</label>
                                <div className="col-sm-3">
                                    <input type="text" className="form-control" id="taxID" name="taxID" placeholder="* เพื่อยืนยันการลงทะเบียน" />
                                </div>
                            </div>)}




                        <div className="form-group row">
                            <label htmlFor="notation" className="col-sm-4 col-form-label text-left text-sm-right">{"หมายเหตุ :"}</label>
                            <div className="col-sm-8">

                                <div>
                                    <p className="text-left" id="notation">{"1. ลงทะเบียนสำหรับตัวแทน 5 หลักกับบริษัทแล้วเท่านั้น"}</p>
                                </div>
                                <div>
                                    <p className="text-left" id="notation">{"2. หากท่านยังไม่ได้แจ้งเลขบัตรประจำตัวประชาชน หรือเลขบัตรประจำตัวผู้เสียภาษี กรุณาติดต่อเจ้าหน้าที่"}</p>
                                </div>
                                <div>
                                    <p className="text-left" id="notation">{'3. ตัวแทนที่ยังไม่มีอีเมลแอดเดรส สามารถสมัครอีเมลแอดเดรส @agency.viriyah.co.th ได้โดยไม่มีค่าใช้จ่าย'}</p>
                                </div>
                                <div>
                                    <p className="text-left" id="notation">{'4. บริษัทขอสงวนสิทธิ์การอนุมัติ และการระงับการเข้าใช้ระบบ e-Agency ตามที่เห็นสมควร'}</p>
                                </div>
                                <div>
                                    <p className="text-left" id="notation">{'5. หากมีปัญหาในการลงทะเบียน กรุณากรอกแบบฟอร์มติดต่อเจ้าหน้าที่'}</p>
                                </div>

                            </div>
                        </div>

                        <div className="form-group row" >
                            <div className="col-sm-12 btn-wrapper-center mg-t-2 mg-b-2" >
                                <button onClick={(e) => handleRegisterAgent(e)} className="button button-viriyah text-3" >{"ลงทะเบียน"}</button>
                            </div>
                        </div>

                    </form>
                </div>
                <TopLinks />
                <Modal
                    isOpen={isModalOpen}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >

                    <h2 className="title" >{"ขั้นตอนการลงทะเบียน"}</h2>
                    <div className="">

                        <div>
                            <p className="text-left" id="notation">{"1. กรอกแบบฟอร์มลงทะเบียน"}</p>
                        </div>
                        <div>
                            <p className="text-left" id="notation">{"2. เมื่อลงทะเบียนเสร็จ ระบบจะสร้าง username และ password ให้ทันที"}</p>
                        </div>
                        <div>
                            <p className="text-left" id="notation">{'3. คลิกเลือกไปที่หน้าจอ "ขออนุมัติสิทธิเข้าใช้ระบบงาน" หรือกลับไปหน้าแรก เพื่อเข้าสู่ระบบ eAgency'}</p>
                        </div>
                        <div>
                            <p className="text-left" id="notation">{'4. ในกรณี "ขออนุมัติสิทธิเข้าใช้ระบบงาน" เจ้าหน้าที่จะดำเนินการพิจารณาระบบให้ภายใน 2 วันทำการ'}</p>
                        </div>

                    </div>
                    <button onClick={closeModal} className="button button-viriyah" >{"เริ่มต้นลงทะเบียน"}</button>
                </Modal>
            </div>
        </Layout>
    )
}

export default Register;
