import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, { useEffect, useState } from "react";
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import Layout from "../shares/Layout";
import TopLinks from "../shares/TopLinks";
import $ from 'jquery';
import ButtonImg from "../../assets/img/lotus_pattern2.png";
import Logo from "../../assets/img/logo_rvpXS.png";
import apiTestService from "../../libs/service.apiTest";
import UserProfile from '../shares/UserProfile';
import { AlternateEmail } from "@material-ui/icons";
import Swal from "sweetalert2";
import { isIE } from 'react-device-detect';

const CONFIG = require("../../configs/api.config.json");

//import ImagePopup from '../shares/ImagePopup';


function Login() {
  let history = useHistory();
  const [showPass, setShowPass] = useState(false)
  useEffect(() => {
    //  const loginData = UserProfile.getLoginDetails();

    // if (loginData) {
    //   if (localStorage.getItem("AgentStatus") != "Y" || localStorage.getItem("AgentStatus") == null) {
    //     window.location.href = "/";
    //   }
    //   else {
    //     window.location.href = "/home";
    //   }
    // }
    return () => {

    };
  }, []);

  const loginData = UserProfile.getLoginDetails();

  if (loginData) {
    if (loginData.isAdmin) {
      if (localStorage.getItem("AdminStatus") != "Y" || localStorage.getItem("AdminStatus") == null) {
        window.location.href = "/login-admin";
      }
      else {
        window.location.href = "/Admin";
      }
    }
    else {
      if (localStorage.getItem("AgentStatus") != "Y" || localStorage.getItem("AgentStatus") == null) {
        window.location.href = "/";
      }
      else {
        window.location.href = "/home";
      }
    }
  }

  const onShowPass = () => {
    if (!showPass) {
      setShowPass(true)
    } else {
      setShowPass(false)
    }
  }

  const [result, setResult] = useState("Response show here.");
  const [val, setVal] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    var strUsername = $("input[name='username']").val();
    var strPassword = $("input[name='password']").val();



    var msg = "";

    if (strUsername == "") {
      msg += " - รหัสผู้ใช้ <BR>"
    }
    if (strPassword == "") {
      msg += " - รหัสผ่าน <BR>"
    }

    if (msg != "") {

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        html: "กรุณาระบุ  <BR>" + msg,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "ลองอีกครั้ง"
      });

    } else {





      const requestOptions = {
        redirect: 'follow',
        method: 'POST',
        //  credentials: "include",
        // mode: 'no-cors',
        // headers: myHeaders,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          LoginName: strUsername,
          LoginPassword: strPassword
        })
      };
      try {


        //  // fetch(CONFIG.AGENCY_APIS.URL + '/AppList?agencycode=13693&isShowForRegister=true'
        //   fetch('/api',requestOptions
        //   ).then(function (response) {
        //     console.log("response : ", response)
        //     // response.json().then(function (parsedJson) {
        //     //     //console.log("parsedJson : ", parsedJson)
        //     //     setMenuList(parsedJson)

        //     //     //  console.log('This is the menuList', menuList);
        //     // })
        // });



        // .then(async response => {

        //   const data = await response.json();
        //   const loginDetails = data.loginDetails;
        //   console.log(data);
        //   console.log(response);
        //     if (response.status != 200) {
        //         throw new Error('Bad response from server');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        //     console.log(data);
        // });
        //CONFIG.AGENCY_APIS.URL
        fetch(CONFIG.AGENCY_APIS.URL + '/Agents/SaleLogin', requestOptions)
          .then(async response => {
            const data = await response.json();
            const loginDetails = data.loginDetails;
            // console.log(data);
            if (data.msgOutput == "success") {
              localStorage.setItem('AgentStatus', "Y");
              if (loginDetails.status == "0") {
                if (loginDetails.pw_expired_status == "1") {
                  //password ใกล้หมดอายุ
                  //console.log("password ใกล้หมดอายุ");
                  Swal.fire({
                    title: "แจ้งเตือนรหัสผ่านใกล้หมดอายุ",
                    html: loginDetails.description,
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'ตกลง'
                  }).then((result) => {
                    if (result.isConfirmed) {

                      UserProfile.setLoginDetails(JSON.stringify(data.loginDetails));
                      history.push("/home")
                    }
                  })
                } else {
                  UserProfile.setLoginDetails(JSON.stringify(data.loginDetails));
                  history.push("/home")
                }
              } else if (loginDetails.status == "1") {
                //password หมดอายุ

                //console.log('password หมดอายุ');
                // UserProfile.setLoginDetails(JSON.stringify(response.data.loginDetails));

                Swal.fire({
                  title: "แจ้งเตือนรหัสผ่านหมดอายุ",
                  html: loginDetails.description,
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'เปลี่ยนรหัสผ่าน',
                  allowOutsideClick: false
                }).then((result) => {
                  if (result.isConfirmed) {
                    UserProfile.setLoginDetails(JSON.stringify(data.loginDetails));
                    history.push("/change-password")
                  }
                });
              }
            }
            else {
              Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: data.loginDetails.description,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "ลองอีกครั้ง"
              });
            }
          });

      } catch (error) {
        const errorString = await String(error);
        setResult(errorString);
        console.log('error');
      }
    }


  }

  const testFunction = (param1, param2) => {

  }


  if (isIE) {
    // return (
    //   <div>
    //     <h1>Hi there. You’re using an outdated browser</h1>
    //     <p>For a safer and faster user experience use a modern browser like Chrome, Firefox, Safari, Opera, or Edge.</p>
    //   </div>
    // )

    //alert('ssss');

  } else {
    return (

      <Layout id="login-page">
        <div className="login-content">
          {/* <ImagePopup /> */}
          <TopLinks />
          <h2 className="title">{"e-Agency"}</h2>
          <form className="login-form">
            <span className="login-form-title">{"Agent Login"}</span>

            <div
              className="wrap-input validate-input"
              data-validate="Valid email is: a@b.c"
            >
              <span className="btn-show-pass-login">
                <span className="material-icons">{"account_circle"}</span>
              </span>
              <label className="txt-head" htmlFor="name">
                {"รหัสผู้ใช้"}
              </label>
              <input
                className="form-control form-control-input"
                type="text"
                name="username"
                placeholder="username"
              />
              <span className="focus-input" data-placeholder="Username"></span>
            </div>

            <div
              className="wrap-input validate-input"
              data-validate="Enter password"
            >
              <span className="btn-show-pass-login">
                <span className="material-icons" onClick={() => onShowPass()}>{showPass ? "visibility" : "visibility_off"}</span>
              </span>
              <label className="txt-head" htmlFor="password">
                {"รหัสผ่าน"}
              </label>
              <input
                className="form-control form-control-input"
                name="password"
                placeholder="password"
                type={showPass ? "text" : "password"}
                //onKeyPress={(e) =>  isNotKeyThai(e)} 
                //onKeyPress={this.handleKeyPress} 
                // onKeyPress={handleKeyPress}
                value={val}
                onChange={e => setVal(e.target.value.replace(/[^A-Za-z0-9-\/\\^$*+?._@!#%&()|[\]{}]/g, ""))}
              />

              {/* <span onClick={(event) => this.testFunction(event, "test2")} className="focus-input" data-placeholder="Password"></span> */}
            </div>

            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
              <div className="text-left">
                {/* <div className="pretty p-default p-curve p-thick p-smooth">
                <input type="checkbox" />
                <div className="state p-primary">
                  <label>{"จำรหัสผ่านเข้าสู่ระบบ"}</label>
                </div>
              </div> */}
              </div>

              <div className="text-right">
                <span>ไม่มีรหัสผู้ใช้? </span>
                <NavLink
                  to={'/register'}
                  className="menu-link text-viriyah"
                  activeclassname="active"
                  exact
                >
                  <span>{"คลิกที่นี่เพื่อลงทะเบียน"}</span>
                </NavLink>
                <span> / </span>
                <NavLink
                  to={'/forgot-password'}
                  className="menu-link text-viriyah"
                  activeclassname="active"
                  exact
                >
                  <span>{" ลืมรหัสผ่าน?"}</span>
                </NavLink>





              </div>
            </div>

            <div className="container-login-form-btn">
              <div className="wrap-login-form-btn">
                {/* <div className="login-form-bgbtn"></div>
              <img className="btn-img" src={ButtonImg} />*/}
                <button onClick={(e) => handleLogin(e)} className="button button-viriyah login-form-btn">{"เข้าสู่ระบบ"}</button>
              </div>


            </div>
          </form>

          <div className="text-center wrap-logo">
            <a href="http://epolicy2.rvp.co.th/" target="_blank">
              <img className="logo-img" src={Logo} />
              <p className="center mt-3">
                {"บันทึกข้อมูลกรมธรรม์ภาคบังคับ (เฉพาะรถจักรยานยนต์) ผ่านบริษัทกลางฯ"}
              </p>
            </a>
          </div>
        </div>




      </Layout>
    );
  }
}
export default Login;
