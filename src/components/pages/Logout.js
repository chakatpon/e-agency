import React, { useState, useEffect } from "react";
import UserProfile from '../shares/UserProfile';

function Logout() {

    const loginData = UserProfile.getLoginDetails();
    if (loginData != null) {       
        if (loginData.isAdmin) {
            localStorage.removeItem('loginData');
            localStorage.removeItem('AdminStatus');
            window.location.href = "/login-admin";
        }
        else{
            localStorage.removeItem('loginData');
            localStorage.removeItem('AgentStatus');
            window.location.href = "/";
        }
    }
    else
        window.location.href = "/";
        
    return (
        <div></div>
    );
}

export default Logout;