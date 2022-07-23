import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

import Flashlight from '../controller/KeyItems';

const keyItemsElements = {
  flashlight: <Flashlight />,
};

function InventoryTab() {
  const inventory = useSelector((state) => state.inventory);

  const keyItems = Object.keys(inventory.keyItems).map((key) => (
    keyItemsElements[key]
  ));

  const resources = Object.entries(inventory.resources).map(([key, value]) => (
    <Typography use="body2">{`${key[0].toUpperCase() + key.substring(1)}: ${value}x`}</Typography>
  ));

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">Key items:</Typography>
      {keyItems}
      <Typography use="headline6" className="tab-header">Resources:</Typography>
      {resources}
    </div>

  );
}

export default InventoryTab;
