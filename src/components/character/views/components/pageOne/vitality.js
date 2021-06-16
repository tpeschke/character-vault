import React from 'react'
import EditPairList from '../pairComponents/editPairList'

export default function Vitality({ vitality, editing }) {
    let { shownVitality, updateAttribute, currentDamage, shownHonor, calculatePanickedLeft, damageone, damagetwo, sizemod, vitalitydice, vitalityroll, conData, vitalityTotal } = vitality

    if (editing) {
        return (
            <div>
                <input className="criticalLocation" type="number" defaultValue={vitalityTotal} onChange={event => updateAttribute(event.target.value, "vitality")} />
                <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => updateAttribute(event.target.value, "sizemod")} />
                <input className="vitalityrollLocation" type="number" min="0" defaultValue={vitalityroll} onChange={event => updateAttribute(event.target.value, "vitalityroll")} />
                <input className="vitalitydiceLocation" type="text" defaultValue={vitalitydice} onChange={event => updateAttribute(event.target.value, "vitalitydice")} />
            </div>
        )
    }

    return (
        <div>
            <p className="criticalLocation">{(shownVitality * .75).toFixed(0)} - {shownVitality}</p>
            <p className="woundedLocation">{(shownVitality * .50).toFixed(0)} - {(shownVitality * .75).toFixed(0) - 1}</p>
            <p className="bloodiedLocation">{(shownVitality * .25).toFixed(0)} - {(shownVitality * .5).toFixed(0) - 1}</p>
            <p className="hurtLocation">1 - {(shownVitality * .25).toFixed(0) - 1}</p>
            <p className="currentDamageLocation">{currentDamage}</p>
            <p className="traumaLocation">{(shownVitality * .50).toFixed(0)}</p>
            <div className="circle panickedCircle" style={calculatePanickedLeft(shownHonor)}></div>

            <EditPairList stylings={{ top: '677px', left: '522px', width: '96px' }} listArray={damageone} limit={7} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
            <EditPairList stylings={{ top: '677px', left: '697px', width: '96px' }} listArray={damagetwo} limit={7} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />

            <p className="sizemodLocation">{sizemod}</p>
            <p className="vitalityrollLocation">{vitalityroll}</p>
            <p className="vitalitydiceLocation">{vitalitydice}</p>
            <p className="vitalityminLocation">{conData.vitalitymin}</p>
        </div>
    )
}