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
            rowStyles: {
                width: props.rowWidth
            }
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    converterFunction = (value) => {
        return value
    }

    render() {
        let { stylings, listArray, limit, rowStyles } = this.state
        let listOfPairsToDisplay = listArray.map((item, i) => {
            return (<div className="editPairRow pairRow" style={rowStyles} key={`${this.makeId()}`}>
                <p className="titleInput">- {item.title}</p>
                <p className="valueDisplay border-right">{this.state.converterFunction(item.value)}</p>
            </div>)
        })

        for (let i = 0; i < limit - listArray.length; i++) {
            listOfPairsToDisplay.push(( <div className="editPairRow pairRow" style={rowStyles} key={`${this.makeId()}`}>
                                            <p className="valueDisplay border-right"> </p>
                                        </div>))
        }
        
        return (
            <div style={stylings} className="viewPairListStriping">
                <div className="contentPairListShell">
                    {listOfPairsToDisplay}
                </div>
            </div>
        )
    }
}