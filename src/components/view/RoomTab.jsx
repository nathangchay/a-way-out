import React from 'react';

import { Typography } from '@rmwc/typography';

import Searcher from '../controller/Searcher';

function RoomTab() {
  return (
    <>
      <Typography use="headline6" className="tab-header">in this room: </Typography>
      <Searcher name="dirt pile" duration={1} reward="key" rewardAmount={1} />
      <Searcher name="dirt pile" duration={2} reward="bread" rewardAmount={2} />
      <Searcher name="dirt pile" duration={3} reward="coin" rewardAmount={10} />
      <Searcher name="dirt pile" duration={4} reward="coin" rewardAmount={10} />
      <Searcher name="cabinet" duration={5} reward="coin" rewardAmount={10} />
      <Searcher name="bed" duration={10} reward="coin" rewardAmount={10} />
    </>
  );
}

export default RoomTab;
