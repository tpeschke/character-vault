import React from 'react'
import EditPairList from '../pairComponents/editPairList'
import ViewPairList from '../pairComponents/viewPairList'

function calculatePanickedLeft(honor, dwarfModifier, stresslockout) {
    let left = '0px'
        , display = 'inherit'
    const modifedStressLockout = dwarfModifier ? stresslockout - 1 : stresslockout

    if (dwarfModifier) {
        display = 'none'
    } else if (modifedStressLockout === 4) {
        left = '-23px'
    } else if (modifedStressLockout === 3) {
        left = '0px'
    } else if (modifedStressLockout === 2) {
        left = '81px'
    } else if (modifedStressLockout === 1) {
        left = '163px'
    } else {
        left = '245px'
    }

    return { left, display }
}

function calculateWoundedLeft(fatigue) {
    let left = '0px'
        , display = 'inherit'
        , borderColor = null
    if (fatigue === 'H') {
        left = '0px'
    } else if (fatigue === 'B') {
        left = '81px'
    } else if (fatigue === 'W') {
        left = '163px'
    } else if (fatigue === 'C') {
        left = '244px'
    } else if (fatigue === 'N') {
        display = 'none'
    } else {
        left = '-23px'
    }
    return { left, display }
}

function showAlwaysFatiguedPenalty(fatigue) {
    if (fatigue === 'H' || fatigue === 'B' || fatigue === 'W' || fatigue === 'C') {
        return ''
    } else {
        return fatigue
    }
}

