import axios from 'axios'
import React, { Component } from 'react'

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import _ from "lodash";

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

import statTables from '../statTables'

export default class CharacterViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: props.character,
            adjustedCarry: null,
            overCarry: 0,
            isUpdating: false,
            shownVitality: 0,
            downloadMode: props.downloadMode,
            savedCharacter: {},
            isDownloading: false,
            isHalfwayDone: false,
            isAboveLimit: true,
            showArmor: true
        }
    }

    componentWillMount() {
        axios.get('/api/isUserAboveLimit').then(({ data }) => {
            this.setState({ isAboveLimit: data.isUserAboveLimit })
        })
        let { gearone, geartwo, gearthree, gearfour, vitality, sizemod, vitalityroll, con, skills } = this.state.character
        if (this.state.character.id !== 'blank') {
            this.reduceAndCleanGearArrays(gearone, geartwo, gearthree, gearfour)
            this.setState({ shownVitality: vitality ? vitality : sizemod + vitalityroll + con })
        }
    }

    toggleArmor = () => {
        this.setState({ showArmor: !this.state.showArmor }, _=>console.log(this.state.showArmor))
    }

    reduceAndCleanGearArrays = (gearone, geartwo, gearthree, gearfour) => {
        let totalCarry = 0
        let cleanArray = ({ value }) => {
            if (!isNaN(+value)) { return 0 }
            value = value.toUpperCase()

            let containsCarry = value.match(/([0-9]|[1-9][0-9]|[1-9][0-9][0-9])[SMLsml]|[SMLsml]/g)
            if (!containsCarry) { return 0 }

            let currentBit = ''

            value = value.replace(/\s+/g, '')
            value.match(/[\d\.]+|\D+/g).forEach(character => {
                if (character.includes('S') || character.includes('M') || character.includes('L')) {
                    currentBit = currentBit + character
                    currentBit = currentBit.match(/[\d\.]+|\D+/g)
                    let number, type, container = false
                    if (currentBit.includes('+') || currentBit.includes('-')) {
                        container = true
                        number = +currentBit[1]
                        type = currentBit[2]
                    } if (currentBit[0].includes('+') || currentBit[0].includes('-')) {
                        container = true
                        if (!isNaN(+currentBit[1])) {
                            number = +currentBit[1]
                            type = currentBit[2]
                        } else {
                            number = 1
                            type = currentBit[0][1]
                        }
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

        gearone.forEach(cleanArray)
        geartwo.forEach(cleanArray)
        gearthree.forEach(cleanArray)
        gearfour.forEach(cleanArray)

        this.setState({ adjustedCarry: totalCarry })
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

    returnZeroIfNaN = (thing) => {
        if (isNaN(+thing)) {
            return null
        }
        return thing
    }

    calculateArmorFatigue = (fatigue, fatiguemod) => {
        if (!fatiguemod && fatigue) {
            switch (fatigue) {
                case 'A':
                    return -4;
                case 'H':
                    return -3;
                case 'B':
                    return -2;
                case 'W':
                    return -1;
                case 'C':
                    return 0;
            }
        }
        return fatiguemod
    }

    calculateTotalFatigue = (armorFatigue = 0, shieldFatigue = 0, overCarry = 0) => {
        let overCarryToAdd = 0
        if (overCarry <= -3) {
            overCarryToAdd = Math.ceil(overCarry / 3)
        }
        return this.convertToFatigueLetter(armorFatigue + shieldFatigue + overCarryToAdd)
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
        if (number > 0) {
            return 'N';
        } else if (number === 0) {
            return 'C';
        } else if (number === -1) {
            return 'W';
        } else if (number === -2) {
            return 'B';
        } else if (number === -3) {
            return 'H';
        } else {
            return number + 3;
        }
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
                this.props.updateSharedCharacter(type, null, value)
                this.setState({ character }, _ => {
                    if (type.includes('gear')) {
                        let { gearone, geartwo, gearthree, gearfour } = this.state.character
                        this.reduceAndCleanGearArrays(gearone, geartwo, gearthree, gearfour)
                    }
                })
            })
        }
    }

    updateManyAttributes = (ObjectOfAttributes) => {
        let character = { ...this.state.character, ...ObjectOfAttributes }
        this.setState({ character })
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
                this.props.updateSharedCharacter(object, key, value)
                this.setState({ character })
            })
        }
    }

    calculateArmorDefense = (base, ranks, misc, showArmor) => {
        if (!showArmor) {
            return +misc
        }
        let baseAndRanks = +base + +ranks
        let addToDefense = 0

        if (baseAndRanks > 0) {
            addToDefense = Math.floor(baseAndRanks / 3)
            baseAndRanks = 0
        }

        return baseAndRanks + addToDefense + +misc
    }

    adjustForPdf = () => {
        let characterDeepCopy = _.cloneDeep(this.state.character)

        let devotions = characterDeepCopy.devotions.map(devotion => { return { ...devotion, title: null } })
            , traits = characterDeepCopy.traits.map(trait => { return { ...trait, title: null } })
            , descriptions = characterDeepCopy.descriptions.map(description => { return { ...description, title: null } })
            , nativelanguage = { ...characterDeepCopy.nativelanguage, language: null }

        let cleansedCharacter = {
            ...characterDeepCopy, currentstress: null, damageone: [], damagetwo: [], goals: [], descriptions,
            name: null, extrahonordice: null, relaxation: null, reputation: [], contacts: "", devotions, traits, nativelanguage
        }

        this.setState({ savedCharacter: characterDeepCopy }, _ => {
            this.setState({ character: cleansedCharacter }, _ => {
                this.generatePdf(true)
            })
        })
    }

    updateEntireObject = (oldObject, newObject) => {
        let character = { ...this.state.character }
        character[oldObject] = newObject
        this.setState({ character })
    }

    generatePdf = (isPregen) => {
        if (!(this.state.character.secretgeneralnotes || this.state.character.id === 'blank') || this.state.character.owned) {
            this.generateNormalPDF(isPregen)
        } else {
            this.generateBlankPDF(isPregen)
        }
    }

    generateNormalPDF = (isPregen) => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.setState({ isDownloading: true }, _ => {
            const pageOne = document.getElementById('pageOne');
            html2canvas(pageOne, { scale: 2 })
                .then((canvasOne) => {
                    const imgDataOne = canvasOne.toDataURL('image/png');
                    const pdf = new jsPDF("p", "mm", "letter");
                    var width = pdf.internal.pageSize.getWidth();
                    var height = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imgDataOne, 'png', 0, 0, width, height - 5);
                    this.setState({ isHalfwayDone: true })
                    const pageTwo = document.getElementById('pageTwo');
                    html2canvas(pageTwo, { scale: 2 })
                        .then((cavansTwo) => {
                            const imgDataTwo = cavansTwo.toDataURL('image/png');
                            pdf.addPage(width, height);
                            pdf.addImage(imgDataTwo, 'png', 0, 0, width, height);
                            const pageThree = document.getElementById('pageThree');
                            html2canvas(pageThree, { scale: 2 })
                                .then((cavansTwo) => {
                                    const imgDateThree = cavansTwo.toDataURL('image/png');
                                    pdf.addPage(width, height);
                                    pdf.addImage(imgDateThree, 'png', 0, 0, width, height);
                                    let name;
                                    if (this.state.character.name && !isPregen) {
                                        name = this.state.character.name
                                    } else {
                                        name = `${this.state.character.race} ${this.state.character.primarya}/${this.state.character.secondarya}`
                                    }
                                    pdf.save(`${name}.pdf`);
                                    if (isPregen) {
                                        this.setState({ isHalfwayDone: false, isDownloading: false, character: this.state.savedCharacter })
                                    } else {
                                        this.setState({ isHalfwayDone: false, isDownloading: false })
                                    }
                                });
                        });
                });
        })
    }

    generateBlankPDF = (isPregen) => {
        this.setState({ isDownloading: true }, _ => {
            const pageOne = document.getElementById('pageOne');
            html2canvas(pageOne, { scale: 2 })
                .then((canvasOne) => {
                    const imgDataOne = canvasOne.toDataURL('image/png');
                    const pdf = new jsPDF("p", "mm", "letter");
                    var width = pdf.internal.pageSize.getWidth();
                    var height = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imgDataOne, 'png', 0, 0, width, height - 5);
                    this.setState({ isHalfwayDone: true })
                    const pageTwo = document.getElementById('pageTwo');
                    html2canvas(pageTwo, { scale: 2 })
                        .then((cavansTwo) => {
                            const imgDataTwo = cavansTwo.toDataURL('image/png');
                            pdf.addPage(width, height);
                            pdf.addImage(imgDataTwo, 'png', 0, 0, width, height);
                            let name;
                            if (this.state.character.id === 'blank') {
                                name = `Bonfire Blank Character Sheet.pdf`
                            } else if (this.state.character.name && !isPregen) {
                                name = this.state.character.name
                            } else {
                                name = `${this.state.character.race} ${this.state.character.primarya}/${this.state.character.secondarya}`
                            }
                            pdf.save(name);
                            this.setState({ isHalfwayDone: false, isDownloading: false })
                        });
                });
        })
    }

    render() {
        let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitalitydice, vitalityroll, wis, int, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef,
            armorbaserecovery, armorbasefatigue, armorbaseinit, shieldname, shieldflanks, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, skillsuites, nativelanguage,
            owned, currentfavor, currentstress, relaxation, usingshield, damageone, damagetwo, skills, skilladept, weaponone, weapontwo, weaponthree, weaponfour, anointed, martialadept, combatskillsuites, combatskills, armorbasefatiguemod, secretgeneralnotes, descriptions, temperamentrank, stressroll, stressdie, stresslockout, strength } = this.state.character
            , { shownVitality, dead, downloadMode, isDownloading, isHalfwayDone, isAboveLimit } = this.state

        str = str ? str : 1
        dex = dex ? dex : 1
        con = con ? con : 1
        int = int ? int : 1
        wis = wis ? wis : 1
        cha = cha ? cha : 1

        let chaData = statTables.chaTable[cha]
            , strData = statTables.strTable[str]
            , dexData = statTables.dexTable[dex]
            , conData = statTables.conTable[con]
            , intData = statTables.intTable[int]
            , wisData = statTables.wisTable[wis]

        let shownHonor = cha ? honor : chaData.honor
            , shownGearCarry = this.convertFromEncumbToCarry(this.state.adjustedCarry)

        let quarterMastering = this.state.character.skills.filter(({ skill }) => {
            if (skill) {
                return skill.toUpperCase() === "QUARTERMASTERING" || skill.toUpperCase() === "QUARTER MASTERING" || skill.toUpperCase() === "QUARTER-MASTERING"
            }
            return false
        })
        if (quarterMastering[0]) {
            quarterMastering = quarterMastering[0].rank
        } else {
            quarterMastering = 0
        }

        let isRatfolk = race && (race.toUpperCase() === 'RATFOLK' || race.toUpperCase() === 'RAT FOLK') ? true : false
            , carryFromStr = strData.carry

        if (isRatfolk) {
            carryFromStr *= 2
        }

        let shownCarry = this.convertFromEncumbToCarry(carryFromStr + quarterMastering)
            , overCarry = (carryFromStr + quarterMastering) - this.state.adjustedCarry
            , { changeEditStatus } = this.props
            , honorDiceLeft = calculateHonorDiceLeft(shownHonor)
            , isHuman = checkIfHuman(race)
            , shownThreshold = stressthreshold ? stressthreshold : 0

        let characterInfo = { id }
            , stats = {}
            , movement = {}
            , social = { goals: [] }
            , weapononeobject = { id, position: 'one' }
            , weapontwoobject = { id, position: 'two' }
            , weaponthreeobject = { id, position: 'three' }
            , weaponfourobject = { id, position: 'four' }
            , miscVitals = { id }
            , vitality = { id }
            , abilities = {}
            , skillsObject = {}
            , cashAndGear = { id }
            , baseCombatFromStats = {}
            , armor = { id, returnZeroIfNaN: this.returnZeroIfNaN }
            , shield = { id }
            , armorFatigue = 0
            , shieldFatigue = 0
            , totalFatigue = 0

        let editButton = (<i onClick={changeEditStatus} className="fas fa-edit"></i>)
        if (this.state.isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }

        let generalnotestextArea = <div></div>
        let rightCornerButton = <div></div>
        if (id !== 'blank') {
            const dwarfModifier = race && (race.toUpperCase() === 'DWARF' || race.toUpperCase() === 'DORF') ? 1 : 0;
            armorFatigue = this.state.showArmor ? this.calculateArmorFatigue(armorbasefatigue, armorbasefatiguemod) + Math.floor(armortrainfatigue / 2) + armormiscfatigue + dwarfModifier : 0;
            shieldFatigue = shieldbasefatigue + Math.floor(shieldtrainfatigue / 2) + shieldmiscfatigue;
            totalFatigue = this.calculateTotalFatigue(armorFatigue, shieldFatigue, overCarry);

            characterInfo = { name, race, primarylevel, primarya, secondarylevel, secondarya, level, crp, excurrent, updateAttribute: this.updateAttribute, drawback }
            stats = { str, strData, dex, dexData, con, conData, int, intData, wis, wisData, cha, chaData, isDownloading }
            movement = { crawl, walk, jog, run, sprint, overCarry }
            social = { shownHonor, strength, updateAttribute: this.updateAttribute, isHuman, honorDiceLeft, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts, descriptions, temperamentrank }
            weapononeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateArmorDefense: this.calculateArmorDefense,
                armorbaserecovery, armortrainrecovery, armormiscrecovery, dex, int, wis, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, str,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, shieldflanks, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: false,
                shieldcover, showArmor: this.state.showArmor, ...weaponone
            }
            weapontwoobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateArmorDefense: this.calculateArmorDefense,
                armorbaserecovery, armortrainrecovery, armormiscrecovery, dex, int, wis, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, str,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, shieldflanks, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: false,
                shieldcover, showArmor: this.state.showArmor, ...weapontwo
            }
            weaponthreeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateArmorDefense: this.calculateArmorDefense,
                armorbaserecovery, armortrainrecovery, armormiscrecovery, dex, int, wis, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, str,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, shieldflanks, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: false,
                shieldcover, showArmor: this.state.showArmor, ...weaponthree
            }
            weaponfourobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateArmorDefense: this.calculateArmorDefense,
                armorbaserecovery, armortrainrecovery, armormiscrecovery, dex, int, wis, armorbaseinit, armortraininit, armormiscinit,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, str,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, shieldflanks, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: true, updateObject: this.updateObject,
                shieldcover, showArmor: this.state.showArmor, maxrange, ...weaponfour
            }
            miscVitals = { con, updateAttribute: this.updateAttribute, currentfavor, chaData, favormax, anointed, checkThisBox: this.checkThisBox, vitalitydice, wis, stressdie }
            vitality = { stresslockout, shownVitality, overCarry, updateAttribute: this.updateAttribute, shownHonor, dwarfModifier, damageone, damagetwo, sizemod, vitalitydice, vitalityroll, conData, currentstress, shownThreshold, relaxation, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), usingshield, stressroll }
            abilities = { abilitiesone, abilitiestwo, abilitiesthree, removedability }
            skillsObject = { str, con, dex, int, wis, cha, skillsuites, nativelanguage, skills, skilladept, int }
            cashAndGear = { copper, updateAttribute: this.updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, shownGearCarry, shownCarry, isDownloading }
            baseCombatFromStats = { str, dex, int, wis, isDownloading, updateAttribute: this.updateAttribute, martialadept, combatskillsuites, combatskills }
            armor = {
                armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatigue, armorbaserecovery, armorbaseinit, armorbasefatiguemod,
                armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, updateAttribute: this.updateAttribute, armormiscfatigue,
                armormiscrecovery, armormiscinit, armorFatigue, returnZeroIfNaN: this.returnZeroIfNaN, calculateArmorDefense: this.calculateArmorDefense,
                toggleArmor: this.toggleArmor, showArmor: this.state.showArmor
            }
            shield = {
                shieldname, shieldflanks, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
                shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue, shieldmiscbreak,
                returnZeroIfNaN: this.returnZeroIfNaN, updateAttribute: this.updateAttribute, shieldsize, shieldFatigue, usingshield
            }

            if (isDownloading) {
                generalnotestextArea = <p>{generalnotes}</p>
            } else {
                generalnotestextArea = <textarea className="generalnotestextArea" defaultValue={generalnotes} onBlur={event => this.updateAttribute(event.target.value, "generalnotes")} maxLength={"10000"}></textarea>
            }
            rightCornerButton = (
                <div className={owned || (!owned && !isAboveLimit) ? "right-corner-button corner-button" : "displayNone"}>
                    <div className={owned ? "right-corner-button corner-button zindexOne" : "displayNone"}>
                        {editButton}
                    </div>
                    <div className={!owned ? "right-corner-button corner-button zindexOne" : "displayNone"}>
                        <div className={!owned ? "right-corner-button corner-button zindexOne" : "displayNone"}>
                            <i onClick={this.props.copyCharacter} className="fas fa-clone"></i>
                        </div>
                        <div className="bannerTooltipRight singleBanner zindexNegOne">
                            <p>Copy Character</p>
                        </div>
                    </div>
                    <div className={owned && !isAboveLimit ? "copyCharacter zindexNegOne" : "displayNone"}>
                        <div className="copyCharacter centerIconRight">
                            <i onClick={this.props.copyCharacter} className="fas fa-clone"></i>
                        </div>
                        <div className="bannerTooltipRight">
                            <p>Copy Character</p>
                        </div>
                    </div>
                </div>
            )
        }

        let downloadingBanner = (<div></div>)
        if (isDownloading) {
            downloadingBanner = (<div className="downloadingBanner">
                <h4>Your PDF is being prepared</h4>
                <p>{isHalfwayDone ? "(It's halfway done)" : "(This will take a hot minute)"}</p>
            </div>)
        }

        return (
            <div>
                {downloadingBanner}
                <div id="pdf" className='viewer pdfViewStylings'>
                    <div id="pageOne" className="pageOne pageBase pageViewStylings">
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
                    <div id="pageTwo" className="pageTwo pageTwoMargin pageBase pageViewStylings">
                        <CashAndGear cashAndGear={cashAndGear} />

                        <Skills skillsObject={skillsObject} />

                        <BaseCombatFromStats baseCombatFromStats={baseCombatFromStats} />

                        <ArmorBlock armor={armor} updateManyAttributes={this.updateManyAttributes} />

                        <ShieldBlock shield={shield} updateManyAttributes={this.updateManyAttributes} />

                        <WeaponBlock weapon={weaponone} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} />
                        <WeaponBlock weapon={weapontwo} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} />
                        <WeaponBlock weapon={weaponthree} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} />
                        <WeaponBlock weapon={weaponfour} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} updateEntireObject={this.updateEntireObject} />
                    </div>
                    <div id="pageThree" className={!(secretgeneralnotes || id === 'blank') || owned ? "pageBase pageViewStylings" : "displayNone"}>
                        <h1>General Notes</h1>
                        {generalnotestextArea}
                    </div>
                </div>
                <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                    <div className="left-corner-button corner-button">
                        <div className="left-corner-button corner-button zindexOne">
                            <a onClick={_ => this.generatePdf(false)}><i className="fas fa-file-download fa-lg"></i></a>
                        </div>
                        <div className="downloadAsPregen zindexNegOne">
                            <div className="downloadAsPregen centerIconLeft">
                                <i onClick={this.adjustForPdf} className="fas fa-meh-blank"></i>
                            </div>
                            <div className="bannerTooltipLeft">
                                <p>Download as Pregen</p>
                            </div>
                        </div>
                    </div>
                    {rightCornerButton}
                </div>
            </div>
        )
    }
}


function calculateHonorDiceLeft(honor) {
    let left = '13px'
    if (honor >= 0 && honor <= 5) {
        left = '13px'
    } else if (honor >= 6 && honor <= 10) {
        left = '57px'
    } else if (honor >= 11 && honor <= 15) {
        left = '101px'
    } else if (honor >= 16 && honor <= 20) {
        left = '150px'
    } else if (honor >= 21 && honor <= 25) {
        left = '199px'
    }
    return left
}

function checkIfHuman(race) {
    return race && race.toUpperCase().trim() === "HUMAN"
}