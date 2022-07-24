import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

function ActionLogView() {
  const actionLog = useSelector((state) => state.actionLog);

  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">Action Log:</Typography>
      {actionLog.map((action, i) => (
        <Typography use="caption" style={{ opacity: 1 / (i + 1), fontWeight: action.type === 'story' ? 'bold' : 'normal', color: action.type === 'story' ? 'gold' : 'white' }}>
          {action.text}
        </Typography>
      ))}
    </div>
  );
}

export default ActionLogView;
