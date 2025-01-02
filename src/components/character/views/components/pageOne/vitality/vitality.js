import React from 'react'
import './vitality.css'
import EditPairList from '../../pairComponents/editPairList'
import ViewPairList from '../../pairComponents/viewPairList'

function calculatePanickedLeft(dwarfModifier, stresslockout = 1) {
    let left = '0px'
        , display = 'inherit'
    const modifedStressLockout = dwarfModifier ? stresslockout : stresslockout + 1

    if (modifedStressLockout === 4) {
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

    const STRESS = 'stress'
        , VITALITY = 'vitality'

    let currentDamage = 0
    if (damageone && damagetwo) {
        currentDamage = damageone.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0) + damagetwo.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0)
    }

    let damageOnePairList = <ViewPairList stylings={{ width: '99px' }} listArray={damageone} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damageone"} />
    let damageTwoPairList = <ViewPairList stylings={{ width: '99px' }} listArray={damagetwo} limit={5} titleWidth={50} titleSameAsValue={true} updateFunction={updateAttribute} type={"damagetwo"} />

    const updateStressLockout = (value) => {
        if (value === stresslockout) {
            updateAttribute(null, 'stresslockout')
        } else {
            updateAttribute(value, 'stresslockout')
        }
    }

    function getCategory(label, categoryNumber, max, type, isMax) {
        if (editing && type === STRESS) {
            const lockoutDic = {
                1: 4,
                2: 3,
                3: 2,
                4: 1
            }
            return (
                <div className="hurtLocation">
                    <p>{label}</p>
                    <p><i className={stresslockout >= lockoutDic[categoryNumber] ? 'locked-out fa-solid fa-rectangle-xmark' : 'fa-solid fa-rectangle-xmark'} onClick={_ => updateStressLockout(lockoutDic[categoryNumber])}></i></p>
                </div>
            )
        } else if (editing && type === VITALITY && isMax) {
            return (
                <div className="hurtLocation">
                    <p>{label}</p>
                    <input className="criticalLocation" type="number" defaultValue={max} onChange={event => updateAttribute(event.target.value, "vitality")} />
                </div>
            )
        } else if (editing && type === VITALITY) {
            return (
                <div className="hurtLocation">
                    <p>{label}</p>
                    <p> </p>
                </div>
            )
        }

        return (
            <div className="hurtLocation">
                <p>{label}</p>
                <p>{getCategoryRange(categoryNumber, max)}</p>
            </div>
        )
    }

    function getCategoryRange (categoryNumber, max) {
        if (id === 'blank') {
            return ''
        }
        if (categoryNumber === 1) {
            return 1
        }
        return `${(max * (.25 * (categoryNumber - 1))).toFixed(0)} - ${(max * (.25 * categoryNumber)).toFixed(0) - 1}`
    }

    return (
        <div className="vitalsShell" key={`${damageone}${damagetwo}`}>
            <h1>Nerve</h1>
            <div className="woundCategoryShell">
                {editing || id === 'blank' ? (
                    <></>
                ) : (
                    <div className={"circle panickedCircle"} style={calculatePanickedLeft(dwarfModifier, stresslockout)}>{stresslockout >= 4 ? 'A' : ''}</div>
                )}
                {getCategory('U', 1, shownThreshold, STRESS)}
                {getCategory('T', 2, shownThreshold, STRESS)}
                {getCategory('S', 3, shownThreshold, STRESS)}
                {getCategory('Br', 4, shownThreshold, STRESS)}
            </div>
            <div className="stressShell">
                {editing ? (
                    <div>
                        <p className='stressThreshold'>Nerve</p>
                        <input className="stressthresholdLocation" type="number" min="0" placeholder={stressthreshold} defaultValue={stressthreshold} onChange={event => updateAttribute(event.target.value, "stressthreshold")} />
                    </div>
                ) : (
                    <>
                        <div>
                            <p>Stress</p>
                            <input className="currentstressLocation" type="number" defaultValue={currentstress} onBlur={event => updateAttribute(event.target.value, "currentstress")} />
                        </div>
                        <div>
                            <p>Relaxation</p>
                            <input className="relaxationLocation" type="number" defaultValue={relaxation} onBlur={event => updateAttribute(event.target.value, "relaxation")} />
                        </div>
                    </>
                )}
            </div>
            <h1>Vitality</h1>
            <div className="woundCategoryShell">
                {editing || id === 'blank' ? (
                    <></>
                ) : (
                    <div className="circle woundCircle" style={calculateWoundedLeft(usingshield ? totalFatigue : armorFatigue)}>{showAlwaysFatiguedPenalty(usingshield ? totalFatigue : armorFatigue)}</div>
                )}
                {getCategory('H', 1, shownVitality, VITALITY)}
                {getCategory('B', 2, shownVitality, VITALITY)}
                {getCategory('W', 3, shownVitality, VITALITY)}
                {getCategory('C', 4, shownVitality ? shownVitality : vitalityTotal, VITALITY, true)}
            </div>

            <div className="currentDamageRow">
                <div className="currentBox">
                    <p>Total Dam</p>
                    <p className="currentDamageLocation">{currentDamage > 0 ? currentDamage : " "}</p>
                </div>
                <p className="tinyGrey">Severity</p>
                <p className="tinyGrey">Days to Heal</p>
                <div className="thresholdBox">
                    <p>Trauma Thres.</p>
                    <p className="traumaLocation">{id === 'blank' ? '' : ((shownVitality ? shownVitality : vitalityTotal) * .25).toFixed(0)}</p>
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
                    {editing ? (
                        <input className="sizemodLocation" type="number" min="0" defaultValue={sizemod} onChange={event => updateAttribute(event.target.value, "sizemod")} />
                    ) : (
                        <p className="sizemodLocation">{sizemod}</p>
                    )}
                </div>
            </div>
        </div >
    )
}