import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';

import { _useKeyItem } from '../model/Inventory';
import { addAction } from '../model/ActionLog';
import { getTiles } from '../model/Map';

function Flashlight() {
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.map);
  const inventory = useSelector((state) => state.inventory);

  const { chargesLeft } = inventory.keyItems.flashlight;

  const tiles = getTiles();
  const { rooms, playerCoordinate } = mapData;
  const { x, y } = playerCoordinate;
  const currentRoom = rooms[tiles[y][x]];

  const onButtonClick = () => {
    if (chargesLeft > 0) {
      dispatch(_useKeyItem({ itemAction: 'flashlight/use' }));
      dispatch(addAction({ newAction: 'used my flashlight to light the room' }));
    } else {
      dispatch(_useKeyItem({ itemAction: 'flashlight/recharge' }));
      dispatch(addAction({ newAction: 'used 1x battery to recharge my flashlight' }));
    }
  };

  return (
    <div className="container-key-item">
      <div className="container-key-item-info">
        <Typography use="body2">flashlight</Typography>
        <Typography use="caption">
          charges left:
          {' '}
          {chargesLeft}
        </Typography>
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