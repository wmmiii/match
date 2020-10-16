import React from 'react';
import './LevelBrowser.scss';
import levelPack from './base/levelPack';
import LevelPack from './level/LevelPack';
import Level from './level';

interface LevelBrowserProps {
  activate: (level: Level) => void;
}

interface LevelBrowserState {
  packs: LevelPack[];
}

export default class LevelBrowser extends React.Component<LevelBrowserProps, LevelBrowserState> {
  constructor(prop: any) {
    super(prop);

    this.state = {
      packs: [levelPack],
    };
  }

  render() {
    const packs: JSX.Element[] = [];
    for (const pack of this.state.packs) {
      const levels: JSX.Element[] = [];
      for (const level of pack.levels) {
        levels.push(
          <li key={`${pack.title} ${level.title}`}
              onClick={() => this.props.activate(level)}>
            <h3>{level.title}</h3>
            <p>{level.description}</p>
          </li>
        );
      }

      packs.push(
        <div key={pack.title} className="pack">
          <h2>{pack.title}</h2>
          <ol>{levels}</ol>
        </div>
      );
    }

    return (
      <div className="LevelBrowser">
        {packs}
      </div>
      );
  }
}
