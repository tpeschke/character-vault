import React from 'react'
import "./characterInfo.css"

const getCrPRequirement = (level) => {
    return 50 + (level * 3)
}

export default function CharacterInfo({ characterInfo, editing }) {
    let { name, race, primarya, primarylevel, secondarya, secondarylevel, level, crp, excurrent, drawback, updateAttribute, id } = characterInfo

    let plates = (
        <div className="plates">
            <p className="namePlate">Character Name</p>
            <p className="playerPlate">Player</p>
            <p className="playerScorePlate"></p>
            <p className="racePlate">Ancestry</p>
            <p className="archetypePlate">Class/Subclass</p>
            <p className="archetypeSlashPlate">/</p>
            <p className="levelPlate">LvL</p>
            <p className="crpTitle">CrP:</p>
            <p className="crpPlate">Unspent</p>
            <p className="currentExPlate">Spent</p>
            <p className="nextExPlate">Spent To Lvl</p>
            <div className="bonfireLogo"></div>
        </div>
    )

    if (editing) {
        return (
            <div>
                {plates}
                <input className="nameLocation" type="text" defaultValue={name} onChange={event => updateAttribute(event.target.value, "name")} />
                <input className="raceLocation" type="text" defaultValue={race} onChange={event => updateAttribute(event.target.value, "race")} />
                <input className="primaryLocation" type="text" defaultValue={primarya} onChange={event => updateAttribute(event.target.value, "primarya")} />
                <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => updateAttribute(event.target.value, "secondarya")} />
                <input className="levelLocation" type="number" min="1" defaultValue={level} onChange={event => updateAttribute(event.target.value, "level")} />
                <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
                <p className="extolevelLocation"> </p>
                <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onChange={event => updateAttribute(event.target.value, "excurrent")} />
            </div>
        )
    }

    let currentEx = <p className="excurrentLocation"> </p>
    if (id !== 'blank') {
        currentEx = <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onBlur={event => updateAttribute(event.target.value, "excurrent")} />
    }
    let crplocation = <p className="crpLocation">{crp ? crp : ' '}</p>
    if (id !== 'blank') {
        crplocation = <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
    }

    return (
        <div className='info-shell'>
            <div>
                <div className='info-row'>
                    {infoPairs('Character Name', 'nameLocation', name)}
                    {infoPairs('Player', 'playerLocation', null)}
                </div>
                <div className='info-row'>
                    {infoPairs('Ancestry', 'raceLocation', race)}
                    <div className='info-row'>
                        <strong>Class/Subclass</strong>
                        <p className="primaryLocation">{primarya ? primarya : ' '}</p>
                        <p>/</p>
                        <p className="secondaryLocation">{secondarya ? secondarya : ' '}</p>
                    </div>
                    {infoPairs('Lvl', 'levelLocation', level)}
                </div>
                <div className='info-row'>
                    <strong className='ultra-strong'>CrP</strong>
                    {infoPairsEdit('Unspent', 'crpLocation', crp, updateAttribute, 'crp')}
                    {infoPairsEdit('Unspent', 'excurrentLocation', excurrent, updateAttribute, 'excurrent')}
                    {infoPairs('Spent to Next LvL', 'extolevelLocation', getCrPRequirement(level))}
                </div>
            </div>
            <div className="bonfireLogo"></div>
        </div>
    )
}

function infoPairs(title, className, info) {
    return (
        <div className='title-info-pair'><strong>{title}</strong><p className={className}>{info ? info : ' '}</p></div>
    )
}

function infoPairsEdit(title, className, info, callback, attribute) {
    return (
        <div className='title-info-pair'><strong>{title}</strong><input className={className} type="number" min="0" defaultValue={info} onChange={event => callback(event.target.value, attribute)} /></div>
    )
}