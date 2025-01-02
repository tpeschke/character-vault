import React from 'react'
import './miscVitals.css'

export default function MiscVitals({ miscVitals, editing }) {
    let { updateAttribute, currentfavor, favormax, anointed, id, vitalitydice, wis, con, stressdie } = miscVitals

    function rowPair(label, value, updateName) {
        if (editing && updateName) {
            return (
                <div>
                    <p>{label}</p>
                    <input type="text" defaultValue={value} onBlur={event => updateAttribute(event.target.value, updateName)} />
                </div>
            )
        }
        return (
            <div>
                <p>{label}</p>
                <p>{value}</p>
            </div>
        )
    }

    const minStress = minStressDictionary[wis]
    const minVitality = minVitalityDictionary[con]

    let anointedDiv = (<div className="anointedDiv"></div>)
    if (id !== 'blank') {
        anointedDiv = (<div className="anointedDiv" onClick={_ => updateAttribute(true, "anointed")}></div>)
    }
    if (anointed) {
        anointedDiv = (<div className="anointedDiv" onClick={_ => updateAttribute(false, "anointed")}><i className="fas fa-check"></i></div>)
    }

    let favorInput = <p> </p>
    if (id !== 'blank') {
        favorInput = <input className="currentfavorLocation" type="number" min="0" defaultValue={currentfavor} onBlur={event => updateAttribute(event.target.value, "currentfavor")} />
    }

    return (
        <div className="stressThresholdShell">
            <div className="vitalShell">
                <div>
                    <p>Favor</p>
                    {favorInput}
                </div>
                <div>
                    <p>Max</p>
                    {editing ? (
                        <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />
                    ) : (
                        <p className="favormaxLocation">{favormax}</p>
                    )}
                </div>
                <div className="checkboxShell">
                    <p>Anointed?</p>
                    <div className='anointedDivShell'>
                        {anointedDiv}
                    </div>
                </div>
            </div>
            <div className="dieAndMinShell">
                {rowPair('Vitality Die', vitalitydice, vitalitydice)}
                {rowPair('Min Vitality', minVitality)}
                {rowPair('Nerve Die', stressdie, stressdie)}
                {rowPair('Min Nerve', minStress)}
            </div>
        </div>
    )
}

const minStressDictionary = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 2,
    9: 2,
    10: 2,
    11: 2,
    12: 2,
    13: 2,
    14: 3,
    15: 3,
    16: 3,
    17: 3,
    18: 3,
    19: 4,
    20: 4,
    21: 4,
    22: 4,
    23: 4
}

const minVitalityDictionary = {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 2,
    10: 2,
    11: 2,
    12: 2,
    13: 2,
    14: 3,
    15: 3,
    16: 4,
    17: 4,
    18: 5,
    19: 5,
    20: 6,
    21: 6,
    22: 6,
    23: 6
}