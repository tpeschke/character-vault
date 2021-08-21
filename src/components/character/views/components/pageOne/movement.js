import React from 'react'

export default function Movement({ movement, editing }) {
    let { crawl, walk, jog, run, sprint, updateAttribute, overCarry } = movement

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
            <div className={overCarry <= -15 ? 'crawlLengthLocation crawlStrike strikeThrough' : 'displayNone'}></div>

            <p className="walkLocation">{walk}</p>
            <div className={overCarry <= -12 ? 'walkLengthLocation walkStrike strikeThrough' : 'displayNone'}></div>

            <p className="jogLocation">{jog}</p>
            <div className={overCarry <= -9 ? 'jogLengthLocation jogStrike strikeThrough' : 'displayNone'}></div>

            <p className="runLocation">{run}</p>
            <div className={overCarry <= -6 ? 'runLengthLocation runStrike strikeThrough' : 'displayNone'}></div>

            <p className="sprintLocation">{sprint}</p>
            <div className={overCarry <= -3 ? 'sprintLengthLocation sprintStrike strikeThrough' : 'displayNone'}></div>
        </div>
    )
}