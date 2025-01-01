import React from 'react'
import './baseCombatStats.css'
import ViewSkillList from '../../pairComponents/viewSkillList'
import EditSkillList from '../../pairComponents/editSkillList'
import combatStatMods from './combatStatTables'

export default function BaseCombatFromStats({ baseCombatFromStats, editing }) {
    let { str, int, dex, wis, updateAttribute, combatskills, combatskillsuites, martialadept, updatecombatSkillSuites, updateTrained } = baseCombatFromStats

    let { dexAtk, dexDef, intAtk, willDef, strDam, strRec } = combatStatMods

    if (editing) {
        return (
            <div className='combatshell'>
                <div className='combatSkills'>
                    <div>
                        <h2>Combat Mods & Martial Adepts</h2>
                        <div className="skillDiscount">
                            <div className="combatMods">
                                <div>
                                    <p>Atk</p>
                                    <p>{combatskillsuites ? dexAtk[dex] + intAtk[int] : ''}</p>
                                </div>
                                <div>
                                    <p>Def</p>
                                    <p>{combatskillsuites ? dexDef[dex] + willDef[wis] : ''}</p>
                                </div>
                                <div>
                                    <p>Dam</p>
                                    <p>{combatskillsuites ? strDam[str] : ''}</p>
                                </div>
                                <div>
                                    <p>Rec</p>
                                    <p>{combatskillsuites ? strRec[str] : ''}</p>
                                </div>
                                <div className="martialadept combatAdept">
                                    <p>Martial Adept(s)</p>
                                    <input className="skilladeptLocation" type="number" defaultValue={martialadept} onChange={event => updateAttribute(event.target.value, "martialadept")} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="combatShell combatRow">
                        <div className="skillRow">
                            <h2>Skill Suites</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                        </div>
                        <div className="skillRow">
                            <p>Armor</p>
                            {combatskillsuites[0].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 0)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 0)}></div>}
                            <p className="skillcost">{Math.floor((40 - int + (combatskillsuites[0].rank * 10)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[0].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[0].rank} onChange={event => updatecombatSkillSuites(event.target.value, 0)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Melee</p>
                            {combatskillsuites[1].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 1)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 1)}></div>}
                            <p className="skillcost">{Math.floor((40 - int + (combatskillsuites[1].rank * 10)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[1].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[1].rank} onChange={event => updatecombatSkillSuites(event.target.value, 1)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Ranged</p>
                            {combatskillsuites[2].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 2)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 2)}></div>}
                            <p className="skillcost">{Math.floor((40 - int + (combatskillsuites[2].rank * 10)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[2].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[2].rank} onChange={event => updatecombatSkillSuites(event.target.value, 2)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Shields</p>
                            {combatskillsuites[3].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 3)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 3)}></div>}
                            <p className="skillcost">{Math.floor((40 - int + (combatskillsuites[3].rank * 10)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[3].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[3].rank} onChange={event => updatecombatSkillSuites(event.target.value, 3)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Unarmed</p>
                            {combatskillsuites[4].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 4)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 4)}></div>}
                            <p className="skillcost">{Math.floor((40 - int + (combatskillsuites[4].rank * 10)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[4].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[4].rank} onChange={event => updatecombatSkillSuites(event.target.value, 4)} /> : <p className="skillrank">U</p>}
                        </div>
                    </div>
                </div>
                <div className='combatAdvancedSkill'>
                    <div className="advSkillBackgroundShell">
                        <div className='combatSkillRowShell'>
                            <div className="skillRow">
                                <h2>Adv Skill</h2>
                                <h2>Cost</h2>
                                <h2>Rank</h2>
                            </div>
                            <div className="stripings combatStripings">
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                        <div className='combatSkillRowShell'>
                            <div className="skillRow">
                                <h2>Adv Skill</h2>
                                <h2>Cost</h2>
                                <h2>Rank</h2>
                            </div>
                            <div className="stripings combatStripings">
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                                <div className="stripeDiv">
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <EditSkillList stylings={{ width: '386px', height: '167px' }} rowWidth={'193px'} limit={16} listArray={combatskills} updateFunction={updateAttribute} type={"combatskills"} skilladept={martialadept} isCombat={true} />
                </div>
            </div>
        )
    }

    let armor = (
        <div className="skillRow">
            <p>Armor</p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
        </div>
    )
    let melee = (
        <div className="skillRow">
            <p>Melee</p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
        </div>
    )
    let ranged = (
        <div className="skillRow">
            <p>Ranged</p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
        </div>
    )
    let shield = (
        <div className="skillRow">
            <p>Shield</p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
        </div>
    )
    let unarmed = (
        <div className="skillRow">
            <p>Unarmed</p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
        </div>
    )

    let skillSuitesHTML = []
    if (combatskillsuites) {
        function formatSkillSuites(label, skillsuite, martialadeptPercent) {
            let { rank, trained } = skillsuite
            return (
                <div className="skillRow">
                    <p>{label}</p>
                    <p className="skillcost">{Math.floor((40 - int + (rank * 10)) * martialadeptPercent)}</p>
                    <p className="skillrank">{trained ? rank : 'U'}</p>
                </div>
            )
        }
        const martialadeptPercent = 1 - (martialadept * .10)
        skillSuitesHTML.push(formatSkillSuites('Armor', combatskillsuites[0], martialadeptPercent))
        skillSuitesHTML.push(formatSkillSuites('Melee', combatskillsuites[1], martialadeptPercent))
        skillSuitesHTML.push(formatSkillSuites('Ranged', combatskillsuites[2], martialadeptPercent))
        skillSuitesHTML.push(formatSkillSuites('Shields', combatskillsuites[3], martialadeptPercent))
        skillSuitesHTML.push(formatSkillSuites('Unarmed', combatskillsuites[4], martialadeptPercent))
    }
    
    return (
        <div className='combatshell'>
            <div className='combatSkills'>
                <div>
                    <h2>Combat Mods & Martial Adepts</h2>
                    <div>
                        <div className="combatMods">
                            {statModifiers('Atk', !!combatskillsuites, dexAtk[dex] + intAtk[int])}
                            {statModifiers('Def', !!combatskillsuites, dexDef[dex] + willDef[wis])}
                            {statModifiers('Dam', !!combatskillsuites, strDam[str])}
                            {statModifiers('Rec', !!combatskillsuites, strRec[str])}
                            <div className="combatAdept">
                                <p>Martial Adept(s)</p>
                                <p className="skilladeptLocation">{martialadept}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="combatShell combatRow">
                    <div className="skillRow">
                        <h2>Skill Suites</h2>
                        <h2>Cost</h2>
                        <h2>Rank</h2>
                    </div>
                    {skillSuitesHTML}
                </div>
            </div>
            <div className='combatAdvancedSkill'>
                <div className="skillRow skillRowHeaderShell">
                    <div className="skillRowHeader">
                        <h2>Skill</h2>
                        <h2>Cost</h2>
                        <h2>Rank</h2>
                    </div>
                    <div className="skillRowHeader">
                        <h2>Skill</h2>
                        <h2>Cost</h2>
                        <h2>Rank</h2>
                    </div>
                </div>
                <ViewSkillList stylings={{ width: '386px', height: '167px' }} rowWidth={'193px'} limit={16} listArray={combatskills} skilladept={martialadept} isCombat={true} />
            </div>
        </div>
    )
}

function statModifiers(label, hasCombatSkillSuites, modifier) {
    return (
        <div>
            <p>{label}</p>
            <p>{hasCombatSkillSuites ? modifier : ''}</p>
        </div>
    )
}