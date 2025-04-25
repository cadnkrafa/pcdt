const memory = {};

function getState(userId) {
  if (!memory[userId]) memory[userId] = { step: 0, data: {} };
  return memory[userId];
}

function updateState(userId, step, data) {
  if (!memory[userId]) memory[userId] = { step: 0, data: {} };
  memory[userId].step = step;
  memory[userId].data = { ...memory[userId].data, ...data };
}

module.exports = { getState, updateState };

