import React from 'react'
import "./plates.css"

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
        <div>
            {plates}
            <p className="nameLocation">{name ? name : ' '}</p>
            <p className="raceLocation">{race ? race : ' '}</p>
            <p className="primaryLocation">{primarya ? primarya : ' '}</p>
            <p className="secondaryLocation">{secondarya ? secondarya : ' '}</p>
            <p className="levelLocation">{level ? level : ' '}</p>
            {crplocation}
            {currentEx}
            <p className="extolevelLocation">{level ? getCrPRequirement(level) : ' '}</p>
        </div>
    )
}