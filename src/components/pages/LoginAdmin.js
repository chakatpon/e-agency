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
const CONFIG = require("../../configs/api.config.json");
//import ImagePopup from '../shares/ImagePopup';


function LoginAdmin() {
  let history = useHistory();
  const [showPass, setShowPass] = useState(false)
  useEffect(() => {
    //  const loginData = UserProfile.getLoginDetails();

    // if (loginData) {
    //   if (localStorage.getItem("AdminStatus") != "Y" || localStorage.getItem("AdminStatus") == null) {
    //     window.location.href = "/login-admin";
    //   }
    //   else {
    //     window.location.href = "/Admin";
    //   }
    // }
    return () => {
      // console.log("clean up");
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

  const handleLogin = async (e) => {
    e.preventDefault();

    var strUsername = $("input[name='username']").val();
    var strPassword = $("input[name='password']").val();

    var msg = "";
    if (strUsername == "") {
      msg += " - ??????????????????????????????<BR>"
    }
    if (strPassword == "") {
      msg += " - ????????????????????????<BR>"
    }

    if (msg != "") {

      Swal.fire({
        icon: "error",
        title: "??????????????????????????????????????????",
        html: "??????????????????????????? " + msg,
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "?????????????????????????????????"
      });

    } else {

      //const params = { method: 'GET', url: CONFIG.AGENCY_APIS.URL + '/Admin/AdminLogin?LoginName=' + strUsername + '&LoginPassword=' + strPassword }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          LoginName: strUsername,
          LoginPassword: strPassword
        })
      };
      try {
        fetch(CONFIG.AGENCY_APIS.URL + '/Admin/AdminLogin', requestOptions)
          .then(async response => {
            const data = await response.json();
            const loginDetails = data.loginDetails;
            //console.log(data);
            if (data.msgOutput == 'success') {
              localStorage.setItem('AdminStatus', "Y");
              if (loginDetails.status == "0") {
                if (loginDetails.pw_expired_status == "1") {
                  //password ?????????????????????????????????

                  Swal.fire({
                    title: "????????????????????????????????????????????????????????????????????????????????????",
                    html: loginDetails.description,
                    icon: "info",
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '????????????'
                  }).then((result) => {
                    if (result.isConfirmed) {

                      UserProfile.setLoginDetails(JSON.stringify(data.loginDetails));
                      history.push("/admin");
                    }
                  });
                }
                else {

                  UserProfile.setLoginDetails(JSON.stringify(data.loginDetails));
                  history.push("/admin");
                }
              }
              else if (loginDetails.status == "1") {
                //password ?????????????????????

                //console.log('password ?????????????????????');
                // UserProfile.setLoginDetails(JSON.stringify(response.data.loginDetails));

                Swal.fire({
                  title: "????????????????????????????????????????????????????????????????????????",
                  html: loginDetails.description,
                  icon: "error",
                  showCancelButton: false,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '?????????????????????????????????????????????',
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
              // alert(response.data.loginDetails.description);
              Swal.fire({
                icon: "error",
                title: "??????????????????????????????????????????",
                text: data.loginDetails.description,
                showConfirmButton: false,
                showDenyButton: true,
                denyButtonText: "?????????????????????????????????"
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




  return (
    <Layout id="login-page">
      <div className="login-content">
      {/* <ImagePopup /> */}
        <TopLinks />
        <h2 className="title">{"e-Agency"}</h2>
        <form className="login-form">
          <span className="login-form-title">{"Admin Login"}</span>


          <div
            className="wrap-input validate-input"
            data-validate="Valid email is: a@b.c"
          >
            <span className="btn-show-pass-login">
              <span className="material-icons">{"account_circle"}</span>
            </span>
            <label className="txt-head" htmlFor="name">
              {"??????????????????????????????"}
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
              {"????????????????????????"}
            </label>
            <input
              className="form-control form-control-input"
              name="password"
              placeholder="password"
              type={showPass ? "text" : "password"} />
            <span onClick={(event) => this.testFunction(event, "test2")} className="focus-input" data-placeholder="Password"></span>
          </div>

          <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between">
            <div className="text-left">
              {/* <div className="pretty p-default p-curve p-thick p-smooth">
                <input type="checkbox" />
                <div className="state p-primary">
                  <label>{"???????????????????????????????????????????????????????????????"}</label>
                </div>
              </div> */}
            </div>

            <div className="text-right">

              {/* <NavLink
                to={'/register'}
                className="menu-link"
                activeclassname="active"
                exact
              >
                <span>{"??????????????????????????? /"}</span>
              </NavLink> */}

              <NavLink
                to={'/forgot-password-admin'}
                className="menu-link text-viriyah"
                activeclassname="active"
                exact
              >
                <span>{" ??????????????????????????????????"}</span>
              </NavLink>
            </div>
          </div>

          <div className="container-login-form-btn">
            <div className="wrap-login-form-btn">
              {/* <div className="login-form-bgbtn"></div>
              <img className="btn-img" src={ButtonImg} /> */}
              <button onClick={(e) => handleLogin(e)} className="button button-viriyah login-form-btn">{"?????????????????????????????????"}</button>
            </div>
          </div>
        </form>

        <div className="text-center wrap-logo">
          <a href="http://epolicy2.rvp.co.th/" target="_blank">
            <img className="logo-img" src={Logo} />
            <p className="center mt-3">
              {"??????????????????????????????????????????????????????????????????????????????????????? (??????????????????????????????????????????????????????) ?????????????????????????????????????????????"}
            </p>
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default LoginAdmin;
