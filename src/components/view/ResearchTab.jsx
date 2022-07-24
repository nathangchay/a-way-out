import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@rmwc/typography';

import Upgrader from '../controller/Upgrader';

function ResearchTab() {
  const research = useSelector((state) => state.research);
  const keyItems = useSelector((state) => state.inventory.keyItems);

  const getUpgrader = (key, value, type) => {
    const { curLevel, costPerLevel, unlocked } = value;

    return (
      <Upgrader
        upgradeName={key}
        type={type}
        curLevel={curLevel}
        upgradeCost={costPerLevel[curLevel - 1]}
        maxed={curLevel === costPerLevel.length + 1}
        unlocked={type === 'generalResearch' ? unlocked : true}
      />
    );
  };

  const generalResearch = Object.entries(research.generalResearch).map(([key, value]) => (
    getUpgrader(key, value, 'generalResearch')
  ));

  const keyItemUpgrades = Object.entries(research.keyItemUpgrades).map(([key, value]) => (
    keyItems[value.associatedItem] ? getUpgrader(key, value, 'keyItemUpgrades') : null
  ));

  return (
    <div className="block">
      <Typography use="body2" style={{ marginTop: 15 }}>{`Research points: ${research.researchPoints}`}</Typography>
      <Typography use="headline6" className="tab-header">General research:</Typography>
      {generalResearch}
      <Typography use="headline6" className="tab-header">Item upgrades:</Typography>
      {keyItemUpgrades}
    </div>
  );
}

export default ResearchTab;
