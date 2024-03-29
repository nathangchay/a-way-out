import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

import { purchaseUpgrade } from '../model/Research';

function Upgrader({
  upgradeName, type, curLevel, upgradeCost, maxed, unlocked,
}) {
  const researchPoints = useSelector((state) => state.research.researchPoints);
  const dispatch = useDispatch();

  const onUpgradeClick = () => {
    dispatch(purchaseUpgrade({ type, upgradeName }));
  };

  let buttonLabel;

  if (!unlocked) {
    buttonLabel = 'locked';
  } else if (maxed) {
    buttonLabel = 'max';
  } else {
    buttonLabel = 'upgrade';
  }

  return (
    <div className="container-upgrader">
      <div className="container-upgrader-info">
        <Typography use="body2">{`${upgradeName[0].toUpperCase() + upgradeName.substring(1)} (level ${curLevel})`}</Typography>
        <Typography use="caption">{`Cost: ${maxed ? 'N/A' : `${upgradeCost} pts`}`}</Typography>
      </div>
      <Button
        raised
        disabled={maxed || !unlocked || researchPoints < upgradeCost}
        label={buttonLabel}
        style={{ margin: '0 10px 0 0' }}
        onClick={onUpgradeClick}
      />
    </div>
  );
}

export default Upgrader;
