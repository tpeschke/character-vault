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
        <div className="vitalsShell">
            <h1>Vitality</h1>
            <div className="woundCategoryShell">
                <div className="circle panickedCircle" style={calculatePanickedLeft(shownHonor)}></div>
                <div className="hurtLocation">
                    <p>H</p>
                    <p>1 - {(shownVitality * .25).toFixed(0) - 1}</p>
                </div>
                <div className="bloodiedLocation">
                    <p>B</p>
                    <p>{(shownVitality * .25).toFixed(0)} - {(shownVitality * .5).toFixed(0) - 1}</p>
                </div>
                <div className="woundedLocation">
                    <p>W</p>
                    <p>{(shownVitality * .50).toFixed(0)} - {(shownVitality * .75).toFixed(0) - 1}</p>
                </div>
                <div className="criticalLocation">
                    <p>C</p>
                    <p>{(shownVitality * .75).toFixed(0)} - {shownVitality}</p>
                </div>
            </div>

            <div className="currentDamageRow">
                <div className="currentBox">
                    <p>Current</p>
                    <p lassName="currentDamageLocation">{currentDamage}</p>
                </div>
                <p className="tinyGrey">Severity</p>
                <p className="tinyGrey">Days to Heal</p>
                <div className="thresholdBox">
                    <p>Trauma Thres.</p>
                    <p className="traumaLocation">{(shownVitality * .50).toFixed(0)}</p>
                </div>
                <p className="tinyGrey">Severity</p>
                <p className="tinyGrey">Days to Heal</p>
            </div>

            <div className="damageShell">
                <div className="damageShellLeft">
                    <div className="woundTitleShell">
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                    </div>
                    <EditPairList stylings={{ width: '99px' }} listArray={damageone} limit={7} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
                </div>
                <div className="damageShellRight">
                    <div className="woundTitleShell">
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                    </div>
                    <EditPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={7} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />
                </div>
            </div>

            <div className="vitalyRollsShell">
                <div>
                    <p>Size Mod</p>
                    <p className="sizemodLocation">{sizemod}</p>
                </div>
                <div>
                    <p>Roll</p>
                    <p className="vitalityrollLocation">{vitalityroll}</p>
                </div>
                <div>
                    <p>Vit Die</p>
                    <p className="vitalitydiceLocation">{vitalitydice}</p>
                </div>
                <div>
                    <p>Min Vit</p>
                    <p className="vitalityminLocation">{conData.vitalitymin}</p>
                </div>
            </div>
        </div>
    )
}