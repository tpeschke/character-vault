import React from 'react'
import './movement.css'

export default function Movement({ movement, editing }) {
    let { crawl, walk, jog, run, sprint, updateAttribute, overCarry } = movement

    if (editing) {
        return (
            <div className="movementShell">
                <h1>Movement</h1>
                <div className="movementRowsSell">
                    <div>
                        <p>Crawl</p>
                        <input className="crawlLocation" type="text" defaultValue={crawl} onChange={event => updateAttribute(event.target.value, "crawl")} />
                        <div className="lengthShell">
                            <p>∞ Seconds</p>
                            <div className={overCarry <= -15 ? 'crawlLengthLocation crawlStrike strikeThrough' : 'displayNone'}></div>
                        </div>
                    </div>
                    <div>
                        <p>Walk</p>
                        <input className="walkLocation" type="text" defaultValue={walk} onChange={event => updateAttribute(event.target.value, "walk")} />
                        <div className="lengthShell">
                            <p>∞ Seconds</p>
                            <div className={overCarry <= -12 ? 'walkLengthLocation walkStrike strikeThrough' : 'displayNone'}></div>
                        </div>
                    </div>
                    <div>
                        <p>Jog</p>
                        <input className="jogLocation" type="text" defaultValue={jog} onChange={event => updateAttribute(event.target.value, "jog")} />
                        <div className="lengthShell">
                            <p>∞ Seconds</p>
                            <div className={overCarry <= -9 ? 'jogLengthLocation jogStrike strikeThrough' : 'displayNone'}></div>
                        </div>
                    </div>
                    <div>
                        <p>Run</p>
                        <input className="runLocation" type="text" defaultValue={run} onChange={event => updateAttribute(event.target.value, "run")} />
                        <div className="lengthShell">
                            <p>10 Second Interval</p>
                            <div className={overCarry <= -6 ? 'runLengthLocation runStrike strikeThrough' : 'displayNone'}></div>
                        </div>
                    </div>
                    <div>
                        <p>Sprint</p>
                        <input className="sprintLocation" type="text" defaultValue={sprint} onChange={event => updateAttribute(event.target.value, "sprint")} />
                        <div className="lengthShell">
                            <p>5 Second Interval</p>
                            <div className={overCarry <= -3 ? 'sprintLengthLocation sprintStrike strikeThrough' : 'displayNone'}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="movementShell">
            <h1>Movement</h1>
            <div className="movementRowsSell">
                {movementCategory('Crawl', crawl, '∞ Seconds', overCarry <= -15)}
                {movementCategory('Walk', walk, '∞ Seconds', overCarry <= -12)}
                {movementCategory('Jog', jog, '∞ Seconds', overCarry <= -9)}
                {movementCategory('Run', run, '10 Second Interval', overCarry <= -6)}
                {movementCategory('Sprint', sprint, '5 Second Interval', overCarry <= -3)}
            </div>
        </div>
    )
}

function movementCategory(label, speed, intervalLabel, isStruckThrough) {
    return (<div className='movementCategory'>
        <p className='label'>{label}</p>
        <p className="sprintLocation">{speed}</p>
        <div className="lengthShell">
            <p>{intervalLabel}</p>
        </div>
        <div className={isStruckThrough ? 'strikeThrough' : 'displayNone'}></div>
    </div>)
}