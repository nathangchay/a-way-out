import React, { useState } from 'react';
import { ThemeProvider, Theme } from '@rmwc/theme';
import { Typography } from '@rmwc/typography';
import { TabBar, Tab } from '@rmwc/tabs';
import { useSelector } from 'react-redux';

import RoomTab from './view/RoomTab';
import InventoryTab from './view/InventoryTab';
import MapTab from './view/MapTab';
import ActionLogView from './view/ActionLogView';
import SaveLoadController from './controller/SaveLoadController';
import SettingsController from './controller/SettingsController';

const tabs = [<InventoryTab />, <MapTab />];

function App() {
  const darkTheme = useSelector((state) => state.settings.darkTheme);

  const [activeTab, setActiveTab] = useState(0);

  const activeTabView = tabs[activeTab];
  const darkThemeOptions = {
    primary: 'white',
    onPrimary: '#282c34',
    background: '#282c34',
    onSecondary: 'white',
    onSurface: 'white',
  };
  const lightThemeOptions = {
    primary: '#282c34',
    onPrimary: 'white',
    background: 'white',
    onSecondary: '#282c34',
  };

  const themedDivisor = (
    <Theme use={['primaryBg']}>
      <div className="divisor-vertical" />
    </Theme>
  );

  return (
    <ThemeProvider
      options={darkTheme ? darkThemeOptions : lightThemeOptions}
    >
      <Theme use={['background', 'onSecondary']} wrap>
        <div className="container-outer">
          <div className="container-inner">
            <div className="header">
              <Typography use="headline4" className="headline4">A Way Out</Typography>
              <SaveLoadController />
              <SettingsController />
            </div>

            <div className="container-blocks">
              {themedDivisor}

              <ActionLogView />

              {themedDivisor}

              <RoomTab />

              {themedDivisor}

              <div className="container-tabs">
                <TabBar onActivate={(e) => setActiveTab(e.detail.index)}>
                  <Tab>Inventory</Tab>
                  <Tab>Map</Tab>
                </TabBar>

                {activeTabView}
              </div>

              {themedDivisor}
            </div>
          </div>
        </div>
      </Theme>
    </ThemeProvider>
  );
}

export default App;
