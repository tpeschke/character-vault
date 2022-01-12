import React from 'react'

export default function BaseCombatFromStats({ baseCombatFromStats }) {
    let { strData, dexData, intData, wisData, isDownloading } = baseCombatFromStats

    if (strData && dexData && intData && wisData) {
        return (
            <div className="baseCombatStatsShell">
                <h1>Base from Stats</h1>
                <div>
                    <p>Attack</p>
                    <div>
                        <p className={isDownloading ? "removeButtons" : ""}>Dex Mod + Int Mod</p>
                        <p><strong>{dexData.attack + intData.attack}</strong> = {dexData.attack} + {intData.attack}</p>
                    </div>
                </div>
                <div>
                    <p>Defense</p>
                    <div>
                        <p className={isDownloading ? "removeButtons" : ""}>Dex Mod + Will Mod</p>
                        <p><strong>{dexData.defense + wisData.defense}</strong> = {dexData.defense} + {wisData.defense} </p>
                    </div>
                </div>
                <div>
                    <p>Initiative</p>
                    <div>
                        <p className={isDownloading ? "removeButtons" : ""}>Dex Mod + Will Mod</p>
                        <p><strong>{dexData.init + wisData.init}</strong> = {dexData.init} + {wisData.init}</p>
                    </div>
                </div>
                <div>
                    <p>Damage</p>
                    <div>
                        <p className={isDownloading ? "removeButtons" : ""}>Str Mod</p>
                        <p><strong>{strData.damage}</strong></p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<div className="baseCombatStatsShell">
            <h1>Base from Stats</h1>
            <div>
                <p>Attack</p>
                <div>
                    <p>Dex Mod + Int Mod</p>
                    <p> </p>
                </div>
            </div>
            <div>
                <p>Defense</p>
                <div>
                    <p>Dex Mod + Will Mod</p>
                    <p> </p>
                </div>
            </div>
            <div>
                <p>Initiative</p>
                <div>
                    <p>Dex Mod + Will Mod</p>
                    <p> </p>
                </div>
            </div>
            <div>
                <p>Damage</p>
                <div>
                    <p>Str Mod</p>
                    <p> </p>
                </div>
            </div>
        </div>)
    }
}