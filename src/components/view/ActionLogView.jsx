import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

function ActionLogView() {
  const actionLog = useSelector((state) => state.actionLog.log);

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">my actions:</Typography>
      {actionLog.map((action) => (
        <Typography use="caption">{action}</Typography>
      ))}
    </div>
  );
}

export default ActionLogView;
