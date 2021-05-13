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
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery,
            onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage, twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize, threetrainattack,
            threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage, threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack,
            fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef,
            armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, skillsuites, nativelanguage,
            owned, currentfavor, currentstress, relaxation, usingshield, fourthrownweapon, damageone, damagetwo, skills, skilladept, weaponone } = this.state.character
            , { currentDamage, shownVitality, woundMultiplier, dead, endurance } = this.state
            , shownHonor = honor ? honor : chaData.honor
            , shownGearCarry = this.convertFromEncumbToCarry(this.state.adjustedEncumb)
            , shownCarry = this.convertFromEncumbToCarry(strData.carry)
            , { downloadMode, changeEditStatus } = this.props
            , honorDiceLeft = calculateHonorDiceLeft(shownHonor)
            , circleFill = calculateHumanHonorDice(race, shownHonor)
            , weaponTwoRecovery = twotrainrecovery + +twomiscrecovery
            , weaponThreeRecovery = threetrainrecovery + +threemiscrecovery
            , weaponFourRecovery = fourtrainrecovery + +fourmiscrecovery
            , armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0
            , shownThreshold = stressthreshold ? stressthreshold : +wis * 3

            , modifiedRunLength = 10 - endurance - Math.floor(currentstress / 10)
            , modifiedSprintLength = 5 - endurance - Math.floor(currentstress / 10)

            weaponone.totalRecoveryModifiers = weaponone.trainrecovery + +weaponone.miscrecovery
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
            , weapontwo = {
                position: 'two', returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, weaponRecovery: twobaserecovery + weaponTwoRecovery,
                armorRecovery, size: twosize, trainattack: twotrainattack, miscattack: twomiscattack, dexattack: dexData.attack, intattack: intData.attack,
                dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, miscinit: twomiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, armorbasedef, armortrainingdef,
                armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, name: twoname, basedamage: twobasedamage, traindamage: twotraindamage, miscdamage: twomiscdamage, strdamage: strData.damage,
                measure: twobasemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, parry: twobaseparry, usingshield, weapontrainparry: twotrainparry, weaponmiscparry: twomiscparry, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, type: twotype
            }
            , weaponthree = {
                position: 'three', returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, weaponRecovery: threebaserecovery + weaponThreeRecovery,
                armorRecovery, size: threesize, trainattack: threetrainattack, miscattack: threemiscattack, dexattack: dexData.attack, intattack: intData.attack,
                dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, miscinit: threemiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, armorbasedef, armortrainingdef,
                armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, name: threename, basedamage: threebasedamage, traindamage: threetraindamage, miscdamage: threemiscdamage, strdamage: strData.damage,
                measure: threebasemeasure, shieldbaseparry, shieldtrainparry, shieldmiscparry, parry: threebaseparry, usingshield, weapontrainparry: threetrainparry, weaponmiscparry: threemiscparry, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, type: threetype
            }
            , weaponfour = {
                position: 'four', returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, weaponRecovery: fourbaserecovery + weaponFourRecovery,
                armorRecovery, size: foursize, trainattack: fourtrainattack, miscattack: fourmiscattack, dexattack: dexData.attack, intattack: intData.attack,
                dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, miscinit: fourmiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense, armorbasedef, armortrainingdef,
                armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, totalEncumb, armordr, shielddr, name: fourname, basedamage: fourbasedamage, traindamage: fourtraindamage, miscdamage: fourmiscdamage, strdamage: strData.damage,
                measure: 'n/a', shieldbaseparry, shieldtrainparry, shieldmiscparry, parry: 'n/a', usingshield: false, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, stressAdjustment: Math.floor((totalEncumb * woundMultiplier) / 10), shieldname, type: fourtype
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
                        <WeaponSquare weapon={weapontwo} />
                        <WeaponSquare weapon={weaponthree} />
                        <WeaponSquare weapon={weaponfour} />

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
                        {/* <div className="weaponProfileOne">
                            <p className="weaponnameLocation">{onename}</p>
                            <p className="basedamageLocation">{onebasedamage}</p>
                            <p className="baserecoveryLocation">{onebaserecovery}</p>
                            <p className="baseparryLocation">{onebaseparry}</p>
                            <p className="basemeasureLocation">{onebasemeasure}</p>
                            <p className="basesizeLocation">{onesize}</p>
                            <p className="typeLocation">{onetype}</p>
                            <p className="bonusLocation">{onebonus}</p>
                            <p className="traitsLocation">{onetraits}</p>

                            <p className="trainattackLocation">{onetrainattack}</p>
                            <p className="trainrecoveryLocation">{onetrainrecovery}</p>
                            <p className="trainparryLocation">{onetrainparry}</p>
                            <p className="traindamageLocation">{onetraindamage}</p>

                            <input className="miscattackLocation" type="number" defaultValue={onemiscattack} onBlur={event => this.updateAttribute(event.target.value, "onemiscattack")} />
                            <input className="miscrecoveryLocation" type="number" defaultValue={onemiscrecovery} onBlur={event => this.updateAttribute(event.target.value, "onemiscrecovery")} />
                            <input className="miscparryLocation" type="number" defaultValue={onemiscparry} onBlur={event => this.updateAttribute(event.target.value, "onemiscparry")} />
                            <input className="miscdamageLocation" type="number" defaultValue={onemiscdamage} onBlur={event => this.updateAttribute(event.target.value, "onemiscdamage")} />
                            <input className="miscinitLocation" type="number" defaultValue={onemiscinit} onBlur={event => this.updateAttribute(event.target.value, "onemiscinit")} />

                            <p className="totalattackLocation">{this.returnZeroIfNaN(onetrainattack + +onemiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponOneRecovery)}</p>
                            <p className="totalparryLocation">{this.returnZeroIfNaN(onetrainparry + +onemiscparry)}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(onetraindamage + +onemiscdamage)}</p>
                            <p className="totalinitLocation">{onemiscinit}</p>
                        </div> */}

                        <div className="weaponProfiletwo">
                            <p className="weaponnameLocation">{twoname}</p>
                            <p className="basedamageLocation">{twobasedamage}</p>
                            <p className="baserecoveryLocation">{twobaserecovery}</p>
                            <p className="baseparryLocation">{twobaseparry}</p>
                            <p className="basemeasureLocation">{twobasemeasure}</p>
                            <p className="basesizeLocation">{twosize}</p>
                            <p className="typeLocation">{twotype}</p>
                            <p className="bonusLocation">{twobonus}</p>
                            <p className="traitsLocation">{twotraits}</p>

                            <p className="trainattackLocation">{twotrainattack}</p>
                            <p className="trainrecoveryLocation">{twotrainrecovery}</p>
                            <p className="trainparryLocation">{twotrainparry}</p>
                            <p className="traindamageLocation">{twotraindamage}</p>

                            <input className="miscattackLocation" type="number" defaultValue={twomiscattack} onBlur={event => this.updateAttribute(+event.target.value, "twomiscattack")} />
                            <input className="miscrecoveryLocation" type="number" defaultValue={twomiscrecovery} onBlur={event => this.updateAttribute(+event.target.value, "twomiscrecovery")} />
                            <input className="miscparryLocation" type="number" defaultValue={twomiscparry} onBlur={event => this.updateAttribute(+event.target.value, "twomiscparry")} />
                            <input className="miscdamageLocation" type="number" defaultValue={twomiscdamage} onBlur={event => this.updateAttribute(+event.target.value, "twomiscdamage")} />
                            <input className="miscinitLocation" type="number" defaultValue={twomiscinit} onBlur={event => this.updateAttribute(+event.target.value, "twomiscinit")} />

                            <p className="totalattackLocation">{this.returnZeroIfNaN(twotrainattack + +twomiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponTwoRecovery)}</p>
                            <p className="totalparryLocation">{this.returnZeroIfNaN(twotrainparry + +twomiscparry)}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(twotraindamage + +twomiscdamage)}</p>
                            <p className="totalinitLocation">{twomiscinit}</p>
                        </div>

                        <div className="weaponProfilethree">
                            <p className="weaponnameLocation">{threename}</p>
                            <p className="basedamageLocation">{threebasedamage}</p>
                            <p className="baserecoveryLocation">{threebaserecovery}</p>
                            <p className="baseparryLocation">{threebaseparry}</p>
                            <p className="basemeasureLocation">{threebasemeasure}</p>
                            <p className="basesizeLocation">{threesize}</p>
                            <p className="typeLocation">{threetype}</p>
                            <p className="bonusLocation">{threebonus}</p>
                            <p className="traitsLocation">{threetraits}</p>

                            <p className="trainattackLocation">{threetrainattack}</p>
                            <p className="trainrecoveryLocation">{threetrainrecovery}</p>
                            <p className="trainparryLocation">{threetrainparry}</p>
                            <p className="traindamageLocation">{threetraindamage}</p>

                            <input className="miscattackLocation" type="number" defaultValue={threemiscattack} onChange={event => this.updateAttribute(+event.target.value, "threemiscattack")} />
                            <input className="miscrecoveryLocation" type="number" defaultValue={threemiscrecovery} onChange={event => this.updateAttribute(+event.target.value, "threemiscrecovery")} />
                            <input className="miscparryLocation" type="number" defaultValue={threemiscparry} onChange={event => this.updateAttribute(+event.target.value, "threemiscparry")} />
                            <input className="miscdamageLocation" type="number" defaultValue={threemiscdamage} onChange={event => this.updateAttribute(+event.target.value, "threemiscdamage")} />
                            <input className="miscinitLocation" type="number" defaultValue={threemiscinit} onChange={event => this.updateAttribute(+event.target.value, "threemiscinit")} />

                            <p className="totalattackLocation">{this.returnZeroIfNaN(threetrainattack + +threemiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponThreeRecovery)}</p>
                            <p className="totalparryLocation">{this.returnZeroIfNaN(threetrainparry + +threemiscparry)}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(threetraindamage + +threemiscdamage)}</p>
                            <p className="totalinitLocation">{threemiscinit}</p>
                        </div>

                        <div className="weaponProfilefour">
                            <p className="weaponnameLocation">{fourname}</p>
                            <p className="basedamageLocation">{fourbasedamage}</p>
                            <p className="baserecoveryLocation">{fourbaserecovery}</p>
                            <p className="typeLocation typefour">{fourtype}</p>
                            <p className="basesizeLocation sizefour">{foursize}</p>
                            <p className="bonusLocation bonusfour">{fourbonus}</p>
                            <p className="traitsLocation traitsfour">{fourtraits}</p>

                            <p className="trainattackLocation">{fourtrainattack}</p>
                            <p className="trainrecoveryLocation">{fourtrainrecovery}</p>
                            <p className="traindamageLocation">{fourtraindamage}</p>

                            <input className="miscattackLocation" type="number" defaultValue={fourmiscattack} onChange={event => this.updateAttribute(+event.target.value, "fourmiscattack")} />
                            <input className="miscrecoveryLocation" type="number" defaultValue={fourmiscrecovery} onChange={event => this.updateAttribute(+event.target.value, "fourmiscrecovery")} />
                            <input className="miscinitLocation initFour" type="number" defaultValue={fourmiscinit} onChange={event => this.updateAttribute(+event.target.value, "fourmiscinit")} />
                            <input className="miscdamageLocation" type="number" defaultValue={fourmiscdamage} onChange={event => this.updateAttribute(+event.target.value, "fourmiscdamage")} />

                            <p className="totalattackLocation">{this.returnZeroIfNaN(fourtrainattack + +fourmiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponFourRecovery)}</p>
                            <p className="totalinitLocation initFour">{fourmiscinit}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(fourtraindamage + +fourmiscdamage)}</p>
                        </div>
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