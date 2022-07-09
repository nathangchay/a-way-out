import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

function InventoryTab() {
  const inventory = useSelector((state) => state.inventory);

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">i have:</Typography>
      {Object.entries(inventory).map(([key, value]) => (
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
