import React, { Component } from 'react'
import './editPair.css'

export default class EditPairList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: {
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                ...props.stylings
            },
            listArray: props.listArray || [],
            limit: props.limit,
            updateFunction: props.updateFunction,
            type: props.type,
            titleWidth: props.titleWidth || 75,
            valueWidth: 100 - props.titleWidth || 25,
            defaultValue: props.defaultValue || null,
            titleSameAsValue: props.titleSameAsValue || false,
            rowWidth: props.rowWidth || '100%'
        }
    }

    deepCopyListArray = () => {
        return this.state.listArray.map(item => { return { ...item } })
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addNewItem = (title, value) => {
        let { titleSameAsValue, defaultValue, updateFunction, type } = this.state
        let listArray = this.deepCopyListArray()
        value = value ? value : defaultValue
        if (titleSameAsValue && title) {
            value = title
        } else if (titleSameAsValue && value) {
            title = value
        }
        if (title || value) {
            listArray.push({ title, value })
            this.setState({ listArray }, _ => {
                updateFunction(this.state.listArray, type)
                document.getElementById(`addNewItemInputTitle${type}`).value = null;
                document.getElementById(`addNewItemInputValue${type}`).value = null;
            })
        }
    }

    updateValue = (titleOrValue, value, index) => {
        let listArray = this.deepCopyListArray()
        if (this.shouldDelete(titleOrValue, value, index, listArray)) {
            listArray.splice(index, 1)
        } else {
            listArray[index] = { ...listArray[index], [titleOrValue]: value }
        }
        this.setState({ listArray }, _ => this.state.updateFunction(this.state.listArray, this.state.type))
    }

    shouldDelete(titleOrValue, value, index, listArray) {
        if (titleOrValue === 'title') {
            return (!listArray[index].value || listArray[index].value === '' || listArray[index].value === this.state.defaultValue) && (value === '' || !value)
        } else if (titleOrValue === 'value') {
            return (!value || value === '' || value === this.state.defaultValue) && (listArray[index].title === '' || !listArray[index].title)
        }
    }

    render() {
        let { stylings, listArray, limit, titleWidth, valueWidth, rowWidth } = this.state
        let rowStyles = {
            width: rowWidth
        }
        let listOfInputs = listArray.map((item, i) => {
            return (<div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                <input className="titleInput" style={{ width: `${titleWidth}%` }} defaultValue={item.title} onBlur={e => this.updateValue('title', e.target.value, i)} />
                <input className="valueInput border-right" style={{ width: `${valueWidth}%` }} defaultValue={item.value} onBlur={e => this.updateValue('value', e.target.value, i)} />
            </div>)
        })

        let inputRowStyles = {
            width: rowWidth,
            display: `${listOfInputs.length >= limit ? 'none' : 'inherit'}`
        }

        return (
            <div style={stylings}>
                {listOfInputs}
                <div className="editPairRow" style={inputRowStyles}>
                    <input id={`addNewItemInputTitle${this.state.type}`} className="titleInput" style={{ width: `${titleWidth}%` }} onBlur={e => this.addNewItem(e.target.value, null)} />
                    <input id={`addNewItemInputValue${this.state.type}`} className="valueInput border-right" style={{ width: `${valueWidth}%` }} onBlur={e => this.addNewItem(null, e.target.value)} placeholder={this.state.defaultValue} />
                </div>
            </div>
        )
    }
}