import React, { useState, useEffect } from 'react'
import Select from "react-select";
import UserProfile from '../shares/UserProfile';
const md5 = require('md5');
const CONFIG = require("../../configs/api.config.json");

const SubSaleDropdown = props => {
   
    useEffect(() => {
      
       
        fetch(CONFIG.AGENCY_APIS.URL + '/SubAgent/GetSubSale?SaleCode=' + strSaleCode + '&BranchCode=' + strBranchCode + '&seckey=' + md5Hash + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
            .then(async response => {
                const data = await response.json();
                if (data.getSubSaleDetail.msgOutput == "Success") {
                    // console.log('getSubSaleDetail', data.getSubSaleDetail.result);
                    setListMap(data.getSubSaleDetail.result);
                    console.log('listMap', listMap);
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
        return () => { };
    }, []);

   
   
    const loginData = UserProfile.getLoginDetails();
    var strSaleCode = loginData.sale_code;
    var strBranchCode = loginData.branch_code;
    var md5Hash = md5("GetSubSale" + strSaleCode + strBranchCode + CONFIG.AGENCY_APIS.SSID);
    const [listMap, setListMap] = useState([]);
    const [subSaleSelect, setSubSaleSelect] = useState(listMap);
    console.log('subSaleSelect',subSaleSelect);
    return (
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
                onChange={select => setSubSaleSelect(select)}
            />

        </React.Fragment>

    );

}
export default SubSaleDropdown