const inventory = {
  key: 0,
  coin: 10,
};

function getInventory() {
  return inventory;
}

function addToInventory(item, amount) {
  if (!inventory[item]) {
    inventory[item] = amount;
  } else {
    inventory[item] += amount;
  }
}

export { getInventory, addToInventory };
