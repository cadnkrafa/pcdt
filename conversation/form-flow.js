const state = require('./state-manager');
const dopaApi = require('../services/dopa-api');
const db = require('../services/db');
const summaryBuilder = require('../views/summary-builder');

const steps = [
  { key: 'cid', q: 'กรุณากรอกเลขบัตรประชาชน 13 หลัก' },
  { key: 'laser', q: 'กรุณากรอกเลขหลังบัตร (เลขเลเซอร์)' },
  { key: 'dob', q: 'กรุณากรอกวันเกิด (รูปแบบ YYYY-MM-DD)' },
];

async function handleUserReply(userId, text) {
  const user = state.getState(userId);
  const currentStep = steps[user.step];

  // เก็บคำตอบล่าสุด
  user.data[currentStep.key] = text;
  user.step += 1;

  // ถ้ายังไม่ครบ 3 ช่อง → ถามคำถามถัดไป
  if (user.step < steps.length) {
    state.updateState(userId, user.step, user.data);
    return { replyMessage: { type: 'text', text: steps[user.step].q } };
  }

  // ถ้าครบ → เรียก DOPA API (mock)
  const result = await dopaApi.verify(user.data);

  if (!result.verified) {
    user.step = 0;
    return { replyMessage: { type: 'text', text: 'ไม่พบข้อมูลในระบบ กรุณาตรวจสอบและลองใหม่อีกครั้ง' } };
  }

  // ตรวจสอบวันเกิด + สัญชาติ (mock)
  const errors = await dopaApi.checkEligibility(result.data);
  if (errors.length) {
    return { replyMessage: { type: 'text', text: `ไม่สามารถสมัครได้: ${errors.join(', ')}` } };
  }

  // แสดงข้อมูลสรุป
  state.updateState(userId, user.step, { dopaData: result.data });
  const summary = summaryBuilder(result.data);
  return { replyMessage: { type: 'text', text: summary } };
}

module.exports = { handleUserReply };

