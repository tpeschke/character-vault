import React, { Component } from 'react'
import ViewList from './components/viewList'
import ViewPairList from './components/viewPairList'
import ViewSkillList from './components/viewSkillList'

export default class CharacterViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ...props.character,
            adjustedEncumb: null
        }
    }

    componentWillMount() {
        let { gearone, geartwo, gearthree, gearfour } = this.state
        this.reduceAndCleanGearArrays(gearone, geartwo, gearthree, gearfour)
    }

    reduceAndCleanGearArrays = (gearone, geartwo, gearthree, gearfour) => {
        let totalCarry = 0
        let cleanArray = ({ value }) => {
            if (!isNaN(+value)) { return 0 }
            value = value.toUpperCase().replace(/\s+/g, '')
            let containsCarry = value.match(/[SML]/g)
            if (!containsCarry) { return 0 }
            let currentBit = ''
            value.split('').forEach(character => {
                if (character === 'S' || character === 'M' || character === 'L') {
                    currentBit = currentBit + character
                    currentBit = currentBit.split('')
                    let number, type, container = false
                    if (currentBit.includes('+')) {
                        container = true
                        number = +currentBit[1]
                        type = currentBit[2]
                    } else {
                        number = +currentBit[0]
                        type = currentBit[1]
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
                        let strDataCopy = { ...this.state.strData }
                        strDataCopy.carry += adjustedAmount
                        this.setState({ strData: strDataCopy })
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

        this.setState({ adjustedEncumb: totalCarry })
    }

    convertFromEncumbToCarry = (value) => {
        if (!value) { return 0 }
        let large = Math.floor(value / 9)
        let largeRemainder = value % 9
        let medium = Math.floor(largeRemainder / 3)
        let mediumRemainder = value % 3
        let small = mediumRemainder

        return `${small}S ${medium}M ${large}L`
    }

    calculateRecovery = (recovery, size = "placeholder", isMelee) => {
        let minimumRecovery
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

    render() {
        let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, extolevel, strData, dexData, conData, intData, wisData, chaData, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery,
            onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize, twotrainattack, twotrainparry, twotrainrecovery, twotraindamage, twomiscattack, twomiscparry, twomiscrecovery, twomiscdamage, twomiscinit, twoname, twobasedamage, twobaserecovery, twobaseparry, twobasemeasure, twotype, twobonus, twotraits, twosize, threetrainattack,
            threetrainparry, threetrainrecovery, threetraindamage, threemiscattack, threemiscparry, threemiscrecovery, threemiscdamage, threemiscinit, threename, threebasedamage, threebaserecovery, threebaseparry, threebasemeasure, threetype, threebonus, threetraits, threesize, fourtrainattack, fourtrainrecovery, fourtraindamage, fourmiscattack,
            fourmiscrecovery, fourmiscdamage, fourmiscinit, fourname, fourbasedamage, fourbaserecovery, fourtype, fourbonus, fourtraits, foursize, armorname, armordr, armorskilladj, armorbonus, armortrainingdef, armortrainrecovery, armortrainencumb, armortraininit, armormiscdef, armormiscrecovery, armormiscinit, armormiscencumb, armorbasedef,
            armorbaserecovery, armorbaseencumb, armorbaseinit, shieldname, shielddr, shieldsize, shieldcover, shieldbonus, shieldbasedef, shieldbaseparry, shieldbaseencumb, shieldbasebreak, shieldtraindef, shieldtrainparry, shieldtrainencumb, shieldtrainbreak, shieldmiscdef, shieldmiscparry, shieldmiscbreak, shieldmiscencumb, skillsuites, nativelanguage,
            skillone, skilltwo, skillthree } = this.state
            , shownVitality = vitality ? vitality : sizemod + vitalityroll + con
            , shownHonor = honor ? honor : chaData.honor
            , shownGearCarry = this.convertFromEncumbToCarry(this.state.adjustedEncumb)
            , shownCarry = this.convertFromEncumbToCarry(strData.carry)
            , { downloadMode, changeEditStatus } = this.props
            , left = calculateLeft(shownHonor)
            , circleFill = calculateHumanHonorDice(race, shownHonor)
            , weaponOneRecovery = onebaserecovery + onetrainrecovery + onemiscrecovery
            , weaponTwoRecovery = twobaserecovery + twotrainrecovery + twomiscrecovery
            , weaponThreeRecovery = threebaserecovery + threetrainrecovery + threemiscrecovery
            , weaponFourRecovery = fourbaserecovery + fourtrainrecovery + fourmiscrecovery
            , armorRecovery = armorbaserecovery + armortrainrecovery + armormiscrecovery > 0 ? armorbaserecovery + armortrainrecovery + armormiscrecovery : 0

        return (
            <div>
                <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
                    <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                        <p className="nameLocation">{name}</p>
                        <p className="raceLocation">{race}</p>
                        <p className="primaryLocation">{primarya}</p>
                        <p className="primarylevelLocation">{primarylevel}</p>
                        <p className="secondaryLocation">{secondarya}</p>
                        <p className="secondarylevelLocation">{secondarylevel}</p>
                        <p className="levelLocation">{level}</p>
                        <p className="crpLocation">{crp}</p>
                        <p className="extolevelLocation">{extolevel}</p>
                        <p className="excurrentLocation">{excurrent}</p>
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
                        <p className="sprintLocation">{sprint}</p>

                        <p className="honorLocation">{shownHonor}</p>
                        <p className="extrahonordiceLocation">{extrahonordice}</p>
                        <div className="circle" style={{ left }}>{circleFill}</div>
                        <p className="temperamentLocation">{temperament}</p>
                        <ViewList stylings={{ top: '405px', left: '20px', width: '224px' }} listArray={goals} />
                        <ViewPairList stylings={{ top: '488px', left: '20px', width: '224px' }} listArray={devotions} />
                        <ViewPairList stylings={{ top: '572px', left: '20px', width: '224px' }} listArray={flaws} />
                        <ViewPairList stylings={{ top: '362px', left: '246px', width: '200px' }} listArray={traits} />
                        <ViewList stylings={{ top: '656px', left: '107px', width: '340px' }} listArray={reputation} />
                        <p className="contactsLocation">{contacts}</p>

                        <div className="weaponsquare weaponone">
                            <p className="recovery">{this.returnZeroIfNaN(this.calculateRecovery(weaponOneRecovery + armorRecovery, onesize, true))}</p>
                            <p className="attack">{this.returnZeroIfNaN(onetrainattack + onemiscattack + dexData.attack + intData.attack)}</p>
                            <p className="init">{this.returnZeroIfNaN(dexData.init + wisData.init + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + onemiscinit)}</p>

                            <p className="def">{dexData.defense + wisData.defense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
                            <p className="encumb">{conData.encumb + wisData.encumb + (armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0) + (shieldmiscencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldmiscencumb + shieldtrainencumb + shieldmiscencumb : 0) + Math.floor(this.state.adjustedEncumb / 3)}</p>
                            <div className="drshell">
                                <p id="armorDr">{armordr}</p>
                                <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p>
                            </div>

                            <p className="measure">{onebasemeasure}</p>
                            <p className="damage">{onebasedamage}+{onetraindamage + onemiscdamage + strData.damage}</p>
                            <p className="parry">{shieldbaseparry ? shieldbaseparry + shieldbaseparry + shieldtrainparry + shieldmiscparry : onebaseparry}</p>

                            <p className="name">{onename}</p>
                        </div>

                        <div className="weaponsquare weapontwo">
                            <p className="recovery">{this.returnZeroIfNaN(this.calculateRecovery(weaponTwoRecovery + armorRecovery, twosize, true))}</p>
                            <p className="attack">{this.returnZeroIfNaN(twotrainattack + twomiscattack + dexData.attack + intData.attack)}</p>
                            <p className="init">{this.returnZeroIfNaN(dexData.init + wisData.init + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + twomiscinit)}</p>

                            <p className="def">{dexData.defense + wisData.defense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
                            <p className="encumb">{conData.encumb + wisData.encumb + (armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0) + (shieldmiscencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldmiscencumb + shieldtrainencumb + shieldmiscencumb : 0) + Math.floor(this.state.adjustedEncumb / 3)}</p>
                            <div className="drshell">
                                <p id="armorDr">{armordr}</p>
                                <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p>
                            </div>

                            <p className="measure">{twobasemeasure}</p>
                            <p className="damage">{twobasedamage}+{twotraindamage + twomiscdamage + strData.damage}</p>
                            <p className="parry">{shieldbaseparry ? shieldbaseparry + shieldbaseparry + shieldtrainparry + shieldmiscparry : twobaseparry}</p>

                            <p className="name">{twoname}</p>
                        </div>

                        <div className="weaponsquare weaponthree">
                            <p className="recovery">{this.returnZeroIfNaN(this.calculateRecovery(weaponThreeRecovery + armorRecovery, threesize, true))}</p>
                            <p className="attack">{this.returnZeroIfNaN(threetrainattack + threemiscattack + dexData.attack + intData.attack)}</p>
                            <p className="init">{this.returnZeroIfNaN(dexData.init + wisData.init + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + threemiscinit)}</p>

                            <p className="def">{dexData.defense + wisData.defense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
                            <p className="encumb">{conData.encumb + wisData.encumb + (armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0) + (shieldmiscencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldmiscencumb + shieldtrainencumb + shieldmiscencumb : 0) + Math.floor(this.state.adjustedEncumb / 3)}</p>
                            <div className="drshell">
                                <p id="armorDr">{armordr}</p>
                                <p id="shieldDr"><i className="fas fa-shield-alt"></i>{shielddr}</p>
                            </div>

                            <p className="measure">{threebasemeasure}</p>
                            <p className="damage">{threebasedamage}+{threetraindamage + threemiscdamage + strData.damage}</p>
                            <p className="parry">{shieldbaseparry ? shieldbaseparry + shieldbaseparry + shieldtrainparry + shieldmiscparry : threebaseparry}</p>

                            <p className="name">{threename}</p>
                        </div>

                        <div className="weaponsquare weaponfour">
                            <p className="recovery">{this.returnZeroIfNaN(this.calculateRecovery(weaponFourRecovery + armorRecovery, foursize, false))}</p>
                            <p className="attack">{this.returnZeroIfNaN(fourtrainattack + fourmiscattack + dexData.attack + intData.attack)}</p>
                            <p className="init">{this.returnZeroIfNaN(dexData.init + wisData.init + (armorbaseinit + armortraininit + armormiscinit > 0 ? armorbaseinit + armortraininit + armormiscinit : 0) + fourmiscinit)}</p>

                            <p className="def">{dexData.defense + wisData.defense + (armorbasedef + armortrainingdef + armormiscdef > 0 ? armorbasedef + armortrainingdef + armormiscdef : 0) + (shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0)}</p>
                            <p className="encumb">{conData.encumb + wisData.encumb + (armorbaseencumb + armortrainencumb + armormiscencumb > 0 ? armorbaseencumb + armortrainencumb + armormiscencumb : 0) + (shieldmiscencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldmiscencumb + shieldtrainencumb + shieldmiscencumb : 0) + Math.floor(this.state.adjustedEncumb / 3)}</p>
                            <div className="drshell">
                                <p id="armorDr">{armordr}</p>
                            </div>

                            <p className="measure">n/a</p>
                            <p className="damage">{fourbasedamage}+{fourtraindamage + fourmiscdamage + strData.damage}</p>
                            <p className="parry">n/a</p>

                            <p className="name">{fourname}</p>
                        </div>

                        <p className="takingabreatherLocation">{20 - con < 3 ? 3 : 20 - con} seconds</p>
                        <p className="stressthresholdLocation">{stressthreshold ? stressthreshold : (int + wis) * 2}</p>
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

                        <p className="criticalLocation">{shownVitality}</p>
                        <p className="woundedLocation">{(shownVitality * .75).toFixed(0)}</p>
                        <p className="bloodiedLocation">{(shownVitality * .50).toFixed(0)}</p>
                        <p className="hurtLocation">{(shownVitality * .25).toFixed(0)}</p>
                        <p className="traumaLocation">{(shownVitality * .50).toFixed(0)}</p>
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
                        </div>
                        <div className="skillsuiteShell">
                            <div className="skillRow athletics">
                                <p className="skillcost athletics">{skillsuites[0].skillsuitebasecost + (skillsuites[0].rank * 5)}</p>
                                <p className="skillrank athletics">{skillsuites[0].rank}</p>
                            </div>
                            <div className="skillRow lore">
                                <p className="skillcost lore">{skillsuites[1].skillsuitebasecost + (skillsuites[1].rank * 5)}</p>
                                <p className="skillrank lore">{skillsuites[1].rank}</p>
                            </div>
                            <div className="skillRow streetwise">
                                <p className="skillcost streetwise">{skillsuites[2].skillsuitebasecost + (skillsuites[2].rank * 5)}</p>
                                <p className="skillrank streetwise">{skillsuites[2].rank}</p>
                            </div>
                            <div className="skillRow survival">
                                <p className="skillcost survival">{skillsuites[3].skillsuitebasecost + (skillsuites[3].rank * 5)}</p>
                                <p className="skillrank survival">{skillsuites[3].rank}</p>
                            </div>
                            <div className="skillRow tactics">
                                <p className="skillcost tactics">{skillsuites[4].skillsuitebasecost + (skillsuites[4].rank * 5)}</p>
                                <p className="skillrank tactics">{skillsuites[4].rank}</p>
                            </div>
                            <div className="skillRow trades">
                                <p className="skillcost trades">{skillsuites[5].skillsuitebasecost + (skillsuites[5].rank * 5)}</p>
                                <p className="skillrank trades">{skillsuites[5].rank}</p>
                            </div>
                            <div className="skillRow weirdcraft">
                                <p className="skillcost weirdcraft">{skillsuites[6].skillsuitebasecost + (skillsuites[6].rank * 5)}</p>
                                <p className="skillrank weirdcraft">{skillsuites[6].rank}</p>
                            </div>

                            <div className="nativeRow">
                                <p id="nativename">{nativelanguage.language}</p>
                                <p id="nativecost">{5 + (nativelanguage.rank || 0 * 2)}</p>
                                <p id="nativerank">{nativelanguage.rank ? nativelanguage.rank : Math.ceil(int / 2)}</p>
                            </div>
                        </div>
                        <ViewSkillList stylings={{ top: '294px', left: '20px', width: '251px' }} listArray={skillone} />
                        <ViewSkillList stylings={{ top: '42px', left: '272px', width: '273px' }} listArray={skilltwo} />
                        <ViewSkillList stylings={{ top: '42px', left: '547px', width: '250px' }} listArray={skillthree} />

                        <p className="copperLocation">{copper}</p>
                        <p className="silverLocation">{silver}</p>
                        <p className="goldLocation">{gold}</p>
                        <p className="platiniumLocation">{platinium}</p>
                        <ViewPairList stylings={{ top: '379px', left: '20px', width: '201px' }} listArray={gearone} />
                        <ViewPairList stylings={{ top: '379px', left: '221px', width: '199px' }} listArray={geartwo} />
                        <ViewPairList stylings={{ top: '379px', left: '422px', width: '198px' }} listArray={gearthree} />
                        <ViewPairList stylings={{ top: '379px', left: '619px', width: '175px' }} listArray={gearfour} />
                        <p className="shownGearCarryLocation">{shownGearCarry}</p>
                        <p className="strCarryLocation">{shownCarry}</p>

                        <p className="attackLocation"><strong>{dexData.attack + intData.attack}</strong> = {dexData.attack} + {intData.attack}</p>
                        <p className="defenseLocation"><strong>{dexData.defense + wisData.defense}</strong> = {dexData.defense} + {wisData.defense} </p>
                        <p className="initLocation"><strong>{dexData.init + wisData.init}</strong> = {dexData.init} + {wisData.init}</p>
                        <p className="strDamageLocation"><strong>{strData.damage}</strong></p>
                        <p className="encumbLocation"><strong>{conData.encumb + wisData.encumb}</strong> = {conData.encumb} + {wisData.encumb}</p>

                        <p className="generalnotesLocation">{generalnotes}</p>

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

                        <p className="armormiscdefLocation">{armormiscdef}</p>
                        <p className="armormiscencumbLocation">{armormiscencumb}</p>
                        <p className="armormiscrecoveryLocation">{armormiscrecovery}</p>
                        <p className="armormiscinitLocation">{armormiscinit}</p>

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

                        <p className="shieldmiscdefLocation">{shieldmiscdef}</p>
                        <p className="shieldmiscparryLocation">{shieldmiscparry}</p>
                        <p className="shieldmiscencumbLocation">{shieldmiscencumb}</p>
                        <p className="shieldmiscbreakLocation">{shieldmiscbreak}</p>

                        <p className="shieldtotaldefLocation">{shieldbasedef + shieldtraindef + shieldmiscdef > 0 ? shieldbasedef + shieldtraindef + shieldmiscdef : 0}</p>
                        <p className="shieldtotalparryLocation">{this.returnZeroIfNaN(shieldbaseparry + shieldtrainparry + shieldmiscparry)}</p>
                        <p className="shieldtotalencumbLocation">{shieldmiscencumb + shieldtrainencumb + shieldmiscencumb > 0 ? shieldmiscencumb + shieldtrainencumb + shieldmiscencumb : 0}</p>
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

                            <p className="miscattackLocation">{onemiscattack}</p>
                            <p className="miscrecoveryLocation">{onemiscrecovery}</p>
                            <p className="miscparryLocation">{onemiscparry}</p>
                            <p className="miscdamageLocation">{onemiscdamage}</p>
                            <p className="miscinitLocation">{onemiscinit}</p>

                            <p className="totalattackLocation">{this.returnZeroIfNaN(onetrainattack + onemiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponOneRecovery)}</p>
                            <p className="totalparryLocation">{this.returnZeroIfNaN(onetrainparry + onemiscparry)}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(onetraindamage + onemiscdamage)}</p>
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

                            <p className="miscattackLocation">{twomiscattack}</p>
                            <p className="miscrecoveryLocation">{twomiscrecovery}</p>
                            <p className="miscparryLocation">{twomiscparry}</p>
                            <p className="miscdamageLocation">{twomiscdamage}</p>
                            <p className="miscinitLocation">{twomiscinit}</p>

                            <p className="totalattackLocation">{this.returnZeroIfNaN(twotrainattack + twomiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponTwoRecovery)}</p>
                            <p className="totalparryLocation">{this.returnZeroIfNaN(twotrainparry + twomiscparry)}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(twotraindamage + twomiscdamage)}</p>
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

                            <p className="miscattackLocation">{threemiscattack}</p>
                            <p className="miscrecoveryLocation">{threemiscrecovery}</p>
                            <p className="miscparryLocation">{threemiscparry}</p>
                            <p className="miscdamageLocation">{threemiscdamage}</p>
                            <p className="miscinitLocation">{threemiscinit}</p>

                            <p className="totalattackLocation">{this.returnZeroIfNaN(threetrainattack + threemiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(weaponThreeRecovery)}</p>
                            <p className="totalparryLocation">{this.returnZeroIfNaN(threetrainparry + threemiscparry)}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(threetraindamage + threemiscdamage)}</p>
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

                            <p className="miscattackLocation">{fourmiscattack}</p>
                            <p className="miscrecoveryLocation">{fourmiscrecovery}</p>
                            <p className="miscinitLocation initFour">{fourmiscinit}</p>
                            <p className="miscdamageLocation">{fourmiscdamage}</p>

                            <p className="totalattackLocation">{this.returnZeroIfNaN(fourtrainattack + fourmiscattack)}</p>
                            <p className="totalrecoveryLocation">{this.returnZeroIfNaN(fourtrainrecovery + fourmiscrecovery)}</p>
                            <p className="totalinitLocation initFour">{fourmiscinit}</p>
                            <p className="totaldamageLocation">{this.returnZeroIfNaN(fourtraindamage + fourmiscdamage)}</p>
                        </div>
                    </div>
                </div>
                <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                    {/* ADD LOADING INDICATOR */}
                    <div className="left-corner-button corner-button">
                        <a href={`http://localhost:3131/api/download/${id}.pdf`} download={name + ".pdf"}><i className="fas fa-file-download fa-lg"></i></a>
                    </div>
                    <div className="right-corner-button corner-button">
                        <i onClick={changeEditStatus} className="fas fa-edit"></i>
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