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

import statTables from '../statTables';

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
        }
    }

    componentWillMount() {
        let { gearone, geartwo, gearthree, gearfour, vitality, sizemod, vitalityroll, con, skills } = this.state.character
        if (this.state.character.id !== 'blank') {
            this.reduceAndCleanGearArrays(gearone, geartwo, gearthree, gearfour)
            this.setState({ shownVitality: vitality ? vitality : sizemod + vitalityroll + con })
        }
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
                if (character === 'S' || character === 'M' || character === 'L') {
                    currentBit = currentBit + character
                    currentBit = currentBit.match(/[\d\.]+|\D+/g)
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

    calculateTotalFatigue = (armorFatigue = 0, shieldFatigue = 0) => {
        return this.convertToFatigueLetter(armorFatigue + shieldFatigue)
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

    calculateArmorDefense = (base, ranks, misc) => {
        let baseAndRanks = +base + +ranks
        let addToDefense = 0

        if (baseAndRanks > 0) {
            addToDefense = Math.ceil(baseAndRanks/3)
            baseAndRanks = 0
        }

        return baseAndRanks + addToDefense + +misc
    }

    adjustForPdf = () => {
        let characterDeepCopy = _.cloneDeep(this.state.character)

        let devotions = characterDeepCopy.devotions.map(devotion => { return { ...devotion, title: null } })
            , traits = characterDeepCopy.traits.map(trait => { return { ...trait, title: null } })
            , nativelanguage = { ...characterDeepCopy.nativelanguage, language: null }

        let cleansedCharacter = {
            ...characterDeepCopy, currentstress: null, damageone: [], damagetwo: [], goals: [],
            name: null, extrahonordice: null, relaxation: null, reputation: [], contacts: "", devotions, traits, nativelanguage
        }

        this.setState({ savedCharacter: characterDeepCopy }, _ => {
            this.setState({ character: cleansedCharacter }, _ => {
                this.generatePdf(true)
            })
        })
    }

    generatePdf = (isPregen) => {
        this.setState({ isDownloading: true }, _ => {
            const pageOne = document.getElementById('pageOne');
            html2canvas(pageOne, { scale: 3 })
                .then((canvasOne) => {
                    const imgDataOne = canvasOne.toDataURL('image/png');
                    const pdf = new jsPDF("p", "mm", "letter");
                    var width = pdf.internal.pageSize.getWidth();
                    var height = pdf.internal.pageSize.getHeight();
                    pdf.addImage(imgDataOne, 'png', 0, 0, width, height - 5);

                    this.setState({ isHalfwayDone: true })
                    const pageTwo = document.getElementById('pageTwo');
                    html2canvas(pageTwo, { scale: 3 })
                        .then((cavansTwo) => {
                            const imgDataTwo = cavansTwo.toDataURL('image/png');
                            pdf.addPage(width, height);
                            pdf.addImage(imgDataTwo, 'png', 0, 0, width, height);
                            const pageThree = document.getElementById('pageThree');
                            html2canvas(pageThree, { scale: 3 })
                                .then((cavansTwo) => {
                                    const imgDateThree = cavansTwo.toDataURL('image/png');
                                    pdf.addPage(width, height);
                                    pdf.addImage(imgDateThree, 'png', 0, 0, width, height);
                                    let name;
                                    if (this.state.character.name && !isPregen) {
                                        name = this.state.character.name
                                    } else if (this.state.character.id === 'blank') {
                                        name = 'Bonfire Blank Character Sheet'
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

    render() {
        let { strTable, dexTable, conTable, intTable, wisTable, chaTable } = statTables
        let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitalitydice, vitalityroll, wis, int, extolevel, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainfatigue, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscfatigue, armorbasedef,
            armorbaserecovery, armorbasefatigue, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbasefatigue, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscfatigue, skillsuites, nativelanguage,
            owned, currentfavor, currentstress, relaxation, usingshield, damageone, damagetwo, skills, skilladept, weaponone, weapontwo, weaponthree, weaponfour, anointed, martialadept, combatskillsuites, combatskills, armorbasefatiguemod } = this.state.character
            , { shownVitality, dead, downloadMode, isDownloading, isHalfwayDone } = this.state
            , strData = strTable[str]
            , dexData = dexTable[dex]
            , conData = conTable[con]
            , intData = intTable[int]
            , wisData = wisTable[wis]
            , chaData = chaTable[cha]
            , shownHonor = honor ? honor : chaData.honor
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
        let shownCarry = this.convertFromEncumbToCarry(strData.carry + quarterMastering)
            , overCarry = (strData.carry + quarterMastering) - this.state.adjustedCarry
            , { changeEditStatus } = this.props
            , honorDiceLeft = calculateHonorDiceLeft(shownHonor)
            , isHuman = checkIfHuman(race)
            , armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0
            , shownThreshold = stressthreshold ? stressthreshold : +wis * 3

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
            weaponone.totalRecoveryModifiers = weaponone.trainrecovery + +weaponone.miscrecovery
            weapontwo.totalRecoveryModifiers = weapontwo.trainrecovery + +weapontwo.miscrecovery
            weaponthree.totalRecoveryModifiers = weaponthree.trainrecovery + +weaponthree.miscrecovery
            weaponfour.totalRecoveryModifiers = weaponfour.trainrecovery + +weaponfour.miscrecovery

            armorFatigue = this.calculateArmorFatigue(armorbasefatigue, armorbasefatiguemod) + armortrainfatigue + armormiscfatigue;
            shieldFatigue = shieldbasefatigue + shieldtrainfatigue + shieldmiscfatigue;
            totalFatigue = this.calculateTotalFatigue(armorFatigue, shieldFatigue);

            characterInfo = { name, race, primarylevel, primarya, secondarylevel, secondarya, level, crp, extolevel, excurrent, updateAttribute: this.updateAttribute, }
            stats = { str, strData, dex, dexData, con, conData, int, intData, wis, wisData, cha, chaData, isDownloading }
            movement = { crawl, walk, jog, run, sprint, overCarry }
            social = { shownHonor, updateAttribute: this.updateAttribute, isHuman, honorDiceLeft, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts }
            weapononeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: false, ...weaponone
            }
            weapontwoobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: false, ...weapontwo
            }
            weaponthreeobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: false, ...weaponthree
            }
            weaponfourobject = {
                returnZeroIfNaN: this.returnZeroIfNaN, calculateRecovery: this.calculateRecovery, calculateArmorDefense: this.calculateArmorDefense,
                armorRecovery, dexattack: dexData.attack, intattack: intData.attack, dexinit: dexData.init, wisinit: wisData.init, armorbaseinit, armortraininit, armormiscinit, dexdefense: dexData.defense, wisdefense: wisData.defense,
                armorbasedef, armortrainingdef, armormiscdef, shieldbasedef, shieldtraindef, shieldmiscdef, armordr, shielddr, strdamage: strData.damage,
                shieldbaseparry, shieldtrainparry, shieldmiscparry, usingshield, updateAttribute: this.updateAttribute,
                thrownweapon: true, dead: dead, shieldname, totalFatigue, armorFatigue: this.convertToFatigueLetter(armorFatigue), isRanged: true, updateObject: this.updateObject, ...weaponfour
            }
            miscVitals = { con, updateAttribute: this.updateAttribute, currentfavor, chaData, favormax, anointed, checkThisBox: this.checkThisBox }
            vitality = { shownVitality, updateAttribute: this.updateAttribute, shownHonor, damageone, damagetwo, sizemod, vitalitydice, vitalityroll, conData, currentstress, shownThreshold, relaxation, }
            abilities = { abilitiesone, abilitiestwo, abilitiesthree, removedability }
            skillsObject = { str, con, dex, int, wis, cha, skillsuites, nativelanguage, skills, skilladept, int }
            cashAndGear = { copper, updateAttribute: this.updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, shownGearCarry, shownCarry, isDownloading }
            baseCombatFromStats = { str, dex, int, wis, isDownloading, updateAttribute: this.updateAttribute, martialadept, combatskillsuites, combatskills }
            armor = {
                armorname, armordr, armorskilladj, armorbonus, armorbasedef, armorbasefatigue, armorbaserecovery, armorbaseinit, armorbasefatiguemod,
                armortrainingdef, armortrainfatigue, armortrainrecovery, armortraininit, armormiscdef, updateAttribute: this.updateAttribute, armormiscfatigue,
                armormiscrecovery, armormiscinit, armorRecovery, armorFatigue, returnZeroIfNaN: this.returnZeroIfNaN, calculateArmorDefense: this.calculateArmorDefense,
            }
            shield = {
                shieldname, shielddr, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldmiscbreak, shieldbasefatigue, shieldbasebreak,
                shieldtraindef, shieldtrainparry, shieldtrainfatigue, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscfatigue, shieldmiscbreak,
                returnZeroIfNaN: this.returnZeroIfNaN, updateAttribute: this.updateAttribute, shieldsize, shieldFatigue
            }

            if (isDownloading) {
                generalnotestextArea = <p>{generalnotes}</p>
            } else {
                generalnotestextArea = <textarea className="generalnotestextArea" defaultValue={generalnotes} onBlur={event => this.updateAttribute(event.target.value, "generalnotes")} maxLength={"10000"}></textarea>
            }
            rightCornerButton = (
                <div className="right-corner-button corner-button">
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
                    <div className={owned ? "copyCharacter zindexNegOne" : "displayNone"}>
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

                        <ArmorBlock armor={armor} />

                        <ShieldBlock shield={shield} />

                        <WeaponBlock weapon={weaponone} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                        <WeaponBlock weapon={weapontwo} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                        <WeaponBlock weapon={weaponthree} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                        <WeaponBlock weapon={weaponfour} updateObject={this.updateObject} returnZeroIfNaN={this.returnZeroIfNaN} />
                    </div>
                    <div id="pageThree" className="pageBase pageViewStylings">
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