import React from 'react';

import BattleContainer from './BattleContainer';

const data = {
    battle: {
        local: "Black Sea",
        date: "15/04/2023",        
        battleName: "Battle of the black sea"
    },
    opponent1: {
        warShipName: "Rockwood",
        admiralName: "Harvey Marshall",
        nation: "USA",
        skill: 9,
        acurracy: 9,
        speed: 8,
        pps: 8,
        energy: 100,
        imageName: "ship1.png",
        isEnemy: "no",
    },
    opponent2: {
        warShipName: "Moskva",
        admiralName: "Vasiliy Solovev",
        nation: "Russia",
        skill: 9,
        acurracy: 8,
        speed: 8,
        pps: 9,
        energy:100,
        imageName: "ship2.png",
        isEnemy: "yes",
    }
}

export default class App extends React.Component {
    render() {
        return <BattleContainer {...data} />;
    }
}