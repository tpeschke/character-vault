import React from 'react'
import ViewSkillList from '../pairComponents/viewSkillList'
import EditSkillList from '../pairComponents/editSkillList'

export default function BaseCombatFromStats({ baseCombatFromStats, editing }) {
    let { strData, dexData, intData, wisData, updateAttribute, combatskills, combatskillsuites, martialadept, updatecombatSkillSuites, updateTrained } = baseCombatFromStats

    if (!strData) {
        strData = { damage: 0 }
    }
    if (!dexData) {
        dexData = { attack: 0, defense: 0, init: 0 }
    }
    if (!intData) {
        intData = { attack: 0 }
    }
    if (!wisData) {
        wisData = { defense: 0, init: 0 }
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
                                    <p> </p>
                                </div>
                                <div>
                                    <p>Def</p>
                                    <p> </p>
                                </div>
                                <div>
                                    <p>Init</p>
                                    <p> </p>
                                </div>
                                <div>
                                    <p>Dam</p>
                                    <p> </p>
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
                            <div className="stripings">
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
                            <div className="stripings">
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
    } else {
        return (
            <div className='combatshell'>
                <div className='combatSkills'>
                    <div>
                        <h2>Combat Mods & Martial Adepts</h2>
                        <div className="skillDiscount">
                            <div className="combatMods">
                                <div>
                                    <p>Atk</p>
                                    <p>{dexData.attack + intData.attack}</p>
                                </div>
                                <div>
                                    <p>Def</p>
                                    <p>{dexData.defense + wisData.defense}</p>
                                </div>
                                <div>
                                    <p>Init</p>
                                    <p>{dexData.init + wisData.init}</p>
                                </div>
                                <div>
                                    <p>Dam</p>
                                    <p>{strData.damage}</p>
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
                        <div className="skillRow">
                            <p>Armor</p>
                            <p className="skillcost">{Math.floor((combatskillsuites[0].skillsuitebasecost + (combatskillsuites[0].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <p className="skillrank">{combatskillsuites[0].trained ? combatskillsuites[0].rank : 'U'}</p>
                        </div>
                        <div className="skillRow">
                            <p>Melee</p>
                            <p className="skillcost">{Math.floor((combatskillsuites[1].skillsuitebasecost + (combatskillsuites[1].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <p className="skillrank">{combatskillsuites[1].trained ? combatskillsuites[1].rank : 'U'}</p>
                        </div>
                        <div className="skillRow">
                            <p>Ranged</p>
                            <p className="skillcost">{Math.floor((combatskillsuites[2].skillsuitebasecost + (combatskillsuites[2].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <p className="skillrank">{combatskillsuites[2].trained ? combatskillsuites[2].rank : 'U'}</p>
                        </div>
                        <div className="skillRow">
                            <p>Shields</p>
                            <p className="skillcost">{Math.floor((combatskillsuites[3].skillsuitebasecost + (combatskillsuites[3].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <p className="skillrank">{combatskillsuites[3].trained ? combatskillsuites[3].rank : 'U'}</p>
                        </div>
                        <div className="skillRow">
                            <p>Unarmed</p>
                            <p className="skillcost">{Math.floor((combatskillsuites[4].skillsuitebasecost + (combatskillsuites[4].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <p className="skillrank">{combatskillsuites[4].trained ? combatskillsuites[4].rank : 'U'}</p>
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
                            <div className="stripings">
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
                            <div className="stripings">
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
}