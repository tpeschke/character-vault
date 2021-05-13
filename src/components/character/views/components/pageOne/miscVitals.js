import React from 'react'

export default function MiscVitals({ miscVitals }) {
    let { con, currentstress, updateAttribute, totalEncumb, woundMultiplier, shownThreshold, relaxation, currentfavor, chaData, favormax } = miscVitals
    return (
        <div>
            <p className="takingabreatherLocation">{20 - con < 3 ? 3 : 20 - con} seconds</p>
            <input className="currentstressLocation stressAdjust" type="number" defaultValue={currentstress} onBlur={event => this.updateAttribute(event.target.value, "currentstress")} />
            <p className="totalstressLocation">+{totalEncumb * woundMultiplier}</p>
            <p className={(totalEncumb * woundMultiplier) + currentstress > shownThreshold ? "stressthresholdLocation mentalBreak" : "stressthresholdLocation"}>{shownThreshold}</p>
            <input className="relaxationLocation" type="number" defaultValue={relaxation} onBlur={event => this.updateAttribute(event.target.value, "relaxation")} />
            <input className="currentfavorLocation" type="number" min="0" defaultValue={currentfavor} onBlur={event => this.updateAttribute(event.target.value, "currentfavor")} />
            <p className="favormaxLocation">{favormax}</p>
            <p className="favorminLocation">{chaData.favor}</p>
        </div>
    )
}