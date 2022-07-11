import React from 'react';

import { ThemeProvider } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import { TabBar, Tab } from '@rmwc/tabs';

import RoomTab from './view/RoomTab';
import InventoryTab from './view/InventoryTab';
import MapTab from './view/MapTab';
import ActionLogView from './view/ActionLogView';
import SaveLoadView from './view/SaveLoadView';

const tabs = [<InventoryTab />, <MapTab />];

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
          <div className="header">
            <Typography use="headline4" className="headline4">a way out</Typography>
            <SaveLoadView />
          </div>

          <div className="container-blocks">
            <div className="divisor-vertical" />

            <ActionLogView />

            <div className="divisor-vertical" />

            <RoomTab />

            <div className="divisor-vertical" />

            <div className="container-tabs">
              <TabBar onActivate={(e) => setActiveTab(e.detail.index)}>
                <Tab>Inventory</Tab>
                <Tab>Map</Tab>
              </TabBar>

              {activeTabView}
            </div>

            <div className="divisor-vertical" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
