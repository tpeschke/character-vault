import React from 'react'

export default function BaseCombatFromStats({ baseCombatFromStats }) {
    let { strData, dexData, conData, intData, wisData } = baseCombatFromStats
    return (
        <div>
            <p className="attackLocation"><strong>{dexData.attack + intData.attack}</strong> = {dexData.attack} + {intData.attack}</p>
            <p className="defenseLocation"><strong>{dexData.defense + wisData.defense}</strong> = {dexData.defense} + {wisData.defense} </p>
            <p className="initLocation"><strong>{dexData.init + wisData.init}</strong> = {dexData.init} + {wisData.init}</p>
            <p className="strDamageLocation"><strong>{strData.damage}</strong></p>
        </div>
    )
}