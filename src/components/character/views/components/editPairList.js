import React, { Component } from 'react'
import './editPair.css'

export default class EditPairList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stylings: { position: 'relative', ...props.stylings },
            listArray: props.listArray || [],
            limit: props.limit,
            updateFunction: props.updateFunction,
            type: props.type,
            defaultValue: props.defaultValue || null
        }
    }

    //{id, characterid, title, value}

    deepCopyListArray = () => {
        return this.state.listArray.map(item => { return { ...item } })
    }

    addNewItem = (title, value) => {
        let listArray = this.deepCopyListArray()
        value = value ? value :  this.state.defaultValue
        if (title || value) {
            listArray.push({ title, value })
            this.setState({ listArray }, _ => {
                this.state.updateFunction(this.state.listArray, this.state.type)
                document.getElementById(`addNewItemInputTitle${this.state.type}`).value = null;
                document.getElementById(`addNewItemInputValue${this.state.type}`).value = null;
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
            return (!listArray[index].value || listArray[index].value === '') && (value === '' || !value)
        } else if (titleOrValue === 'value') {
            return (!value || value === '') && (listArray[index].title === '' || !listArray[index].title)
        }
    }

    render() {
        let { stylings, listArray, limit } = this.state
        let listOfInputs = listArray.map((item, i) => {
            let rowStyles = {
                top: `${i * 21.33}px`
            }
            return (<div className="editPairRow" style={rowStyles} key={`${item.value}${stylings.left}`}>
                <input className="titleInput" defaultValue={item.title} onBlur={e => this.updateValue('title', e.target.value, i)} />
                <input className="valueInput border-right" defaultValue={item.value} onBlur={e => this.updateValue('value', e.target.value, i)} />
            </div>)
        })

        let rowStyles = {
            position: 'absolute',
            width: '100%',
            top: `${listOfInputs.length * 21.33}px`,
            display: `${listOfInputs.length >= limit ? 'none' : 'inherit'}`
        }

        return (
            <div style={stylings}>
                {listOfInputs}
                <div className="editPairRow" style={rowStyles}>
                    <input id={`addNewItemInputTitle${this.state.type}`} className="titleInput" onBlur={e => this.addNewItem(e.target.value, null)} />
                    <input id={`addNewItemInputValue${this.state.type}`} className="valueInput border-right" onBlur={e => this.addNewItem(null, e.target.value)} />
                </div>
            </div>
        )
    }
}