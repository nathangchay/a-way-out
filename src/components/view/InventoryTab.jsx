import React from 'react';

import { Typography } from '@rmwc/typography';

import { getInventory } from '../model/Inventory';

function InventoryTab() {
  return (
    <>
      <Typography use="headline6" className="tab-header">i have:</Typography>
      {Object.entries(getInventory()).map(([key, value]) => (
        <Typography use="body2">
          {key}
          :
          {' '}
          {value}
          x
        </Typography>
      ))}
    </>

  );
}

export default InventoryTab;
