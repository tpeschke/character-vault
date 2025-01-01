import React from 'react'
import "./characterInfo.css"

const getCrPRequirement = (level) => {
    return 50 + (level * 3)
}

export default function CharacterInfo({ characterInfo, editing }) {
    let { name, race, primarya, primarylevel, secondarya, secondarylevel, level, crp, excurrent, drawback, updateAttribute, id } = characterInfo

    let currentEx = <p className="excurrentLocation"> </p>
    if (id !== 'blank') {
        currentEx = <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onBlur={event => updateAttribute(event.target.value, "excurrent")} />
    }
    let crplocation = <p className="crpLocation">{crp ? crp : ' '}</p>
    if (id !== 'blank') {
        crplocation = <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
    }

    function infoPairs(title, className, info, updateName) {
        if (editing && updateName) {
            return (
                <div className='title-info-pair'><strong>{title}</strong><input className={className} type="text" defaultValue={info} onChange={event => updateAttribute(event.target.value, updateName)} /></div>
            )
        }
        return (
            <div className='title-info-pair'><strong>{title}</strong><p className={className}>{info ? info : ' '}</p></div>
        )
    }

    function infoPairsEdit(title, className, info, callback, attribute) {
        return (
            <div className='title-info-pair'><strong>{title}</strong><input className={className} type="number" min="0" defaultValue={info} onChange={event => callback(event.target.value, attribute)} /></div>
        )
    }

    return (
        <div className='info-shell'>
            <div>
                <div className='info-row'>
                    {infoPairs('Character Name', 'nameLocation', name, 'name')}
                    {infoPairs('Player', 'playerLocation', null)}
                </div>
                <div className='info-row'>
                    {infoPairs('Ancestry', 'raceLocation', race, 'race')}
                    <div className='info-row'>
                        <strong>Class/Subclass</strong>
                        {editing ? (
                            <>
                                <input className="primaryLocation" type="text" defaultValue={primarya} onChange={event => updateAttribute(event.target.value, 'primarya')} />
                                <p>/</p>
                                <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => updateAttribute(event.target.value, 'secondarya')} />
                            </>
                        ) : (
                            <>
                                <p className="primaryLocation">{primarya ? primarya : ' '}</p>
                                <p>/</p>
                                <p className="secondaryLocation">{secondarya ? secondarya : ' '}</p>
                            </>
                        )}
                    </div>
                    {infoPairs('Lvl', 'levelLocation', level, 'level')}
                </div>
                <div className='info-row'>
                    <strong className='ultra-strong'>CrP</strong>
                    {infoPairsEdit('Unspent', 'crpLocation', crp, updateAttribute, 'crp')}
                    {infoPairsEdit('Unspent', 'excurrentLocation', excurrent, updateAttribute, 'excurrent')}
                    {infoPairs('Spent to Next LvL', 'extolevelLocation', getCrPRequirement(level))}
                </div>
            </div >
            <div className="bonfireLogo"></div>
        </div >
    )
}