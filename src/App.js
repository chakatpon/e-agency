import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle, faSearch, faAngleDoubleRight, faPhoneSquare, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 
library.add(fab, faUserCircle, faSearch, faAngleDoubleRight, faPhoneSquare, faEnvelope);
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import LoginAdmin from "./components/pages/LoginAdmin";
import Register from './components/pages/Register';
import Approval from './components/pages/Approval';
import ChangeEmail from './components/pages/ChangeEmail';
import ChangePassword from './components/pages/ChangePassword';
import ForgotPassword from "./components/pages/ForgotPassword";
import APITest from './components/pages/APITest';
import Admin from "./components/pages/Admin";
import ForgotPasswordAdmin from "./components/pages/ForgotPasswordAdmin";
import Contact from "./components/pages/Contact";
import Logout from "./components/pages/Logout";
import UserManual from "./components/pages/UserManual";
import Help from "./components/pages/Help";
import SubAgentAccess from "./components/pages/SubAgentAccess";
import SendSMS from "./components/pages/SendSMS";
import SendSMSReport from "./components/pages/SendSMSReport";
import SendSMSReportByMonth from "./components/pages/SendSMSReportByMonth";
import ViewPDF from "./components/pages/ViewPDF";
import ChangeEmailActive from "./components/pages/ChangeEmailActive";
function App() {
  useEffect(() => {
    // console.log("effect was call");
    return () => {
      // console.log("clean up App.js");
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" exact={true} component={Home}></Route> */}
          <Route path="/" exact={true} component={Login}></Route>
          <Route path="/login-admin" component={LoginAdmin}></Route>
          <Route path="/home"  component={Home}></Route> 
          <Route path="/admin" component={Admin}></Route>
          <Route path="/approval" component={Approval}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/api-test" component={APITest}></Route>
          <Route path="/change-email" component={ChangeEmail}></Route>
          <Route path="/change-password" component={ChangePassword}></Route>
          <Route path="/forgot-password" component={ForgotPassword}></Route>
          <Route path="/forgot-password-admin" component={ForgotPasswordAdmin}></Route>
          <Route path="/contact" component={Contact}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/usermanual" component={UserManual}></Route>
          <Route path="/help" component={Help}></Route>
          <Route path="/subgent-access" component={SubAgentAccess}></Route>
          <Route path="/sendsms" component={SendSMS}></Route>
          <Route path="/sendsms-report" component={SendSMSReport}></Route>
          <Route path="/sendsms-report-bymonth" component={SendSMSReportByMonth}></Route>
          <Route path="/viewpdf" component={ViewPDF}></Route>
          <Route path="/change-email-active" component={ChangeEmailActive}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
