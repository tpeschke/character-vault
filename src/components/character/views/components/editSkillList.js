import React, { Component } from 'react'
import './editPair.css'

export default class EditSkillList extends Component {
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
    
    deepCopyListArray = () => {
        return this.state.listArray.map(item => { return { ...item } })
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addNewItem = (title, value) => {
        let listArray = this.deepCopyListArray()
        value = value ? value : this.state.defaultValue
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
        //NEEDS A PLACE TO PUT THE BASE COST AND A PLACE TO DISPLAY CURRENT COST

        let { stylings, listArray, limit } = this.state
        let listOfInputs = listArray.map((item, i) => {
            let rowStyles = {
                top: `${i * 20.5}px`
            }
            return (<div className="editPairRow" style={rowStyles} key={`${this.makeId()}`}>
                <input className="skillInput" defaultValue={item.skill} onBlur={e => this.updateValue('skill', e.target.value, i)} />
                <input className="costInput border-right" defaultValue={item.cost} onBlur={e => this.updateValue('cost', e.target.value, i)} />
                <input className="rankInput border-right" defaultValue={item.rank} onBlur={e => this.updateValue('rank', e.target.value, i)} />
            </div>)
        })

        let rowStyles = {
            position: 'absolute',
            width: '100%',
            top: `${listOfInputs.length * 20}px`,
            display: `${listOfInputs.length >= limit ? 'none' : 'inherit'}`
        }

        return (
            <div style={stylings}>
                {listOfInputs}
                <div className="editPairRow" style={rowStyles}>
                    <input id={`addNewItemInputskill${this.state.type}`} className="skillInput" onBlur={e => this.addNewItem(e.target.value, null)} />
                    <input id={`addNewItemInputcost${this.state.type}`} className="costInput border-right" onBlur={e => this.addNewItem(null,e.target.value, null)} />
                    <input id={`addNewItemInputrank${this.state.type}`} className="rankInput border-right" onBlur={e => this.addNewItem(null, null, e.target.value)} />
                </div>
            </div>
        )
    }
}