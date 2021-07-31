import React from 'react'

export default function MiscVitals({ miscVitals, editing }) {
    let { con, currentstress, updateAttribute, totalEncumb, woundMultiplier, shownThreshold, relaxation, currentfavor, chaData, favormax, stressthreshold, wis } = miscVitals
    if (editing) {
        return (
            <div>
                <input className="stressthresholdLocation" type="number" min="0" defaultValue={stressthreshold} placeholder={stressthreshold ? stressthreshold : +wis * 3} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
                <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />
            </div>
        )
    }
    return (
        <div>
            <input className="currentstressLocation" type="number" defaultValue={currentstress} onBlur={event => updateAttribute(event.target.value, "currentstress")} />
            <p className={(totalEncumb * woundMultiplier) + currentstress > shownThreshold ? "stressthresholdLocation mentalBreak" : "stressthresholdLocation"}>{shownThreshold}</p>
            <input className="relaxationLocation" type="number" defaultValue={relaxation} onBlur={event => updateAttribute(event.target.value, "relaxation")} />
            <input className="currentfavorLocation" type="number" min="0" defaultValue={currentfavor} onBlur={event => updateAttribute(event.target.value, "currentfavor")} />
            <p className="favormaxLocation">{favormax}</p>
            <p className="favorminLocation">{chaData.favor}</p>
        </div>
    )
}