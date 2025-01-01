import React from 'react'
import './movement.css'

export default function Movement({ movement, editing }) {
    let { crawl, walk, jog, run, sprint, updateAttribute, overCarry } = movement

    function movementCategory(label, speed, intervalLabel, isStruckThrough, updateName) {
        if (editing && updateName) {
            return (
                <div className='movementCategory'>
                    <p className='label'>{label}</p>
                    <input className='speed' type="text" defaultValue={speed} onChange={event => updateAttribute(event.target.value, updateName)} />
                    <div className="lengthShell">
                        <p>{intervalLabel}</p>
                    </div>
                    <div className={isStruckThrough ? 'strikeThrough' : 'displayNone'}></div>
                </div>
            )
        }
        return (
            <div className='movementCategory'>
                <p className='label'>{label}</p>
                <p className='speed'>{speed}</p>
                <div className="lengthShell">
                    <p>{intervalLabel}</p>
                </div>
                <div className={isStruckThrough ? 'strikeThrough' : 'displayNone'}></div>
            </div>
        )
    }

    return (
        <div className="movementShell">
            <h1>Movement</h1>
            <div className="movementRowsSell">
                {movementCategory('Crawl', crawl, '∞ Seconds', overCarry <= -15, 'crawl')}
                {movementCategory('Walk', walk, '∞ Seconds', overCarry <= -12, 'walk')}
                {movementCategory('Jog', jog, '∞ Seconds', overCarry <= -9, 'jog')}
                {movementCategory('Run', run, '10 Second Interval', overCarry <= -6, 'run')}
                {movementCategory('Sprint', sprint, '5 Second Interval', overCarry <= -3, 'sprint')}
            </div>
        </div>
    )
}