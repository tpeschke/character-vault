import React from 'react'

export default function weaponsquare({ position, returnZeroIfNaN, calculateRecovery, weaponRecovery, armorRecovery, size, trainattack,
    miscattack, dexattack, intattack, dexinit, wisinit, armorbaseinit, armortraininit, armormiscinit, miscinit, dexdefense, wisdefense,
    armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, name, basedamage, traindamage,
    miscdamage, strdamage, measure, shieldbaseparry, shieldtrainparry, shieldmiscparry, parry, usingshield, weapontrainparry,
    weaponmiscparry, thrownweapon, updateAttribute, totalEncumb, dead, stressAdjustment, shieldname }) {

        if (!shielddr) {shielddr = ' 2/d'}
    let parryShown = parry === 'n/a' ? 'n/a' : usingshield ? shieldbaseparry + shieldtrainparry + shieldmiscparry : parry + weapontrainparry + weaponmiscparry
        , shieldDrShown = usingshield ? <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p> : <div></div>
        , stressAdjustmentAttack = dead ? stressAdjustment : 0
        , stressAdjustmentDefense = dead ? 0 : stressAdjustment

    let drShell = (<div className="drshell fakebutton" onClick={_ => updateAttribute(!usingshield, 'usingshield')}>
                        <p id="armorDr">{armordr}</p>
                        {shieldDrShown}
                    </div>)
    let mathOperator = getMathOperator(traindamage + +miscdamage + strdamage)
    let damageShell = (<p className="damage">{basedamage}{mathOperator}{traindamage + +miscdamage + strdamage}</p>)

    if (parry === 'n/a') {
        drShell = (<div className="drshell">
                    <p id="armorDr">{armordr}</p>
                </div>)
        if (thrownweapon) {
            damageShell = (<p className="damage fakebutton" onClick={_ => updateAttribute(!thrownweapon, 'fourthrownweapon')}>{basedamage}{mathOperator}{traindamage + +miscdamage + strdamage}</p>)
        } else {
            mathOperator = getMathOperator(traindamage + +miscdamage)
            damageShell = (<p className="damage fakebutton" onClick={_ => updateAttribute(!thrownweapon, 'fourthrownweapon')}>{basedamage}{mathOperator}{traindamage + +miscdamage}</p>)
        }
    }

    return (
        <div className={`weaponsquare weapon${position}`}>
            <p className="recovery">{returnZeroIfNaN(calculateRecovery(weaponRecovery + armorRecovery, size, false))}</p>
            <p className="attack">{returnZeroIfNaN(trainattack + +miscattack + dexattack + intattack - stressAdjustmentAttack)}</p>
            <p className="init">{returnZeroIfNaN(dexinit + wisinit + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + +miscinit)}</p>

            <p className="def">{dexdefense + wisdefense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0) - stressAdjustmentDefense}</p>
            <p className="encumb">{totalEncumb}</p>

            {drShell}

            <p className="measure">{measure}</p>
            {damageShell}
            <p className="parry">{parryShown}</p>

            <p className="name">{usingshield && shieldname && name ? `${name} & ${shieldname}` : name}</p>
        </div>
    )
}

function getMathOperator(total) {
    if (total < 0) {
        return ''
    } 
    return '+'
}