import React from 'react'
import ViewSkillList from '../pairComponents/viewSkillList'

export default function BaseCombatFromStats({ baseCombatFromStats, editing }) {
    let { strData, dexData, intData, wisData, updateAttribute, combatSkillSuites = [{ skillsuitebasecost: 10, rank: 0 }, { skillsuitebasecost: 10, rank: 0 }, { skillsuitebasecost: 10, rank: 0 }, { skillsuitebasecost: 10, rank: 0 }, { skillsuitebasecost: 10, rank: 0 }], combatSkills = [], martialadept = 0, updateCombatSkillSuites = _ => { console.log('hello') } } = baseCombatFromStats

    if (editing) {
        if (strData && dexData && intData && wisData) {
            return (
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
                                <input className="martialadeptLocation" type="number" defaultValue={0} onChange={event => updateAttribute(event.target.value, "martialadept")} />
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
                            <p className="skillcost">{Math.floor((combatSkillSuites[0].skillsuitebasecost + (combatSkillSuites[0].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={combatSkillSuites[0].rank} onChange={event => updateCombatSkillSuites(event.target.value, 0)} />
                        </div>
                        <div className="skillRow">
                            <p>Melee</p>
                            <p className="skillcost">{Math.floor((combatSkillSuites[1].skillsuitebasecost + (combatSkillSuites[1].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={combatSkillSuites[1].rank} onChange={event => updateCombatSkillSuites(event.target.value, 1)} />
                        </div>
                        <div className="skillRow">
                            <p>Ranged</p>
                            <p className="skillcost">{Math.floor((combatSkillSuites[2].skillsuitebasecost + (combatSkillSuites[2].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={combatSkillSuites[2].rank} onChange={event => updateCombatSkillSuites(event.target.value, 2)} />
                        </div>
                        <div className="skillRow">
                            <p>Shields</p>
                            <p className="skillcost">{Math.floor((combatSkillSuites[3].skillsuitebasecost + (combatSkillSuites[3].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={combatSkillSuites[3].rank} onChange={event => updateCombatSkillSuites(event.target.value, 3)} />
                        </div>
                        <div className="skillRow">
                            <p>Unarmed</p>
                            <p className="skillcost">{Math.floor((combatSkillSuites[4].skillsuitebasecost + (combatSkillSuites[4].rank * 5)) * (1 - (martialadept * .10)))}</p>
                            <input className="skillrank" type="number" defaultValue={combatSkillSuites[4].rank} onChange={event => updateCombatSkillSuites(event.target.value, 4)} />
                        </div>
                    </div>
                </div>
            )
        }
    } else {
        if (strData && dexData && intData && wisData) {
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
                                <p className="skillcost">{Math.floor((combatSkillSuites[0].skillsuitebasecost + (combatSkillSuites[0].rank * 5)) * (1 - (martialadept * .10)))}</p>
                                <p className="skillrank">{combatSkillSuites[0].rank}</p>
                            </div>
                            <div className="skillRow">
                                <p>Melee</p>
                                <p className="skillcost">{Math.floor((combatSkillSuites[1].skillsuitebasecost + (combatSkillSuites[1].rank * 5)) * (1 - (martialadept * .10)))}</p>
                                <p className="skillrank">{combatSkillSuites[1].rank}</p>
                            </div>
                            <div className="skillRow">
                                <p>Ranged</p>
                                <p className="skillcost">{Math.floor((combatSkillSuites[2].skillsuitebasecost + (combatSkillSuites[2].rank * 5)) * (1 - (martialadept * .10)))}</p>
                                <p className="skillrank">{combatSkillSuites[2].rank}</p>
                            </div>
                            <div className="skillRow">
                                <p>Shields</p>
                                <p className="skillcost">{Math.floor((combatSkillSuites[3].skillsuitebasecost + (combatSkillSuites[3].rank * 5)) * (1 - (martialadept * .10)))}</p>
                                <p className="skillrank">{combatSkillSuites[3].rank}</p>
                            </div>
                            <div className="skillRow">
                                <p>Unarmed</p>
                                <p className="skillcost">{Math.floor((combatSkillSuites[4].skillsuitebasecost + (combatSkillSuites[4].rank * 5)) * (1 - (martialadept * .10)))}</p>
                                <p className="skillrank">{combatSkillSuites[4].rank}</p>
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
                        <ViewSkillList stylings={{ width: '386px', height: '167px' }} rowWidth={'193px'} listArray={[{skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0},{skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}, {skill: 'name', cost: 15, rank: 0}]} skilladept={martialadept} isCombat={true} />
                    </div>
                </div>
            )
        }
    }
}