export const validator = {
  kiemTraRong: function (value, idError, message) {
    if (value.length == 0) {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
  kiemTraDoDai: function (value, idError, message, min, max) {
    if (value.length < min || value.length > max) {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
  //regex email js
  kiemTraEmail: function (value, idError, message) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (re.test(value)) {
      document.getElementById(idError).innerText = "";
      return true;
    } else {
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  kiemTraDiem: function (value, idError, message) {
    if (value < 0 || value > 10) {
      document.getElementById(idError).innerText = message;
      return false;
    } else {
      document.getElementById(idError).innerText = "";
      return true;
    }
  },
  kiemTraSo: function (value, idError, message) {
    if (Number.isInteger(value * 1)) {
      document.getElementById(idError).innerText = "";
      return true;
    } else {
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  kiemTraChu: function (value, idError, message) {
    const char =
      /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐa-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ\s]+$/;
    if (char.test(value)) {
      document.getElementById(idError).innerText = "";
      return true;
    } else {
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  kiemTraSoChu: function (value, idError, message) {
    const alphanum = /^[A-Za-z0-9]+$/;
    if (alphanum.test(value)) {
      document.getElementById(idError).innerText = "";
      return true;
    } else {
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
  kiemTraMatKhau: function (value, idError, message) {
    const pw = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,10}$/;
    if (pw.test(value)) {
      document.getElementById(idError).innerText = "";
      return true;
    } else {
      document.getElementById(idError).innerText = message;
      return false;
    }
  },
};
