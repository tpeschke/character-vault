import React from 'react'
import ViewSkillList from '../pairComponents/viewSkillList'
import EditSkillList from '../pairComponents/editSkillList'

export default function BaseCombatFromStats({ baseCombatFromStats, editing }) {
    let { str, int, dex, wis, updateAttribute, combatskills, combatskillsuites, martialadept, updatecombatSkillSuites, updateTrained } = baseCombatFromStats

    let dexAtk = {
        1: -3,
        2: -2,
        3: -2,
        4: -2,
        5: -2,
        6: -1,
        7: -1,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
        15: 2,
        16: 2,
        17: 2,
        18: 2,
        19: 2,
        20: 3,
        21: 3,
        22: 3,
        23: 4
    }


    let dexDef = {
        1: -3,
        2: -2,
        3: -2,
        4: -2,
        5: -2,
        6: -1,
        7: -1,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
        15: 2,
        16: 2,
        17: 2,
        18: 2,
        19: 2,
        20: 3,
        21: 3,
        22: 3,
        23: 4
    }

    let dexInit = {
        1: 4,
        2: 3,
        3: 2,
        4: 2,
        5: 1,
        6: 1,
        7: 1,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: -1,
        17: -1,
        18: -1,
        19: -2,
        20: -3,
        21: -3,
        22: -4,
        23: -4
    }

    let intAtk = {
        1: -4,
        2: -3,
        3: -2,
        4: -2,
        5: -2,
        6: -1,
        7: -1,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 1,
        14: 1,
        15: 2,
        16: 2,
        17: 3,
        18: 3,
        19: 3,
        20: 4,
        21: 4,
        22: 5,
        23: 5
    }

    let willDef = {
        1: -4,
        2: -3,
        3: -3,
        4: -3,
        5: -2,
        6: -2,
        7: -1,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 1,
        14: 2,
        15: 2,
        16: 2,
        17: 3,
        18: 3,
        19: 3,
        20: 4,
        21: 4,
        22: 5,
        23: 5
    }

    let willInit = {
        1: 5,
        2: 4,
        3: 3,
        4: 3,
        5: 2,
        6: 2,
        7: 1,
        8: 1,
        9: 1,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: -1,
        16: -1,
        17: -2,
        18: -2,
        19: -3,
        20: -4,
        21: -4,
        22: -5,
        23: -5
    }


    let strDam = {
        1: -4,
        2: -3,
        3: -3,
        4: -3,
        5: -2,
        6: -2,
        7: -1,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 1,
        14: 2,
        15: 2,
        16: 2,
        17: 3,
        18: 3,
        19: 3,
        20: 4,
        21: 4,
        22: 4,
        23: 5
    }

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
                                    <p>Init</p>
                                    <p>{combatskillsuites ? dexInit[dex] + willInit[wis] : ''}</p>
                                </div>
                                <div>
                                    <p>Dam</p>
                                    <p>{combatskillsuites ? strDam[str] : ''}</p>
                                </div>
                            </div>
                            <div className="martialadept combatAdept">
                                <p>Martial Adept(s)</p>
                                <input className="skilladeptLocation" type="number" defaultValue={martialadept} onChange={event => updateAttribute(event.target.value, "martialadept")} />
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
                            <p className="skillcost">{Math.floor((combatskillsuites[0].skillsuitebasecost + (combatskillsuites[0].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[0].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[0].rank} onChange={event => updatecombatSkillSuites(event.target.value, 0)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Melee</p>
                            {combatskillsuites[1].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 1)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 1)}></div>}
                            <p className="skillcost">{Math.floor((combatskillsuites[1].skillsuitebasecost + (combatskillsuites[1].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[1].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[1].rank} onChange={event => updatecombatSkillSuites(event.target.value, 1)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Ranged</p>
                            {combatskillsuites[2].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 2)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 2)}></div>}
                            <p className="skillcost">{Math.floor((combatskillsuites[2].skillsuitebasecost + (combatskillsuites[2].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[2].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[2].rank} onChange={event => updatecombatSkillSuites(event.target.value, 2)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Shields</p>
                            {combatskillsuites[3].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 3)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 3)}></div>}
                            <p className="skillcost">{Math.floor((combatskillsuites[3].skillsuitebasecost + (combatskillsuites[3].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            {combatskillsuites[3].trained ? <input className="skillrank" type="number" defaultValue={combatskillsuites[3].rank} onChange={event => updatecombatSkillSuites(event.target.value, 3)} /> : <p className="skillrank">U</p>}
                        </div>
                        <div className="skillRow">
                            <p>Unarmed</p>
                            {combatskillsuites[4].trained ? <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "combatskillsuites", 4)}>T</div> : <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "combatskillsuites", 4)}></div>}
                            <p className="skillcost">{Math.floor((combatskillsuites[4].skillsuitebasecost + (combatskillsuites[4].rank * 5)) * (1 - (martialadept * .10)))}</p>
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


    if (combatskillsuites) {
        armor = (
            <div className="skillRow">
                <p>Armor</p>
                <p className="skillcost">{Math.floor((combatskillsuites[0].skillsuitebasecost + (combatskillsuites[0].rank * 5)) * (1 - (martialadept * .10)))}</p>
                <p className="skillrank">{combatskillsuites[0].trained ? combatskillsuites[0].rank : 'U'}</p>
            </div>
        )
        melee = (
            <div className="skillRow">
                <p>Melee</p>
                <p className="skillcost">{Math.floor((combatskillsuites[1].skillsuitebasecost + (combatskillsuites[1].rank * 5)) * (1 - (martialadept * .10)))}</p>
                <p className="skillrank">{combatskillsuites[1].trained ? combatskillsuites[1].rank : 'U'}</p>
            </div>
        )
        ranged = (
            <div className="skillRow">
                <p>Ranged</p>
                <p className="skillcost">{Math.floor((combatskillsuites[2].skillsuitebasecost + (combatskillsuites[2].rank * 5)) * (1 - (martialadept * .10)))}</p>
                <p className="skillrank">{combatskillsuites[2].trained ? combatskillsuites[2].rank : 'U'}</p>
            </div>
        )
        shield = (
            <div className="skillRow">
                <p>Shields</p>
                <p className="skillcost">{Math.floor((combatskillsuites[3].skillsuitebasecost + (combatskillsuites[3].rank * 5)) * (1 - (martialadept * .10)))}</p>
                <p className="skillrank">{combatskillsuites[3].trained ? combatskillsuites[3].rank : 'U'}</p>
            </div>
        )
        unarmed = (
            <div className="skillRow">
                <p>Unarmed</p>
                <p className="skillcost">{Math.floor((combatskillsuites[4].skillsuitebasecost + (combatskillsuites[4].rank * 5)) * (1 - (martialadept * .10)))}</p>
                <p className="skillrank">{combatskillsuites[4].trained ? combatskillsuites[4].rank : 'U'}</p>
            </div>
        )
    }
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
                                <p>Init</p>
                                <p>{combatskillsuites ? dexInit[dex] + willInit[wis] : ''}</p>
                            </div>
                            <div>
                                <p>Dam</p>
                                <p>{combatskillsuites ? strDam[str] : ''}</p>
                            </div>
                        </div>
                        <div className="martialadept combatAdept">
                            <p>Martial Adept(s)</p>
                            <p className="martialadeptLocation">{martialadept}</p>
                        </div>
                    </div>
                </div>
                <div className="combatShell combatRow">
                    <div className="skillRow">
                        <h2>Skill Suites</h2>
                        <h2>Cost</h2>
                        <h2>Rank</h2>
                    </div>
                    {armor}
                    {melee}
                    {ranged}
                    {shield}
                    {unarmed}
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
                <ViewSkillList stylings={{ width: '386px', height: '167px' }} rowWidth={'193px'} listArray={combatskills} skilladept={martialadept} isCombat={true} />
            </div>
        </div>
    )
}