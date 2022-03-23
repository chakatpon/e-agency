import React, { useState, useEffect } from 'react';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import Select from "react-select";
import 'moment/locale/th';
import moment from 'moment'
import { GridOverlay, DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Swal from "sweetalert2";
import {
    BrowserRouter as Router,
    Link    
} from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        // '& .MuiDataGrid-root .MuiDataGrid-colCell , .MuiDataGrid-root .MuiDataGrid-cell' :{
        //     width: '200px !important',
        //     minWidth: '200px !important',
        //     maxWidth: '200px !important'
        //   },
        // '& .MuiDataGrid-colCellWrapper': {
        //     backgroundColor: 'var(--viriyah-primary)',
        //     color: '#ffffff',
        //     fontWeight: '600',
        // },
        '& .row-data.sum': {
            fontWeight: 'bold'
        },
        // '& .row-data.two': {
        //     backgroundColor: '#FFFFFF',
        //     textAlign: 'center'
        // },

        '& .MuiDataGrid-root .MuiDataGrid-cellWithRenderer': {
            display: 'initial'
        }
    },
});

export default function SendSMSReport() {
    useEffect(() => {

        return () => { };
    }, []);
    const loginData = UserProfile.getLoginDetails();
    var toDay = moment(new Date(), 'yyyy-MM-DD', 'th');
    var toYear = toDay.locale('en').format('yyyy');
    const yearSel = [
        { value: 0, label: "เลือกปี" },
        { value: (parseInt(toYear) - 1), label: ((parseInt(toYear) - 1) + 543) },
        { value: parseInt(toYear), label: (parseInt(toYear) + 543) }
    ];
    // const rows = [
    //     { id: 1, col1: 'Hello', col2: 'World' },
    //     { id: 2, col1: 'XGrid', col2: 'is Awesome' },
    //     { id: 3, col1: 'Material-UI', col2: 'is Amazing' },
    // ];
    const classes = useStyles();

    const columns = [
        {
            field: 'monthName', headerName: 'เดือน', headerAlign: 'center', sortable: false, width: 150,

            cellClassName: (params) =>
                clsx('MuiDataGrid-cellCenter row-data', {
                    sum: params.row.id == 13
                })
        },
        {
            field: 'successcount', headerName: 'สำเร็จ', headerAlign: 'center', Align: 'right', sortable: false, width: 150,
            cellClassName: (params) =>
                clsx('MuiDataGrid-cellCenter row-data', {
                    sum: params.row.id == 13
                })
            ,
            renderCell: (params) => {
                if (params.row.id != 13) {
                    return <Link target="_blank" className="menu-link text-viriyah"
                        to={{
                            pathname: "/sendsms-report-bymonth",
                            search: "?year=" + params.row.year + "&month=" + params.row.month + "&status=Y",
                            state: { fromDashboard: true }
                        }} >{params.row.successcount}</Link>

                    {/* <a href={"/sendsms-report-bymonth?year="+params.row.year+"&month="+ params.row.month} target="_blank" className="menu-link text-viriyah">{params.getValue("successcount")}</a> */ }
                }

            }
        },
        {
            field: 'failcount', headerName: 'ไม่สำเร็จ', headerAlign: 'center', sortable: false, width: 150,
            cellClassName: (params) =>
                clsx('MuiDataGrid-cellCenter row-data', {
                    sum: params.row.id == 13
                })
            ,
            renderCell: (params) => {
                if (params.row.id != 13) {
                    return <Link target="_blank" className="menu-link text-viriyah"
                    to={{
                        pathname: "/sendsms-report-bymonth",
                        search: "?year=" + params.row.year + "&month=" + params.row.month + "&status=F",
                        state: { fromDashboard: true }
                    }} >{params.row.failcount}</Link>
                }

            }
        },
        {
            field: 'quecount', headerName: 'อยู่ในคิว', headerAlign: 'center', sortable: false, width: 150,
            cellClassName: (params) =>
                clsx('MuiDataGrid-cellCenter row-data', {
                    sum: params.row.id == 13
                })
            ,
            renderCell: (params) => {
                if (params.row.id != 13) {
                    return <Link target="_blank" className="menu-link text-viriyah"
                    to={{
                        pathname: "/sendsms-report-bymonth",
                        search: "?year=" + params.row.year + "&month=" + params.row.month + "&status=N",
                        state: { fromDashboard: true }
                    }} >{params.row.quecount}</Link>
                }
            }
        }
    ];

    // {"agencycode":"03178","empcode":"","failcount":"0","loginname":"","month":"1","quecount":"0","successcount":"109","year":"2020"}
    const [rows, setRows] = useState([]);
    const [yearReport, setYearReport] = useState(yearSel[0]);
    const md5 = require('md5');
    const CONFIG = require("../../configs/api.config.json");
    const handleOnchange = async (e) => {
        // e.preventDefault();
        if (e.value != "") {
            setYearReport(yearSel[e.index])
            var strYear = e.value;
            var md5Hash = md5("GetMonthlySummaryBySaleCode" + loginData.sale_code + strYear + CONFIG.AGENCY_APIS.SSID);
            fetch(CONFIG.AGENCY_APIS.URL + '/SendSMS/GetMonthlySummaryBySaleCode?SaleCode=' + loginData.sale_code + '&Year=' + strYear + '&seckey=' + md5Hash + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
                .then(async response => {
                    const data = await response.json();
                    // console.log(data);
                    if (data.msgOutput == "Success") {
                        setRows(data.result);
                        // console.log(rows);

                    }
                })
                .catch(error => {
                    this.setState({ errorMessage: error.toString() });
                    console.error('There was an error!', error);
                });
        }
        else {
            setRows([]);
        }       
    }

    return (
        <Layout id="sendsms-report-page" >
            <SideMenu></SideMenu>
            <div className="content" >
                {/* <Banner></Banner> */}
                <h2 className="title">{"รายงานสรุปการส่งข้อความ SMS"}</h2>
                <div className="blog" >
                    <div className="form-group">
                        <React.Fragment>
                            <div className="row">

                                <label htmlFor="year" className="col-sm-4 col-form-label text-left text-sm-right">{"ปี:"}
                                    <label className="text-danger">{"* "}</label>
                                </label>
                                <div className="col-sm-3 text-left">
                                    <Select
                                        id="year"
                                        placeholder={"เลือกปี"}
                                        options={yearSel}
                                        value={yearReport}
                                        onChange={(e) => handleOnchange(e)}
                                        className="form-control-select"
                                    />

                                </div>


                            </div>
                            <div className="form-group"></div>

                            <div className="row">

                                <div className="col-sm-12 text-center">
                                    <div style={{ height: 500, width: '100%' }} className={classes.root}>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            disableSelectionOnClick={true}
                                            disableColumnFilter={true}
                                            hideFooterPagination={true}
                                            hideFooterRowCount={true}
                                            rowHeight={40}
                                            headerHeight={40}
                                        />
                                    </div>
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