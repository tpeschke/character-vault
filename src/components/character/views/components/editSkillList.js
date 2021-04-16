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
            defaultCost: props.defaultCost || 1,
            defaultRank: props.defaultRank || 0
        }
    }
    
    deepCopyListArray = () => {
        return this.state.listArray.map(item => { return { ...item } })
    }

    makeId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    addNewItem = (skill, cost, rank) => {
        let listArray = this.deepCopyListArray()
        cost = cost ? cost : this.state.defaultCost
        rank = rank ? rank : this.state.defaultRank
        if (skill || cost || rank) {
            listArray.push({ skill, cost, rank })
            this.setState({ listArray }, _ => {
                this.state.updateFunction(this.state.listArray, this.state.type)
                document.getElementById(`addNewSkillInputskill${this.state.type}`).value = null;
                document.getElementById(`addNewSkillInputcost${this.state.type}`).value = null;
                document.getElementById(`addNewSkillInputrank${this.state.type}`).value = null;
            })
        }
    }

    updateValue = (type, value, index) => {
        let listArray = this.deepCopyListArray()
        if (this.shouldDelete(type, value, index, listArray)) {
            listArray.splice(index, 1)
        } else {
            listArray[index] = { ...listArray[index], [type]: value }
        }
        this.setState({ listArray }, _ => this.state.updateFunction(this.state.listArray, this.state.type))
    }

    shouldDelete(type, value, index, listArray) {
        if (type === 'skill') {
            return !listArray[index].cost && !listArray[index].cost && (value === '' || !value)
        } else if (type === 'cost') {
            return (!value || value === '') && !listArray[index].skill && !listArray[index].rank
        } else if (type === 'rank') {
            return (!value || value === '') && !listArray[index].skill && !listArray[index].cost
        }
    }

    render() {
        //NEEDS TO DISPLAY CURRENT COST

        let { stylings, listArray, limit } = this.state
        let listOfInputs = listArray.map((item, i) => {
            let rowStyles = {
                top: `${i * 21}px`
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
            top: `${listOfInputs.length * 21}px`,
            display: `${listOfInputs.length >= limit ? 'none' : 'inherit'}`
        }

        return (
            <div style={stylings}>
                {listOfInputs}
                <div className="editPairRow" style={rowStyles}>
                    <input id={`addNewSkillInputskill${this.state.type}`} className="skillInput" onBlur={e => this.addNewItem(e.target.value, null)} />
                    <input id={`addNewSkillInputcost${this.state.type}`} className="costInput border-right" onBlur={e => this.addNewItem(null,e.target.value, null)} />
                    <input id={`addNewSkillInputrank${this.state.type}`} className="rankInput border-right" onBlur={e => this.addNewItem(null, null, e.target.value)} />
                </div>
            </div>
        )
    }
}