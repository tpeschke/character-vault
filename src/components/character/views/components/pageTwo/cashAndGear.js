import React from 'react'
import EditPairList from '../pairComponents/editPairList'

export default function Skills({ cashAndGear, editing }) {
    let { copper, updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, shownGearCarry, shownCarry, isDownloading } = cashAndGear

    if (editing) {
        return (
            <div className="cashAndGearShell">
                <h1>Gear & Loot</h1>
                <div className="cashShell">
                    <div>
                        <p>CC</p>
                        <input className="cashIndividual" type="text" defaultValue={copper} onBlur={event => updateAttribute(event.target.value, "copper")} />
                    </div>
                    <div>
                        <p>SC</p>
                        <input className="cashIndividual" type="text" defaultValue={silver} onBlur={event => updateAttribute(event.target.value, "silver")} />
                    </div>
                    <div>
                        <p>GC</p>
                        <input className="cashIndividual" type="text" defaultValue={gold} onBlur={event => updateAttribute(event.target.value, "gold")} />
                    </div>
                    <div>
                        <p>PC</p>
                        <input className="cashIndividual" type="text" defaultValue={platinium} onBlur={event => updateAttribute(event.target.value, "platinium")} />
                    </div>
                </div>
                <div className="gearColumns">
                    <div className="gearColumn">
                        <div className="gearHeaderShell">
                            <h2>Item</h2>
                            <h2>Size</h2>
                        </div>
                        <EditPairList stylings={{ width: '194px' }} listArray={gearone} limit={7} updateFunction={updateAttribute} type={"gearone"} />
                    </div>
                    <div className="gearColumn">
                        <div className="gearHeaderShell">
                            <h2>Item</h2>
                            <h2>Size</h2>
                        </div>
                        <EditPairList stylings={{ width: '194px' }} listArray={geartwo} limit={7} updateFunction={updateAttribute} type={"geartwo"} />
                    </div>
                    <div className="gearColumn">
                        <div className="gearHeaderShell">
                            <h2>Item</h2>
                            <h2>Size</h2>
                        </div>
                        <EditPairList stylings={{ width: '194px' }} listArray={gearthree} limit={7} updateFunction={updateAttribute} type={"gearthree"} />
                    </div>
                    <div className="gearColumn">
                        <div className="gearHeaderShell">
                            <h2>Item</h2>
                            <h2>Size</h2>
                        </div>
                        <EditPairList stylings={{ width: '194px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />
                        <div className="carryShell">
                            <div className="carryBackground">
                                <p> </p>
                                <p>/</p>
                                <p>Carry</p>
                            </div>
                            <div className="carryForeground">
                                <p className="shownGearCarryLocation">{shownGearCarry}</p>
                                <p className="strCarryLocation">{shownCarry}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="cashAndGearShell">
            <h1>Gear & Loot</h1>
            <div className="cashShell">
                <div>
                    <p>CC</p>
                    <input className="cashIndividual" type="text" defaultValue={copper} onBlur={event => updateAttribute(event.target.value, "copper")} />
                </div>
                <div>
                    <p>SC</p>
                    <input className="cashIndividual" type="text" defaultValue={silver} onBlur={event => updateAttribute(event.target.value, "silver")} />
                </div>
                <div>
                    <p>GC</p>
                    <input className="cashIndividual" type="text" defaultValue={gold} onBlur={event => updateAttribute(event.target.value, "gold")} />
                </div>
                <div>
                    <p>PC</p>
                    <input className="cashIndividual" type="text" defaultValue={platinium} onBlur={event => updateAttribute(event.target.value, "platinium")} />
                </div>
            </div>
            <div className="gearColumns">
                <div className="gearColumn">
                    <div className="gearHeaderShell">
                        <h2>Item</h2>
                        <h2>Size</h2>
                    </div>
                    <EditPairList stylings={{ width: '194px' }} listArray={gearone} limit={7} updateFunction={updateAttribute} type={"gearone"} />
                </div>
                <div className="gearColumn">
                    <div className="gearHeaderShell">
                        <h2>Item</h2>
                        <h2>Size</h2>
                    </div>
                    <EditPairList stylings={{ width: '194px' }} listArray={geartwo} limit={7} updateFunction={updateAttribute} type={"geartwo"} />
                </div>
                <div className="gearColumn">
                    <div className="gearHeaderShell">
                        <h2>Item</h2>
                        <h2>Size</h2>
                    </div>
                    <EditPairList stylings={{ width: '194px' }} listArray={gearthree} limit={7} updateFunction={updateAttribute} type={"gearthree"} />
                </div>
                <div className="gearColumn">
                    <div className="gearHeaderShell">
                        <h2>Item</h2>
                        <h2>Size</h2>
                    </div>
                    <EditPairList stylings={{ width: '194px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />
                    <div className="carryShell">
                        <div className="carryBackground">
                            <p> </p>
                            <p>/</p>
                            <p>{isDownloading ? " " : "Carry"}</p>
                        </div>
                        <div className="carryForeground">
                            <p className="shownGearCarryLocation">{shownGearCarry}</p>
                            <p className="strCarryLocation">{shownCarry}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}