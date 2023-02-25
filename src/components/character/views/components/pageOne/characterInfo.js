import React from 'react'
import "./plates.css"

export default function CharacterInfo({ characterInfo, editing }) {
    let { name, race, primarya, primarylevel, secondarya, secondarylevel, level, crp, excurrent, drawback, updateAttribute, id } = characterInfo

    let plates = (
        <div className="plates">
            <p className="namePlate">Character Name</p>
            <p className="playerPlate">Player</p>
            <p className="playerScorePlate"></p>
            <p className="racePlate">Race</p>
            <p className="archetypePlate">Archetypes</p>
            <p className="archetypeSlashPlate">/</p>
            <p className="levelPlate">Act. LvL</p>
            <p className="crpTitle">CrP:</p>
            <p className="crpPlate">Unspent</p>
            <p className="currentExPlate">Spent</p>
            <p className="nextExPlate">Spent To Lvl</p>
            <p className="primaryDrawbackPlate">Primary Drawback</p>
            <p className="drawbackFirstScorePlate"></p>
            <p className="drawbackSecondScorePlate"></p>
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
                <input className="primarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={primarylevel} onChange={event => updateAttribute(event.target.value, "primarylevel")} />
                <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => updateAttribute(event.target.value, "secondarya")} />
                <input className="secondarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={secondarylevel} onChange={event => updateAttribute(event.target.value, "secondarylevel")} />
                <input className="levelLocation" type="number" min="1" defaultValue={level} onChange={event => updateAttribute(event.target.value, "level")} />
                <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
                <p className="extolevelLocation"> </p>
                <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onChange={event => updateAttribute(event.target.value, "excurrent")} />
                <textarea className="drawbackLocation drawbacktextArea" defaultValue={drawback} onChange={event => updateAttribute(event.target.value, "drawback")} maxLength="165"></textarea>
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
            <p className="primarylevelLocation">{primarylevel === 0 ? "" : primarylevel}</p>
            <p className="secondaryLocation">{secondarya ? secondarya : ' '}</p>
            <p className="secondarylevelLocation">{secondarylevel === 0 ? "" : secondarylevel}</p>
            <p className="levelLocation">{level ? level : ' '}</p>
            {crplocation}
            {currentEx}
            <p className="extolevelLocation">{level ? level * 50 : ' '}</p>
            <p className="drawbackLocation">{drawback}</p>
        </div>
    )
}