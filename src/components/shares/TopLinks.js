import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, withRouter, useHistory } from 'react-router-dom';
import UserProfile from '../shares/UserProfile';
function TopLinks() {
  const loginData = UserProfile.getLoginDetails();
  // console.log('loginData', loginData);
  return (
    <div className="top-links d-none d-sm-block">
      <div className="list-menu">
        {!loginData ? (
          <NavLink
            to={'/'}
            className="menu-link text-viriyah"
            activeclassname="active"
            exact
          >
            <span>{"เข้าสู่ระบบ e-Agency"}</span>
          </NavLink>

        ) : null}

        <a
          className="list-status text-viriyah"
          href="https://www.viriyah.co.th/"
          target="_blank"
        >
          www.viriyah.co.th
        </a>
        <a className="list-status text-viriyah" href="http://www.oic.or.th/" target="_blank">
          คปภ.
        </a>
        <a
          className="list-status text-viriyah"
          href="http://agencymail.viriyah.co.th/exchange"
          target="_blank"
        >
          เข้าสู่ระบบอีเมล
        </a>
        {/* <a
          className="list-status"
          href="https://agency.viriyah.co.th/agency_new/contact.aspx"
          target="_blank"
        >
          ติดต่อเจ้าหน้าที่
        </a> */}

        {loginData ? (
          <>
            {!loginData.isAdmin ? (
              <NavLink
                to={'/Contact'}
                className="menu-link text-viriyah"
                activeclassname="active"
                exact
              >
                <span>{"ติดต่อเจ้าหน้าที่"}</span>
              </NavLink>
            ) : null}
          </>

        ) : (
            <NavLink
              to={'/Contact'}
              className="menu-link text-viriyah"
              activeclassname="active"
              exact
            >
              <span>{"ติดต่อเจ้าหน้าที่"}</span>
            </NavLink>)}

        {loginData ? (
          <>

            {!loginData.isAdmin ? (
              <NavLink
                to={'/Help'}
                className="menu-link text-viriyah"
                activeclassname="active"
                exact
              >
                <span>{"ช่วยเหลือ"}</span>
              </NavLink>
            )
              : null}
          </>
        ) : (
            <NavLink
              to={'/Help'}
              className="menu-link text-viriyah"
              activeclassname="active"
              exact
            >
              <span>{"ช่วยเหลือ"}</span>
            </NavLink>)}




        {/* <a
          className="list-status"
          href="https://agency.viriyah.co.th/agency_new/help.aspx"
          target="_blank"
        >
          {"เกี่ยวกับโปรแกรม"}
        </a> */}
        {!loginData ? (
          <NavLink
            to={'/login-admin'}
            className="menu-link text-viriyah"
            activeclassname="active"
            exact
          >
            <span>{"สำหรับผู้ดูแลระบบ(Admin)"}</span>
          </NavLink>
        ) :
          null}



      </div>
    </div>
  );
}

export default TopLinks;
