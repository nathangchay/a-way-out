import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

import Flashlight from '../controller/KeyItems';

const keyItemsElements = {
  flashlight: <Flashlight />,
};

function InventoryTab() {
  const inventory = useSelector((state) => state.inventory);

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">Key Items:</Typography>
      {Object.keys(inventory.keyItems).map((key) => (
        keyItemsElements[key]
      ))}
      <Typography use="headline6" className="tab-header">Resources:</Typography>
      {Object.entries(inventory.resources).map(([key, value]) => (
        <Typography use="body2">
          {key}
          :
          {' '}
          {value}
          x
        </Typography>
      ))}
    </div>

  );
}

export default InventoryTab;
