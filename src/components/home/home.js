import React, { Component } from 'react';
import './home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Model from './model'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            characters: null,
            vault: null,
            showModel: false,
            characterId: null
        }
    }

    componentWillMount() {
        this.getCharactersAndVault()
    }

    getCharactersAndVault = () => {
        axios.get('/api/characters').then(({ data: characters }) => {
            this.setState({ characters })
        })
        axios.get('/api/allCharacters').then(({ data: vault }) => {
            this.setState({ vault })
        })
    }

    createNewCharacter = () => {
        axios.post('/api/addCharacter').then(({ data }) => {
            console.log(data)
            this.props.history.push(`/view/${data.id}`)
        })
    }

    toggleModel = (showModel, characterId = null) => {
        if (!characterId && this.state.characterId) {
            this.getCharactersAndVault()
            this.setState({ showModel, characterId })
        } else {
            this.setState({ showModel, characterId })
        }
    }

    render = () => {
        let { characters, vault } = this.state
        if (!characters || !vault) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }

        let characterList
        if (!characters.length) {
            characterList = (<div className="loginShell">You Need to Log On to Add Characters
                <button>Log On</button>
            </div>)
        } else {
            characterList = characters.map(({ name, race, primarya, secondarya, level, id }) => {
                return (
                    <div className="character">
                        <Link className="characterLink" key={id} to={`/view/${id}`}>
                            <p>{name}</p>
                            <p>{race}</p>
                            <p>{primarya}/{secondarya}</p>
                            <p>Level: {level}</p>
                        </Link>
                        <i className="fas fa-minus" onClick={_ => this.toggleModel(true, id)}></i>
                    </div>
                )
            })
        }
        let vaultList = vault.map(({ name, race, primarya, secondarya, level, id }) => {
            return (
                <div className="character">
                    <Link className="characterLink" key={id} to={`/view/${id}`}>
                        <p>{name}</p>
                        <p>{race}</p>
                        <p>{primarya}/{secondarya}</p>
                        <p>Level: {level}</p>
                    </Link>
                </div>
            )
        })

        return (
            <div className="homeShell">
                <div className="characterShell">
                    <h4 className={!characters.length ? "displayNone" : ""}>Here are your characters:</h4>
                    <div>
                        {characterList}
                    </div>
                    <i className={!characters.length ? "displayNone" : "fas fa-plus"} onClick={this.createNewCharacter}></i>
                </div>
                <div className="characterShell">
                    <h4>Character Vault:</h4>
                    <div>
                        {vaultList}
                    </div>
                </div>
                <Model showModel={this.state.showModel} toggleModel={this.toggleModel} characterId={this.state.characterId} />
            </div>)
    }
}