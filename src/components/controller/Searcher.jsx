import React from 'react';

import { useDispatch } from 'react-redux';
import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { LinearProgress } from '@rmwc/linear-progress';

import { addToInventory } from '../model/Inventory';
import { addItemFound } from '../model/ActionLog';

function Searcher({
  name, duration, reward, rewardAmount,
}) {
  let progress = 0;

  const dispatch = useDispatch();

  const [progressState, setProgressState] = React.useState(progress);
  const [disabled, setdisabled] = React.useState(false);

  const searchLoop = () => {
    if (progress > 1 - (1 / duration)) {
      setdisabled(false);

      progress = 0;
      setProgressState(0);

      dispatch(addToInventory({ item: reward, quantity: rewardAmount }));
      dispatch(addItemFound({ item: reward, quantity: rewardAmount }));
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

  return (
    <div className="container-searcher">
      <Typography use="body2" style={{ minWidth: '20%' }}>{name}</Typography>
      <Button raised disabled={disabled} label="search" style={{ margin: '0 10px 0 10px' }} onClick={onButtonClick} />
      <LinearProgress closed={!disabled} progress={progressState} />
    </div>
  );
}

export default Searcher;
