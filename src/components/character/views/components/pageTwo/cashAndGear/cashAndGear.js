import React from 'react'
import './cashAndGear.css'
import EditPairList from '../../pairComponents/editPairList'
import ViewPairList from '../../pairComponents/viewPairList'

export default function Skills({ cashAndGear, editing }) {
    let { copper, updateAttribute, silver, gold, platinium, gearone, geartwo, gearthree, gearfour, shownGearCarry, shownCarry, isDownloading, id } = cashAndGear

    function cashPair(label, number, type, callback) {
        return (
            <div>
                <p>{label}</p>
                <input className="cashIndividual" type="text" defaultValue={number} onBlur={event => callback(event.target.value, type)} />
            </div>
        )
    }

    function gearColumn(list) {
        return (
            <>
                <div className="gearHeaderShell">
                    <h2>Item</h2>
                    <h2>Size</h2>
                </div>
                {list}
            </>
        )
    }

    let gearOneList = <ViewPairList stylings={{ width: '194px' }} listArray={gearone} limit={7} updateFunction={updateAttribute} type={"gearone"} />
    let gearTwoList = <ViewPairList stylings={{ width: '194px' }} listArray={geartwo} limit={7} updateFunction={updateAttribute} type={"geartwo"} />
    let gearThreeList = <ViewPairList stylings={{ width: '194px' }} listArray={gearthree} limit={7} updateFunction={updateAttribute} type={"gearthree"} />
    let gearFourList = <ViewPairList stylings={{ width: '194px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />
    if (id !== 'blank') {
        gearOneList = <EditPairList stylings={{ width: '193px' }} listArray={gearone} limit={7} updateFunction={updateAttribute} type={"gearone"} />
        gearTwoList = <EditPairList stylings={{ width: '193px' }} listArray={geartwo} limit={7} updateFunction={updateAttribute} type={"geartwo"} />
        gearThreeList = <EditPairList stylings={{ width: '193px' }} listArray={gearthree} limit={7} updateFunction={updateAttribute} type={"gearthree"} />
        gearFourList = <EditPairList stylings={{ width: '191px' }} listArray={gearfour} limit={6} updateFunction={updateAttribute} type={"gearfour"} />
    }
    return (
        <div className="cashAndGearShell">
            <div className='cashTitle'>
                <h1>Gear & Loot</h1>
                <div className="cashShell">
                    {cashPair('CC', copper, 'copper', updateAttribute)}
                    {cashPair('SC', copper, 'silver', updateAttribute)}
                    {cashPair('GC', copper, 'gold', updateAttribute)}
                    {cashPair('PC', copper, 'platinium', updateAttribute)}
                </div>
            </div>
            <div className="gearColumns">
                <div className="gearColumn">
                    {gearColumn(gearOneList)}
                </div>
                <div className="gearColumn">
                    {gearColumn(gearTwoList)}
                </div>
                <div className="gearColumn">
                    {gearColumn(gearThreeList)}
                </div>
                <div className="gearColumn">
                    {gearColumn(gearFourList)}
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