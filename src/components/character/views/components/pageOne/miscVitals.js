import React from 'react'

export default function MiscVitals({ miscVitals, editing }) {
    let { currentstress, updateAttribute, totalEncumb, woundMultiplier, shownThreshold, relaxation, currentfavor, chaData, favormax, stressthreshold, wis, anointed } = miscVitals

    let anointedDiv = (<div className="anointedDiv" onClick={_ => updateAttribute(true, "anointed")}></div>)
    if (anointed) {
        anointedDiv = (<div className="anointedDiv" onClick={_ => updateAttribute(false, "anointed")}><i class="fas fa-check"></i></div>)
    }

    if (editing) {
        return (
            <div className="stressThresholdShell">
                <div className="vitalShell">
                    <div>
                        <p>Stress</p>
                        <input className="currentstressLocation" type="number" defaultValue={currentstress} onBlur={event => updateAttribute(event.target.value, "currentstress")} />
                    </div>
                    <div>
                        <p>Threshold</p>
                        <input className="stressthresholdLocation" type="number" min="0" placeholder={stressthreshold} defaultValue={stressthreshold ? stressthreshold : +wis * 3} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
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
                        <input className="favormaxLocation" type="number" defaultValue={favormax} onChange={event => updateAttribute(event.target.value, "favormax")} />
                    </div>
                    <div className="checkboxShell">
                        <p>Anointed?</p>
                        <div className="checkboxShellInner">
                            <div></div>
                        </div>
                    </div>
                    <div>
                        <p>Min</p>
                        <p className="favorminLocation"> </p>
                    </div>
                </div>
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
                    <div className="checkboxShellInner">
                        {anointedDiv}
                    </div>
                </div>
                <div>
                    <p>Min</p>
                    <p className="favorminLocation">{chaData.favor}</p>
                </div>
            </div>
        </div>
    )
}