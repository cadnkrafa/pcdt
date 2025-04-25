async function verify({ cid, laser, dob }) {
  // จำลองการตรวจสอบ
  if (cid === '1234567890123') {
    return {
      verified: true,
      data: {
        firstNameThai: 'สมชาย',
        lastNameThai: 'ใจดี',
        dob: '2008-01-15',
        nationality: 'ไทย',
        fatherNationality: 'ไทย',
        motherNationality: 'ไทย',
        // ... ข้อมูลอื่น ๆ
      }
    };
  }
  return { verified: false };
}

async function checkEligibility(data) {
  const { dob, nationality, fatherNationality, motherNationality } = data;
  const dobDate = new Date(dob);
  const start = new Date(process.env.DOB_START);
  const end = new Date(process.env.DOB_END);

  const errors = [];
  if (dobDate < start || dobDate > end) errors.push('วันเกิดไม่อยู่ในช่วงที่กำหนด');
  if (nationality !== 'ไทย') errors.push('ผู้สมัครไม่ใช่สัญชาติไทย');
  if (fatherNationality !== 'ไทย') errors.push('บิดาไม่ใช่สัญชาติไทย');
  if (motherNationality !== 'ไทย') errors.push('มารดาไม่ใช่สัญชาติไทย');

  return errors;
}

module.exports = { verify, checkEligibility };

