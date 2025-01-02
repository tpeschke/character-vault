import React from 'react'
import './skills.css'
import ViewSkillList from '../../pairComponents/viewSkillList'
import EditSkillList from '../../pairComponents/editSkillList'

export default function Skills({ skillsObject, editing }) {
    let { str = 1, con = 1, dex = 1, wis = 1, cha = 1, skillsuites, nativelanguage, skills, skilladept = 1, int, updateAttribute, updateNativeLanguage, updateSkillsuites, updateTrained, id } = skillsObject

    let checkMod = {
        1: -6,
        2: -5,
        3: -4,
        4: -3,
        5: -3,
        6: -2,
        7: -2,
        8: -1,
        9: -1,
        10: 0,
        11: 1,
        12: 1,
        13: 2,
        14: 2,
        15: 3,
        16: 3,
        17: 3,
        18: 4,
        19: 4,
        20: 4,
        21: 5,
        22: 5,
        23: 6
    }

    function skillCheckMods(label, skillsuites, mod) {
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
                <p>{skillsuites ? mod : ''}</p>
            </div>
        )
    }

    let skillSuitesHTML = []
    if (!skillsuites) { skillsuites = [{}, {}, {}, {}, {}, {}, {}] }
    function formatSkillSuites(label, skillsuite, skillAdeptPercent, stat1, stat2, skillSuiteNumber) {
        let { rank, trained } = skillsuite
        const mod1 = checkMod[stat1]
        const mod2 = checkMod[stat2]
        if (id === 'blank') {
            return (
                <div className="skillRow">
                    <p>{label}</p>
                    <p className="skillcost"> </p>
                    <p className="skillrank"> </p>
                    <p className="skillmod"> </p>
                </div>
            )
        }
        if (editing && (skillSuiteNumber || skillSuiteNumber === 0)) {
            return (
                <div className="skillRow">
                    <p>{label}</p>
                    {trained ? (
                        <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(false, "skillsuites", skillSuiteNumber)}>T</div>
                    ) : (
                        <div className="anointedDiv skillsUntrainedDiv" onClick={_ => updateTrained(true, "skillsuites", skillSuiteNumber)}></div>
                    )}
                    <p className="skillcost">{Math.floor((30 - int + (rank * 10)) * skillAdeptPercent)}</p>
                    {trained ? (
                        <input className="skillrank" type="number" defaultValue={rank} onChange={event => updateSkillsuites(event.target.value, skillSuiteNumber)} />
                    ) : (
                        <p className="skillrank">U</p>
                    )}
                    <p className="skillmod">{Math.min(mod1, mod2)}</p>
                </div>
            )
        }
        return (
            <div className="skillRow">
                <p>{label}</p>
                <p className="skillcost">{Math.floor((30 - int + (rank * 10)) * skillAdeptPercent)}</p>
                <p className="skillrank">{trained ? rank : 'U'}</p>
                <p className="skillmod">{Math.min(mod1, mod2)}</p>
            </div>
        )
    }

    const skillAdeptPercent = 1 - (skilladept * .10)
    skillSuitesHTML.push(formatSkillSuites('Athletics', skillsuites[0], skillAdeptPercent, str, con, 0))
    skillSuitesHTML.push(formatSkillSuites('Lore', skillsuites[1], skillAdeptPercent, int, int, 1))
    skillSuitesHTML.push(formatSkillSuites('Streetwise', skillsuites[2], skillAdeptPercent, wis, cha, 2))
    skillSuitesHTML.push(formatSkillSuites('Survival', skillsuites[3], skillAdeptPercent, con, wis, 3))
    skillSuitesHTML.push(formatSkillSuites('Strategy', skillsuites[4], skillAdeptPercent, wis, cha, 4))
    skillSuitesHTML.push(formatSkillSuites('Trades', skillsuites[5], skillAdeptPercent, dex, int, 5))
    skillSuitesHTML.push(formatSkillSuites('Weirdcraft', skillsuites[6], skillAdeptPercent, int, wis, 6))

    let nativeLanguageHTML = editing ? (
        <div className="skillRow">
            <input id="nativename" type="text" defaultValue={nativelanguage.language} onChange={event => updateNativeLanguage(event.target.value, 'language')} />
            <p id="nativecost">{5 + (nativelanguage.rank || int * 2) - skilladept}</p>
            <input id="nativerank" type="number" placeholder={int} defaultValue={nativelanguage.rank} onChange={event => updateNativeLanguage(event.target.value, 'rank')} />
            <p id="nativemod"> </p>
        </div>
    ) : id === 'blank' ? (
        <div className="skillRow">
            <p className="navLang"> </p>
            <p className="skillcost"> </p>
            <p className="skillrank"> </p>
            <p className="skillmod"> </p>
        </div>
    ) : (
        <div className="skillRow">
            <p className="navLang">{nativelanguage.language}</p>
            <p className="skillcost">{5 + (nativelanguage.rank || int * 2) - skilladept}</p>
            <p className="skillrank">{nativelanguage.rank ? nativelanguage.rank : int}</p>
            <p className="skillmod">{Math.max(checkMod[int], checkMod[wis])}</p>
        </div>
    )

    return (
        <div className='skillOuterShell'>
            <h1>Skills</h1>
            <div className='skillShell'>
                <div className='skillLeftColumn'>
                    <h2>Check Mods & Skill Adepts</h2>
                    <div className="skillDiscount">
                        <div className="skillMods">
                            {skillCheckMods('Str', skillsuites, checkMod[str])}
                            {skillCheckMods('Dex', skillsuites, checkMod[dex])}
                            {skillCheckMods('Con', skillsuites, checkMod[con])}
                            {skillCheckMods('Int', skillsuites, checkMod[int])}
                            {skillCheckMods('Will', skillsuites, checkMod[wis])}
                            {skillCheckMods('Pre', skillsuites, checkMod[cha])}
                        </div>
                        <div className="skillAdept">
                            <p>Skill Adept(s)</p>
                            {id === 'blank' ? (
                                <p className="skilladeptLocation"> </p>
                            ) : editing ? (
                                <input className="skilladeptLocation" type="number" defaultValue={skilladept} onChange={event => updateAttribute(event.target.value, "skilladept")} />
                            ) : (
                                <p className="skilladeptLocation">{skilladept}</p>
                            )}
                        </div>
                    </div>
                    <div className="skillsuiteShell">
                        <div className="skillRow">
                            <h2>Skill Suites</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        {skillSuitesHTML}
                    </div>
                    <div className="skillsuiteShell">
                        <div className="skillRow">
                            <h2>Native Lang.</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        {nativeLanguageHTML}
                    </div>
                </div>
                <div className='skillRightColumn'>
                    <div className="skillRow skillRowHeaderShell">
                        <div className="skillRowHeader">
                            <h2>Skill</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                        <div className="skillRowHeader">
                            <h2>Skill</h2>
                            <h2>Cost</h2>
                            <h2>Rank</h2>
                            <h2>Mod</h2>
                        </div>
                    </div>
                    {editing ? (
                        <EditSkillList stylings={{ width: '513.22px', height: '255px' }} rowWidth={'50%'} limit={26} listArray={skills} updateFunction={updateAttribute} type={"skills"} skilladept={skilladept} />
                    ) : (
                        <ViewSkillList stylings={{ width: '513.22px', height: '255px' }} rowWidth={'50%'} limit={26} listArray={skills} skilladept={skilladept} />
                    )}
                </div>
            </div>
        </div>
    )
}