import React, { Component } from 'react'
import Abilities from './components/pageOne/abilities/abilities'
import CharacterInfo from './components/pageOne/characterInfo/characterInfo'
import MiscVitals from './components/pageOne/miscVitals/miscVitals'
import Movement from './components/pageOne/movement/movement'
import Ranges from './components/pageOne/ranges/ranges'
import Social from './components/pageOne/social/social'
import Stats from './components/pageOne/stats/stats'
import Vitality from './components/pageOne/vitality/vitality'
import Skills from './components/pageTwo/skills/skills'
import WeaponBlock from './components/pageTwo/blocks/weaponBlock/weaponBlock'
import CashAndGear from './components/pageTwo/cashAndGear/cashAndGear'
import ArmorBlock from './components/pageTwo/blocks/armorBlock/armorBlock'
import ShieldBlock from './components/pageTwo/blocks/shieldBlock/shieldBlock'
import WeaponSquare from './components/pageOne/weaponSquare/weaponsquare'
import BaseCombatFromStats from './components/pageTwo/baseCombatStats/baseCombatStats'

import statTables from '../statTables'

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
        if (!isNaN(+value) && typeof value !== 'object') {
            value = +value
        }
        character[type] = value
        this.setState({ character })
    }

    updateManyAttributes = (ObjectOfAttributes) => {
        let character = { ...this.state.character, ...ObjectOfAttributes }
        this.setState({ character })
    }

    updateObject = (object, key, value) => {
        let character = { ...this.state.character }
        character[object][key] = value
        this.setState({ character })
    }

    updateEntireObject = (oldObject, newObject) => {
        let character = { ...this.state.character }
        character[oldObject] = newObject
        this.setState({ character })
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
            addToDefense = Math.floor(baseAndRanks / 3)
            baseAndRanks = 0
        }

        return baseAndRanks + addToDefense + +misc
    }

    render() {
        let { name, race, primarya, secondarya, level, cha, con, crp, dex, excurrent, favormax, sizemod, str, stressthreshold, vitality: vitalityTotal, vitalitydice, wis, int,
            temperament, goals, devotions, flaws, traits, reputation, contacts, strength, damageone, damagetwo, honor,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, skills, combatskills, skilladept,
            armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef, armorbaserecovery,
            armorbasefatigue, armorbaseinit, shieldname, shieldflanks, shielddr, shieldsize, shieldcover, shieldbonus, martialadept,
            shieldbasedef, shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, skillsuites, combatskillsuites,
            nativelanguage, weaponone, weapontwo, weaponthree, weaponfour, extrahonordice, relaxation, armorbasefatiguemod, secretgeneralnotes, descriptions, stressdie, currentfavor, stresslockout } = this.state.character
        let { updateCharacter, cancelUpdate } = this.state
            , { isUpdating } = this.props
            , isHuman = checkIfHuman(race)
        let editButton = (<i onClick={_ => updateCharacter(this.state.character)} className="fas fa-save"></i>)
        if (isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }

        str = str ? str : 1
        dex = dex ? dex : 1
        con = con ? con : 1
        int = int ? int : 1
        wis = wis ? wis : 1
        cha = cha ? cha : 1

        let chaData = statTables.chaTable[cha]
        let shownHonor = cha ? honor : chaData.honor

        let armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0

        weaponone.totalRecoveryModifiers = Math.floor(weaponone.trainrecovery / 2) + +weaponone.miscrecovery
        weapontwo.totalRecoveryModifiers = Math.floor(weapontwo.trainrecovery / 2) + +weapontwo.miscrecovery
        weaponthree.totalRecoveryModifiers = Math.floor(weaponthree.trainrecovery / 2) + +weaponthree.miscrecovery
        weaponfour.totalRecoveryModifiers = Math.floor(weaponfour.trainrecovery / 2) + +weaponfour.miscrecovery

        weaponfour.isRanged = true

        let characterInfo = { name, race, primarya, secondarya, level, crp, excurrent, updateAttribute: this.updateAttribute }
            , stats = { str, dex, con, int, wis, cha, updateAttribute: this.updateAttribute }
            , movement = { crawl, walk, jog, run, sprint, updateAttribute: this.updateAttribute, }
            , social = { shownHonor, updateAttribute: this.updateAttribute, strength, temperament, goals, devotions, flaws, traits, reputation, contacts, extrahonordice, isHuman, descriptions }
            , miscVitals = { updateAttribute: this.updateAttribute, vitalitydice, con, wis, stressdie, vitalityTotal, favormax, currentfavor }
            , baseCombatFromStats = { str, dex, int, wis, combatskillsuites, martialadept, combatskills, updateAttribute: this.updateAttribute, updatecombatSkillSuites: this.updatecombatSkillSuites, updateTrained: this.updateTrained }
            , vitality = { updateAttribute: this.updateAttribute, stresslockout, sizemod, stressthreshold, relaxation, vitalityTotal, damageone, damagetwo }
            , abilities = { abilitiesone, abilitiestwo, abilitiesthree, removedability, updateAttribute: this.updateAttribute }
            , skillsObject = { skillsuites, nativelanguage, skills, skilladept, updateAttribute: this.updateAttribute, updateSkillsuites: this.updateSkillsuites, updateNativeLanguage: this.updateNativeLanguage, str, dex, con, int, wis, cha, updateTrained: this.updateTrained }
            , cashAndGear = { copper, updateAttribute: this.updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour }
            , weapononeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false,
                thrownweapon: true, dead: false, shieldname, shieldflanks, isRanged: false, editing: true, shieldcover, ...weaponone
            }
            , weapontwoobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false,
                thrownweapon: true, dead: false, shieldname, shieldflanks, isRanged: false, editing: true, shieldcover, ...weapontwo
            }
            , weaponthreeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false,
                thrownweapon: true, dead: false, shieldname, shieldflanks, isRanged: false, editing: true, shieldcover, ...weaponthree
            }
            , weaponfourobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield: false,
                thrownweapon: true, dead: false, shieldname, shieldflanks, isRanged: true, updateObject: this.updateObject, editing: true,
                shieldcover, ...weaponfour
            }
            , armor = {
                armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatigue, armorbaserecovery, armorbaseinit, calculateArmorDefense: this.calculateArmorDefense,
                armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, updateAttribute: this.updateAttribute, armormiscfatigue,
                armormiscrecovery, armormiscinit, armorbasefatiguemod, returnZeroIfNaN: this.returnZeroIfNaN
            }
            , shield = {
                shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
                shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscparry, shieldmiscfatigue,
                returnZeroIfNaN: this.returnZeroIfNaN, updateAttribute: this.updateAttribute, shieldsize
            }

        let secretNotesDiv = (<div className="secretNotesDiv" onClick={_ => this.updateAttribute(true, "secretgeneralnotes")}></div>)
        if (secretgeneralnotes) {
            secretNotesDiv = (<div className="secretNotesDiv" onClick={_ => this.updateAttribute(false, "secretgeneralnotes")}><i className="fas fa-check"></i></div>)
        }

        return (
            <div>
                <div id="pdf" className='pdfViewStylings editing'>
                    <div className="pageOne pageBase pageViewStylings">
                        <CharacterInfo characterInfo={characterInfo} editing={true} />
                        <div className='pageOneMiddle'>
                            <div className='leftColumn'>
                                <div className='flexSpaceBetween'>
                                    <Stats stats={stats} editing={true} />
                                    <Movement movement={movement} editing={true} />
                                </div>

                                <Social social={social} editing={true} />
                            </div>
                            <div className='rightColumn'>
                                <div className='weaponSquares'>
                                    <WeaponSquare weapon={weapononeobject} />
                                    <WeaponSquare weapon={weapontwoobject} />
                                    <WeaponSquare weapon={weaponthreeobject} />
                                    <WeaponSquare weapon={weaponfourobject} />
                                </div>
                                <div className='flexSpaceBetween marginTop'>
                                    <MiscVitals miscVitals={miscVitals} editing={true} />
                                    <Ranges maxrange={maxrange} editing={true} updateAttribute={this.updateAttribute} />
                                </div>

                                <Vitality vitality={vitality} editing={true} />
                            </div>
                        </div>
                        <Abilities abilities={abilities} editing={true} />
                    </div>
                    <div className="pageTwo pageTwoMargin pageBase pageViewStylings">
                        <CashAndGear cashAndGear={cashAndGear} editing={true} />
                        <Skills skillsObject={skillsObject} editing={true} />
                        <div className='armorShieldWeaponArea'>
                            <div>
                                <ArmorBlock armor={armor} updateManyAttributes={this.updateManyAttributes} editing={true} />
                                <ShieldBlock shield={shield} updateManyAttributes={this.updateManyAttributes} editing={true} />
                            </div>
                            <div>
                                <BaseCombatFromStats baseCombatFromStats={baseCombatFromStats} editing={true} />

                                <div className='combatStatWeaponWorkspaces'>
                                    <h2>Weapon Workspaces</h2>
                                    <div className='combatStatWeaponBlocks'>
                                        <WeaponBlock weapon={weaponone} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} editing={true} />
                                        <WeaponBlock weapon={weapontwo} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} editing={true} />
                                        <WeaponBlock weapon={weaponthree} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} editing={true} />
                                        <WeaponBlock weapon={weaponfour} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} editing={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="pageThree" className="pageBase pageViewStylings">
                        <div className='general-notes-header'>
                            <h1>General Notes</h1>
                            <div className='general-notes-subtitle'>
                                {secretNotesDiv}
                                <p>Don't Reveal Notes to Other Users</p>
                            </div>
                        </div>
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