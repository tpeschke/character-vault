import React, { Component } from 'react'

export default class ViewList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            limit: props.limit,
            listArray: props.listArray || [],
            objectKey: props.objectKey || 'value',
            inputStyles: {
                width: '100%'
            }
        }
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    render() {
        let { stylings, listArray, limit, objectKey, inputStyles } = this.state
        let listOfThingsToDisplay = listArray.map((item, i) => {
            return <p className="pairRow" style={inputStyles} key={`${this.makeId()}`}>{item[objectKey]}</p>
        })

        for (let i = 0; i < limit - listArray.length; i++) {
            listOfThingsToDisplay.push(<p className="pairRow" style={inputStyles} key={`${this.makeId()}`}> </p>)
        }

        return (
            <div style={stylings} className="viewList viewPairListStriping">
                <div className="contentPairListShell">
                    {listOfThingsToDisplay}
                </div>
            </div>
        )
    }
}