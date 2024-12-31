import React from 'react'
import './stats.css'

export default function Stats({ stats, editing }) {
    let { str, dex, con, int, wis, cha, updateAttribute } = stats

    if (editing) {
        return (
            <div className="statsShell">
                <h1>Stats</h1>
                <div className="statRowsShell">
                    <div>
                        <input className="strLocation" type="number" max="23" min="1" defaultValue={str} onChange={event => updateAttribute(event.target.value, "str")} />
                        <p>Str</p>
                    </div>
                    <div>
                        <input className="dexLocation" type="number" max="23" min="1" defaultValue={dex} onChange={event => updateAttribute(event.target.value, "dex")} />
                        <p>Dex</p>
                    </div>
                    <div>
                        <input className="conLocation" type="number" max="23" min="1" defaultValue={con} onChange={event => updateAttribute(event.target.value, "con")} />
                        <p>Con</p>
                    </div>
                    <div>
                        <input className="intLocation" type="number" max="23" min="1" defaultValue={int} onChange={event => updateAttribute(event.target.value, "int")} />
                        <p>Int</p>
                    </div>
                    <div>
                        <input className="wisLocation" type="number" max="23" min="1" defaultValue={wis} onChange={event => updateAttribute(event.target.value, "wis")} />
                        <p>Will</p>
                    </div>
                    <div>
                        <input className="chaLocation" type="number" max="23" min="1" defaultValue={cha} onChange={event => updateAttribute(event.target.value, "cha")} />
                        <p>Pres</p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="statsShell">
            <h1>Stats</h1>
            <div className="statRowsShell">
                {statPairs('Str', str)}
                {statPairs('Dex', dex)}
                {statPairs('Con', con)}
                {statPairs('Int', int)}
                {statPairs('Will', wis)}
                {statPairs('Pre', cha)}
            </div>
        </div>
    )
}

function statPairs (stat, statNumber) {
    return (
        <div>
        <p>{statNumber}</p>
        <p>{stat}</p>
    </div>
    )
}