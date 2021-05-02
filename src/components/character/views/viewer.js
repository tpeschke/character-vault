import axios from 'axios'
import React, { Component } from 'react'
import ViewList from './pairComponents/viewList'
import ViewPairList from './pairComponents/viewPairList'
import ViewSkillList from './pairComponents/viewSkillList'
import EditPairList from './pairComponents/editPairList'
import WeaponSquare from './weaponsquare'

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
        let endurance = skills.filter(({skill}) => skill.toUpperCase() === "ENDURANCE")
        if (endurance[0]) {
            endurance = endurance[0].rank
        } else {
            endurance = 0
        }
        this.setState({shownVitality: vitality ? vitality : sizemod + vitalityroll + con, endurance})
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
        
        let quarterMastering = this.state.character.skills.filter(({skill}) => skill.toUpperCase() === "QUARTERMASTERING" || skill.toUpperCase() === "QUARTER MASTERING")
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
        this.setState({currentDamage}, this.calculateDamageStress)
    }

    calculateDamageStress = () => {
        let { currentDamage, shownVitality } = this.state
        if (currentDamage > shownVitality ) {
            this.setState({woundMultiplier: 4, dead: true})
        } else if (currentDamage > +(shownVitality * .75).toFixed(0)) {
            this.setState({woundMultiplier: 4, dead: false})
        } else if (currentDamage > +(shownVitality * .5).toFixed(0)) {
            this.setState({woundMultiplier: 3, dead: false})
        } else if (currentDamage > +(shownVitality * .25).toFixed(0)) {
            this.setState({woundMultiplier: 2, dead: false})
        } else if (currentDamage > 1) {
            this.setState({woundMultiplier: 1, dead: false})
        } else {
            this.setState({woundMultiplier: 0, dead: false})
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

    render() {
        let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitalitydice, vitalityroll, wis, int, extolevel, strData, dexData, conData, intData, wisData, chaData, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery,
            onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage, twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize, threetrainattack,
            threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage, threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack,
            fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef,
            armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, skillsuites, nativelanguage,
            owned, currentfavor, currentstress, relaxation, usingshield, fourthrownweapon, damageone, damagetwo, skills, skilladept } = this.state.character
            , { currentDamage, shownVitality, woundMultiplier, dead, endurance } = this.state
            , shownHonor = honor ? honor : chaData.honor
            , shownGearCarry = this.convertFromEncumbToCarry(this.state.adjustedEncumb)
            , shownCarry = this.convertFromEncumbToCarry(strData.carry)
            , { downloadMode, changeEditStatus } = this.props
            , left = calculateLeft(shownHonor)
            , circleFill = calculateHumanHonorDice(race, shownHonor)
            , weaponOneRecovery = onetrainrecovery + +onemiscrecovery
            , weaponTwoRecovery = twotrainrecovery + +twomiscrecovery
            , weaponThreeRecovery = threetrainrecovery + +threemiscrecovery
            , weaponFourRecovery = fourtrainrecovery + +fourmiscrecovery
            , armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0
            , shownThreshold = stressthreshold ? stressthreshold : +wis * 3

            , modifiedRunLength = 10 - endurance - Math.floor(currentstress/10)
            , modifiedSprintLength = 5 - endurance - Math.floor(currentstress/10)
        let editButton = (<i onClick={changeEditStatus} className="fas fa-edit"></i>)
        if (this.state.isUpdating) {
            editButton = (<i className="fas fa-spinner spinner-tiny"></i>)
        }

        let shieldEncumb = shieldbaseencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0
        , armorEncumb = armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0
        , totalEncumb = usingshield ? conData.encumb + wisData.encumb + armorEncumb + shieldEncumb + Math.floor(this.state.adjustedEncumb / 3) : conData.encumb + wisData.encumb + armorEncumb + Math.floor(this.state.adjustedEncumb / 3)
        return (
            <div>
                <div id="pdf" className={downloadMode ? 'viewer' : 'viewer pdfViewStylings'}>
                    <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                        <p className="nameLocation">{name}</p>
                        <p className="raceLocation">{race}</p>
                        <p className="primaryLocation">{primarya}</p>
                        <p className="primarylevelLocation">{primarylevel === 0 ? "" : primarylevel}</p>
                        <p className="secondaryLocation">{secondarya}</p>
                        <p className="secondarylevelLocation">{secondarylevel === 0 ? "" : secondarylevel}</p>
                        <p className="levelLocation">{level}</p>
                        <p className="crpLocation">{crp}</p>
                        <p className="extolevelLocation">{extolevel}</p>
                        <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onBlur={event => this.updateAttribute(event.target.value, "excurrent")} />
                        <p className="drawbackLocation">{drawback}</p>

                        <p className="strLocation">{str}</p>
                        <p className="strConfrontationLocation">{strData.confrontation.toLowerCase()}</p>
                        <p className="dexLocation">{dex}</p>
                        <p className="dexConfrontationLocation">{dexData.confrontation.toLowerCase()}</p>
                        <p className="conLocation">{con}</p>
                        <p className="conConfrontationLocation">{conData.confrontation.toLowerCase()}</p>
                        <p className="intLocation">{int}</p>
                        <p className="intConfrontationLocation">{intData.confrontation.toLowerCase()}</p>
                        <p className="wisLocation">{wis}</p>
                        <p className="wisConfrontationLocation">{wisData.confrontation.toLowerCase()}</p>
                        <p className="chaLocation">{cha}</p>
                        <p className="chaConfrontationLocation">{chaData.confrontation.toLowerCase()}</p>

                        <p className="crawlLocation">{crawl}</p>
                        <p className="walkLocation">{walk}</p>
                        <p className="jogLocation">{jog}</p>
                        <p className="runLocation">{run}</p>
                        <p className="runLengthLocation">{modifiedRunLength > 0 ? modifiedRunLength : 0} seconds</p>
                        <p className="sprintLocation">{sprint}</p>
                        <p className="sprintLengthLocation">{modifiedSprintLength > 0 ? modifiedSprintLength : 0} seconds</p>

                        <input className="honorLocation" type="number" max="25" min="0" defaultValue={shownHonor} onBlur={event => this.updateAttribute(event.target.value, "honor")} />
                        <div className="circle" style={{ left }}>{circleFill}</div>
                        <input className="extrahonordiceLocation" type="number" min="0" defaultValue={extrahonordice} onBlur={event => this.updateAttribute(event.target.value, "extrahonordice")} />
                        <p className="temperamentLocation">{temperament}</p>
                        <ViewList stylings={{ top: '405px', left: '20px', width: '224px' }} listArray={goals} />
                        <ViewPairList stylings={{ top: '507px', left: '20px', width: '224px' }} listArray={devotions} />
                        <ViewPairList stylings={{ top: '593px', left: '20px', width: '427px', height: '67px'  }} rowWidth={'212px'} listArray={flaws} />
                        <ViewPairList stylings={{ top: '384px', left: '246px', width: '200px' }} listArray={traits} />
                        <ViewList stylings={{ top: '656px', left: '107px', width: '340px' }} listArray={reputation} />
                        <textarea className="contactsLocation contactstextArea" defaultValue={contacts} onBlur={event => this.updateAttribute(event.target.value, "contacts")} maxLength={"315"}></textarea>

                        <WeaponSquare position={'one'} returnZeroIfNaN={this.returnZeroIfNaN} calculateRecovery={this.calculateRecovery} weaponRecovery={onebaserecovery + weaponTwoRecovery}
                            armorRecovery={armorRecovery} size={onesize} trainattack={onetrainattack} miscattack={onemiscattack} dexattack={dexData.attack} intattack={intData.attack}
                            dexinit={dexData.init} wisinit={wisData.init} armorbaseinit={armorbaseinit} armortraininit={armortraininit} armormiscinit={armormiscinit}
                            miscinit={onemiscinit} dexdefense={dexData.defense} wisdefense={wisData.defense} armorbasedef={armorbasedef} armortrainingdef={armortrainingdef}
                            armormiscdef={armormiscdef} shieldbasedef={shieldbasedef} shieldtraindef={shieldtraindef} shieldmiscdef={shieldmiscdef} totalEncumb={totalEncumb} armordr={armordr}
                            shielddr={shielddr} name={onename} basedamage={onebasedamage} traindamage={onetraindamage} miscdamage={onemiscdamage} strdamage={strData.damage}
                            measure={onebasemeasure} shieldbaseparry={shieldbaseparry} shieldtrainparry={shieldtrainparry} shieldmiscparry={shieldmiscparry} parry={onebaseparry}
                            usingshield={usingshield} weapontrainparry={onetrainparry} weaponmiscparry={onemiscparry} updateAttribute={this.updateAttribute}
                            thrownweapon={true} dead={dead} stressAdjustment={Math.floor((totalEncumb * woundMultiplier) / 10)} shieldname={shieldname} type={onetype}/>

                        <WeaponSquare position={'two'} returnZeroIfNaN={this.returnZeroIfNaN} calculateRecovery={this.calculateRecovery} weaponRecovery={twobaserecovery + weaponTwoRecovery}
                            armorRecovery={armorRecovery} size={twosize} trainattack={twotrainattack} miscattack={twomiscattack} dexattack={dexData.attack} intattack={intData.attack}
                            dexinit={dexData.init} wisinit={wisData.init} armorbaseinit={armorbaseinit} armortraininit={armortraininit} armormiscinit={armormiscinit}
                            miscinit={twomiscinit} dexdefense={dexData.defense} wisdefense={wisData.defense} armorbasedef={armorbasedef} armortrainingdef={armortrainingdef}
                            armormiscdef={armormiscdef} shieldbasedef={shieldbasedef} shieldtraindef={shieldtraindef} shieldmiscdef={shieldmiscdef}  totalEncumb={totalEncumb} 
                            armordr={armordr} shielddr={shielddr} name={twoname} basedamage={twobasedamage} traindamage={twotraindamage} miscdamage={twomiscdamage} strdamage={strData.damage}
                            measure={twobasemeasure} shieldbaseparry={shieldbaseparry} shieldtrainparry={shieldtrainparry} shieldmiscparry={shieldmiscparry} parry={twobaseparry}
                            usingshield={usingshield} weapontrainparry={twotrainparry} weaponmiscparry={twomiscparry} updateAttribute={this.updateAttribute}
                            thrownweapon={true} dead={dead} stressAdjustment={Math.floor((totalEncumb * woundMultiplier) / 10)} shieldname={shieldname} type={twotype} />

                        <WeaponSquare position={'three'} returnZeroIfNaN={this.returnZeroIfNaN} calculateRecovery={this.calculateRecovery} weaponRecovery={threebaserecovery + weaponThreeRecovery}
                            armorRecovery={armorRecovery} size={threesize} trainattack={threetrainattack} miscattack={threemiscattack} dexattack={dexData.attack} intattack={intData.attack}
                            dexinit={dexData.init} wisinit={wisData.init} armorbaseinit={armorbaseinit} armortraininit={armortraininit} armormiscinit={armormiscinit}
                            miscinit={threemiscinit} dexdefense={dexData.defense} wisdefense={wisData.defense} armorbasedef={armorbasedef} armortrainingdef={armortrainingdef}
                            armormiscdef={armormiscdef} shieldbasedef={shieldbasedef} shieldtraindef={shieldtraindef} shieldmiscdef={shieldmiscdef}
                            totalEncumb={totalEncumb} armordr={armordr} shielddr={shielddr} name={threename} basedamage={threebasedamage} traindamage={threetraindamage} miscdamage={threemiscdamage} strdamage={strData.damage}
                            measure={threebasemeasure} shieldbaseparry={shieldbaseparry} shieldtrainparry={shieldtrainparry} shieldmiscparry={shieldmiscparry} parry={threebaseparry}
                            usingshield={usingshield} weapontrainparry={threetrainparry} weaponmiscparry={threemiscparry} updateAttribute={this.updateAttribute}
                            thrownweapon={true} dead={dead} stressAdjustment={Math.floor((totalEncumb * woundMultiplier) / 10)} shieldname={shieldname} type={threetype} />

                        <WeaponSquare position={'four'} returnZeroIfNaN={this.returnZeroIfNaN} calculateRecovery={this.calculateRecovery} weaponRecovery={fourbaserecovery + weaponFourRecovery}
                            armorRecovery={armorRecovery} size={foursize} trainattack={fourtrainattack} miscattack={fourmiscattack} dexattack={dexData.attack} intattack={intData.attack}
                            dexinit={dexData.init} wisinit={wisData.init} armorbaseinit={armorbaseinit} armortraininit={armortraininit} armormiscinit={armormiscinit}
                            miscinit={fourmiscinit} dexdefense={dexData.defense} wisdefense={wisData.defense} armorbasedef={armorbasedef} armortrainingdef={armortrainingdef}
                            armormiscdef={armormiscdef} shieldbasedef={shieldbasedef} shieldtraindef={shieldtraindef} shieldmiscdef={shieldmiscdef} totalEncumb={totalEncumb} armordr={armordr}
                            shielddr={shielddr} name={fourname} basedamage={fourbasedamage} traindamage={fourtraindamage} miscdamage={fourmiscdamage} strdamage={strData.damage}
                            measure={'n/a'} shieldbaseparry={shieldbaseparry} shieldtrainparry={shieldtrainparry} shieldmiscparry={shieldmiscparry} parry={'n/a'} updateAttribute={this.updateAttribute}
                            usingshield={false} weapontrainparry={null} weaponmiscparry={null} thrownweapon={fourthrownweapon} dead={dead} stressAdjustment={Math.floor((totalEncumb * woundMultiplier) / 10)} />

                        <p className="takingabreatherLocation">{20 - con < 3 ? 3 : 20 - con} seconds</p>
                        <input className="currentstressLocation stressAdjust" type="number" defaultValue={currentstress} onBlur={event => this.updateAttribute(event.target.value, "currentstress")} />
                        <p className="totalstressLocation">+{totalEncumb * woundMultiplier}</p>
                        <p className={(totalEncumb * woundMultiplier) + currentstress > shownThreshold ? "stressthresholdLocation mentalBreak" : "stressthresholdLocation"}>{shownThreshold}</p>
                        <input className="relaxationLocation" type="number" defaultValue={relaxation} onBlur={event => this.updateAttribute(event.target.value, "relaxation")} />
                        <input className="currentfavorLocation" type="number" min="0" defaultValue={currentfavor} onBlur={event => this.updateAttribute(event.target.value, "currentfavor")} />
                        <p className="favormaxLocation">{favormax}</p>
                        <p className="favorminLocation">{chaData.favor}</p>

                        <p className="maxrangeLocation one">5</p>
                        <p className="maxrangeLocation two">{(maxrange / 6).toFixed(0)}</p>
                        <p className="maxrangeLocation three">{+(maxrange / 6).toFixed(0) + 1}</p>
                        <p className="maxrangeLocation four">{(maxrange / 3).toFixed(0)}</p>
                        <p className="maxrangeLocation five">{+(maxrange / 3).toFixed(0) + 1}</p>
                        <p className="maxrangeLocation six">{(maxrange / 2).toFixed(0)}</p>
                        <p className="maxrangeLocation seven">{+(maxrange / 2).toFixed(0) + 1}</p>
                        <p className="maxrangeLocation eight">{(maxrange / 1.5).toFixed(0)}</p>
                        <p className="maxrangeLocation nine">{+(maxrange / 1.5).toFixed(0) + 1}</p>
                        <p className="maxrangeLocation ten">{(maxrange / 1.2).toFixed(0)}</p>
                        <p className="maxrangeLocation eleven">{+(maxrange / 1.2).toFixed(0) + 1}</p>
                        <p className="maxrangeLocation">{maxrange}</p>

                        <p className="criticalLocation">{(shownVitality * .75).toFixed(0)} - {shownVitality}</p>
                        <p className="woundedLocation">{(shownVitality * .50).toFixed(0)} - {(shownVitality * .75).toFixed(0) -1}</p>
                        <p className="bloodiedLocation">{(shownVitality * .25).toFixed(0)} - {(shownVitality * .5).toFixed(0) -1}</p>
                        <p className="hurtLocation">1 - {(shownVitality * .25).toFixed(0) -1}</p>
                        <p className="currentDamageLocation">{currentDamage}</p>
                        <p className="traumaLocation">{(shownVitality * .50).toFixed(0)}</p>
                        
                        <EditPairList stylings={{ top: '677px', left: '522px', width: '96px' }} listArray={damageone} limit={7} titleWidth={50} titleSameAsValue={true} updateFunction={this.updateAttribute} type={"damageone"} />
                        <EditPairList stylings={{ top: '677px', left: '697px', width: '96px' }} listArray={damagetwo} limit={7} titleWidth={50} titleSameAsValue={true} updateFunction={this.updateAttribute} type={"damagetwo"} />

                        <p className="sizemodLocation">{sizemod}</p>
                        <p className="vitalityrollLocation">{vitalityroll}</p>
                        <p className="vitalitydiceLocation">{vitalitydice}</p>
                        <p className="vitalityminLocation">{conData.vitalitymin}</p>

                        <p className="abilitiesoneLocation abilitiesoneAdjustment">{abilitiesone}</p>
                        <p className="abilitiestwoLocation abilitiestwoAdjustment">{abilitiestwo}</p>
                        <p className="abilitiesthreeLocation abilitiesthreeAdjustment">{abilitiesthree}</p>
                        <p className="removedabilityLocation">{removedability}</p>
                    </div>
                    <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>
                        <div className="skillDiscount">
                            <p className="strDiscount">{strData.skill}</p>
                            <p className="dexDiscount">{dexData.skill}</p>
                            <p className="conDiscount">{conData.skill}</p>
                            <p className="intDiscount">{intData.skill}</p>
                            <p className="wisDiscount">{wisData.skill}</p>
                            <p className="chaDiscount">{chaData.skill}</p>
                            <p className="skilladeptLocation">{skilladept}</p>
                        </div>
                        <div className="skillsuiteShell">
                            <div className="skillRow athletics">
                                <p className="skillcost athletics">{(skillsuites[0].skillsuitebasecost + (skillsuites[0].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank athletics">{skillsuites[0].rank}</p>
                            </div>
                            <div className="skillRow lore">
                                <p className="skillcost lore">{(skillsuites[1].skillsuitebasecost + (skillsuites[1].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank lore">{skillsuites[1].rank}</p>
                            </div>
                            <div className="skillRow streetwise">
                                <p className="skillcost streetwise">{(skillsuites[2].skillsuitebasecost + (skillsuites[2].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank streetwise">{skillsuites[2].rank}</p>
                            </div>
                            <div className="skillRow survival">
                                <p className="skillcost survival">{(skillsuites[3].skillsuitebasecost + (skillsuites[3].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank survival">{skillsuites[3].rank}</p>
                            </div>
                            <div className="skillRow tactics">
                                <p className="skillcost tactics">{(skillsuites[4].skillsuitebasecost + (skillsuites[4].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank tactics">{skillsuites[4].rank}</p>
                            </div>
                            <div className="skillRow trades">
                                <p className="skillcost trades">{(skillsuites[5].skillsuitebasecost + (skillsuites[5].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank trades">{skillsuites[5].rank}</p>
                            </div>
                            <div className="skillRow weirdcraft">
                                <p className="skillcost weirdcraft">{(skillsuites[6].skillsuitebasecost + (skillsuites[6].rank * 5)) * (1 - (skilladept / 10)).toFixed(0)}</p>
                                <p className="skillrank weirdcraft">{skillsuites[6].rank}</p>
                            </div>

                            <div className="nativeRow">
                                <p id="nativename">{nativelanguage.language}</p>
                                <p id="nativecost">{5 + (nativelanguage.rank || 0 * 2)}</p>
                                <p id="nativerank">{nativelanguage.rank ? nativelanguage.rank : Math.ceil(int / 2)}</p>
                            </div>
                        </div>
                        <ViewSkillList stylings={{ top: '42px', left: '247px', width: '549px', height: '275px' }} rowWidth={'274px'} listArray={skills} skilladept={skilladept}/>


                        <input className="copperLocation" type="text" defaultValue={copper} onBlur={event => this.updateAttribute(event.target.value, "copper")} />
                        <input className="silverLocation" type="text" defaultValue={silver} onBlur={event => this.updateAttribute(event.target.value, "silver")} />
                        <input className="goldLocation" type="text" defaultValue={gold} onBlur={event => this.updateAttribute(event.target.value, "gold")} />
                        <input className="platiniumLocation" type="text" defaultValue={platinium} onBlur={event => this.updateAttribute(event.target.value, "platinium")} />
                        <EditPairList stylings={{ top: '380px', left: '20px', width: '201px' }} listArray={gearone} limit={6} updateFunction={this.updateAttribute} type={"gearone"} />
                        <EditPairList stylings={{ top: '380px', left: '221px', width: '199px' }} listArray={geartwo} limit={6} updateFunction={this.updateAttribute} type={"geartwo"} />
                        <EditPairList stylings={{ top: '380px', left: '422px', width: '198px' }} listArray={gearthree} limit={6} updateFunction={this.updateAttribute} type={"gearthree"} />
                        <EditPairList stylings={{ top: '380px', left: '619px', width: '175px' }} listArray={gearfour} limit={6} updateFunction={this.updateAttribute} type={"gearfour"} />
                        <p className="shownGearCarryLocation">{shownGearCarry}</p>
                        <p className="strCarryLocation">{shownCarry}</p>

                        <p className="attackLocation"><strong>{dexData.attack + intData.attack}</strong> = {dexData.attack} + {intData.attack}</p>
                        <p className="defenseLocation"><strong>{dexData.defense + wisData.defense}</strong> = {dexData.defense} + {wisData.defense} </p>
                        <p className="initLocation"><strong>{dexData.init + wisData.init}</strong> = {dexData.init} + {wisData.init}</p>
                        <p className="strDamageLocation"><strong>{strData.damage}</strong></p>
                        <p className="encumbLocation"><strong>{conData.encumb + wisData.encumb}</strong> = {conData.encumb} + {wisData.encumb}</p>

                        <textarea className="generalnotesLocation generalnotestextArea" defaultValue={generalnotes} onBlur={event => this.updateAttribute(event.target.value, "generalnotes")} maxLength={"500"}></textarea>

                        <p className="armornameLocation">{armorname}</p>
                        <p className="armordrLocation">{armordr}</p>
                        <p className="armorskilladjLocation">{armorskilladj}</p>
                        <p className="armorbonusLocation">{armorbonus}</p>

                        <p className="armorbasedefLocation">{armorbasedef}</p>
                        <p className="armorbaseencumbLocation">{armorbaseencumb}</p>
                        <p className="armorbaserecoveryLocation">{armorbaserecovery}</p>
                        <p className="armorbaseinitLocation">{armorbaseinit}</p>

                        <p className="armortrainingdefLocation">{armortrainingdef}</p>
                        <p className="armortrainencumbLocation">{armortrainencumb}</p>
                        <p className="armortrainrecoveryLocation">{armortrainrecovery}</p>
                        <p className="armortraininitLocation">{armortraininit}</p>

                        <input className="armormiscdefLocation" type="number" defaultValue={armormiscdef} onBlur={event => this.updateAttribute(event.target.value, "armormiscdef")} />
                        <input className="armormiscencumbLocation" type="number" defaultValue={armormiscencumb} onBlur={event => this.updateAttribute(event.target.value, "armormiscencumb")} />
                        <input className="armormiscrecoveryLocation" type="number" defaultValue={armormiscrecovery} onBlur={event => this.updateAttribute(event.target.value, "armormiscrecovery")} />
                        <input className="armormiscinitLocation" type="number" defaultValue={armormiscinit} onChange={event => this.updateAttribute(event.target.value, "armormiscinit")} />

                        <p className="armortotaldefLocation">{armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0}</p>
                        <p className="armortotalencumbLocation">{armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0}</p>
                        <p className="armortotalrecoveryLocation">{armorRecovery}</p>
                        <p className="armortotalinitLocation">{armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0}</p>

                        <p className="shieldnameLocation">{shieldname}</p>
                        <p className="shielddrLocation">{shielddr}</p>
                        <p className="shieldsizeLocation">{shieldsize}</p>
                        <p className="shieldcoverLocation">{shieldcover}</p>
                        <p className="shieldbonusLocation">{shieldbonus}</p>

                        <p className="shieldbasedefLocation">{shieldbasedef}</p>
                        <p className="shieldbaseparryLocation">{shieldbaseparry}</p>
                        <p className="shieldbaseencumbLocation">{shieldbaseencumb}</p>
                        <p className="shieldbasebreakLocation">{shieldbasebreak}</p>

                        <p className="shieldtraindefLocation">{shieldtraindef}</p>
                        <p className="shieldtrainparryLocation">{shieldtrainparry}</p>
                        <p className="shieldtrainencumbLocation">{shieldtrainencumb}</p>
                        <p className="shieldtrainbreakLocation">{shieldtrainbreak}</p>

                        <input className="shieldmiscdefLocation" type="number" defaultValue={shieldmiscdef} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscdef")} />
                        <input className="shieldmiscparryLocation" type="number" defaultValue={shieldmiscparry} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscparry")} />
                        <input className="shieldmiscencumbLocation" type="number" defaultValue={shieldmiscencumb} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscencumb")} />
                        <input className="shieldmiscbreakLocation" type="number" defaultValue={shieldmiscbreak} onBlur={event => this.updateAttribute(event.target.value, "shieldmiscbreak")} />

                        <p className="shieldtotaldefLocation">{shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0}</p>
                        <p className="shieldtotalparryLocation">{this.returnZeroIfNaN(shieldbaseparry + shieldtrainparry + shieldmiscparry)}</p>
                        <p className="shieldtotalencumbLocation">{shieldbaseencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldbaseencumb + shieldtrainencumb + shieldmiscencumb : 0}</p>
                        <p className="shieldtotalbreakLocation">{shieldbasebreak + shieldtrainbreak + shieldmiscbreak > 0 ? shieldbasebreak + shieldtrainbreak + shieldmiscbreak : 0}</p>

                        <div className="weaponProfileOne">
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
                        </div>

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


function calculateLeft(honor) {
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