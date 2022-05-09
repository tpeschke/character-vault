import React from 'react'

export default function weaponsquare({ weapon }) {
    let { position, returnZeroIfNaN, calculateRecovery, totalRecoveryModifiers, armorRecovery, size, trainattack,
        miscattack, dexattack, intattack, dexinit, wisinit, armorbaseinit, armortraininit, armormiscinit, miscinit, dexdefense, wisdefense,
        armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, name, basedamage, traindamage,
        miscdamage, strdamage, basemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, baseparry, usingshield, trainparry,
        miscparry, thrownweapon, updateAttribute, shieldname, type, baserecovery, totalFatigue, armorFatigue, isRanged, updateObject, editing, id, calculateArmorDefense } = weapon

    if (editing) {
        return (
            <div className={`weaponsquare weapon${position}`}></div>
        )
    }

    if (!shielddr) { shielddr = ' 2/d' }
    if (!armordr) { armordr = 0 }
    if (!trainparry) { trainparry = 0 }
    if (!miscparry) { miscparry = 0 }
    if (!basemeasure) { basemeasure = 'n/a' }
    if (name && type) { name = `${name} (${type})` }

    let mathOperator = ''
        , totalDamageModifier = 0
        , addedDice = ''

    if (traindamage > 0) {
        if (!type) {
            type = 'S'
        }
        if (type.toUpperCase() === 'S') {
            addedDice = ` +${Math.ceil(traindamage / 2)}d4! `
            mathOperator = getMathOperator(+miscdamage + returnCorrectStr(isRanged, !thrownweapon, strdamage))
            totalDamageModifier = +miscdamage + + returnCorrectStr(isRanged, !thrownweapon, strdamage)
        } else if (type.toUpperCase() === 'P') {
            addedDice = ` +${Math.ceil(traindamage / 4)}d8! `
            mathOperator = getMathOperator(+miscdamage + + returnCorrectStr(isRanged, !thrownweapon, strdamage))
            totalDamageModifier = +miscdamage + + returnCorrectStr(isRanged, !thrownweapon, strdamage)
        } else {
            mathOperator = getMathOperator(traindamage + +miscdamage + + returnCorrectStr(isRanged, !thrownweapon, strdamage))
            totalDamageModifier = traindamage + +miscdamage + + returnCorrectStr(isRanged, !thrownweapon, strdamage)
        }
    } else {
        mathOperator = getMathOperator(+miscdamage + returnCorrectStr(isRanged, !thrownweapon, strdamage))
        totalDamageModifier = +miscdamage + + returnCorrectStr(isRanged, !thrownweapon, strdamage)
    }

    if (totalDamageModifier === 0) {
        totalDamageModifier = ""
    } else {
        totalDamageModifier = mathOperator + totalDamageModifier
    }

    let damageShell = (<p className="damage">{basedamage}{addedDice}{totalDamageModifier}</p>)
    if (isRanged) {
        damageShell = (
            <div className="damage fakebutton" onClick={_ => updateObject('weaponfour', 'thrownweapon', !thrownweapon)}>
                <p>{basedamage}{addedDice}{totalDamageModifier}</p>
                <div className='tooltip'><p>Click to {thrownweapon ? 'remove' : 'add\n'} Str Damage bonus</p></div>
            </div>)
    }

    let parryShown = isRanged ? 'n/a' : usingshield ? shieldbaseparry + shieldtrainparry + shieldmiscparry : baseparry + trainparry + miscparry
        , shieldDrShown = <div></div>

    if (usingshield && shieldbaseparry) {
        shieldDrShown = <p id="shieldDr"><i className="fas fa-shield-alt"></i>:{shielddr}{trainparry > 0 ? `+${Math.ceil(shieldtrainparry / 3)}` : ''}</p>
    } else if (usingshield && !shieldbaseparry) {
        shieldDrShown = <p id="shieldDr"><i className="fas fa-shield-alt"></i>:2/d{trainparry > 0 ? `+${Math.ceil(trainparry / 3)}` : ''}</p>
    }

    let drShell = (
        <div className="drshell fakebutton" onClick={_ => updateAttribute(!usingshield, 'usingshield')}>
            <p id="armorDr">{armordr}</p>
            {shieldDrShown}
            <div className='tooltip'><p>Click to {usingshield ? 'remove' : 'add'} shield</p></div>
        </div>
    )

    if (isRanged) {
        drShell = (
            <div className="drshell">
                <p id="armorDr">{armordr}</p>
            </div>
        )
    }

    if (id !== 'blank') {
        return (
            <div className={`weaponsquare weapon${position}`}>
                <p className="name">{usingshield && shieldname && name ? `${name} & ${shieldname}` : name}</p>
                <p className="recovery">{returnZeroIfNaN(calculateRecovery(baserecovery + totalRecoveryModifiers + armorRecovery, size, false))}</p>
                <p className="attack">{returnZeroIfNaN(trainattack + +miscattack + dexattack + intattack)}</p>
                <p className="init">{returnZeroIfNaN(dexinit + wisinit + (armorbaseinit + armortraininit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit) + +miscinit)}</p>

                <p className="def">{dexdefense + wisdefense + calculateArmorDefense(armorbasedef, armortrainingdef, armormiscdef) + (shieldbasedef + shieldtraindef + shieldmiscdef < 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0 + shieldmiscdef)}</p>
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

function returnCorrectStr(isRanged, thrownweapon, strdamage) {
    if (isRanged && !thrownweapon) {
        return 0
    } else {
        return strdamage
    }
}