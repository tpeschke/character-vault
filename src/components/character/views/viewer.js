import axios from 'axios'
import React, { Component } from 'react'

import WeaponSquare from './components/pageOne/weaponsquare'
import CharacterInfo from './components/pageOne/characterInfo'
import Stats from './components/pageOne/stats'
import Movement from './components/pageOne/movement'
import Social from './components/pageOne/social'
import MiscVitals from './components/pageOne/miscVitals'
import Ranges from './components/pageOne/ranges'
import Vitality from './components/pageOne/vitality'
import Abilities from './components/pageOne/abilities'
import Skills from './components/pageTwo/skill'
import CashAndGear from './components/pageTwo/cashAndGear'
import BaseCombatFromStats from './components/pageTwo/baseCombatStats'
import ArmorBlock from './components/pageTwo/armorBlock'
import ShieldBlock from './components/pageTwo/shieldBlock'
import WeaponBlock from './components/pageTwo/weaponBlock'

export default class CharacterViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: props.character,
            adjustedEncumb: null,
            isUpdating: false,
            currentDamage: 0,
            woundMultiplier: 0,
            dead: false,
            shownVitality: 0,
            endurance: 0
        }
    }

    componentWillMount() {
        let { gearone, geartwo, gearthree, gearfour, vitality, sizemod, vitalityroll, con, skills } = this.state.character
        this.reduceAndCleanGearArrays(gearone, geartwo, gearthree, gearfour)
        this.calculateCurrentDamage()
        let endurance = skills.filter(({ skill }) => skill.toUpperCase() === "ENDURANCE")
        if (endurance[0]) {
            endurance = endurance[0].rank
        } else {
            endurance = 0
        }
        this.setState({ shownVitality: vitality ? vitality : sizemod + vitalityroll + con, endurance })
    }

    reduceAndCleanGearArrays = (gearone, geartwo, gearthree, gearfour) => {
        let totalCarry = 0
        let cleanArray = ({ value }) => {
            if (!isNaN(+value)) { return 0 }
            value = value.toUpperCase()
            let containsCarry = value.match(/\b([1-9][SML])\b|\b[SML]\b|\+[SML]|(\+[1-9][SML])/g)
            if (!containsCarry) { return 0 }
            let currentBit = ''
            value = value.replace(/\s+/g, '')
            value.split('').forEach(character => {
                if (character === 'S' || character === 'M' || character === 'L') {
                    currentBit = currentBit + character
                    currentBit = currentBit.split('')
                    let number, type, container = false
                    if (currentBit.includes('+') || currentBit.includes('-')) {
                        container = true
                        number = +currentBit[1]
                        type = currentBit[2]
                    } else if (+currentBit[0]) {
                        number = +currentBit[0]
                        type = currentBit[1]
                    } else {
                        number = 1
                        type = currentBit[0]
                    }
                    let adjustedAmount = 0
                    if (type === 'S') {
                        adjustedAmount += +number
                    } else if (type === 'M') {
                        adjustedAmount += (+number * 3)
                    } else if (type === 'L') {
                        adjustedAmount += (+number * 9)
                    }
                    if (container) {
                        totalCarry -= adjustedAmount
                    } else {
                        totalCarry += adjustedAmount
                    }
                    currentBit = ''
                } else if (!isNaN(+character) || character === '+') {
                    currentBit = currentBit + character
                }
            })
        }

        let quarterMastering = this.state.character.skills.filter(({ skill }) => skill.toUpperCase() === "QUARTERMASTERING" || skill.toUpperCase() === "QUARTER MASTERING")
        if (quarterMastering[0]) {
            totalCarry -= quarterMastering[0].rank
        }

        gearone.forEach(cleanArray)
        geartwo.forEach(cleanArray)
        gearthree.forEach(cleanArray)
        gearfour.forEach(cleanArray)

        this.setState({ adjustedEncumb: totalCarry })
    }

    convertFromEncumbToCarry = (value) => {
        if (value <= 0) { return "0S 0M 0L" }
        let large = Math.floor(value / 9)
        let largeRemainder = value % 9
        let medium = Math.floor(largeRemainder / 3)
        let mediumRemainder = value % 3
        let small = mediumRemainder

        return `${small}S ${medium}M ${large}L`
    }

    calculateCurrentDamage = () => {
        let { damageone, damagetwo } = this.state.character
        let currentDamage = damageone.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0) + damagetwo.reduce((accumulator, currentValue) => accumulator + +currentValue.title, 0)
        this.setState({ currentDamage }, this.calculateDamageStress)
    }

    calculateDamageStress = () => {
        let { currentDamage, shownVitality } = this.state
        if (currentDamage > shownVitality) {
            this.setState({ woundMultiplier: 4, dead: true })
        } else if (currentDamage > +(shownVitality * .75).toFixed(0)) {
            this.setState({ woundMultiplier: 4, dead: false })
        } else if (currentDamage > +(shownVitality * .5).toFixed(0)) {
            this.setState({ woundMultiplier: 3, dead: false })
        } else if (currentDamage > +(shownVitality * .25).toFixed(0)) {
            this.setState({ woundMultiplier: 2, dead: false })
        } else if (currentDamage > 1) {
            this.setState({ woundMultiplier: 1, dead: false })
        } else {
            this.setState({ woundMultiplier: 0, dead: false })
        }
    }

    calculateRecovery = (recovery, size, isMelee) => {
        let minimumRecovery
        if (!size) {
            size = "L"
        }
        if (size.toUpperCase() === 'S') {
            isMelee ? minimumRecovery = 2 : minimumRecovery = 3
        } else if (size.toUpperCase() === 'M') {
            isMelee ? minimumRecovery = 3 : minimumRecovery = 4
        } else {
            isMelee ? minimumRecovery = 4 : minimumRecovery = 5
        }
        return recovery < minimumRecovery ? minimumRecovery : recovery
    }

    returnZeroIfNaN = (thing) => {
        if (isNaN(+thing)) {
            return 0
        }
        return thing
    }

    updateAttribute = (value, type) => {
        let character = { ...this.state.character }
        if (!isNaN(+value)) {
            value = +value
        }
        if (type === 'damageone' || type === 'damagetwo' || type === 'gearone' || type === 'geartwo' || type === 'gearthree') {
            if (value === 0) {
                value = []
            }
        }

        if (character[type] !== value) {
            this.setState({ isUpdating: true }, _ => {
                axios.patch(`/api/updateSingleThing/${this.state.character.id}`, { [type]: value }).then(result => {
                    this.setState({ isUpdating: false })
                })
                character[type] = value
                this.setState({ character }, _ => {
                    if (type.includes('gear')) {
                        let { gearone, geartwo, gearthree, gearfour } = this.state.character
                        this.reduceAndCleanGearArrays(gearone, geartwo, gearthree, gearfour)
                    } else if (type.includes('damage')) {
                        this.calculateCurrentDamage()
                    }
                })
            })
        }
    }

    updateObject = (object, key, value) => {
        let character = { ...this.state.character }
        if (!isNaN(+value)) {
            value = +value
        }
        if (character[object][key] !== value) {
            this.setState({ isUpdating: true }, _ => {
                axios.patch(`/api/updateSingleThingOnObject/${this.state.character.id}`, { object, key, value }).then(result => {
                    this.setState({ isUpdating: false })
                })
                character[object][key] = value
                this.setState({ character })
            })
        }
    }

    render() {
        let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitalitydice, vitalityroll, wis, int, extolevel, strData, dexData, conData, intData, wisData, chaData, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef,
            armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, skillsuites, nativelanguage,
            owned, currentfavor, currentstress, relaxation, usingshield, damageone, damagetwo, skills, skilladept, weaponone, weapontwo, weaponthree, weaponfour } = this.state.character
            , { currentDamage, shownVitality, woundMultiplier, dead, endurance } = this.state
            , shownHonor = honor ? honor : chaData.honor
            , shownGearCarry = this.convertFromEncumbToCarry(this.state.adjustedEncumb)
            , shownCarry = this.convertFromEncumbToCarry(strData.carry)
            , { downloadMode, changeEditStatus } = this.props
            , honorDiceLeft = calculateHonorDiceLeft(shownHonor)
            , circleFill = calculateHumanHonorDice(race, shownHonor)
            , armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0
            , shownThreshold = stressthreshold ? stressthreshold : +wis * 3

            , modifiedRunLength = 10 - endurance - Math.floor(currentstress / 10)
            , modifiedSprintLength = 5 - endurance - Math.floor(currentstress / 10)

            weaponone.totalRecoveryModifiers = weaponone.trainrecovery + +weaponone.miscrecovery
            weapontwo.totalRecoveryModifiers = weapontwo.trainrecovery + +weapontwo.miscrecovery
            weaponthree.totalRecoveryModifiers = weaponthree.trainrecovery + +weaponthree.miscrecovery
            weaponfour.totalRecoveryModifiers = weaponfour.trainrecovery + +weaponfour.miscrecovery
        let shieldEncumb = shieldbaseencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0
            , armorEncumb = armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0
            , totalEncumb = usingshield ? conData.encumb + wisData.encumb + armorEncumb + shieldEncumb + Math.floor(this.state.adjustedEncumb / 3) : conData.encumb + wisData.encumb + armorEncumb + Math.floor(this.state.adjustedEncumb / 3)

        let characterInfo = { name, race, primarylevel, primarya, secondarylevel, secondarya, level, crp, extolevel, excurrent, drawback }
            , stats = { str, strData, dex, dexData, con, conData, int, intData, wis, wisData, cha, chaData }
            , movement = { crawl, walk, jog, run, modifiedRunLength, modifiedSprintLength, sprint }
            , social = { shownHonor, updateAttribute: this.updateAttribute, circleFill, honorDiceLeft, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts }
            , weapononeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, 
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, ...weaponone
            }
            , weapontwoobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, 
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, ...weapontwo
            }
            , weaponthreeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, 
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, ...weaponthree
            }
            , weaponfourobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, 
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, ...weaponfour
            }
            , miscVitals = { con, currentstress, updateAttribute: this.updateAttribute, totalEncumb, woundMultiplier, shownThreshold, relaxation, currentfavor, chaData, favormax }
            , vitality = { shownVitality, updateAttribute: this.updateAttribute, currentDamage, shownHonor, calculatePanickedLeft, damageone, damagetwo, sizemod, vitalitydice, vitalityroll, conData }
            , abilities = { abilitiesone, abilitiestwo, abilitiesthree, removedability }
            , skillsObject = { strData, conData, dexData, intData, wisData, chaData, skillsuites, nativelanguage, skills, skilladept, int }
            , cashAndGear = { copper, updateAttribute: this.updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, shownGearCarry, shownCarry }
            , baseCombatFromStats = { strData, dexData, conData, intData, wisData }
            , armor = {
                armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbaseencumb, armorbaserecovery, armorbaseinit,
                armortrainingdef, armortrainencumb, armortrainrecovery, armortraininit, armormiscdef, updateAttribute: this.updateAttribute, armormiscencumb,
                armormiscrecovery, armormiscinit, armorRecovery
            }
            , shield = {
                shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbaseencumb, shieldbasebreak,
                shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscencumb, shieldmiscbreak,
                returnZeroIfNaN: this.returnZeroIfNaN, updateAttribute: this.updateAttribute, shieldsize
            }

        let editButton = (<i onClick={changeEditStatus} className="fas fa-edit"></i>)
        if (this.state.isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }

        return (
            <div>
                <div id="pdf" className={downloadMode ? 'viewer' : 'viewer pdfViewStylings'}>
                    <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                        <CharacterInfo characterInfo={characterInfo} />
                        <Stats stats={stats} />
                        <Movement movement={movement} />
                        <Social social={social} />

                        <WeaponSquare weapon={weapononeobject} />
                        <WeaponSquare weapon={weapontwoobject} />
                        <WeaponSquare weapon={weaponthreeobject} />
                        <WeaponSquare weapon={weaponfourobject} />

                        <MiscVitals miscVitals={miscVitals} />

                        <Ranges maxrange={maxrange} />

                        <Vitality vitality={vitality} />

                        <Abilities abilities={abilities} />
                    </div>
                    <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>
                        <Skills skillsObject={skillsObject} />

                        <CashAndGear cashAndGear={cashAndGear} />

                        <BaseCombatFromStats baseCombatFromStats={baseCombatFromStats} />

                        <textarea className="generalnotesLocation generalnotestextArea" defaultValue={generalnotes} onBlur={event => this.updateAttribute(event.target.value, "generalnotes")} maxLength={"500"}></textarea>

                        <ArmorBlock armor={armor} />

                        <ShieldBlock shield={shield} />

                        <WeaponBlock weapon={weaponone} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                        <WeaponBlock weapon={weapontwo} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                        <WeaponBlock weapon={weaponthree} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                        <WeaponBlock weapon={weaponfour} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                    </div>
                </div>
                <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                    <div className="left-corner-button corner-button">
                        <a href={`http://localhost:3131/api/download/${id}.pdf`} download={name + ".pdf"}><i className="fas fa-file-download fa-lg"></i></a>
                    </div>
                    <div className={owned ? "right-corner-button corner-button" : "displayNone"}>
                        {editButton}
                    </div>
                </div>
            </div>
        )
    }
}


