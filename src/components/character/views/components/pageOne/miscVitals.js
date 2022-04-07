import React from 'react'

export default function MiscVitals({ miscVitals, editing }) {
    let { updateAttribute, relaxation, currentfavor, chaData, favormax, anointed, id } = miscVitals

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
                    <div>
                        <p>Min</p>
                        <p className="favorminLocation"> </p>
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
                <div>
                    <p>Min</p>
                    <p className="favorminLocation">{minFavor}</p>
                </div>
            </div>
        </div>
    )
}