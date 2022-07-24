import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

import { _useKeyItem } from '../model/Inventory';
import { addAction } from '../model/ActionLog';
import { getTiles } from '../model/Map';
import { awardResearchPoints } from '../model/Research';

function Flashlight() {
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.map);
  const inventory = useSelector((state) => state.inventory);
  const flashlightCapacityLevel = useSelector((state) => state.research.keyItemUpgrades['flashlight capacity'].curLevel);

  const { chargesLeft } = inventory.keyItems.flashlight;

  const tiles = getTiles();
  const { rooms, playerCoordinate } = mapData;
  const { x, y } = playerCoordinate;
  const currentRoom = rooms[tiles[y][x]];

  const onButtonClick = () => {
    if (chargesLeft > 0) {
      dispatch(_useKeyItem({ itemAction: 'flashlight/use' }));
      dispatch(addAction({ newAction: 'Used my flashlight to light the room', type: 'info' }));
      dispatch(awardResearchPoints({ amount: 5 }));
    } else {
      dispatch(_useKeyItem({ itemAction: 'flashlight/recharge', data: { maxCapacity: flashlightCapacityLevel * 5 } }));
      dispatch(addAction({ newAction: 'Used 1x battery to recharge my flashlight', type: 'info' }));
    }
  };

  return (
    <div className="container-key-item">
      <div className="container-key-item-info">
        <Typography use="body2">Flashlight</Typography>
        <Typography use="caption">{`Charges left: ${chargesLeft}`}</Typography>
      </div>
      <Button
        raised
        disabled={
          (currentRoom.isLit && chargesLeft > 0)
          || (chargesLeft <= 0 && !inventory.resources.battery)
        }
        label={chargesLeft > 0 ? 'use' : 'recharge'}
        style={{ margin: '0 0 0 10px' }}
        onClick={onButtonClick}
      />
    </div>
  );
}

export default Flashlight;
