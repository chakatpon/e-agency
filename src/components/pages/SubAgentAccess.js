import React, { useState, useEffect } from "react";
import $ from 'jquery';
import Select from "react-select";
import SideMenu from '../shares/SideMenu';
import TopLinks from '../shares/TopLinks';
import Banner from '../shares/Banner';
import Layout from "../shares/Layout";
import UserProfile from '../shares/UserProfile';
import Swal from "sweetalert2";
const md5 = require('md5');
const CONFIG = require("../../configs/api.config.json");
// import SubSaleDropdown from '../shares/SubSaleDropDown';
import ReactDOM from 'react-dom'


function SubAgentAccess() {
    useEffect(() => {

        fetch(CONFIG.AGENCY_APIS.URL + '/SubAgent/GetSubSale?SaleCode=' + strSaleCode + '&BranchCode=' + strBranchCode + '&SubSaleLoginName=' + '&seckey=' + md5Hash + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
            .then(async response => {
                const data = await response.json();
                if (data.getSubSaleDetail.msgOutput == "Success") {
                    //  console.log('getSubSaleDetail', data.getSubSaleDetail.result);
                    setListMap(data.getSubSaleDetail.result);
                    // console.log('listMap', listMap);
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });

            // const mastodonSongs = listMap.filter(list => {
            //     return list.subsale_code === 107764;
            //   });
            // setSubSaleSelect(mastodonSongs);
            // console.log('mastodonSongs',mastodonSongs);

        return () => { };

        

    }, []);
    const loginData = UserProfile.getLoginDetails();
    var strSaleCode = loginData.sale_code;
    var strBranchCode = loginData.branch_code;
    var md5Hash = md5("GetSubSale" + strSaleCode + strBranchCode + loginData.loginname + CONFIG.AGENCY_APIS.SSID);
    const [listMap, setListMap] = useState([]);
    const [subSaleSelect, setSubSaleSelect] = useState(listMap);
    const [menuList, setMenuList] = useState([])

    // console.log('strSubSaleCode', subSaleSelect.value);
    const handleOnchange = async (e) => {
        // e.preventDefault();
        setMenuList([]);
        setSubSaleSelect(listMap[e.index])

        var strSubSaleCode = e.value;
        var md5Hash2 = md5("GetAppListForSubAgent" + strSaleCode + strSubSaleCode + CONFIG.AGENCY_APIS.SSID);
        console.log('strSubSaleCode', strSubSaleCode);
        fetch(CONFIG.AGENCY_APIS.URL + '/SubAgent/GetAppListForSubAgent?SaleCode=' + strSaleCode + '&SubSaleCode=' + strSubSaleCode + '&seckey=' + md5Hash2 + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
            .then(async response => {
                const data = await response.json();
                if (data.getSubSaleAppList.msgOutput == "Success") {
                    //  console.log('getSubSaleAppList', data.getSubSaleAppList.result);
                    setMenuList(data.getSubSaleAppList.result);
                    $("#hdSubSaleCode").val(strSubSaleCode);
                    // console.log('listMap', listMap);
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    const handleOnClickAppList = async (e) => {
        e.preventDefault();

        var arrayAppList = [];
        $('input:checkbox.checkAppList').each(function () {
            if (this.checked) {
                arrayAppList.push($(this).val());
            }
        });

        var strAppList = arrayAppList.join(',');
        var subSaleCode = $("#hdSubSaleCode").val();

        if (strAppList == "") {

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
            var md5Hash = md5("PostSubAgencyAppList" + strSaleCode + subSaleCode + strAppList + CONFIG.AGENCY_APIS.SSID);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    SaleCode: strSaleCode,
                    SubSaleCode: subSaleCode,
                    AppID: strAppList,                  
                    seckey: md5Hash,
                    ssid: CONFIG.AGENCY_APIS.SSID
                })
            };
            fetch(CONFIG.AGENCY_APIS.URL + '/SubAgent/PostSubAgencyAppList', requestOptions)
                .then(async response => {
                    const data = await response.json();
                    if (data.msgOutput == "Success") {

                        Swal.fire({
                            icon: "success",
                            title: "อนุมัติสิทธิ์เข้าใช้ระบบงานเรียบร้อยแล้ว",
                            showConfirmButton: true,
                            confirmButtonText: "ตกลง",
                            confirmButtonColor: '#3085d6',
                            showDenyButton: false,
                            allowOutsideClick: false
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

            //   fetch(urlAPI).then(function (response) {
            //     response.json().then(function (parsedJson) {
            //       console.log("parsedJson : ", parsedJson)
            //       setMenuList(parsedJson)
            //       console.log('This is the menuList', menuList);
            //     })
            //   });

            //   $('input:checkbox.checkAppList').each(function () {
            //     this.checked = false;
            //   });
        }
    }

    return (

        <Layout className="subagent-access-page">
            <SideMenu />
            <div className="content" >
                <Banner user="e-agent System" />
                <h2 className="title">{"จัดการสิทธิ์เข้าใช้ระบบงานของตัวแทนย่อย"}</h2>
                <div className="blog" >
                    <div className="form-group">
                        <div className="row">
                            <label htmlFor="subSaleCode" className="col-sm-3 col-form-label text-left text-sm-right">{"ตัวแทนย่อย:"}
                                <label className="text-danger">{"* "}</label>
                            </label>
                            <div className="col-sm-4 text-left">
                                <React.Fragment>
                                    <Select
                                        id="subSaleCode"
                                        placeholder={"เลือกตัวแทนย่อย"}
                                        value={subSaleSelect}
                                        options={listMap.map((item1, index) => {
                                            return {
                                                label: item1.subsale_code + " : " + item1.subsale_name,
                                                value: item1.subsale_code,
                                                key: index
                                            };
                                        })}
                                        onChange={(e) => handleOnchange(e)}
                                        className="form-control-select"
                                    />
                                </React.Fragment>
                            </div>
                            <input type="hidden" id="hdSubSaleCode" />
                        </div>
                        <div className="form-group">

                        </div>
                        <div className="form-group"></div>
                        <div className="form-group"></div>
                        <div className="row">
                            {menuList.length > 0 ? menuList.map((appList, index) => {
                                return (
                                    <div className="w-100 py-2 text-left" key={index}>
                                        <div className="pl-2  pretty p-default p-curve p-thick p-smooth">
                                            <input className="checkAppList" type="checkbox"
                                                value={appList.appid}
                                                defaultChecked={appList.status == 'Y' || appList.status == 'N' ? true : false}
                                            />
                                            <div className="state p-primary">
                                                <label>{appList.appname}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : null}
                        </div>
                        {menuList.length > 0 ? (
                            <div className="w-100 text-left pd-2 my-3" >
                                <button onClick={(e) => handleOnClickAppList(e)} className="button button-viriyah" >{"อนุมัติสิทธิ์"}</button>
                            </div>
                        ) : null}


                    </div>



                </div>
                <TopLinks />
            </div>
        </Layout>

    )
}
export default SubAgentAccess


// class AppXXX extends React.Component {

//     constructor() {
//         super();
//         this.state = {

//         }
//         this.myRefs = React.createRef();
//         this.printValues = this.printValues.bind(this);
//     }

//     printValues() {
//         console.log(this.myRefs.current.selectedValues);
//         console.log(this.myRefs.current.state);

//     }

//     render() {
//         return (

//             <div>


//                 <SubSaleDropdown id='themodule' ref={this.myRefs} />




//             </div>
//         )
//     }
// }
// // ReactDOM.render(
// //     <Layout className="subagent-access-page">
// //             <SideMenu />
// //             <div className="content" >
// //                 <Banner user="e-agent System" />
// //                 <h2 className="title">{"จัดการสิทธิ์เข้าใช้ระบบงานของตัวแทนย่อย"}</h2>
// //                 <div className="blog" >
// //     <SubAgentAccess name="World" />
// //     </div>
// //             </div>
// //         </Layout>,

// //     document.getElementById('container')
// //   );
// // export default SubAgentAccess