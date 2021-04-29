import React from 'react'

export default function weaponsquare({ position, returnZeroIfNaN, calculateRecovery, weaponRecovery, armorRecovery, size, trainattack,
    miscattack, dexattack, intattack, dexinit, wisinit, armorbaseinit, armortraininit, armormiscinit, miscinit, dexdefense, wisdefense,
    armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, conencumb, wisencumb, armorbaseencumb,
    armortrainencumb, armormiscencumb, shieldmiscencumb, shieldtrainencumb, adjustedEncumb, armordr, shielddr, name, basedamage, traindamage,
    miscdamage, strdamage, measure, shieldbaseparry, shieldtrainparry, shieldmiscparry, parry, shieldbaseencumb, usingshield, weapontrainparry,
    weaponmiscparry, thrownweapon, updateAttribute }) {

    let shieldEncumb = shieldbaseencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0
        , armorEncumb = armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0
        , parryShown = parry === 'n/a' ? 'n/a' : usingshield ? shieldbaseparry + shieldtrainparry + shieldmiscparry : parry + weapontrainparry + weaponmiscparry
        , shieldDrShown = usingshield ? <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p> : <div></div>

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

    if (!usingshield) { shieldEncumb = 0 }
    return (
        <div className={`weaponsquare weapon${position}`}>
            <p className="recovery">{returnZeroIfNaN(calculateRecovery(weaponRecovery + armorRecovery, size, false))}</p>
            <p className="attack">{returnZeroIfNaN(trainattack + +miscattack + dexattack + intattack)}</p>
            <p className="init">{returnZeroIfNaN(dexinit + wisinit + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + +miscinit)}</p>

            <p className="def">{dexdefense + wisdefense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
            <p className="encumb">{conencumb + wisencumb + armorEncumb + shieldEncumb + Math.floor(adjustedEncumb / 3)}</p>

            {drShell}

            <p className="measure">{measure}</p>
            {damageShell}
            <p className="parry">{parryShown}</p>

            <p className="name">{name}</p>
        </div>
    )
}

function getMathOperator(total) {
    if (total < 0) {
        return ''
    } 
    return '+'
}