import React from 'react';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

function Upgrader({ upgradeName, curLevel, upgradeCost }) {
  return (
    <div className="container-upgrader">
      <div className="container-upgrader-info">
        <Typography use="body2">{`${upgradeName[0].toUpperCase() + upgradeName.substring(1)} (level ${curLevel})`}</Typography>
        <Typography use="caption">{`Cost: ${upgradeCost} pts`}</Typography>
      </div>
      <Button raised label="upgrade" style={{ margin: '0 10px 0 0' }} />
    </div>
  );
}

export default Upgrader;
