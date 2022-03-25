import React from 'react'

export default function weaponsquare({ weapon }) {
    let { position, returnZeroIfNaN, calculateRecovery, totalRecoveryModifiers, armorRecovery, size, trainattack,
        miscattack, dexattack, intattack, dexinit, wisinit, armorbaseinit, armortraininit, armormiscinit, miscinit, dexdefense, wisdefense,
        armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, name, basedamage, traindamage,
        miscdamage, strdamage, basemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, baseparry, usingshield, trainparry,
        miscparry, thrownweapon, updateAttribute, shieldname, type, baserecovery, totalFatigue, armorFatigue, isRanged, updateObject, editing, id } = weapon

        if (editing) {
            return (
                <div className={`weaponsquare weapon${position}`}>
                </div>
            )
        }

    if (!shielddr) { shielddr = ' 2/d' }
    if (!armordr) { armordr = 0 }
    if (!trainparry) {trainparry = 0}
    if (!miscparry) {miscparry = 0}
    if (!basemeasure) { basemeasure = 'n/a' }
    if (name && type) { name = `${name} (${type})` }

    let parryShown = isRanged ? 'n/a' : usingshield ? shieldbaseparry + shieldtrainparry + shieldmiscparry : baseparry + trainparry + miscparry
        , shieldDrShown = usingshield ? <p id="shieldDr"><i className="fas fa-shield-alt"></i>:{shielddr}</p> : <div></div>

    let drShell = (<div className="drshell fakebutton" onClick={_ => updateAttribute(!usingshield, 'usingshield')}>
        <p id="armorDr">{armordr}</p>
        {shieldDrShown}
    </div>)

    let mathOperator = getMathOperator(traindamage + +miscdamage + strdamage)
        , totalDamageModifier = traindamage + +miscdamage + strdamage

    if (isRanged && !thrownweapon) {
        mathOperator = getMathOperator(traindamage + +miscdamage)
        totalDamageModifier = traindamage + +miscdamage
    }

    if (totalDamageModifier === 0) {
        totalDamageModifier = ""
    } else {
        totalDamageModifier = mathOperator + totalDamageModifier
    }
    let damageShell = (<p className="damage">{basedamage}{totalDamageModifier}</p>)
    if (isRanged) {
        damageShell = (<p className="damage fakebutton" onClick={_ => updateObject('weaponfour', 'thrownweapon', !thrownweapon)}>{basedamage}{totalDamageModifier}</p>)
    }

    if (isRanged || shieldbaseparry + shieldtrainparry + shieldmiscparry <= 0) {
        drShell = (<div className="drshell">
            <p id="armorDr">{armordr}</p>
        </div>)
    }

    if (id !== 'blank') {
        return (
            <div className={`weaponsquare weapon${position}`}>
                <p className="name">{usingshield && shieldname && name ? `${name} & ${shieldname}` : name}</p>
                <p className="recovery">{returnZeroIfNaN(calculateRecovery(baserecovery + totalRecoveryModifiers + armorRecovery, size, false))}</p>
                <p className="attack">{returnZeroIfNaN(trainattack + +miscattack + dexattack + intattack)}</p>
                <p className="init">{returnZeroIfNaN(dexinit + wisinit + (armorbaseinit + armortraininit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit) + +miscinit)}</p>
    
                <p className="def">{dexdefense + wisdefense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
                <p className="encumb">{usingshield ? totalFatigue : armorFatigue}</p>
    
                {drShell}
    
                <p className="measure">{basemeasure}</p>
                {damageShell}
                <p className="parry">{parryShown}</p>
    
            </div>
        )
    } else {
        return (
            <div className={`weaponsquare weapon${position}`}>
    
            </div>
        )
    }
}

function getMathOperator(total) {
    if (total <= 0) {
        return ''
    }
    return '+'
}