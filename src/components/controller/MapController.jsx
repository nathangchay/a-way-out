import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@rmwc/icon';

import { getTiles, movePlayer } from '../model/Map';
import { addAction } from '../model/ActionLog';

function MapController() {
  const mapData = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const getMapTile = (tile, i, j) => {
    const roomData = mapData.rooms[tile];
    const { isExplored, isExplorable, isLit } = roomData;
    const { x, y } = mapData.playerCoordinate;

    const showX = (x === j && y === i);
    const showIcon = isLit;

    let directionFromPlayer = '';

    if (x === j && y === i + 1) {
      directionFromPlayer = 'north';
    } else if (x === j - 1 && y === i) {
      directionFromPlayer = 'east';
    } else if (x === j && y === i - 1) {
      directionFromPlayer = 'south';
    } else if (x === j + 1 && y === i) {
      directionFromPlayer = 'west';
    }

    let color = '';

    if (isExplored) {
      color = 'white';
    } else if (isExplorable) {
      color = '#939599';
    }

    const onTileClick = () => {
      if (isExplorable && directionFromPlayer !== '') {
        dispatch(movePlayer({ i, j }));
        dispatch(addAction({ newAction: `Headed ${directionFromPlayer}` }));
      }
    };

    return (
      <a href className={isExplorable && directionFromPlayer !== '' ? 'unselectable map-tile explorable' : 'unselectable map-tile'} style={{ backgroundColor: color }} onClick={onTileClick}>
        { showX ? <Icon icon={{ icon: 'person', size: 'xsmall' }} style={{ color: '#282c34', zIndex: 1 }} /> : null }
        { showIcon ? (
          <Icon
            icon={{ icon: 'light_mode', size: 'xsmall' }}
            style={{
              position: 'absolute', color: '#939599', opacity: 0.5, maxWidth: 50,
            }}
          />
        ) : null }
      </a>
    );
  };

  const tiles = getTiles().map((row, i) => (
    <div className="map-row-container">
      { row.map((tile, j) => getMapTile(tile, i, j)) }
    </div>
  ));

  return (
    <div className="map-container">
      {tiles}
    </div>
  );
}

export default MapController;
