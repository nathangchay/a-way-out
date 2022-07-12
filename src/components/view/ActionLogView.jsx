import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

function ActionLogView() {
  const actionLog = useSelector((state) => state.actionLog);

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">my actions:</Typography>
      {actionLog.map((action, i) => (
        <Typography use="caption" style={{ opacity: 1 / (i + 1) }}>{action}</Typography>
      ))}
    </div>
  );
}

export default ActionLogView;
