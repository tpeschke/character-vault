import React from 'react'

export default function MiscVitals({ miscVitals, editing }) {
    let { con, currentstress, updateAttribute, totalEncumb, woundMultiplier, shownThreshold, relaxation, currentfavor, chaData, favormax, stressthreshold, wis, anointed } = miscVitals
    if (editing) {
        return (
            <div>
                <input className="stressthresholdLocation" type="number" min="0" defaultValue={stressthreshold} placeholder={stressthreshold ? stressthreshold : +wis * 3} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
                <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />
            </div>
        )
    }
    return (
        <div className="stressThresholdShell">
            <div className="vitalShell">
                <div>
                    <p>Stress</p>
                    <input className="currentstressLocation" type="number" defaultValue={currentstress} onBlur={event => updateAttribute(event.target.value, "currentstress")} />
                </div>
                <div>
                    <p>Threshold</p>
                    <p className={(totalEncumb * woundMultiplier) + currentstress > shownThreshold ? "stressthresholdLocation mentalBreak" : "stressthresholdLocation"}>{shownThreshold}</p>
                </div>
                <div>
                    <p>Relxation</p>
                    <input className="relaxationLocation" type="number" defaultValue={relaxation} onBlur={event => updateAttribute(event.target.value, "relaxation")} />
                </div>
            </div>
            <div className="vitalShell">
                <div>
                    <p>Favor</p>
                    <input className="currentfavorLocation" type="number" min="0" defaultValue={currentfavor} onBlur={event => updateAttribute(event.target.value, "currentfavor")} />
                </div>
                <div>
                    <p>Max</p>
                    <p className="favormaxLocation">{favormax}</p>
                </div>
                <div className="checkboxShell">
                    <p>Anointed?</p>
                    <input className="favoranointed" type="checkbox" checked={anointed} onChange={event => updateAttribute(event.target.checked, "anointed")}></input>
                </div>
                <div>
                    <p>Min</p>
                    <p className="favorminLocation">{chaData.favor}</p>
                </div>
            </div>
        </div>
    )
}