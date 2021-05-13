import React from 'react'

export default function CharacterInfo({characterInfo}) {
    let { name, race, primarya, primarylevel, secondarya, secondarylevel, level, crp, extolevel, excurrent, drawback } = characterInfo
    return (
        <div>
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