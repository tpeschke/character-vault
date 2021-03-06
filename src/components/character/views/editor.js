import React, { Component } from 'react'
import Abilities from './components/pageOne/abilities'
import CharacterInfo from './components/pageOne/characterInfo'
import MiscVitals from './components/pageOne/miscVitals'
import Movement from './components/pageOne/movement'
import Ranges from './components/pageOne/ranges'
import Social from './components/pageOne/social'
import Stats from './components/pageOne/stats'
import Vitality from './components/pageOne/vitality'
import Skills from './components/pageTwo/skill'
import WeaponBlock from './components/pageTwo/weaponBlock'
import CashAndGear from './components/pageTwo/cashAndGear'
import ArmorBlock from './components/pageTwo/armorBlock'
import ShieldBlock from './components/pageTwo/shieldBlock'
import WeaponSquare from './components/pageOne/weaponsquare'
import BaseCombatFromStats from './components/pageTwo/baseCombatStats'

import statTables from '../statTables';

export default class CharacterEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: { ...props.character },
            updateCharacter: props.updateCharacter,
            downloadMode: props.downloadMode,
            cancelUpdate: props.cancelUpdate
        }
    }

    updateAttribute = (value, type) => {
        let character = { ...this.state.character }
        character[type] = value
        this.setState({ character })
    }

    updateManyArrributes = (ObjectOfAttributes) => {
        let character = { ...this.state.character, ...ObjectOfAttributes }
        this.setState({character})
    }

    updateObject = (object, key, value) => {
        let character = { ...this.state.character }
        character[object][key] = value
        this.setState({ character })
    }

    updateEntireObject = (oldObject, newObject) => {
        let character = { ...this.state.character}
        character[oldObject] = newObject
        this.setState({character})
    }

    updateSkillsuites = (value, index) => {
        let skillsuites = []
        let character = { ...this.state.character }
        character.skillsuites.forEach(skillsuite => { skillsuites.push({ ...skillsuite }) })
        skillsuites[index].rank = +value
        character = { ...character, skillsuites }
        this.setState({ character })
    }

    updateTrained = (value, type, index) => {
        let skillsuites = []
        let character = { ...this.state.character }
        character[type].forEach(skillsuite => { skillsuites.push({ ...skillsuite }) })
        skillsuites[index].trained = value
        character = { ...character, [type]: skillsuites }
        this.setState({ character })
    }

    updatecombatSkillSuites = (value, index) => {
        let combatskillsuites = []
        let character = { ...this.state.character }
        character.combatskillsuites.forEach(skillsuite => { combatskillsuites.push({ ...skillsuite }) })
        combatskillsuites[index].rank = +value
        character = { ...character, combatskillsuites }
        this.setState({ character })
    }

    updateNativeLanguage = (value, type) => {
        let updatedValue
        if (type !== 'language') {
            updatedValue = { [type]: +value }
        } else {
            updatedValue = { [type]: value }
        }
        let character = { ...this.state.character, nativelanguage: { ...this.state.character.nativelanguage, ...updatedValue } }
        this.setState({ character })
    }

    returnZeroIfNaN = (thing) => {
        if (isNaN(+thing)) {
            return 0
        }
        return thing
    }

    calculateArmorFatigue = (basefatigue, trainfatigue, miscfatigue) => {
        return this.convertToFatigueLetter(this.convertFromFatigueLetter(basefatigue) + (trainfatigue * -1) + (miscfatigue * -1))
    }

    calculateTotalFatigue = (armorFatigue, shieldFatigue) => {
        return this.convertToFatigueLetter(this.convertFromFatigueLetter(armorFatigue) + shieldFatigue)
    }

    convertFromFatigueLetter = (fatigue) => {
        switch (fatigue) {
            case null:
            case 'C':
                return 0;
            case 'W':
                return -1;
            case 'B':
                return -2;
            case 'H':
                return -3;
            case 'A':
                return -4;
            default:
                return fatigue
        }
    }

    convertToFatigueLetter = (number) => {
        if (number >= 0) {
            return 'C';
        } else if (number === -1) {
            return 'W';
        } else if (number === -2) {
            return 'B';
        } else if (number === -3) {
            return 'H';
        } else {
            return 'A';
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

    calculateArmorDefense = (base, ranks, misc) => {
        let baseAndRanks = +base + +ranks
        let addToDefense = 0

        if (baseAndRanks > 0) {
            addToDefense = Math.ceil(baseAndRanks / 3)
            baseAndRanks = 0
        }

        return baseAndRanks + addToDefense + +misc
    }

    render() {
        let { strTable, dexTable, conTable, intTable, wisTable, chaTable } = statTables
        let { name, race, primarya, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality: vitalityTotal, vitalitydice, vitalityroll, wis, int, primarylevel, secondarylevel,
            temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, skills, combatskills, skilladept,
            armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef, armorbaserecovery,
            armorbasefatigue, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, martialadept,
            shieldbasedef, shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, skillsuites, combatskillsuites,
            nativelanguage, weaponone, weapontwo, weaponthree, weaponfour, extrahonordice, relaxation, armorbasefatiguemod } = this.state.character
        let { updateCharacter, cancelUpdate, updateEntireObject } = this.state
            , { isUpdating } = this.props
            , shownHonor = honor ? honor : cha ? chaTable[cha].honor : null
            , isHuman = checkIfHuman(race)

        let editButton = (<i onClick={_ => updateCharacter(this.state.character)} className="fas fa-save"></i>)
        if (isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }
        let strData = str ? strTable[str] : strTable[1]
            , dexData = dex ? dexTable[dex] : dexTable[1]
            , conData = con ? conTable[con] : conTable[1]
            , intData = int ? intTable[int] : intTable[1]
            , wisData = wis ? wisTable[wis] : wisTable[1]
            , chaData = cha ? chaTable[cha] : chaTable[1]

        let armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0
            , shownThreshold = stressthreshold ? stressthreshold : +wis * 3

        weaponone.totalRecoveryModifiers = +weaponone.trainrecovery + +weaponone.miscrecovery
        weapontwo.totalRecoveryModifiers = +weapontwo.trainrecovery + +weapontwo.miscrecovery
        weaponthree.totalRecoveryModifiers = +weaponthree.trainrecovery + +weaponthree.miscrecovery
        weaponfour.totalRecoveryModifiers = +weaponfour.trainrecovery + +weaponfour.miscrecovery

        weaponfour.isRanged = true

        let armorFatigue = this.calculateArmorFatigue(armorbasefatigue, armortrainfatigue, armormiscfatigue);
        let shieldFatigue = shieldbasefatigue + shieldtrainfatigue + shieldmiscfatigue;
        let totalFatigue = this.calculateTotalFatigue(armorFatigue, shieldFatigue);

        let characterInfo = { name, race, primarylevel, primarya, secondarylevel, secondarya, level, crp, excurrent, drawback, updateAttribute: this.updateAttribute }
            , stats = { str, dex, con, int, wis, cha, updateAttribute: this.updateAttribute }
            , movement = { crawl, walk, jog, run, sprint, updateAttribute: this.updateAttribute, }
            , social = { updateAttribute: this.updateAttribute, temperament, goals, devotions, flaws, traits, reputation, contacts, shownHonor, extrahonordice, isHuman }
            , miscVitals = { updateAttribute: this.updateAttribute, chaData }
            , baseCombatFromStats = { str, dex, int, wis, combatskillsuites, martialadept, combatskills, updateAttribute: this.updateAttribute, updatecombatSkillSuites: this.updatecombatSkillSuites, updateTrained: this.updateTrained }
            , vitality = { updateAttribute: this.updateAttribute, sizemod, vitalitydice, vitalityroll, vitalityTotal, favormax, stressthreshold, wis, relaxation }
            , abilities = { abilitiesone, abilitiestwo, abilitiesthree, removedability, updateAttribute: this.updateAttribute }
            , skillsObject = { skillsuites, nativelanguage, skills, skilladept, int, updateAttribute: this.updateAttribute, updateSkillsuites: this.updateSkillsuites, updateNativeLanguage: this.updateNativeLanguage, str, dex, con, int, wis, cha, updateTrained: this.updateTrained }
            , cashAndGear = { copper, updateAttribute: this.updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, updateAttribute: this.updateAttribute }
            , weapononeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: false, shieldname, totalFatigue, isRanged: false, editing: true, ...weaponone
            }
            , weapontwoobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: false, shieldname, totalFatigue, isRanged: false, editing: true, ...weapontwo
            }
            , weaponthreeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: false, shieldname, totalFatigue, isRanged: false, editing: true, ...weaponthree
            }
            , weaponfourobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: false, shieldname, totalFatigue, isRanged: true, updateObject: this.updateObject, editing: true, ...weaponfour
            }
            , armor = {
                armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatigue, armorbaserecovery, armorbaseinit, calculateArmorDefense: this.calculateArmorDefense,
                armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, updateAttribute: this.updateAttribute, armormiscfatigue,
                armormiscrecovery, armormiscinit, armorFatigue, armorbasefatiguemod, returnZeroIfNaN: this.returnZeroIfNaN
            }
            , shield = {
                shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
                shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue, shieldmiscbreak,
                returnZeroIfNaN: this.returnZeroIfNaN, updateAttribute: this.updateAttribute, shieldsize
            }

        return (
            <div>
                <div id="pdf" className='pdfViewStylings editing'>
                    <div className="pageOne pageBase pageViewStylings">
                        <CharacterInfo characterInfo={characterInfo} editing={true} />

                        <Stats stats={stats} editing={true} />

                        <Movement movement={movement} editing={true} />

                        <Social social={social} editing={true} />

                        <WeaponSquare weapon={weapononeobject} />
                        <WeaponSquare weapon={weapontwoobject} />
                        <WeaponSquare weapon={weaponthreeobject} />
                        <WeaponSquare weapon={weaponfourobject} />

                        <MiscVitals miscVitals={miscVitals} editing={true} />

                        <Ranges maxrange={maxrange} updateAttribute={this.updateAttribute} editing={true} />

                        <Vitality vitality={vitality} editing={true} />

                        <Abilities abilities={abilities} editing={true} />
                    </div>
                    <div className="pageTwo pageTwoMargin pageBase pageViewStylings">
                        <Skills skillsObject={skillsObject} editing={true} />

                        <CashAndGear cashAndGear={cashAndGear} editing={true} />

                        <ArmorBlock armor={armor} updateManyArrributes={this.updateManyArrributes} editing={true} />

                        <ShieldBlock shield={shield} updateManyArrributes={this.updateManyArrributes} editing={true} />

                        <BaseCombatFromStats baseCombatFromStats={baseCombatFromStats} editing={true} />

                        <WeaponBlock weapon={weaponone} updateObject={this.updateObject} updateEntireObject={this.updateEntireObject} returnZeroIfNaN={this.returnZeroIfNaN} editing={true} />
                        <WeaponBlock weapon={weapontwo} updateObject={this.updateObject} updateEntireObject={this.updateEntireObject} returnZeroIfNaN={this.returnZeroIfNaN} editing={true} />
                        <WeaponBlock weapon={weaponthree} updateObject={this.updateObject} updateEntireObject={this.updateEntireObject} returnZeroIfNaN={this.returnZeroIfNaN} editing={true} />
                        <WeaponBlock weapon={weaponfour} updateObject={this.updateObject} updateEntireObject={this.updateEntireObject} returnZeroIfNaN={this.returnZeroIfNaN} editing={true} />
                    </div>
                    <div id="pageThree" className="pageBase pageViewStylings">
                        <h1>General Notes</h1>
                        <textarea className="generalnotestextArea" defaultValue={generalnotes} onBlur={event => this.updateAttribute(event.target.value, "generalnotes")} maxLength={"10000"}></textarea>
                    </div>
                </div>
                <div className='Buttons'>
                    <div className="left-corner-button corner-button">
                        <i onClick={cancelUpdate} className="fas fa-window-close"></i>
                    </div>
                    <div className="right-corner-button corner-button">
                        {editButton}
                    </div>
                </div>
            </div>
        )
    }
}

function checkIfHuman(race) {
    return race && race.toUpperCase().trim() === "HUMAN"
}