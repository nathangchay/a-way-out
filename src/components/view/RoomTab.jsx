import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

import Searcher from '../controller/Searcher';
import { getTiles } from '../model/Map';

function RoomTab() {
  const mapData = useSelector((state) => state.map);

  const getItems = () => {
    const tiles = getTiles();
    const { rooms, playerCoordinate } = mapData;
    const { x, y } = playerCoordinate;
    const roomName = tiles[y][x];

    return Object.entries(rooms[roomName].items).map(([key, value]) => (
      <Searcher
        name={key}
        duration={value.duration}
        reward={value.reward}
        rewardQuantity={value.rewardQuantity}
        searchesLeft={value.searchesLeft}
        roomName={roomName}
      />
    ));
  };

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">in this room: </Typography>
      { getItems() }
    </div>
  );
}

export default RoomTab;
