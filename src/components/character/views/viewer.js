import React, { Component } from 'react'
import ViewList from './components/viewList'
import ViewPairList from './components/viewPairList'

export default class CharacterViewer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            character: props.character,
            adjustedEncumb: this.reduceAndCleanGearArrays(props.character.gearone, props.character.geartwo, props.character.gearthree, props.character.gearfour)
        }
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
                    if (currentBit[1] === 'S') {
                        totalCarry += +currentBit[0]
                    } else if (currentBit[1] === 'M') {
                        totalCarry += (+currentBit[0] * 3)
                    } else if (currentBit[1] === 'L') {
                        totalCarry += (+currentBit[0] * 9)
                    }
                    currentBit = ''
                } else if (!isNaN(+character)) {
                    currentBit = currentBit + character
                }
            })
        }

        gearone.forEach(cleanArray)
        geartwo.forEach(cleanArray)
        gearthree.forEach(cleanArray)
        gearfour.forEach(cleanArray)

        return totalCarry
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

    render() {
        let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, extolevel, strData, dexData, conData, intData, wisData, chaData, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
            abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes, copper, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, crawl, walk, jog, run, sprint, onetrainattack, onetrainparry, onetrainrecovery, onetraindamage, onemiscattack, onemiscparry, onemiscrecovery, onemiscdamage, onemiscinit, onename, onebasedamage, onebaserecovery, onebaseparry, onebasemeasure, onetype, onebonus, onetraits, onesize } = this.state.character
            , shownVitality = vitality ? vitality : sizemod + vitalityroll + con
            , shownHonor = honor ? honor : chaData.honor
            , shownGearCarry = this.convertFromEncumbToCarry(this.state.adjustedEncumb)
            , shownCarry = this.convertFromEncumbToCarry(strData.carry)
            , { downloadMode, changeEditStatus } = this.props
            , left = calculateLeft(shownHonor)
            , circleFill = calculateHumanHonorDice(race, shownHonor)

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
                        <ViewList stylings={{ top: '392px', left: '20px', width: '224px' }} listArray={goals} />
                        <ViewPairList stylings={{ top: '476px', left: '20px', width: '224px' }} listArray={devotions} />
                        <ViewPairList stylings={{ top: '559px', left: '20px', width: '224px' }} listArray={flaws} />
                        <ViewPairList stylings={{ top: '349px', left: '246px', width: '200px' }} listArray={traits} />
                        <ViewList stylings={{ top: '642px', left: '107px', width: '340px' }} listArray={reputation} />
                        <p className="contactsLocation">{contacts}</p>

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
                        <p className="copperLocation">{copper}</p>
                        <p className="silverLocation">{silver}</p>
                        <p className="goldLocation">{gold}</p>
                        <p className="platiniumLocation">{platinium}</p>
                        <ViewPairList stylings={{ top: '367px', left: '20px', width: '201px' }} listArray={gearone} />
                        <ViewPairList stylings={{ top: '367px', left: '221px', width: '199px' }} listArray={geartwo} />
                        <ViewPairList stylings={{ top: '367px', left: '422px', width: '198px' }} listArray={gearthree} />
                        <ViewPairList stylings={{ top: '367px', left: '619px', width: '175px' }} listArray={gearfour} />
                        <p className="shownGearCarryLocation">{shownGearCarry}</p>
                        <p className="strCarryLocation">{shownCarry}</p>

                        <p className="attackLocation"><strong>{dexData.attack + intData.attack}</strong> = {dexData.attack} + {intData.attack}</p>
                        <p className="defenseLocation"><strong>{dexData.defense + wisData.defense}</strong> = {dexData.defense} + {wisData.defense} </p>
                        <p className="initLocation"><strong>{dexData.init + wisData.init}</strong> = {dexData.init} + {wisData.init}</p>
                        <p className="strDamageLocation"><strong>{strData.damage}</strong></p>
                        <p className="encumbLocation"><strong>{conData.encumb + wisData.encumb}</strong> = {conData.encumb} + {wisData.encumb}</p>

                        <p className="generalnotesLocation">{generalnotes}</p>

                        <div className="weaponProfileOne">
                            <p className="weaponnameLocation">{onename}</p>
                            <p className="basedamageLocation">{onebasedamage}</p>
                            <p className="baserecoveryLocation">{onebaserecovery}</p>
                            <p className="baseparryLocation">{onebaseparry}</p>
                            <p className="basemeasureLocation">{onebasemeasure}</p>
                            <p className="onetypeLocation">{onetype}</p>
                            <p className="onebonusLocation">{onebonus}</p>
                            <p className="onetraitsLocation">{onetraits}</p>

                            <p className="onetrainattackLocation">{onetrainattack}</p>
                            <p className="onetrainrecoveryLocation">{onetrainrecovery}</p>
                            <p className="onetrainparryLocation">{onetrainparry}</p>
                            <p className="onetraindamageLocation">{onetraindamage}</p>
                            
                            <p className="onemiscattackLocation">{onemiscattack}</p>
                            <p className="onemiscrecoveryLocation">{onemiscrecovery}</p>
                            <p className="onemiscparryLocation">{onemiscparry}</p>
                            <p className="onemiscdamageLocation">{onemiscdamage}</p>
                            <p className="onemiscinitLocation">{onemiscinit}</p>
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
    let left = '0'
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
    if (race.toUpperCase().trim() === "HUMAN") {
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