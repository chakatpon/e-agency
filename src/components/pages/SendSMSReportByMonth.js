import React, { useState, useEffect } from 'react';
import SideMenu from '../shares/SideMenu';
import Layout from '../shares/Layout';
import Banner from '../shares/Banner';
import TopLinks from '../shares/TopLinks';
import UserProfile from '../shares/UserProfile';
import { GridOverlay, DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import Utility from '../../libs/Utility';
const CONFIG = require("../../configs/api.config.json");
const md5 = require('md5');

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
class SendSMSReportByMonth extends React.Component {
    state = {
        yearThai: {},
        monthName: {},
        rows: [],
        rowsPerPage: 5,
        page: 0,
    };

    componentDidMount() {
        const { search } = this.props.location
        const parsed = queryString.parse(search);
        //console.log('parsed', parsed);
        this.setState({ yearThai: parseInt(parsed.year) + 543 });
        this.setState({ monthName: Utility.getMonthThai(parsed.month) });
        //const monthName = Utility.getMonthThai(parsed.month);
        //const yearThai = parseInt(parsed.year) + 543;
        const loginData = UserProfile.getLoginDetails();
        // fetch("https://swapi.co/api/planets/4/")
        //   .then(res => res.json())
        //   .then(res => this.setState({ planets: res }))
        //   .catch(() => this.setState({ hasErrors: true }));
        var md5Hash = md5("GetReportSMSDetailBySaleCode" + loginData.sale_code + parsed.year + parsed.month + parsed.status + CONFIG.AGENCY_APIS.SSID);
        fetch(CONFIG.AGENCY_APIS.URL + '/SendSMS/GetReportSMSDetailBySaleCode?SaleCode=' + loginData.sale_code + '&Year=' + parsed.year + '&Month=' + parsed.month + '&Status=' + parsed.status + '&seckey=' + md5Hash + '&ssid=' + CONFIG.AGENCY_APIS.SSID)
            .then(async response => {
                const data = await response.json();
                console.log(data);
                if (data.msgOutput == "Success") {
                    this.setState({ rows: data.result })
                    //setRows(data.result);
                    console.log(this.state.rows);

                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const handleChangePage = (event, newPage) => {
            console.log('newPage', newPage);
            this.setState({ page: newPage })
        };
        const handleChangeRowsPerPage = (event) => {
            this.setState({
                rowsPerPage: parseInt(event.target.value, 10),
                page: 0
            })

        };
        const columns = [
            {
                field: 'recordDate', headerName: 'วันที่บันทึก', headerAlign: 'center', sortable: false
            },
            {
                field: 'queDate', headerName: 'กำหนดส่ง', headerAlign: 'center', sortable: false
            },
            {
                field: 'sentDate', headerName: 'วันที่ส่ง', headerAlign: 'center', sortable: false
            },
            {
                field: 'mobile', headerName: 'มือถือผู้รับ', headerAlign: 'center', sortable: false, width: 110
            },
            {
                field: 'status', headerName: 'สถานะ', headerAlign: 'center', sortable: false
            },
            {
                field: 'message', headerName: 'ข้อความที่ส่ง', headerAlign: 'center', sortable: false, width: 300
            }
        ];
        // const rows = [
        //     { id: 1, record_date: 'Hello' },
        //     { id: 2, record_date: 'XGrid' },
        //     { id: 3, record_date: 'Material-UI' },
        // ];
        // const { search } = this.props.location
        // const parsed = queryString.parse(search);
        // //console.log('parsed', parsed);
        // const monthName = Utility.getMonthThai(parsed.month);
        // const yearThai = parseInt(parsed.year) + 543;
        const headCells = [
            { id: 'recordDate', disablePadding: true, label: 'วันที่บันทึก' },
            { id: 'queDate', disablePadding: false, label: 'กำหนดส่ง' },
            { id: 'sentDate', disablePadding: false, label: 'วันที่ส่ง' },
            { id: 'mobile', disablePadding: false, label: 'มือถือผู้รับ' },
            { id: 'status', disablePadding: false, label: 'สถานะ' },
            { id: 'message', disablePadding: false, label: 'ข้อความที่ส่ง' },
        ];
        function stableSort(array) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            // stabilizedThis.sort((a, b) => {
            //     const order = comparator(a[0], b[0]);
            //     if (order !== 0) return order;
            //     return a[1] - b[1];
            // });
            return stabilizedThis.map((el) => el[0]);
        }

        return (
            <Layout id="sendsms-report-bymonth-page" >
                <SideMenu></SideMenu>
                <div className="content" >
                    <div>{JSON.stringify(this.state.planets)}</div>
                    <h2 className="title">{"รายงานการส่งข้อความ SMS"}</h2>
                    <div className="blog" >
                        <div className="form-group">

                            <div className="row">
                                <label className="col-sm-12 col-form-label text-center f-30px text-viriyah">
                                    {"ประจำปี  " + this.state.yearThai + "  เดือน  " + this.state.monthName}
                                </label>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    <Paper>
                                       
                                        <TableContainer>
                                            <Table

                                                aria-labelledby="tableTitle"
                                                size={'medium'}
                                                aria-label="enhanced table"
                                            >
                                                <TableHead>
                                                    <TableRow>
                                                        {headCells.map((headCell) => (
                                                            <TableCell
                                                                key={headCell.id}
                                                                width={100}
                                                            // padding={headCell.disablePadding ? 'none' : 'default'}

                                                            >
                                                                {headCell.label}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody >
                                                    {stableSort(this.state.rows)
                                                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                                        .map((row, index) => {

                                                            return (
                                                                <TableRow key={index} >
                                                                    <TableCell align="left">{row.recordDate}</TableCell>
                                                                    <TableCell align="left">{row.queDate}</TableCell>
                                                                    <TableCell align="left">{row.sentDate}</TableCell>
                                                                    <TableCell align="left">{row.mobile}</TableCell>
                                                                    <TableCell align="left">{row.status}</TableCell>
                                                                    <TableCell align="left">{row.message}</TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    {/* {this.state.rows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align="left">{row.recordDate}</TableCell>
                                                    <TableCell align="left">{row.queDate}</TableCell>
                                                    <TableCell align="left">{row.sentDate}</TableCell>
                                                    <TableCell align="left">{row.mobile}</TableCell>
                                                    <TableCell align="left">{row.status}</TableCell>
                                                    <TableCell align="left">{row.message}</TableCell>
                                                </TableRow>
                                            ))} */}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={this.state.rows.length}
                                            rowsPerPage={this.state.rowsPerPage}
                                            page={this.state.page}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                    {/* <div style={{ height: 700, width: '100%' }} >
                                            <DataGrid
                                                rows={this.state.rows}
                                                columns={columns}
                                                pageSize={5}
                                            />

                                        </div> */}
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default SendSMSReportByMonth
// export default function SendSMSReportByMonth() {
//     // console.log(this.props);
//     return (
//         <Layout id="sendsms-report-bymonth-page" >
//             <SideMenu></SideMenu>
//             <div className="content" >
//                 <h2 className="title">{"รายงานการส่งข้อความ SMS"}</h2>
//             </div>
//         </Layout>
//     )
// }

// export default SendSMSReportByMonth;