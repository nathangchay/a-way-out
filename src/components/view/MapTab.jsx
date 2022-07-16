import React from 'react';
import { Typography } from '@rmwc/typography';

import MapController from '../controller/MapController';

function MapTab() {
  return (
    <div className="block">
      <Typography use="headline6" className="tab-header">my surroundings:</Typography>
      <MapController />
    </div>
  );
}

export default MapTab;
