module.exports = function build(data) {
  return `🔎 ข้อมูลที่ค้นพบ:
- ชื่อ: ${data.firstNameThai} ${data.lastNameThai}
- วันเกิด: ${data.dob}
- สัญชาติ: ${data.nationality}

กรุณาตรวจสอบข้อมูลเบื้องต้น และตอบ "ยืนยัน" เพื่อดำเนินการต่อ`;
};

