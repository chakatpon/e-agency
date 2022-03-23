import React, { useState, useEffect } from "react";
import SideMenu from '../shares/SideMenu';
import TopLinks from '../shares/TopLinks';
import Banner from '../shares/Banner';
import Layout from "../shares/Layout";
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import Swal from "sweetalert2";
import Modal from 'react-modal';

const md5 = require('md5');
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "400px",
        maxWidth: "600px"
    }
};
Modal.setAppElement('body');
export default function Home() {
    useEffect(() => {
        if (loginData.issub == "Y") {
            var md5Hash = md5("GetSubSale" + loginData.sale_code + loginData.branch_code + loginData.loginname + CONFIG.AGENCY_APIS.SSID);
            fetch(CONFIG.AGENCY_APIS.URL + '/SubAgent/GetSubSale?SaleCode=' + loginData.sale_code + '&BranchCode=' + loginData.branch_code + '&SubSaleLoginName=' + loginData.loginname + '&seckey=' + md5Hash + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
                .then(async response => {
                    const data = await response.json();
                    if (data.getSubSaleDetail.msgOutput == "Success") {
                        // console.log('subsale_code',data.getSubSaleDetail.result[0].subsale_code);
                        var md5Hash2 = md5("GetSubAgentAppListApprove" + loginData.sale_code + data.getSubSaleDetail.result[0].subsale_code + CONFIG.AGENCY_APIS.SSID);
                        fetch('/api-login/SubAgent/GetSubAgentAppListApprove?SaleCode=' + loginData.sale_code + '&SubSaleCode=' + data.getSubSaleDetail.result[0].subsale_code + '&seckey=' + md5Hash2 + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
                            .then(function (response) {
                                response.json().then(function (parsedJson) {
                                    // console.log("parsedJson : ", parsedJson)
                                    setMenuList(parsedJson)

                                    //  console.log('This is the menuList', menuList);
                                })
                            });
                    }
                })
                .catch(error => {
                    this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });
        }
        else {
            fetch(urlAPI).then(function (response) {
                response.json().then(function (parsedJson) {
                    //console.log("parsedJson : ", parsedJson)
                    setMenuList(parsedJson)

                    //  console.log('This is the menuList', menuList);
                })
            });
        }

        return () => { };
    }, []);


    const loginData = UserProfile.getLoginDetails();   
    //console.log("loginData",loginData);

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

    const CONFIG = require("../../configs/api.config.json");
    const [result, setResult] = useState("Response show here.");
    const [menuList, setMenuList] = useState([]);
    const urlAPI = '/api-login/AppList?agencycode=' + loginData.sale_code + '&isShowForRegister=false';
    const ssidEncode = encodeURIComponent(loginData.currentsession);



    //console.log('loginData', loginData);
    // console.log('This is the currentsession', loginData.currentsession);
    // console.log('This is the loginData.isAdmin', loginData.isAdmin);



    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal(modalID) {
        setIsOpen(modalID);
    }

    // const openModal = (modalID) => {
    //     setIsOpen(modalID);
    // }


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    return <Layout id="home-page">
        <SideMenu></SideMenu>
        <div className="content" >
            <Banner />

            <div className="content-list">
                <div className="content-header" >
                    <h3 className="content-topic">{"ระบบงาน"}</h3>
                </div>



                {menuList.length > 0 ? menuList.map((appList, index) => {

                    return (<div className="list-item" key={index} >
                        <a className="item text-viriyah" href={appList.recorddata + "?loginname=" + encodeURI(loginData.loginname) + "&currentSession=" + ssidEncode} target="_blank">{appList.appname}</a>
                        {/* {appList.appid == "0201" ?
                            (
                                <a className="item text-viriyah" href={appList.recorddata + "&loginname=" + loginData.loginname + "&currentSession=" + loginData.currentsession} target="blank">{appList.appname}</a>
                            ) :
                            (
                                <a className="item text-viriyah" href={appList.recorddata + "?loginname=" + loginData.loginname + "&currentSession=" + loginData.currentsession} target="blank">{appList.appname}</a>
                            )} */}
                    </div>)

                }) : null}


                {loginData.issub != "Y" && menuList.length > 0 && menuList.map(function (x) { return x.appid; }).indexOf("0009") < 0 ? menuList.map((appList, index) => {
                    return (
                        <div key={index}>
                            {appList.appid == "0003" ? (
                                <div className="list-item"  >
                                    <a className="item text-viriyah" href={"https://webagency-test.viriyah.co.th/eagency_search_TestLogin/login.aspx" + "?loginname=" + loginData.loginname + "&currentSession=" + ssidEncode} target="blank">{"ตรวจสอบกรมธรรม์ออนไลน์"}</a>
                                </div>
                            ) : null}
                        </div>
                    )
                }) : null}




                <div className="content-header" >
                    <h3 className="content-topic">{"บริการเสริมพิเศษ"}</h3>
                </div>
                <div className="list-item" >
                    <a className="item text-viriyah" href={"/sendsms"}>{"ส่งข้อความ SMS"} </a>
                </div>





                <div className="content-header" >
                    <h3 className="content-topic">{"ข่าวประชาสัมพันธ์"}</h3>
                </div>


                {/* <div className="list-item" >
                    <a className="item-red" href="#"  onClick={() => openModal("modal2")}>{"ปิดปรับปรุงระบบ วันที่ 16 มิถุนายน 2564"}</a>
                    <div>
                        <Modal id="modal2"
                            isOpen={modalIsOpen=="modal2"}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <h2 ref={_subtitle => (subtitle = _subtitle)}>ปิดปรับปรุงระบบ</h2>
                            <form className="modal-form">
                                <div className="form-group col-md-12">
                                <br></br>
                                    <p>{"วันที่ 16 มิถุนายน 2564 ช่วงเวลา  18.00 - 21.00 "}</p>
                                    <p>{"ปิดปรับปรุงระบบเครือข่าย"}</p>
                                    
                                    <p>{"ทำให้มีผลกระทบ ในการเข้าใช้โปรแกรม Agency ไม่สามารถใช้งานได้"}</p>
                                    <br></br>
                                    <p>{"ขออภัยในความไม่สะดวก"}</p>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 divBtnRight">
                                        <button
                                            className="btn btn-secondary mt-4"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            <div className="d-flex justify-content-lg-center align-items-center">
                                              
                                                {"ปิด"}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div> */}


                <div className="list-item" >
                    <a className="item" href="#" onClick={() => openModal("modal1")}>{"การปรับทุนประกันภัย สำหรับแผน UD"}</a>
                    <div>
                        <Modal id='modal1'
                            isOpen={modalIsOpen=='modal1'}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >

                            <h2 ref={_subtitle => (subtitle = _subtitle)}>การปรับทุนประกันภัย สำหรับแผน UD</h2>
                            <form className="modal-form">
                                <div className="form-group col-md-12">
                                    <label>{"บริษัทฯ มีการปรับทุนประกันภัย สำหรับแผน UD 100, UD 150, UD 200 และ UD 250 และยกเลิกแผน UD 120 ส่วนแผน UD 60 และ UD 85 คงเดิม โดยให้มีผลตั้งแต่วันที่ 1 ต.ค. 2563 เป็นต้นไป สำหรับกรมธรรม์ที่คุ้มครองก่อน 1 ต.ค. 2563 ยังคงคุ้มครองตามเงื่อนไขและทุนประกันภัยเดิมจนสิ้นสุดความคุ้มครองตามกรมธรรม์"}</label>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-12 divBtnRight">
                                        <button
                                            className="btn btn-secondary mt-4"
                                            type="button"
                                            onClick={closeModal}
                                        >
                                            <div className="d-flex justify-content-lg-center align-items-center">
                                                {/* <span className="material-icons">
                                            <span className="material-icons">close</span>
                                        </span> */}
                                                {"ปิด"}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>





                {/* <div className="list-item" >
                    <a className="item" href={"https://www.viriyah.com"}>{"ประกันภัยรถยนต์ภาคบังคับ (CMI)"}</a>
                </div>
                <div className="list-item" >
                    <a className="item" href={"https://www.viriyah.com"}>{"ประกันภัยรถยนต์ภาคสมัครใจ (VMI)"}</a>
                </div>
                <div className="list-item" >
                    <a className="item" href={"https://www.viriyah.com"}>{"ประกันภัยรถยนต์ภาคสมัครใจ (VMI) - Lite"}</a>
                </div> */}

            </div>



            <TopLinks />
        </div>




        {/* <button  className="login-form-btn" onClick={getLoginDetail}>{"ทดสอบ"}</button> */}
    </Layout>;
}
