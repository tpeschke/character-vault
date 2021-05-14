import React from 'react'

export default function Movement({ movement, editing }) {
    let { crawl, walk, jog, run, modifiedRunLength, modifiedSprintLength, sprint, updateAttribute } = movement

    if (editing) {
        return (
            <div>
                <input className="crawlLocation" type="text" defaultValue={crawl} onChange={event => updateAttribute(event.target.value, "crawl")} />
                <input className="walkLocation" type="text" defaultValue={walk} onChange={event => updateAttribute(event.target.value, "walk")} />
                <input className="jogLocation" type="text" defaultValue={jog} onChange={event => updateAttribute(event.target.value, "jog")} />
                <input className="runLocation" type="text" defaultValue={run} onChange={event => updateAttribute(event.target.value, "run")} />
                <input className="sprintLocation" type="text" defaultValue={sprint} onChange={event => updateAttribute(event.target.value, "sprint")} />
            </div>
        )
    }
    return (
        <div>
            <p className="crawlLocation">{crawl}</p>
            <p className="walkLocation">{walk}</p>
            <p className="jogLocation">{jog}</p>
            <p className="runLocation">{run}</p>
            <p className="runLengthLocation">{modifiedRunLength > 0 ? modifiedRunLength : 0} seconds</p>
            <p className="sprintLocation">{sprint}</p>
            <p className="sprintLengthLocation">{modifiedSprintLength > 0 ? modifiedSprintLength : 0} seconds</p>
        </div>
    )
}