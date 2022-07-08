import React from 'react';

import { ThemeProvider } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import { TabBar, Tab } from '@rmwc/tabs';

import RoomTab from './view/RoomTab';
import InventoryTab from './view/InventoryTab';
import MapTab from './view/MapTab';

const tabs = [<RoomTab />, <InventoryTab />, <MapTab />];

function App() {
  const [activeTab, setActiveTab] = React.useState(0);

  const activeTabView = tabs[activeTab];

  return (
    <ThemeProvider
      options={{
        primary: 'white',
        onSurface: 'white',
      }}
    >
      <div className="container-outer">
        <div className="container-inner">
          <Typography use="headline4" className="headline4">a way out</Typography>

          <TabBar onActivate={(e) => setActiveTab(e.detail.index)}>
            <Tab>Room</Tab>
            <Tab>Inventory</Tab>
            <Tab>Map</Tab>
          </TabBar>

          {activeTabView}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
