import React from 'react'
import combatStatMods from '../pageTwo/combatStatTables'

export default function weaponsquare({ weapon }) {
    let { position, returnZeroIfNaN, calculateRecovery, totalRecoveryModifiers, armorRecovery, size, trainattack,
        miscattack, dex, int, wis, armorbaseinit, armortraininit, armormiscinit, miscinit, str,
        armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, name, basedamage, traindamage,
        miscdamage, basemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, baseparry, usingshield, trainparry,
        miscparry, thrownweapon, updateAttribute, shieldname, type, baserecovery, totalFatigue, armorFatigue, isRanged, updateObject, editing, id, calculateArmorDefense } = weapon
    let { dexAtk, dexDef, dexInit, intAtk, willDef, willInit, strDam: strDamChart } = combatStatMods
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
    if (name && type) { name = `${name}` }

    let damageShell = (<p className="damage">{displayDamage(basedamage, type, traindamage, strDamChart[str])}</p>)
    if (isRanged) {
        damageShell = (
            <div className="damage fakebutton" onClick={_ => updateObject('weaponfour', 'thrownweapon', !thrownweapon)}>
                <p>{displayDamage(basedamage, type, traindamage, thrownweapon ? strDamChart[str] : 0)}</p>
                <div className='tooltip'><p>Click to {thrownweapon ? 'remove' : 'add\n'} Str Damage bonus</p></div>
            </div>)
    }

    let parryShown = isRanged ? 'n/a' : usingshield ? shieldbaseparry + shieldtrainparry + shieldmiscparry : baseparry + trainparry + miscparry
        , shieldDrShown = <div></div>

    if (usingshield && shieldbaseparry) {
        shieldDrShown = <p id="shieldDr"><div className='dr-icon shield-dr-icon'/>{shielddr}{trainparry > 0 ? `+${Math.floor(shieldtrainparry / 3)}` : ''}</p>
    } else if (usingshield && !shieldbaseparry) {
        shieldDrShown = <p id="shieldDr"><div className='dr-icon shield-dr-icon'/>2/d{trainparry > 0 ? `+${Math.floor(trainparry / 3)}` : ''}</p>
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
                <p className="recovery">{returnZeroIfNaN(calculateRecovery(baserecovery + totalRecoveryModifiers + armorRecovery, size, !isRanged))}</p>
                <p className="attack">{returnZeroIfNaN(trainattack + +miscattack + dexAtk[dex] + intAtk[int])}</p>
                <p className="init">{returnZeroIfNaN(dexInit[dex] + willInit[wis] + (armorbaseinit + armortraininit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0 + armormiscinit) + +miscinit)}</p>
                <p className="def">{returnZeroIfNaN(dexDef[dex] + willDef[wis] + calculateArmorDefense(armorbasedef, armortrainingdef, armormiscdef) + (shieldbasedef + shieldtraindef + shieldmiscdef < 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0 + shieldmiscdef))}</p>
                <p className="encumb">{type}</p>

                {drShell}

                <p className="measure">{returnZeroIfNaN(basemeasure)}</p>
                {damageShell}
                <p className="parry">{returnZeroIfNaN(parryShown)}</p>

            </div>
        )
    } else {
        return (
            <div className={`weaponsquare weapon${position}`}>

            </div>
        )
    }
}

function displayDamage(basedamage, damageType, traingingDamage, strDam) {
    let squareDamage = basedamage ? basedamage : ''

    let diceObject = {
        d3s: 0,
        d4s: 0,
        d6s: 0,
        d8s: 0,
        d10s: 0,
        d12s: 0,
        d20s: 0
    }

    squareDamage.split('+').forEach(dice => {
        let index = dice.indexOf("d")
            , substring = dice.substring(index)
        if (substring.includes('20')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d20s += +dice.substring(0, index)
            } else {
                ++diceObject.d20s
            }
        } else if (substring.includes('12')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d12s += +dice.substring(0, index)
            } else {
                ++diceObject.d12s
            }
        } else if (substring.includes('10')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d10s += +dice.substring(0, index)
            } else {
                ++diceObject.d10s
            }
        } else if (substring.includes('8')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d8s += +dice.substring(0, index)
            } else {
                ++diceObject.d8s
            }
        } else if (substring.includes('6')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d6s += +dice.substring(0, index)
            } else {
                ++diceObject.d6s
            }
        } else if (substring.includes('4')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d4s += +dice.substring(0, index)
            } else {
                ++diceObject.d4s
            }
        } else if (substring.includes('3')) {
            if (dice.substring(0, index) !== '' && dice.substring(0, index) != null) {
                diceObject.d3s += +dice.substring(0, index)
            } else {
                ++diceObject.d3s
            }
        }
    })

    let crushingDamageMod = 0
    if (traingingDamage) {
        if (damageType === 'S') {
            diceObject.d4s += Math.floor(traingingDamage / 2)
            let leftover = traingingDamage % 2
            if (leftover === 1) {
                diceObject.d3s += 1
            }
        } else if (damageType === 'P') {
            diceObject.d8s += Math.floor(traingingDamage / 4)
            let leftover = traingingDamage % 4
            if (leftover === 1) {
                diceObject.d3s += 1
            } else if (leftover === 2) {
                diceObject.d4s += 1
            } else if (leftover === 4) {
                diceObject.d6s += 1
            }
        } else {
            crushingDamageMod = traingingDamage
        }
    }

    let { d3s, d4s, d6s, d8s, d10s, d12s, d20s } = diceObject

    let diceString = ''

    if (d3s > 0) {
        diceString += `${d3s}d3!`
    }
    if (d4s > 0) {
        diceString += ` ${diceString !== '' ? '+' : ''}${d4s}d4!`
    }
    if (d6s > 0) {
        diceString += ` ${diceString !== '' ? '+' : ''}${d6s}d6!`
    }
    if (d8s > 0) {
        diceString += ` ${diceString !== '' ? '+' : ''}${d8s}d8!`
    }
    if (d10s > 0) {
        diceString += ` ${diceString !== '' ? '+' : ''}${d10s}d10!`
    }
    if (d12s > 0) {
        diceString += ` ${diceString !== '' ? '+' : ''}${d12s}d12!`
    }
    if (d20s > 0) {
        diceString += ` ${diceString !== '' ? '+' : ''}${d20s}d20!`
    }

    if (strDam + crushingDamageMod > 0) {
        diceString += ` +${strDam + crushingDamageMod}`
    } else if (strDam + crushingDamageMod < 0) {
        diceString += ` ${strDam + crushingDamageMod}`
    }

   return diceString
}