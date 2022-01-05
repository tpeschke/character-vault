import React from 'react'

export default function Stats({ stats, editing }) {
    let { str, strData, dex, dexData, con, conData, int, intData, wis, wisData, cha, chaData, updateAttribute, isDownloading } = stats

    if (editing) {
        return (
            <div className="statsShell">
                <h1>Stats</h1>
                <div className="statRowsShell">
                    <div>
                        <input className="strLocation" type="number" max="20" min="1" defaultValue={str} onChange={event => updateAttribute(event.target.value, "str")} />
                        <p>Str</p>
                    </div>
                    <div>
                        <input className="dexLocation" type="number" max="20" min="1" defaultValue={dex} onChange={event => updateAttribute(event.target.value, "dex")} />
                        <p>Dex</p>
                    </div>
                    <div>
                        <input className="conLocation" type="number" max="20" min="1" defaultValue={con} onChange={event => updateAttribute(event.target.value, "con")} />
                        <p>Con</p>
                    </div>
                    <div>
                        <input className="intLocation" type="number" max="20" min="1" defaultValue={int} onChange={event => updateAttribute(event.target.value, "int")} />
                        <p>Int</p>
                    </div>
                    <div>
                        <input className="wisLocation" type="number" max="20" min="1" defaultValue={wis} onChange={event => updateAttribute(event.target.value, "wis")} />
                        <p>Will</p>
                    </div>
                    <div>
                        <input className="chaLocation" type="number" max="20" min="1" defaultValue={cha} onChange={event => updateAttribute(event.target.value, "cha")} />
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
                <div>
                    <p className="strLocation">{str}</p>
                    <p>Str</p>
                </div>
                <div>
                    <p className="dexLocation">{dex}</p>
                    <p>Dex</p>
                </div>
                <div>
                    <p className="conLocation">{con}</p>
                    <p>Con</p>
                </div>
                <div>
                    <p className="intLocation">{int}</p>
                    <p>Int</p>
                </div>
                <div>
                    <p className="wisLocation">{wis}</p>
                    <p>Will</p>
                </div>
                <div>
                    <p className="chaLocation">{cha}</p>
                    <p>Pre</p>
                </div>
            </div>
        </div>
    )
}