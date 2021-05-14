import React from 'react'

export default function CharacterInfo({ characterInfo, editing }) {
    let { name, race, primarya, primarylevel, secondarya, secondarylevel, level, crp, extolevel, excurrent, drawback, updateAttribute } = characterInfo
    let plates = (
        <div>
            {/* <p className="namePlate">Character Name</p> */}
        </div>
    )

    if (editing) {
        return (
            <div>
                <input className="nameLocation" type="text" defaultValue={name} onChange={event => updateAttribute(event.target.value, "name")} />
                <input className="raceLocation" type="text" defaultValue={race} onChange={event => updateAttribute(event.target.value, "race")} />
                <input className="primaryLocation" type="text" defaultValue={primarya} onChange={event => updateAttribute(event.target.value, "primarya")} />
                <input className="primarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={primarylevel} onChange={event => updateAttribute(event.target.value, "primarylevel")} />
                <input className="secondaryLocation" type="text" defaultValue={secondarya} onChange={event => updateAttribute(event.target.value, "secondarya")} />
                <input className="secondarylevelLocation" placeholder="lvl" min="1" type="number" defaultValue={secondarylevel} onChange={event => updateAttribute(event.target.value, "secondarylevel")} />
                <input className="levelLocation" type="number" min="1" defaultValue={level} onChange={event => updateAttribute(event.target.value, "level")} />
                <input className="crpLocation" type="number" min="0" defaultValue={crp} onChange={event => updateAttribute(event.target.value, "crp")} />
                <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onChange={event => updateAttribute(event.target.value, "excurrent")} />
                <textarea className="drawbackLocation drawbacktextArea" defaultValue={drawback} onChange={event => updateAttribute(event.target.value, "drawback")} maxLength="165"></textarea>
            </div>
        )
    }

    return (
        <div>
            {plates}
            <p className="nameLocation">{name}</p>
            <p className="raceLocation">{race}</p>
            <p className="primaryLocation">{primarya}</p>
            <p className="primarylevelLocation">{primarylevel === 0 ? "" : primarylevel}</p>
            <p className="secondaryLocation">{secondarya}</p>
            <p className="secondarylevelLocation">{secondarylevel === 0 ? "" : secondarylevel}</p>
            <p className="levelLocation">{level}</p>
            <p className="crpLocation">{crp}</p>
            <p className="extolevelLocation">{extolevel}</p>
            <input className="excurrentLocation" type="number" min="0" defaultValue={excurrent} onBlur={event => this.updateAttribute(event.target.value, "excurrent")} />
            <p className="drawbackLocation">{drawback}</p>
        </div>
    )
}