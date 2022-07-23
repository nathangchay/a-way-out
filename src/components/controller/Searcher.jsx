import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { LinearProgress } from '@rmwc/linear-progress';

import { addResource, addKeyItem } from '../model/Inventory';
import { addAction } from '../model/ActionLog';
import { decrementSearchesLeft } from '../model/Map';

function Searcher({
  name, visible, duration, rewards, roomName,
}) {
  const empty = Object.keys(rewards).length === 0;
  let progress = 0;

  const dispatch = useDispatch();

  const [progressState, setProgressState] = useState(progress);
  const [disabled, setdisabled] = useState(false);

  const getRandomReward = () => {
    const keys = Object.keys(rewards);

    return keys[Math.floor(Math.random() * keys.length)];
  };

  const searchLoop = () => {
    if (progress > 1 - (1 / duration)) {
      setdisabled(false);

      progress = 0;
      setProgressState(0);

      const rewardName = getRandomReward();
      const rewardType = rewards[rewardName].type;

      let rewardQuantity;

      if (rewardType === 'r') {
        rewardQuantity = rewards[rewardName].quantity;
        dispatch(addResource({ item: rewardName, quantity: rewardQuantity }));
      } else {
        rewardQuantity = 1;
        dispatch(addKeyItem({ item: rewardName, data: rewards[rewardName].data }));
      }

      dispatch(addAction({ newAction: `Searched a ${name} and found ${rewardQuantity}x ${rewardName}`, type: 'info' }));
      dispatch(decrementSearchesLeft({ roomName, searchableName: name, rewardName }));
    } else {
      setTimeout(searchLoop, 1000);
      progress += 1 / duration;

      setProgressState(progress);
    }
  };

  const onButtonClick = () => {
    setdisabled(true);
    searchLoop();
  };

  if (visible) {
    return (
      <div className="container-searcher">
        <Typography use="body2" style={{ minWidth: '20%' }}>{name[0].toUpperCase() + name.substring(1)}</Typography>
        <Button
          raised
          disabled={disabled || empty}
          label={empty ? 'empty' : 'search'}
          style={{ margin: '0 10px 0 10px', minWidth: 85 }}
          onClick={onButtonClick}
        />
        <LinearProgress theme="secondary" closed={!disabled} progress={progressState} />
      </div>
    );
  }

  return null;
}

export default Searcher;
