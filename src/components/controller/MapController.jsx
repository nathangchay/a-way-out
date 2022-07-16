import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';

import { getTiles, movePlayer } from '../model/Map';
import { addAction } from '../model/ActionLog';

function MapController() {
  const mapData = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const getMapTile = (tile, i, j) => {
    const roomData = mapData.rooms[tile];
    const { isExplored, isExplorable } = roomData;
    const { x, y } = mapData.playerCoordinate;

    const showX = (x === j && y === i);

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
        dispatch(addAction({ newAction: `headed ${directionFromPlayer}` }));
      }
    };

    return (
      <a href className={isExplorable && directionFromPlayer !== '' ? 'map-tile explorable' : 'map-tile'} style={{ backgroundColor: color }} onClick={onTileClick}>
        { showX ? <Typography use="caption" style={{ color: '#282c34', fontWeight: 'bold' }}>x</Typography> : null }
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