export default function Vitality({ vitality, editing }) {
    let { shownVitality, overCarry, updateAttribute, shownHonor, damageone, damagetwo, sizemod, vitalitydice, vitalityroll, conData, 
        vitalityTotal, id, totalEncumb, woundMultiplier, shownThreshold, stressthreshold, wis, currentstress, relaxation, totalFatigue, 
        armorFatigue, usingshield, dwarfModifier, stressroll, stresslockout } = vitality

    let currentDamage = 0
    if (damageone && damagetwo) {
        currentDamage = damageone.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0) + damagetwo.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0)
    }

    let panickedCircle = <div className="circle panickedCircle"></div>
    let woundCircle = <div className="circle woundCircle"></div>

    let damageOnePairList = <ViewPairList stylings={{ width: '99px' }} listArray={damageone} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
    let damageTwoPairList = <ViewPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />
    if (id !== 'blank') {
        panickedCircle = <div className="circle panickedCircle" style={calculatePanickedLeft(shownHonor, dwarfModifier, stresslockout)}>{stresslockout >= 4 ? 'A' : '' }</div>
        woundCircle = <div className="circle woundCircle" style={calculateWoundedLeft(usingshield ? totalFatigue : armorFatigue)}>{showAlwaysFatiguedPenalty(usingshield ? totalFatigue : armorFatigue)}</div>
        damageOnePairList = <EditPairList stylings={{ width: '99px' }} listArray={damageone} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
        damageTwoPairList = <EditPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />
    }

    const updateStressLockout = (value) => {
        if (value === stresslockout) {
            updateAttribute(null, 'stresslockout')
        } else {
            updateAttribute(value, 'stresslockout')
        }
    }

    let stressCategories = (
        <div className="woundCategoryShell">
            {panickedCircle}
            <div className="hurtLocation">
                <p>U</p>
                <p className={stresslockout >= 4 ? 'strikeout' : ''}>1 - {(shownThreshold * .25).toFixed(0) - 1}</p>
            </div>
            <div className="bloodiedLocation">
                <p>T</p>
                <p className={stresslockout >= 3 ? 'strikeout' : ''}>{(shownThreshold * .25).toFixed(0)} - {(shownThreshold * .5).toFixed(0) - 1}</p>
            </div>
            <div className="woundedLocation">
                <p>S</p>
                <p className={stresslockout >= 2 ? 'strikeout' : ''}>{(shownThreshold * .50).toFixed(0)} - {(shownThreshold * .75).toFixed(0) - 1}</p>
            </div>
            <div className="criticalLocation">
                <p>Br</p>
                <p className={stresslockout >= 1 ? 'strikeout' : ''}>{(shownThreshold * .75).toFixed(0)} - {shownThreshold}</p>
            </div>
        </div>
    )
    if (stressthreshold) {
        stressCategories = (
            <div className="woundCategoryShell">
                {panickedCircle}
                <div className="hurtLocation">
                    <p>U</p>
                    <p>1 - {(stressthreshold * .25).toFixed(0) - 1}</p>
                </div>
                <div className="bloodiedLocation">
                    <p>T</p>
                    <p>{(stressthreshold * .25).toFixed(0)} - {(stressthreshold * .5).toFixed(0) - 1}</p>
                </div>
                <div className="woundedLocation">
                    <p>S</p>
                    <p>{(stressthreshold * .50).toFixed(0)} - {(stressthreshold * .75).toFixed(0) - 1}</p>
                </div>
                <div className="criticalLocation">
                    <p>Br</p>
                    <p>{(stressthreshold * .75).toFixed(0)} - {stressthreshold}</p>
                </div>
            </div>
        )
    }
    if (id === 'blank') {
        stressCategories = (
            <div className="woundCategoryShell">
                <div className="hurtLocation">
                    <p>U</p>
                    <p> </p>
                </div>
                <div className="bloodiedLocation">
                    <p>T</p>
                    <p> </p>
                </div>
                <div className="woundedLocation">
                    <p>S</p>
                    <p> </p>
                </div>
                <div className="criticalLocation">
                    <p>Br</p>
                    <p> </p>
                </div>
            </div>
        )
    }

    if (editing) {
        return (
            <div className="vitalsShell">
                <h1>Nerve</h1>
                <div className="woundCategoryShell">
                    <div className="hurtLocation">
                        <p>U</p>
                        <p><i className={stresslockout >= 4 ? 'locked-out fa-solid fa-rectangle-xmark' : 'fa-solid fa-rectangle-xmark'} onClick={_ => updateStressLockout(4)}></i></p>
                    </div>
                    <div className="bloodiedLocation">
                        <p>T</p>
                        <p><i className={stresslockout >= 3 ? 'locked-out fa-solid fa-rectangle-xmark' : 'fa-solid fa-rectangle-xmark'} onClick={_ => updateStressLockout(3)}></i></p>
                    </div>
                    <div className="woundedLocation">
                        <p>S</p>
                        <p><i className={stresslockout >= 2 ? 'locked-out fa-solid fa-rectangle-xmark' : 'fa-solid fa-rectangle-xmark'} onClick={_ => updateStressLockout(2)}></i></p>
                    </div>
                    <div className="criticalLocation">
                        <p>Br</p>
                        <p><i className={stresslockout >= 1 ? 'locked-out fa-solid fa-rectangle-xmark' : 'fa-solid fa-rectangle-xmark'} onClick={_ => updateStressLockout(1)}></i></p>
                    </div>
                </div>
                <div className="editingStressThreshold">
                    <div>
                        <p className='stressThreshold'>Nerve</p>
                        <input className="stressthresholdLocation" type="number" min="0" placeholder={stressthreshold} defaultValue={stressthreshold} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
                    </div>
                </div>
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
                        <p>Total Dam</p>
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
                        </div>
                        <div></div>
                        <ViewPairList stylings={{ width: '99px' }} listArray={damageone} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
                    </div>
                    <div className="damageShellRight">
                        <div className="woundTitleShell">
                            <p>Wound</p>
                            <p>Wound</p>
                            <p>Wound</p>
                            <p>Wound</p>
                            <p>Wound</p>
                        </div>
                        <ViewPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />
                    </div>
                </div>

                <div className="vitalyRollsShell">
                    <div>
                        <p>Size Mod</p>
                        <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => updateAttribute(event.target.value, "sizemod")} />
                    </div>
                </div>
            </div>
        )
    }

    let stress = <p> </p>
    let relaxationInput = <p> </p>
    if (id !== 'blank') {
        stress = <input className="currentstressLocation" type="number" defaultValue={currentstress} onBlur={event => updateAttribute(event.target.value, "currentstress")} />
        relaxationInput = <input className="relaxationLocation" type="number" defaultValue={relaxation} onBlur={event => updateAttribute(event.target.value, "relaxation")} />
    }

    let minVitality = null
    if (conData) {
        minVitality = conData.vitalitymin
    }

    let woundCategories = (
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
                <p> </p>
            </div>
        </div>
    )
    let traumaThreshold = <p className="traumaLocation"> </p>
    if (shownVitality) {
        woundCategories = (
            <div className="woundCategoryShell">
                {woundCircle}
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
            <h1>Nerve</h1>
            {stressCategories}
            <div className="stressShell">
                <div>
                    <p>Stress</p>
                    {stress}
                </div>
                <div>
                    <p>Relaxation</p>
                    {relaxationInput}
                </div>
            </div>
            <h1>Vitality</h1>
            {woundCategories}

            <div className="currentDamageRow">
                <div className="currentBox">
                    <p>Total Dam</p>
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
                    </div>
                    {damageOnePairList}
                </div>
                <div className="damageShellRight">
                    <div className="woundTitleShell">
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                        <p>Wound</p>
                    </div>
                    {damageTwoPairList}
                </div>
            </div>

            <div className="vitalyRollsShell">
                <div>
                    <p>Size Mod</p>
                    <p className="sizemodLocation">{sizemod}</p>
                </div>
            </div>
        </div>
    )
}