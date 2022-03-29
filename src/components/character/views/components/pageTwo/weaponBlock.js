import React from 'react'

export default function WeaponBlock({ weapon, updateObject, returnZeroIfNaN, editing }) {
    let { position, name, basemeasure, basedamage, baseparry, baserecovery, size, type, bonus, traits, trainrecovery, trainattack, traindamage, trainparry,
        miscattack, miscdamage, miscinit, miscparry, miscrecovery, totalRecoveryModifiers, id } = weapon

    let updateValue = (value, key) => {
        if (!value) {
            value = null
        }
        weapon[key] = value
        updateObject(`weapon${position}`, key, value)
    }

    if (editing) {
        let measureAndParry = (<div className="armorBaseStats">
            <div>
                <p>Meas.</p>
                <input type="text" defaultValue={basemeasure} onChange={event => updateValue(event.target.value, "basemeasure")} />
            </div>
            <div>
                <p>Parry</p>
                <input type="number" defaultValue={baseparry} onChange={event => updateValue(event.target.value, "baseparry")} />
            </div>
        </div>)
        if (position === "four") {
            measureAndParry = (null)
        }

        return (
            <div className={`weaponProfile${position} weaponProfileShell`}>
                <h2>Weapon Workspace</h2>
                <input className="weaponnameLocation" type="text" defaultValue={name} onChange={event => updateValue(event.target.value, "name")} />
                <div className="armorBaseStats">
                    <p>Damage</p>
                    <input className="basedamageLocation" type="text" defaultValue={basedamage} onChange={event => updateValue(event.target.value, "basedamage")} />
                </div>
                <div className="armorBaseStats">
                    <div>
                        <p>Recov.</p>
                        <input className="baserecoveryLocation" type="number" defaultValue={baserecovery} onChange={event => updateValue(event.target.value, "baserecovery")} />
                    </div>
                    <div>
                        <p>Size</p>
                        <input type="text" defaultValue={size} onChange={event => updateValue(event.target.value, "size")} />
                    </div>
                </div>
                {measureAndParry}
                <div className="armorBaseStats">
                    <p>Type</p>
                    <input className="basedamageLocation" type="text" defaultValue={type} onChange={event => updateValue(event.target.value, "type")} />
                </div>
                <div className="weaponBonusArea" className={position !== "four" ? "weaponBonusArea" : "weaponBonusArea bonusfour"}>
                    <p>Bonus</p>
                    <textarea defaultValue={bonus} onChange={event => updateValue(event.target.value, "bonus")} maxLength={"75"}></textarea>
                </div>
                <div className="weaponTraitArea">
                    <p>Traits</p>
                    <textarea className={position !== "four" ? "traitsLocation" : "traitsLocation traitsfour"} defaultValue={traits} onChange={event => updateValue(event.target.value, "traits")} maxLength={"35"}></textarea>
                </div>

                <div className="weaponCalculatedStats weaponCalculatedStatsHeader">
                    <p>Atk</p>
                    <p>Rcv</p>
                    <p>Pry</p>
                    <p>Dam</p>
                    <p>Init</p>
                    <p> </p>
                </div>

                <div className="weaponCalculatedStats">
                    <input type="number" defaultValue={trainattack} onChange={event => updateValue(event.target.value, "trainattack")} />
                    <input type="number" defaultValue={trainrecovery} onChange={event => updateValue(event.target.value, "trainrecovery")} />
                    <input type="number" defaultValue={trainparry} onChange={event => updateValue(event.target.value, "trainparry")} />
                    <input type="number" defaultValue={traindamage} onChange={event => updateValue(event.target.value, "traindamage")} />
                    <p> </p>
                    <p>Ski</p>
                </div>

                <div className="weaponCalculatedStats">
                    <input type="number" defaultValue={miscattack} onBlur={event => updateValue(event.target.value, "miscattack")} />
                    <input type="number" defaultValue={miscrecovery} onBlur={event => updateValue(event.target.value, "miscrecovery")} />
                    <input type="number" defaultValue={miscparry} onBlur={event => updateValue(event.target.value, "miscparry")} />
                    <input type="number" defaultValue={miscdamage} onBlur={event => updateValue(event.target.value, "miscdamage")} />
                    <input className={position !== "four" ? "" : "initfour"} type="number" defaultValue={miscinit} onBlur={event => updateValue(event.target.value, "miscinit")} />
                    <p>Mi</p>
                </div>

                <div className="weaponCalculatedStats">
                    <p>{returnZeroIfNaN(trainattack + +miscattack)}</p>
                    <p>{returnZeroIfNaN(totalRecoveryModifiers)}</p>
                    <p>{returnZeroIfNaN(trainparry + +miscparry)}</p>
                    <p>{returnZeroIfNaN(traindamage + +miscdamage)}</p>
                    <p className={position !== "four" ? "" : "initfour"}>{miscinit}</p>
                    <p>To</p>
                </div>
            </div>
        )
    }

    let measureAndParry = (<div className="armorBaseStats">
        <div>
            <p>Meas.</p>
            <p>{basemeasure}</p>
        </div>
        <div>
            <p>Parry</p>
            <p>{baseparry}</p>
        </div>
    </div>)
    if (position === "four") {
        measureAndParry = (null)
    }

    let miscInputs = (
        <div className="weaponCalculatedStats">
            <p> </p>
            <p> </p>
            <p> </p>
            <p> </p>
            <p className={position !== "four" ? "" : "initfour"}> </p>
            <p>Mi</p>
        </div>
    )
    if (id !== 'blank') {
        miscInputs = (
            <div className="weaponCalculatedStats">
                <input type="number" defaultValue={miscattack} onBlur={event => updateValue(event.target.value, "miscattack")} />
                <input type="number" defaultValue={miscrecovery} onBlur={event => updateValue(event.target.value, "miscrecovery")} />
                <input type="number" defaultValue={miscparry} onBlur={event => updateValue(event.target.value, "miscparry")} />
                <input type="number" defaultValue={miscdamage} onBlur={event => updateValue(event.target.value, "miscdamage")} />
                <input className={position !== "four" ? "" : "initfour"} type="number" defaultValue={miscinit} onBlur={event => updateValue(event.target.value, "miscinit")} />
                <p>Mi</p>
            </div>
        )
    }

    return (
        <div className={`weaponProfile${position} weaponProfileShell`}>
            <h2>Weapon Workspace</h2>
            <p className="weaponnameLocation">{name}</p>
            <div className="armorBaseStats">
                <p>Damage</p>
                <p className="basedamageLocation">{basedamage}</p>
            </div>
            <div className="armorBaseStats">
                <div>
                    <p>Recov.</p>
                    <p>{baserecovery}</p>
                </div>
                <div>
                    <p>Size</p>
                    <p>{size}</p>
                </div>
            </div>
            {measureAndParry}
            <div className="armorBaseStats">
                <p>Type</p>
                <p className="basedamageLocation">{type}</p>
            </div>
            <div className="weaponBonusArea" className={position !== "four" ? "weaponBonusArea" : "weaponBonusArea bonusfour"}>
                <p>Bonus</p>
                <p>{bonus}</p>
            </div>
            <div className="weaponTraitArea">
                <p>Traits</p>
                <p className={position !== "four" ? "traitsLocation" : "traitsLocation traitsfour"}>{traits}</p>
            </div>

            <div className="weaponCalculatedStats weaponCalculatedStatsHeader">
                <p>Atk</p>
                <p>Rcv</p>
                <p>Pry</p>
                <p>Dam</p>
                <p>Init</p>
                <p> </p>
            </div>

            <div className="weaponCalculatedStats">
                <p>{trainattack}</p>
                <p>{trainrecovery}</p>
                <p>{trainparry}</p>
                <p>{traindamage}</p>
                <p> </p>
                <p>Ski</p>
            </div>

            {miscInputs}

            <div className="weaponCalculatedStats">
                <p>{returnZeroIfNaN(trainattack + +miscattack)}</p>
                <p>{returnZeroIfNaN(totalRecoveryModifiers)}</p>
                <p>{returnZeroIfNaN(trainparry + +miscparry)}</p>
                <p>{returnZeroIfNaN(traindamage + +miscdamage)}</p>
                <p className={position !== "four" ? "" : "initfour"}>{miscinit}</p>
                <p>To</p>
            </div>
        </div>
    )
}