function calculateHonorDiceLeft(honor) {
    let left = '141px'
    if (honor >= 0 && honor <= 5) {
        left = '141px'
    } else if (honor >= 6 && honor <= 10) {
        left = '190px'
    } else if (honor >= 11 && honor <= 15) {
        left = '239px'
    } else if (honor >= 16 && honor <= 20) {
        left = '289px'
    } else if (honor >= 21 && honor <= 25) {
        left = '340px'
    }
    return left
}

function calculatePanickedLeft(honor) {
    let left = '466px'
        , display = 'inherit'
    if (honor >= 0 && honor <= 5) {
        left = '466px'
    } else if (honor >= 6 && honor <= 10) {
        left = '541px'
    } else if (honor >= 11 && honor <= 15) {
        left = '618px'
    } else if (honor >= 16 && honor <= 20) {
        left = '695px'
    } else if (honor >= 21 && honor <= 25) {
        left = '792px'
        display = 'none'
    }
    return { left, display }
}

function calculateHumanHonorDice(race, honor) {
    if (race && race.toUpperCase().trim() === "HUMAN") {
        if (honor >= 0 && honor <= 5) {
            return (<div></div>)
        } else if (honor >= 6 && honor <= 10) {
            return (<div className="circle-fill">d6!</div>)
        } else if (honor >= 11 && honor <= 15) {
            return (<div className="circle-fill">d8!</div>)
        } else if (honor >= 16 && honor <= 20) {
            return (<div className="circle-fill">d10!</div>)
        } else if (honor >= 21 && honor <= 25) {
            return (<div className="circle-fill">d12!</div>)
        }
    } else {
        return (<div></div>)
    }
}