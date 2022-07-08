import React from 'react';

import { Typography } from '@rmwc/typography';

import { getActions } from '../model/ActionLog';

function ActionLogView() {
  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">my actions:</Typography>
      {getActions().map((action) => (
        <Typography use="caption">{action}</Typography>
      ))}
    </div>
  );
}

export default ActionLogView;
