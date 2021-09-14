import React, { Component } from 'react'
import './editPair.css'

export default class ViewPairList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: {
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                ...props.stylings
            },
            listArray: props.listArray || [],
            limit: props.limit,
            height: props.height,
            converterFunction: props.converterFunction || this.converterFunction,
            rowWidth: props.rowWidth || '100%'
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    converterFunction = (value) => {
        return value
    }

    render() {
        let { stylings, listArray, rowWidth, limit, height } = this.state
        let rowStyles = {
            width: rowWidth
        }
        let listOfPairsToDisplay = listArray.map((item, i) => {
            return (<div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                <p className="titleInput">- {item.title}</p>
                <p className="valueDisplay">{this.state.converterFunction(item.value)}</p>
            </div>)
        })

        let stripes = []
        for (let i = 0; i < limit; i++) {
            stripes.push((<div className="pairRowStriping" style={rowStyles} key={`${this.makeId()}`}> </div>))
        }

        let heightStyling = {
            height: height || 'unset'
        }
        
        return (
            <div style={stylings} className="viewPairListStriping">
                <div className="stripesShell" style={heightStyling}>
                    {stripes}
                </div>
                <div className="contentPairListShell" style={heightStyling}>
                    {listOfPairsToDisplay}
                </div>
            </div>
        )
    }
}