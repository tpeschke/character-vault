import React from 'react'
import EditPairList from '../pairComponents/editPairList'
import ViewPairList from '../pairComponents/viewPairList'

export default function Vitality({ vitality, editing }) {
    let { shownVitality, updateAttribute, shownHonor, calculatePanickedLeft, damageone, damagetwo, sizemod, vitalitydice, vitalityroll, conData, vitalityTotal, id } = vitality

    let currentDamage = 0
    if (damageone && damagetwo) {
        currentDamage = damageone.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0) + damagetwo.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0)
    }

    if (editing) {
        return (
            <div className="vitalsShell">
                <h1>Vitality</h1>
                <div className="woundCategoryShell">
                    <div className="hurtLocation">
                        <p>H</p>
                        <p> </p>
                    </div>
                    <div className="bloodiedLocation">
                        <p>B</p>
                        <p> </p>
                    </div>
                    <div className="woundedLocation">
                        <p>W</p>
                        <p> </p>
                    </div>
                    <div className="criticalLocation">
                        <p>C</p>
                        <input className="criticalLocation" type="number" defaultValue={vitalityTotal} onChange={event => updateAttribute(event.target.value, "vitality")} />
                    </div>
                </div>

                <div className="currentDamageRow">
                    <div className="currentBox">
                        <p>Current</p>
                        <p className="currentDamageLocation"> </p>
                    </div>
                    <p className="tinyGrey">Severity</p>
                    <p className="tinyGrey">Days to Heal</p>
                    <div className="thresholdBox">
                        <p>Trauma Thres.</p>
                        <p className="traumaLocation"> </p>
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
                            <p>Wound</p>
                        </div>
                        <div></div>
                        <ViewPairList stylings={{ width: '99px' }} listArray={damageone} limit={8} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
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
                            <p>Wound</p>
                        </div>
                        <ViewPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={8} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />
                    </div>
                </div>

                <div className="vitalyRollsShell">
                    <div>
                        <p>Size Mod</p>
                        <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => updateAttribute(event.target.value, "sizemod")} />
                    </div>
                    <div>
                        <p>Roll</p>
                        <input className="vitalityrollLocation" type="number" min="0" defaultValue={vitalityroll} onChange={event => updateAttribute(event.target.value, "vitalityroll")} />
                    </div>
                    <div>
                        <p>Vit Die</p>
                        <input className="vitalitydiceLocation" type="text" defaultValue={vitalitydice} onChange={event => updateAttribute(event.target.value, "vitalitydice")} />
                    </div>
                    <div>
                        <p>Min Vit</p>
                        <p className="vitalityminLocation"> </p>
                    </div>
                </div>
            </div>
        )
    }

    let panickedCircle = <div></div>
    if (id !== 'blank') {
        panickedCircle = <div className="circle panickedCircle" style={calculatePanickedLeft(shownHonor)}></div>
    }

    let minVitality = null
    if (conData) {
        minVitality = conData.vitalitymin
    }

    let woundCategories = (
        <div className="woundCategoryShell">
            {panickedCircle}
            <div className="hurtLocation">
                <p>H</p>
                <p> </p>
            </div>
            <div className="bloodiedLocation">
                <p>B</p>
                <p> </p>
            </div>
            <div className="woundedLocation">
                <p>W</p>
                <p> </p>
            </div>
            <div className="criticalLocation">
                <p>C</p>
                <p> </p>
            </div>
        </div>
    )
    let traumaThreshold = <p className="traumaLocation"> </p>
    if (shownVitality) {
        woundCategories = (
            <div className="woundCategoryShell">
                {panickedCircle}
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
        )
        traumaThreshold = <p className="traumaLocation">{(shownVitality * .50).toFixed(0)}</p>
    }

    return (
        <div className="vitalsShell" key={`${damageone}${damagetwo}`}>
            <h1>Vitality</h1>
            {woundCategories}

            <div className="currentDamageRow">
                <div className="currentBox">
                    <p>Current</p>
                    <p className="currentDamageLocation">{currentDamage > 0 ? currentDamage : " "}</p>
                </div>
                <p className="tinyGrey">Severity</p>
                <p className="tinyGrey">Days to Heal</p>
                <div className="thresholdBox">
                    <p>Trauma Thres.</p>
                    {traumaThreshold}
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
                        <p>Wound</p>
                    </div>
                    <EditPairList stylings={{ width: '99px' }} listArray={damageone} limit={8} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
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
                        <p>Wound</p>
                    </div>
                    <EditPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={8} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />
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
                    <p className="vitalityminLocation">{minVitality}</p>
                </div>
            </div>
        </div>
    )
}