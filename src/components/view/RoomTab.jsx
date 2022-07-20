import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

import Searcher from '../controller/Searcher';
import { getTiles } from '../model/Map';

function RoomTab() {
  const mapData = useSelector((state) => state.map);

  const getSearchables = () => {
    const tiles = getTiles();
    const { rooms, playerCoordinate } = mapData;
    const { x, y } = playerCoordinate;
    const roomName = tiles[y][x];
    const room = rooms[roomName];

    const searchables = Object.entries(room.searchables).map(([key, value]) => (
      <Searcher
        name={key}
        visible={!value.inDark || (value.inDark && room.isLit)}
        duration={value.duration}
        rewards={value.rewards}
        roomName={roomName}
      />
    ));

    return searchables;
  };

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">Room Contents: </Typography>
      { getSearchables() }
    </div>
  );
}

export default RoomTab;
