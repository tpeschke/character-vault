import React from 'react'

export default function CharacterViewer(props) {
    let { name, id, race, primarya, secondarya, level, cha, con, crp, dex, drawback, excurrent, favormax, honor, sizemod, str, stressthreshold, vitality, vitalitydice, vitalityroll, wis, int  } = props.character
    let { downloadMode, changeEditStatus } = props
    return (
        <div>
            <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
                <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                    <p className="nameLocation">{name}</p>
                    <p className="raceLocation">{race}</p>
                    <p className="primaryLocation">{primarya}</p>
                    <p className="secondaryLocation">{secondarya}</p>
                    <p className="levelLocation">{level}</p>
                    <p className="crpLocation">{crp}</p>
                    <p className="excurrentLocation">{excurrent}</p>
                    <p className="drawbackLocation">{drawback}</p>

                    <p className="strLocation">{str}</p>
                    <p className="dexLocation">{dex}</p>
                    <p className="conLocation">{con}</p>
                    <p className="intLocation">{int}</p>
                    <p className="wisLocation">{wis}</p>
                    <p className="chaLocation">{cha}</p>

                    <p className="honorLocation">{honor}</p>

                    <p className="stressthresholdLocation">{stressthreshold ? stressthreshold : (int + wis) * 2}</p>
                    <p className="favormaxLocation">{favormax}</p>
                </div>
                <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>

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