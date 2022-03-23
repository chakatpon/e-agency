import Swal from "sweetalert2";
const CONFIG = require("../../configs/api.config.json");
var UserProfile = (function () {
  var loginData = "";
  var test = "";
  var getLoginDetails = function () {

    loginData = localStorage.getItem('loginData');

    if (loginData == null) {
      //alert('loginData is null');

    } else {

      var tmpData = JSON.parse(loginData);
      //console.log(tmpData);
      var DateTimeNow = new Date();
      // console.log('DateTimeNow= ', DateTimeNow);
      // console.log('tmpData.expiry(Date)= ',  new Date(tmpData.expiry));
      if (DateTimeNow > new Date(tmpData.expiry)) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem('loginData');
        localStorage.removeItem('AdminStatus');
        localStorage.removeItem('AgentStatus');


        // Swal.fire({
        //   title: "เกิดข้อผิดพลาด",
        //   text: "Session Timeout",
        //    icon: "error",
        //   showCancelButton: false,
        //   confirmButtonColor: '#3085d6',
        //   cancelButtonColor: '#d33',
        //   confirmButtonText: 'กลับไปหน้าแรก'
        // }).then((result) => {
        //   if (result.isConfirmed) {

        const CONFIG = require("../../configs/api.config.json");
        window.location = CONFIG.HOMEPAGE.URL;
        //   }
        // })

        loginData = null;
        //return null
      } else if (tmpData.status == "1") {
        //รหัสผ่านหมดอายุ
        loginData = tmpData;
        // console.log('loginData',tmpData);
        // test=getSessionLogin(tmpData);
        // console.log(test);

      }
      else if (tmpData.status == "0") {
        loginData = tmpData;
      }

      // console.log('V2222222');
      // console.log('getLoginDetails= ', localStorage.getItem('loginData'));
    }

    return loginData;
  };

  // var getSessionLogin =(function (data){
  //   var loginSession = new Array();
  //   loginSession.isAdmin = false;
  //   loginSession.loginname = "cdcccc";
  //    return loginSession;
  // });

  var setLoginDetails = function (data) {

    // console.log('setLoginDetails');

    var tmpData = JSON.parse(data);
    //add isAdmin
    if (tmpData.admintype_code != null && tmpData.admintype_code != "")
      tmpData.isAdmin = true;
    else
      tmpData.isAdmin = false;

    //set timeout

    var expiredDate = new Date();
    expiredDate.setMinutes(expiredDate.getMinutes() + 30);

    tmpData.expiry = expiredDate.toString();
    // console.log('set tmpData.expiry= ', tmpData.expiry);
    loginData = JSON.stringify(tmpData);


    //this.setState({ loginData:loginData });
    localStorage.setItem('loginData', loginData);
    // console.log('setLoginDetails= ',localStorage.getItem('loginData'));
  };



  return {
    getLoginDetails: getLoginDetails,
    setLoginDetails: setLoginDetails

  }

})();

export default UserProfile;