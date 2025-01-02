import React from 'react'
import './baseCombatStats.css'
import ViewSkillList from '../../pairComponents/viewSkillList'
import EditSkillList from '../../pairComponents/editSkillList'
import combatStatMods from './combatStatTables'

export default function BaseCombatFromStats({ baseCombatFromStats, editing }) {
    let { str, int, dex, wis, updateAttribute, combatskills, combatskillsuites, martialadept, updatecombatSkillSuites, updateTrained, id } = baseCombatFromStats

    let { dexAtk, dexDef, intAtk, willDef, strDam, strRec } = combatStatMods

    function statModifiers(label, hasCombatSkillSuites, modifier) {
        if (id === 'blank') {
            return (
                <div>
                    <p>{label}</p>
                    <p> </p>
                </div>
            )
        }
        return (
            <div>
                <p>{label}</p>
                <p>{hasCombatSkillSuites ? modifier : ''}</p>
            </div>
        )
    }

    let skillSuitesHTML = []
    if (!combatskillsuites) { combatskillsuites = [{}, {}, {}, {}, {}] }
    function formatSkillSuites(label, skillsuite, martialadeptPercent, skillSuiteNumber) {
        let { rank, trained } = skillsuite
        if (id === 'blank') {
            return (
                <div className="skillRow" key={`combatSkillSuite${skillSuiteNumber}`}>
                    <p>{label}</p>
                    <p className="skillcost"> </p>
                    <p className="skillrank"> </p>
                </div>
            )
        }
        if (editing && (skillSuiteNumber || skillSuiteNumber === 0)) {
            return (
                <div className="skillRow" key={`combatSkillSuite${skillSuiteNumber}`}>
                    <p>{label}</p>
                    {trained ? (
                        <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", skillSuiteNumber)}>T</div>
                    ) : (
                        <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", skillSuiteNumber)}></div>
                    )}
                    <p className="skillcost">{Math.floor((40 - int + (rank * 10)) * (1 - (martialadept * .10)))}</p>
                    {trained ? (
                        <input className="skillrank" type="number" defaultValue={rank} onChange={event => updatecombatSkillSuites(event.target.value, skillSuiteNumber)} />
                    ) : (
                        <p className="skillrank">U</p>
                    )}
                </div>
            )
        }
        return (
            <div className="skillRow" key={`combatSkillSuite${skillSuiteNumber}`}>
                <p>{label}</p>
                <p className="skillcost">{Math.floor((40 - int + (rank * 10)) * martialadeptPercent)}</p>
                <p className="skillrank">{trained ? rank : 'U'}</p>
            </div>
        )
    }
    const martialadeptPercent = 1 - (martialadept * .10)
    skillSuitesHTML.push(formatSkillSuites('Armor', combatskillsuites[0], martialadeptPercent, 0))
    skillSuitesHTML.push(formatSkillSuites('Melee', combatskillsuites[1], martialadeptPercent, 1))
    skillSuitesHTML.push(formatSkillSuites('Ranged', combatskillsuites[2], martialadeptPercent, 2))
    skillSuitesHTML.push(formatSkillSuites('Shields', combatskillsuites[3], martialadeptPercent, 3))
    skillSuitesHTML.push(formatSkillSuites('Unarmed', combatskillsuites[4], martialadeptPercent, 4))

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
                                {editing ? (
                                    <input className="skilladeptLocation" type="number" defaultValue={martialadept} onChange={event => updateAttribute(event.target.value, "martialadept")} />
                                ) : (
                                    <p className="skilladeptLocation">{martialadept}</p>
                                )}
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
                {editing ? (
                    <EditSkillList stylings={{ width: '386px', height: '167px' }} rowWidth={'193px'} limit={16} listArray={combatskills} updateFunction={updateAttribute} type={"combatskills"} skilladept={martialadept} isCombat={true} />
                ) : (
                    <ViewSkillList stylings={{ width: '386px', height: '167px' }} rowWidth={'193px'} limit={16} listArray={combatskills} skilladept={martialadept} isCombat={true} />
                )}
            </div>
        </div>
    )
}