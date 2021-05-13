import React from 'react'
import ViewSkillList from '../pairComponents/viewSkillList'

export default function Skills({ skillsObject }) {
    let {strData, conData, dexData, intData, wisData, chaData, skillsuites, nativelanguage, skills, skilladept, int } = skillsObject
    return (
        <div>
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
            <ViewSkillList stylings={{ top: '42px', left: '247px', width: '549px', height: '275px' }} rowWidth={'274px'} listArray={skills} skilladept={skilladept} />
        </div>
    )
}