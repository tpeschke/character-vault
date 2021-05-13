import React from 'react'

export default function WeaponBlock({ weapon, updateObject, returnZeroIfNaN }) {
    let { position, name, basemeasure, basedamage, baseparry, baserecovery, size, type, bonus, traits, trainrecovery, trainattack, traindamage, trainparry,
        miscattack, miscdamage, miscinit, miscparry, miscrecovery, totalRecoveryModifiers } = weapon

    let updateValue = (value, key) => {
        weapon[key] = value
        updateObject(`weapon${position}`, key, value)
    }

    return (
        <div className={`weaponProfile${position}`}>
            <p className="weaponnameLocation">{name}</p>
            <p className="basedamageLocation">{basedamage}</p>
            <p className="baserecoveryLocation">{baserecovery}</p>
            <p className="baseparryLocation">{baseparry}</p>
            <p className="basemeasureLocation">{basemeasure}</p>
            <p className="basesizeLocation">{size}</p>
            <p className="typeLocation">{type}</p>
            <p className="bonusLocation">{bonus}</p>
            <p className="traitsLocation">{traits}</p>

            <p className="trainattackLocation">{trainattack}</p>
            <p className="trainrecoveryLocation">{trainrecovery}</p>
            <p className="trainparryLocation">{trainparry}</p>
            <p className="traindamageLocation">{traindamage}</p>

            <input className="miscattackLocation" type="number" defaultValue={miscattack} onBlur={event => updateValue(event.target.value, "miscattack")} />
            <input className="miscrecoveryLocation" type="number" defaultValue={miscrecovery} onBlur={event => updateValue(event.target.value, "miscrecovery")} />
            <input className="miscparryLocation" type="number" defaultValue={miscparry} onBlur={event => updateValue(event.target.value, "miscparry")} />
            <input className="miscdamageLocation" type="number" defaultValue={miscdamage} onBlur={event => updateValue(event.target.value, "miscdamage")} />
            <input className="miscinitLocation" type="number" defaultValue={miscinit} onBlur={event => updateValue(event.target.value, "miscinit")} />

            <p className="totalattackLocation">{returnZeroIfNaN(trainattack + +miscattack)}</p>
            <p className="totalrecoveryLocation">{returnZeroIfNaN(totalRecoveryModifiers)}</p>
            <p className="totalparryLocation">{returnZeroIfNaN(trainparry + +miscparry)}</p>
            <p className="totaldamageLocation">{returnZeroIfNaN(traindamage + +miscdamage)}</p>
            <p className="totalinitLocation">{miscinit}</p>
        </div>
    )
}