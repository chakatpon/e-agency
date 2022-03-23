import React, { useState, useEffect } from "react";
import $ from 'jquery';
import SideMenu from '../shares/SideMenu';
import TopLinks from '../shares/TopLinks';
import Banner from '../shares/Banner';
import Layout from "../shares/Layout";
import UserProfile from '../shares/UserProfile';
import apiTestService from "../../libs/service.apiTest";
import Swal from "sweetalert2";


export default function Approval() {
  useEffect(() => {
    fetch(urlAPI).then(function (response) {
      response.json().then(function (parsedJson) {
        console.log("parsedJson : ", parsedJson)
        setMenuList(parsedJson)

        console.log('This is the menuList', menuList);
      })
    });
    return () => { };
  }, []);

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

  const CONFIG = require("../../configs/api.config.json");
  const [result, setResult] = useState("Response show here.");
  const [menuList, setMenuList] = useState([])

  const urlAPI = CONFIG.AGENCY_APIS.URL + '/AppList?agencycode=' + loginData.sale_code + '&isShowForRegister=true';

  const handleRegisterApp = async (e) => {
    e.preventDefault();
    var arrayAppList = [];
    var arrayAppListAgentRequest = [];
    $('input:checkbox.checkAppList').each(function () {
      if (this.checked) {
        arrayAppList.push($(this).val());
        if (!this.disabled) {
          arrayAppListAgentRequest.push($(this).val());
        }
      }
    });


    var strAppList = arrayAppList.join(',');
    var strAppListAgentRequest = arrayAppListAgentRequest.join(',');
    console.log('strAppList=',strAppList);
    console.log('strAppListAgentRequest=',strAppListAgentRequest);
    if (strAppListAgentRequest == "") {

      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาเลือกระบบงาน",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: "ลองอีกครั้ง"
      });
    }
    else {
      const params = { method: 'GET', url: CONFIG.AGENCY_APIS.URL + '/Register/RegisterApp?saleCode=' + loginData.sale_code + '&appSelect=' + strAppList }

      try {
        const response = await apiTestService(params);

        //console.log(response);

        if (response.data == "Success") {

          Swal.fire({
            icon: "success",
            title: "ลงทะเบียนสำเร็จ กรุณารอฝ่ายรับประกันอนุมัติสิทธิ์",
            showConfirmButton: true,
            confirmButtonText: "OK",
            showDenyButton: false,
          });


        } else {
          //  alert(response.data);

          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: response.data,
            showConfirmButton: false,
            showDenyButton: true,
            denyButtonText: "ลองอีกครั้ง"
          });

        }

      } catch (error) {
        const errorString = await String(error);
        setResult(errorString);
        console.log('error');
      }

      fetch(urlAPI).then(function (response) {
        response.json().then(function (parsedJson) {
          console.log("parsedJson : ", parsedJson)
          setMenuList(parsedJson)
          console.log('This is the menuList', menuList);
        })
      });

      // $('input:checkbox.checkAppList').each(function () {
      //   this.checked = false;
      // });
    }
  }

  return <Layout id="approval-page" >
    <SideMenu />
    <div className="content" >
      <Banner user="e-agent System" />
      <h2 className="title">{"ขออนุมัติสิทธิเข้าใช้ระบบงาน"}</h2>
      <div className="blog pb-2">



        {menuList.length > 0 ? menuList.map((appList, index) => {

          return (
            <div className="w-100 text-left pl-2 py-2" key={index}>
              <div className="pretty p-default p-curve p-thick p-smooth">
                <input className="checkAppList" type="checkbox"
                  value={appList.appid}
                  disabled={appList.status == 'Y' || appList.status == 'N' ? true : false}
                  defaultChecked={appList.status == 'Y' || appList.status == 'N' ? true : false}
                />
                <div className="state p-primary">
                  <label>{appList.appname}{"   "}{appList.status == "Y" ? "**มีสิทธิแล้ว" : ""}{appList.status == "N" ? "รอฝ่ายรับประกันอนุมัติสิทธิ์" : ""}</label>
                </div>

              </div>
            </div>
          )
        }) : null}
        <div className="w-100 text-left pd-2 my-3" >
          <button onClick={(e) => handleRegisterApp(e)} className="button button-viriyah" >{"ขออนุมัติ"}</button>
        </div>
      </div>

      <TopLinks />
    </div>
  </Layout>
    ;
}
