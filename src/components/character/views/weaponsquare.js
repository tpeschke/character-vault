import React from 'react'

export default function weaponsquare({ position, returnZeroIfNaN, calculateRecovery, weaponRecovery, armorRecovery, size, trainattack,
    miscattack, dexattack, intattack, dexinit, wisinit, armorbaseinit, armortraininit, armormiscinit, miscinit, dexdefense, wisdefense,
    armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, conencumb, wisencumb, armorbaseencumb,
    armortrainencumb, armormiscencumb, shieldmiscencumb, shieldtrainencumb, adjustedEncumb, armordr, shielddr, name, basedamage, traindamage,
    miscdamage, strdamage, measure, shieldbaseparry, shieldtrainparry, shieldmiscparry, parry, shieldbaseencumb }) {

    let shieldEncumb = shieldbaseencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0
    , armorEncumb = armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0
    , parryShown = parry === 'n/a' ? 'n/a' : shieldbaseparry ? shieldbaseparry + shieldtrainparry + shieldmiscparry : parry
    , shieldDrShown = parry === 'n/a' ? <div></div> : <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p>

    return (
        <div className={`weaponsquare weapon${position}`}>
            <p className="recovery">{returnZeroIfNaN(calculateRecovery(weaponRecovery + armorRecovery, size, false))}</p>
            <p className="attack">{returnZeroIfNaN(trainattack + miscattack + dexattack + intattack)}</p>
            <p className="init">{returnZeroIfNaN(dexinit + wisinit + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + miscinit)}</p>

            <p className="def">{dexdefense + wisdefense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
            <p className="encumb">{conencumb + wisencumb + armorEncumb + shieldEncumb + Math.floor(adjustedEncumb / 3)}</p>
            <div className="drshell">
                <p id="armorDr">{armordr}</p>
                {shieldDrShown}
            </div>

            <p className="measure">{measure}</p>
            <p className="damage">{basedamage}+{traindamage + miscdamage + strdamage}</p>
            <p className="parry">{parryShown}</p>

            <p className="name">{name}</p>
        </div>
    )
}