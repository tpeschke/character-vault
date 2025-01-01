import React from 'react'
import './stats.css'

export default function Stats({ stats, editing }) {
    let { str, dex, con, int, wis, cha, updateAttribute } = stats

    function statPairs(stat, statNumber, updateName) {
        if (editing && updateName) {
            return (
                <div>
                    <input type="number" max="23" min="1" defaultValue={statNumber} onChange={event => updateAttribute(event.target.value, updateName)} />
                    <p>{stat}</p>
                </div>
            )
        }
        return (
            <div>
                <p>{statNumber}</p>
                <p>{stat}</p>
            </div>
        )
    }

    return (
        <div className="statsShell">
            <h1>Stats</h1>
            <div className="statRowsShell">
                {statPairs('Str', str, 'str')}
                {statPairs('Dex', dex, 'dex')}
                {statPairs('Con', con, 'con')}
                {statPairs('Int', int, 'int')}
                {statPairs('Will', wis, 'wis')}
                {statPairs('Pre', cha, 'cha')}
            </div>
        </div>
    )
}