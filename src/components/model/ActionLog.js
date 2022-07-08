const log = [
  'test1',
  'test2',
  'test3',
];

function getActions() {
  return log;
}

function addItemFound(item, quantity) {
  log.push(`found ${quantity} ${item}(s)`);
}

export { getActions, addItemFound };
