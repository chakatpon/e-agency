
export function ValidateEmail(email) {
  // /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]||\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])*$/
  // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //  if (regex.test(email))
  var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (regex.test(String(email).toLowerCase())) {
    return "";
  }
  else {
    return " อีเมลแอดเดรสไม่ถูกต้อง";
    
  }
}

// export function ValidateEmail2222(email) {

//   console.log('ValidateEmail', email);
//   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
//     return (true)
//   }
//   else {
//     return (false)
//   }
// }

export function ValidateSaleCode(saleCode) {
    if (/[^a-zA-Z0-9-]/.test(saleCode)) {
      return " รหัสตัวแทนจะต้องไม่มีอักขระพิเศษ";
    }if (saleCode.length !=5) {
      return " กรุณาระบุรหัสตัวแทน 5 หลัก";  
    }else{return "";}
}

export function ValidateCardID(cartID) {
  if (/[^0-9-]/.test(cartID) ) {
    return " เลขบัตรประจำตัวประชาชนจะต้องเป็นตัวเลขเท่านั้น";
  }if(cartID.length !=13){
    return " กรุณาระบุเลขบัตรประจำตัวประชาชน 13 หลัก"
  }else{return "";}
}

export function ValidateTaxID(taxID) {
  if (/[^0-9-]/.test(taxID) ) {
    return " เลขบัตรประจำตัวผู้เสียภาษีจะต้องเป็นตัวเลขเท่านั้น";
  }if(taxID.length !=13){
    return " กรุณาระบุเลขบัตรประจำตัวผู้เสียภาษี 13 หลัก"
  }else{return "";}
}

export function ValidateFullName(fullName) {
  if (/[^((a-zA-Z0-9ก-๏),(\s),(a-zA-Z0-9ก-๏))]/.test(fullName) ) {
    return " ชื่อ-นามสกุลจะต้องไม่มีอักขระพิเศษ";
  }else{return "";}
}

export function ValidateTelno(telno) {
  if (/[^0-9-]/.test(telno) ) {
    console.log("MAMA")
    return " หมายเลขโทรศัพท์จะต้องไม่มีตัวอักษรหรืออักขระพิเศษ";
  }else{return "";}
}


