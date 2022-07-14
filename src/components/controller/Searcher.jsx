import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { LinearProgress } from '@rmwc/linear-progress';

import { addToInventory } from '../model/Inventory';
import { addAction } from '../model/ActionLog';
import { decrementSearchesLeft } from '../model/Map';

function Searcher({
  name, duration, reward, rewardQuantity, searchesLeft, roomName,
}) {
  let progress = 0;

  const dispatch = useDispatch();

  const [progressState, setProgressState] = useState(progress);
  const [disabled, setdisabled] = useState(false);
  const [maxSearches, setMaxSearches] = useState(searchesLeft);

  const searchLoop = () => {
    if (progress > 1 - (1 / duration)) {
      setdisabled(false);

      progress = 0;
      setProgressState(0);

      if (maxSearches > 0) {
        dispatch(addToInventory({ item: reward, quantity: rewardQuantity }));
        dispatch(addAction({ newAction: `searched a ${name} and found ${rewardQuantity}x ${reward}` }));
        dispatch(decrementSearchesLeft({ roomName, itemName: name }));
      } else {
        dispatch(addAction({ newAction: `searched a ${name} and found nothing :(` }));
      }
    } else {
      setTimeout(searchLoop, 1000);
      progress += 1 / duration;

      setProgressState(progress);
    }
  };

  const onButtonClick = () => {
    setdisabled(true);
    setMaxSearches(maxSearches - 1);
    searchLoop();
  };

  return (
    <div className="container-searcher">
      <Typography use="body2" style={{ minWidth: '20%' }}>{name}</Typography>
      <Button raised disabled={disabled} label="search" style={{ margin: '0 10px 0 10px', minWidth: 85 }} onClick={onButtonClick} />
      <LinearProgress closed={!disabled} progress={progressState} />
    </div>
  );
}

export default Searcher;
