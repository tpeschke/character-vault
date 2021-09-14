import React from 'react'

export default function WeaponBlock({ weapon, updateObject, returnZeroIfNaN, editing }) {
    let { position, name, basemeasure, basedamage, baseparry, baserecovery, size, type, bonus, traits, trainrecovery, trainattack, traindamage, trainparry,
        miscattack, miscdamage, miscinit, miscparry, miscrecovery, totalRecoveryModifiers } = weapon

    let updateValue = (value, key) => {
        if (!value) {
            value = null
        }
        weapon[key] = value
        updateObject(`weapon${position}`, key, value)
    }

    if (editing) {
        return (
            <div className={`weaponProfile${position}`}>
                <input className={position !== "four" ? "weaponnameLocation" : "weaponnameLocation weaponnamefour"} type="text" defaultValue={name} onChange={event => updateValue(event.target.value, "name")} />
                <input className={position !== "four" ? "basedamageLocation" : "basedamageLocation basedamagefour"} type="text" defaultValue={basedamage} onChange={event => updateValue(event.target.value, "basedamage")} />
                <input className="baserecoveryLocation" type="number" defaultValue={baserecovery} onChange={event => updateValue(event.target.value, "baserecovery")} />
                <input className={position !== "four" ? "baseparryLocation" : "baseparryLocation fourDisplayNone"} type="number" defaultValue={baseparry} onChange={event => updateValue(event.target.value, "baseparry")} />
                <input className={position !== "four" ? "basemeasureLocation" : "basemeasureLocation fourDisplayNone"} type="text" defaultValue={basemeasure} onChange={event => updateValue(event.target.value, "basemeasure")} />
                <input className={position !== "four" ? "basesizeLocation" : "basesizeLocation sizefour"} type="text" defaultValue={size} onChange={event => updateValue(event.target.value, "size")} />
                <input className={position !== "four" ? "typeLocation" : "typeLocation typefour"} type="text" defaultValue={type} onChange={event => updateValue(event.target.value, "type")} />
                <textarea className={position !== "four" ? "bonusLocation bonustextArea" : "bonusLocation bonustextArea bonusfour"} defaultValue={bonus} onChange={event => updateValue(event.target.value, "bonus")} maxLength={"75"}></textarea>
                <textarea className={position !== "four" ? "traitsLocation traitstextArea" : "traitsLocation traitstextArea traitsfour"} defaultValue={traits} onChange={event => updateValue(event.target.value, "traits")} maxLength={"35"}></textarea>

                <input className="trainattackLocation" type="number" defaultValue={trainattack} onChange={event => updateValue(event.target.value, "trainattack")} />
                <input className="trainrecoveryLocation" type="number" defaultValue={trainrecovery} onChange={event => updateValue(event.target.value, "trainrecovery")} />
                <input className={position !== "four" ? "trainparryLocation" : "trainparryLocation fourDisplayNone"} type="number" defaultValue={trainparry} onChange={event => updateValue(event.target.value, "trainparry")} />
                <input className="traindamageLocation" type="number" defaultValue={traindamage} onChange={event => updateValue(event.target.value, "traindamage")} />

                <input className="miscattackLocation" type="number" defaultValue={miscattack} onChange={event => updateValue(event.target.value, "miscattack")} />
                <input className="miscrecoveryLocation" type="number" defaultValue={miscrecovery} onChange={event => updateValue(event.target.value, "miscrecovery")} />
                <input className={position !== "four" ? "miscparryLocation" : "miscparryLocation fourDisplayNone"} type="number" defaultValue={miscparry} onChange={event => updateValue(event.target.value, "miscparry")} />
                <input className="miscdamageLocation" type="number" defaultValue={miscdamage} onChange={event => updateValue(event.target.value, "miscdamage")} />
                <input className={position !== "four" ? "miscinitLocation" : "miscinitLocation initfour"} type="number" defaultValue={miscinit} onChange={event => updateValue(event.target.value, "miscinit")} />

                <p className="totalattackLocation">{returnZeroIfNaN(trainattack + +miscattack)}</p>
                <p className="totalrecoveryLocation">{returnZeroIfNaN(totalRecoveryModifiers)}</p>
                <p className="totalparryLocation">{returnZeroIfNaN(trainparry + +miscparry)}</p>
                <p className="totaldamageLocation">{returnZeroIfNaN(traindamage + +miscdamage)}</p>
                <p className={position !== "four" ? "totalinitLocation" : "totalinitLocation initfour"}>{miscinit}</p>
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
                <p>Tr</p>
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