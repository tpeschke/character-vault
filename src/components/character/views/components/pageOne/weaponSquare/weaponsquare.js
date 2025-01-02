import React from 'react'
import './weaponsquare.css'
import combatStatMods from '../../pageTwo/baseCombatStats/combatStatTables'

const calculateRecovery = (recovery, size, isMelee, type, strRec, isBow) => {
    let minimumRecovery
    let sizeWasFalse = false
    if (!type) {
        type = "C"
    }

    if (!size) {
        size = "H"
        sizeWasFalse = true
    }
    if (!isMelee) {
        const mins = {
            S: 4,
            M: 5,
            L: 6,
            H: 7
        }

        minimumRecovery = mins[size.toUpperCase()]
    } else {
        const mins = {
            P: {
                S: 3,
                M: 3,
                L: 3,
                H: 3
            },
            S: {
                S: 4,
                M: 5,
                L: 6,
                H: 7
            },
            C: {
                S: 5,
                M: 6,
                L: 7,
                H: 8
            }
        }

        minimumRecovery = mins[type.toUpperCase()][size.toUpperCase()]
    }

    if (isMelee || isBow) {
        const modifier = {
            S: 1,
            M: 2,
            L: 3,
            H: 4
        }
        if (sizeWasFalse) {
            recovery += Math.floor(strRec * modifier.S)
        } else {
            recovery += Math.floor(strRec * modifier[size])
        }
    }

    return recovery < minimumRecovery ? minimumRecovery : recovery
}

const getName = (usingshield, shieldname, name, showArmor) => {
    let finalName = name
    if (finalName) {
        if (usingshield && shieldname && name) {
            finalName += ` & ${shieldname}`
        }

        if (!showArmor) {
            finalName += ` (w/o armor)`
        }
    }

    return finalName
}

export default function weaponsquare({ weapon }) {
    let { position, returnZeroIfNaN, size, trainattack,
        miscattack, dex, int, wis, armorbaseinit, armortraininit, armormiscinit, str, armorbaserecovery, armortrainrecovery, armormiscrecovery,
        armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldmiscdef, armordr, shielddr, name, basedamage, traindamage,
        basemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, baseparry, usingshield, trainparry,
        miscparry, thrownweapon, shieldname, shieldflanks, type, baserecovery, isRanged, updateObject, id, calculateArmorDefense,
        shieldcover, miscrecovery, trainrecovery, showArmor, maxrange, baseInit = 5 } = weapon
    let { dexAtk, dexDef, intAtk, willDef, strDam: strDamChart, strRec } = combatStatMods

    if (!shielddr) { shielddr = ' 2/d' }
    if (!armordr) { armordr = 0 }
    if (!trainparry) { trainparry = 0 }
    if (!miscparry) { miscparry = 0 }
    if (!basemeasure) { basemeasure = 'n/a' }
    if (name && type) { name = `${name}` }
    if (!returnZeroIfNaN) { returnZeroIfNaN = (param1) => ''}

    traindamage = Math.ceil(traindamage / 2)

    let damageString = displayDamage(basedamage, type, traindamage, strDamChart[str])
    if (isRanged) {
        damageString = displayDamage(basedamage, type, traindamage, thrownweapon ? strDamChart[str] : 0)
    }

    let damageTag = <p className='double'>{damageString}</p>
    if (position === 'four' && id !== 'blank') {
        damageTag = (
            <div className="damage fakebutton" onClick={_ => updateObject('weaponfour', 'thrownweapon', !thrownweapon)}>
                <p>{damageString}</p>
                <div className='tooltip'><p>Click to {thrownweapon ? 'remove ' : 'add\n'}Str Damage bonus</p></div>
            </div>)
    }

    let parryShown = isRanged ? 'n/a' : usingshield ? `${shieldbaseparry + shieldtrainparry + shieldmiscparry} (${baseparry + trainparry + miscparry})` : baseparry + trainparry + miscparry
        , shieldDrShown = '2/d'
    if (id === 'blank') {
        parryShown = ''
        shieldDrShown = ''
    }

    if (usingshield && shieldbaseparry) {
        shieldDrShown = shielddr
    }

    let armorDR = showArmor ? armordr : id === 'blank' ? '' : 0

    let cover = 0
    let defense = 0

    let shieldModifiers = 0
    if (usingshield) {
        shieldModifiers = shieldbasedef + shieldmiscdef < 0 ? shieldbasedef + shieldmiscdef : 0 + shieldmiscdef
    }

    if (id !== 'blank') {
        defense = returnZeroIfNaN(dexDef[dex] + willDef[wis] + calculateArmorDefense(armorbasedef, armortrainingdef, armormiscdef, showArmor) + shieldModifiers)
    } else {
        defense = ''
        cover = ''
    }
    if (shieldcover && usingshield) {
        cover = shieldcover
    }

    let armorRecovery = armorbaserecovery + (armortrainrecovery * -1) + armormiscrecovery > 0 ? armorbaserecovery + (armortrainrecovery * -1) + armormiscrecovery : 0
    let armorInit = (armorbaseinit + (armortraininit * -1) > 0 ? armorbaseinit + (armortraininit * -1) + armormiscinit : 0 + armormiscinit)

    if (!showArmor) {
        armorRecovery = armormiscrecovery
        armorInit = armormiscinit
    }

    let parryDr = !usingshield && trainparry && Math.floor(trainparry / 3) > 0 ? `+${Math.floor(trainparry / 3)}` : ''

    const isBow = name ? name.toUpperCase().includes('BOW') : false


    function statRow(label, value, isColumn, callback) {
        return (<div className={isColumn ? 'column' : ''}>
            <p className='first-cell'>{label}</p>
            <p>{callback ? callback(value) : value}</p>
        </div>)
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
                } else if (leftover === 3) {
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

    return (
        <div className={`weaponsquare`}>
            <p className="name">{getName(usingshield, shieldname, name, showArmor)}</p>
            <div className='combat-table-shell'>
                <div className='combat-table-column'>
                    <div>
                        <p>Attacks</p>
                    </div>
                    {statRow(position === 'four' ? 'R.I.' : 'Meas', maxrange ? (maxrange / 6).toFixed(0) : returnZeroIfNaN(basemeasure))}
                    {statRow('Atk', trainattack + +miscattack + dexAtk[dex] + intAtk[int], false, returnZeroIfNaN)}
                    <div className='column'>
                        <p className='first-cell'>Damage</p>
                        {damageTag}
                    </div>
                    {statRow('Type', type)}
                    {statRow('Rec', calculateRecovery(baserecovery + (Math.ceil(trainrecovery / 2) * -1) + +miscrecovery + armorRecovery, size, !isRanged, type, strRec[str], isBow), false, returnZeroIfNaN)}
                    {statRow('Init', baseInit - armorInit, false, returnZeroIfNaN)}
                </div>
                <div className='combat-table-column'>
                    <div>
                        <p>Defenses</p>
                    </div>
                    {statRow('Def', defense)}
                    {statRow('Flanks', shieldflanks && usingshield ? shieldflanks : id === 'blank' ? '' : 1)}
                    {statRow('Parry', parryShown)}
                    {statRow('Cover', cover, true)}
                    {statRow('Parry DR', `${shieldDrShown}${parryDr}`, true)}
                    {statRow('DR', armorDR, true)}
                </div>
            </div>
        </div>
    )
}
