import React from 'react'
import ViewList from './components/viewList'
import ViewPairList from './components/viewPairList'

export default function CharacterViewer(props) {
    let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, extolevel, strData, dexData, conData, intData, wisData, chaData, extrahonordice, temperament, goals, devotions, flaws, traits, reputation, contacts,
        abilitiesone, abilitiestwo, abilitiesthree, removedability, maxrange, generalnotes } = props.character
    let shownVitality = vitality ? vitality : sizemod + vitalityroll + con;
    let shownHonor = honor ? honor : chaData.honor 
    let { downloadMode, changeEditStatus } = props
    let left = calculateLeft(shownHonor)
    let circleFill = calculateHumanHonorDice(race, shownHonor)
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
                    <p className="strConfrontationLocation">{strData.confrontation}</p>
                    <p className="dexLocation">{dex}</p>
                    <p className="dexConfrontationLocation">{dexData.confrontation}</p>
                    <p className="conLocation">{con}</p>
                    <p className="conConfrontationLocation">{conData.confrontation}</p>
                    <p className="intLocation">{int}</p>
                    <p className="intConfrontationLocation">{intData.confrontation}</p>
                    <p className="wisLocation">{wis}</p>
                    <p className="wisConfrontationLocation">{wisData.confrontation}</p>
                    <p className="chaLocation">{cha}</p>
                    <p className="chaConfrontationLocation">{chaData.confrontation}</p>

                    <p className="honorLocation">{shownHonor}</p>
                    <p className="extrahonordiceLocation">{extrahonordice}</p>
                    <div className="circle" style={{ left }}>{circleFill}</div>
                    <p className="temperamentLocation">{temperament}</p>
                    <ViewList stylings={{top: '392px', left: '20px', width: '224px'}} listArray={goals}/>
                    <ViewPairList stylings={{top: '476px', left: '20px', width: '224px'}} listArray={devotions}/>
                    <ViewPairList stylings={{top: '559px', left: '20px', width: '224px'}} listArray={flaws}/>
                    <ViewPairList stylings={{top: '349px', left: '246px', width: '200px'}} listArray={traits}/>
                    <ViewList stylings={{top: '642px', left: '107px', width: '340px'}} listArray={reputation}/>
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
                    <p className="strCarryLocation">{strData.carry}</p>

                    <p className="attackLocation">{dexData.attack + intData.attack} = {dexData.attack} + {intData.attack}</p>
                    <p className="defenseLocation">{dexData.defense + wisData.defense} = {dexData.defense} + {wisData.defense} </p>
                    <p className="initLocation">{dexData.init + wisData.init} = {dexData.init} + {wisData.init}</p>
                    <p className="strDamageLocation">{strData.damage}</p>
                    <p className="encumbLocation">{conData.encumb + wisData.encumb} = {conData.encumb} + {wisData.encumb}</p>

                    <p className="generalnotesLocation">{generalnotes}</p>
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
    } else if (honor >= 21 && honor <= 25){
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