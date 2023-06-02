import React from 'react'

export default function MiscVitals({ miscVitals, editing }) {
    let { updateAttribute, currentfavor, chaData, favormax, anointed, id, vitalitydice, wis, con, stressdie } = miscVitals

    const minStress = minStressDictionary[wis]
    const minVitality = minVitalityDictionary[con]

    let anointedDiv = (<div className="anointedDiv"></div>)
    if (id !== 'blank') {
        anointedDiv = (<div className="anointedDiv" onClick={_ => updateAttribute(true, "anointed")}></div>)
    }
    if (anointed) {
        anointedDiv = (<div className="anointedDiv" onClick={_ => updateAttribute(false, "anointed")}><i className="fas fa-check"></i></div>)
    }

    let minFavor = null
    if (chaData) {
        minFavor = chaData.favor
    }

    if (editing) {
        return (
            <div className="stressThresholdShell">
                <div className="vitalShell">
                    <div>
                        <p>Favor</p>
                        <input className="currentfavorLocation" type="number" min="0" defaultValue={currentfavor} onBlur={event => updateAttribute(event.target.value, "currentfavor")} />
                    </div>
                    <div>
                        <p>Max</p>
                        <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />
                    </div>
                    <div className="checkboxShell">
                        <p>Anointed?</p>
                        <div className="checkboxShellInner">
                            <div></div>
                        </div>
                    </div>
                </div>

                <div className="dieAndMinShell">
                    <div>
                        <p>Vitality Die</p>
                        <input className="currentfavorLocation" type="text" defaultValue={vitalitydice} onBlur={event => updateAttribute(event.target.value, "vitalitydice")} />
                    </div>
                    <div>
                        <p>Min Vitality</p>
                        <p>{minVitality}</p>
                    </div>
                    <div>
                        <p>Stress Thes. Die</p>
                        <input className="currentfavorLocation" type="text" defaultValue={stressdie} onBlur={event => updateAttribute(event.target.value, "stressdie")} />
                    </div>
                    <div>
                        <p>Min Stress Thes.</p>
                        <p>{minStress}</p>
                    </div>
                </div>
            </div>
        )
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
                    <p className="favormaxLocation">{favormax}</p>
                </div>
                <div className="checkboxShell">
                    <p>Anointed?</p>
                    <div className="checkboxShellInner">
                        {anointedDiv}
                    </div>
                </div>
            </div>
            <div className="dieAndMinShell">
                <div>
                    <p>Vitality Die</p>
                    <p>{vitalitydice}</p>
                </div>
                <div>
                    <p>Min Vitality</p>
                    <p>{minVitality}</p>
                </div>
                <div>
                    <p>Stress Thes. Die</p>
                    <p>{stressdie}</p>
                </div>
                <div>
                    <p>Min Stress Thes.</p>
                    <p>{minStress}</p>
                </div>
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