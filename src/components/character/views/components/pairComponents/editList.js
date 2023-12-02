import React, { Component } from 'react'

export default class EditList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || [],
            limit: props.limit,
            updateFunction: props.updateFunction,
            type: props.type,
            height: props.height,
            objectKey: props.objectKey || 'value'
        }
    }

    deepCopyListArray = () => {
        return this.state.listArray.map(item => { return { ...item } })
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addNewItem = (value) => {
        let listArray = this.deepCopyListArray()
        if (value) {
            listArray.push({ value })
            this.setState({ listArray }, _ => {
                this.state.updateFunction(this.state.listArray, this.state.type)
                document.getElementById(`addNewItemInput${this.state.type}`).value = null;
            })
        }
    }

    updateValue = (value, index) => {
        let listArray = this.deepCopyListArray()
        if (!value || value === '') {
            listArray.splice(index, 1)
        } else {
            listArray[index] = { ...listArray[index], [this.state.objectKey]: value }
        }
        this.setState({ listArray }, _ => this.state.updateFunction(this.state.listArray, this.state.type))
    }

    render() {
        let { stylings, listArray, limit, height, objectKey } = this.state
        let listOfInputs = listArray.map((item, i) => {
            let inputStyles = {
                width: '100%'
            }
            return <input style={inputStyles} key={`${this.makeId()}`} defaultValue={item[objectKey]} onBlur={e => this.updateValue(e.target.value, i)} />
        })

        let inputStyles = {
            width: '100%',
            display: `${listOfInputs.length >= limit ? 'none' : 'flex'}`
        }

        let stripes = []
        for (let i = 0; i < limit; i++) {
            stripes.push((<div className="pairRowStriping" key={`${this.makeId()}`}> </div>))
        }

        let heightStyling = {
            height: height || 'unset'
        }

        return (
            <div style={stylings} className="viewList viewPairListStriping">
                <div className="stripesShell" style={heightStyling}>
                    {stripes}
                </div>
                <div className="contentListShell" style={heightStyling}>
                    {listOfInputs}
                    <input style={inputStyles} onBlur={e => this.addNewItem(e.target.value)} id={`addNewItemInput${this.state.type}`} />
                </div>
            </div>
        )
    }
}