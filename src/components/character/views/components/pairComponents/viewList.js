import React, { Component } from 'react'

export default class ViewList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            limit: props.limit,
            listArray: props.listArray || []
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { stylings, listArray, limit } = this.state
        let inputStyles = {
            width: '100%'
        }
        let listOfThingsToDisplay = listArray.map((item, i) => {
            return <p style={inputStyles} key={`${this.makeId()}`}>{item.value}</p>
        })

        let stripes = []
        for (let i = 0; i < limit; i++) {
            stripes.push((<div className="pairRowStriping" style={inputStyles} key={`${this.makeId()}`}> </div>))
        }

        return (
            <div style={stylings} className="viewList viewPairListStriping">
                <div className="stripesShell">
                    {stripes}
                </div>
                <div className="contentPairListShell">
                {listOfThingsToDisplay}
                </div>
            </div>
        )
    }
}