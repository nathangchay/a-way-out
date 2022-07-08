import React from 'react';

import { Typography } from '@rmwc/typography';

import Searcher from '../controller/Searcher';

function RoomTab() {
  return (
    <>
      <Typography use="body1" className="body1">in this room: </Typography>
      <Searcher name="dirt pile" duration={1} />
      <Searcher name="dirt pile" duration={2} />
      <Searcher name="dirt pile" duration={3} />
      <Searcher name="dirt pile" duration={4} />
      <Searcher name="cabinet" duration={5} />
      <Searcher name="bed" duration={10} />
    </>
  );
}

export default RoomTab;
