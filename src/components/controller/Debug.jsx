import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@rmwc/button';
import { Typography } from '@rmwc/typography';

import { awardResearchPoints } from '../model/Research';

function Debug() {
  const dispatch = useDispatch();

  const onPtsClick = () => {
    dispatch(awardResearchPoints({ amount: 1000 }));
  };

  return (
    <div className="container-debug">
      <Typography use="caption" style={{ marginBottom: 10 }}>debug menu</Typography>
      <Button raised label="pts" onClick={onPtsClick} />
    </div>
  );
}

export default Debug;
