import React from 'react'

export default function BaseCombatFromStats({ baseCombatFromStats }) {
    let { strData, dexData, intData, wisData } = baseCombatFromStats
    return (
        <div className="baseCombatStatsShell">
            <h1>Base from Stats</h1>
            <div>
                <p>Attack</p>
                <div>
                    <p>Dex Mod + Int Mod</p>
                    <p><strong>{dexData.attack + intData.attack}</strong> = {dexData.attack} + {intData.attack}</p>
                </div>
            </div>
            <div>
                <p>Defense</p>
                <div>
                    <p>Dex Mod + Wis Mod</p>
                    <p><strong>{dexData.defense + wisData.defense}</strong> = {dexData.defense} + {wisData.defense} </p>
                </div>
            </div>
            <div>
                <p>Initiative</p>
                <div>
                    <p>Dex Mod + Wis Mod</p>
                    <p><strong>{dexData.init + wisData.init}</strong> = {dexData.init} + {wisData.init}</p>
                </div>
            </div>
            <div>
                <p>Damage</p>
                <div>
                    <p>Str Mod</p>
                    <p><strong>{strData.damage}</strong></p>
                </div>
            </div>
        </div>
    )
}