import React from 'react'

export default function CharacterViewer(props) {
    let { name, id, race, primarya, secondarya, primarylevel, secondarylevel, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int, extolevel, strData, dexData, conData, intData, wisData, chaData  } = props.character
    let shownVitality = vitality ? vitality : sizemod + vitalityroll + con;
    let { downloadMode, changeEditStatus } = props
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

                    <p className="honorLocation">{honor ? honor : chaData.honor}</p>

                    <p className="takingabreatherLocation">{20 - con}</p>
                    <p className="stressthresholdLocation">{stressthreshold ? stressthreshold : (int + wis) * 2}</p>
                    <p className="favormaxLocation">{favormax}</p>
                    <p className="favorminLocation">{chaData.favor}</p>

                    <p className="criticalLocation">{shownVitality}</p>
                    <p className="woundedLocation">{(shownVitality * .75).toFixed(0)}</p>
                    <p className="bloodiedLocation">{(shownVitality * .50).toFixed(0)}</p>
                    <p className="hurtLocation">{(shownVitality * .25).toFixed(0)}</p>
                    <p className="traumaLocation">{(shownVitality * .50).toFixed(0)}</p>
                    <p className="sizemodLocation">{sizemod}</p>
                    <p className="vitalityrollLocation">{vitalityroll}</p>
                    <p className="vitalitydiceLocation">{vitalitydice}</p>
                </div>
                <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>
                <p className="strCarryLocation">{strData.carry}</p>

                <p className="attackLocation">{dexData.attack+intData.attack} = {dexData.attack} + {intData.attack}</p>
                <p className="defenseLocation">{dexData.defense+wisData.defense} = {dexData.defense} + {wisData.defense} </p>
                <p className="initLocation">{dexData.init+wisData.init} = {dexData.init} + {wisData.init}</p>
                <p className="strDamageLocation">{strData.damage}</p>
                <p className="encumbLocation">{conData.encumb+wisData.encumb} = {conData.encumb} + {wisData.encumb}</p>
                </div>
            </div>
            <div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                {/* ADD LOADING INDICATOR */}
                <a href={`http://localhost:3131/api/download/${id}.pdf`} download={name + ".pdf"}><i className="fas fa-file-download fa-lg"></i></a>
                <i onClick={changeEditStatus} className="fas fa-edit"></i>
            </div>
        </div>
    )
}