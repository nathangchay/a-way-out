import React from 'react';

import { Typography } from '@rmwc/typography';
import { Button } from '@rmwc/button';
import { LinearProgress } from '@rmwc/linear-progress';

function Searcher({ name, duration }) {
  let progress = 0;

  const [progressState, setProgressState] = React.useState(progress);
  const [disabled, setdisabled] = React.useState(false);

  const searchLoop = () => {
    if (progress >= 1) {
      setdisabled(false);
      progress = 0;
      setProgressState(0);
    } else {
      setdisabled(true);

      setTimeout(searchLoop, 1000);
      progress += 1 / duration;

      setProgressState(progress);
    }
  };

  return (
    <div className="container-searcher">
      <Typography use="body2" style={{ minWidth: '20%' }}>{name}</Typography>
      <Button raised disabled={disabled} label="search" style={{ margin: '0 10px 0 10px' }} onClick={searchLoop} />
      <LinearProgress closed={!disabled} progress={progressState} />
    </div>
  );
}

export default Searcher;
