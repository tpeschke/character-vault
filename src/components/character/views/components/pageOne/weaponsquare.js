import React from 'react'

export default function weaponsquare({ weapon }) {
    let { position, returnZeroIfNaN, calculateRecovery, totalRecoveryModifiers, armorRecovery, size, trainattack,
        miscattack, dexattack, intattack, dexinit, wisinit, armorbaseinit, armortraininit, armormiscinit, miscinit, dexdefense, wisdefense,
        armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, name, basedamage, traindamage,
        miscdamage, strdamage, basemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, baseparry, usingshield, weapontrainparry,
        weaponmiscparry, thrownweapon, updateAttribute, totalEncumb, dead, stressAdjustment, shieldname, type, baserecovery } = weapon

    if (!shielddr) { shielddr = ' 2/d' }
    if (!armordr) { armordr = 0 }
    if (!baseparry) { baseparry = 'n/a' }
    if (!weapontrainparry) {weapontrainparry = 0}
    if (!weaponmiscparry) {weaponmiscparry = 0}
    if (!basemeasure) { basemeasure = 'n/a' }
    if (name && type) { name = `${name} (${type})` }

    let parryShown = baseparry === 'n/a' ? 'n/a' : usingshield ? shieldbaseparry + shieldtrainparry + shieldmiscparry : baseparry + weapontrainparry + weaponmiscparry
        , shieldDrShown = usingshield ? <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p> : <div></div>
        , stressAdjustmentAttack = dead ? stressAdjustment : 0
        , stressAdjustmentDefense = dead ? 0 : stressAdjustment

    let drShell = (<div className="drshell fakebutton" onClick={_ => updateAttribute(!usingshield, 'usingshield')}>
        <p id="armorDr">{armordr}</p>
        {shieldDrShown}
    </div>)
    let mathOperator = getMathOperator(traindamage + +miscdamage + strdamage)
        , totalDamageModifier = traindamage + +miscdamage + strdamage

    if (baseparry === 'n/a' && !thrownweapon) {
        mathOperator = getMathOperator(traindamage + +miscdamage)
        totalDamageModifier = traindamage + +miscdamage
    }

    if (totalDamageModifier === 0) {
        totalDamageModifier = ""
    } else {
        totalDamageModifier = mathOperator + totalDamageModifier
    }
    let damageShell = (<p className="damage">{basedamage}{totalDamageModifier}</p>)

    if (baseparry === 'n/a') {
        drShell = (<div className="drshell">
            <p id="armorDr">{armordr}</p>
        </div>)
        if (thrownweapon) {
            damageShell = (<p className="damage fakebutton" onClick={_ => updateAttribute(!thrownweapon, 'fourthrownweapon')}>{basedamage}{totalDamageModifier}</p>)
        } else {
            damageShell = (<p className="damage fakebutton" onClick={_ => updateAttribute(!thrownweapon, 'fourthrownweapon')}>{basedamage}{totalDamageModifier}</p>)
        }
    }

    return (
        <div className={`weaponsquare weapon${position}`}>
            <p className="recovery">{returnZeroIfNaN(calculateRecovery(baserecovery + totalRecoveryModifiers + armorRecovery, size, false))}</p>
            <p className="attack">{returnZeroIfNaN(trainattack + +miscattack + dexattack + intattack - stressAdjustmentAttack)}</p>
            <p className="init">{returnZeroIfNaN(dexinit + wisinit + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + +miscinit)}</p>

            <p className="def">{dexdefense + wisdefense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0) - stressAdjustmentDefense}</p>
            <p className="encumb">{totalEncumb}</p>

            {drShell}

            <p className="measure">{basemeasure}</p>
            {damageShell}
            <p className="parry">{parryShown}</p>

            <p className="name">{usingshield && shieldname && name ? `${name} & ${shieldname}` : name}</p>
        </div>
    )
}

function getMathOperator(total) {
    if (total <= 0) {
        return ''
    }
    return '+'
}