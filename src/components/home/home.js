import React, { Component } from 'react';
import './home.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Model from './model'
import local from '../../local.js'

export default class Home extends Component {
    constructor() {
        super()

        this.state = {
            characters: [],
            vault: null,
            showModel: false,
            characterId: null,
            needsToLogOn: true,
            isCheckingLogin: true,
            limit: true
        }
    }

    componentDidMount() {
        document.title = "Character Vault"
        this.getCharactersAndVault()
    }

    getCharactersAndVault = () => {
        axios.get('/api/characters').then(({ data: characters }) => {
            if (!characters.message) {
                this.setState({ characters, needsToLogOn: false, isCheckingLogin: false })
            } else {
                this.setState({ isCheckingLogin: false })
            }
        })
        axios.get('/api/characterLimit').then(({ data }) => {
            this.setState({ limit: data.limit })
        })
        this.getVault()
    }

    getVault = () => {
        axios.get('/api/allCharacters').then(({ data: vault }) => {
            this.setState({ vault })
        })
    }

    createNewCharacter = () => {
        axios.post('/api/addCharacter').then(({ data }) => {
            this.props.history.push(`/new/${data.id}`)
        })
    }

    toggleModelWithNoBubbling = (showModel, characterId, event) => {
        event.preventDefault()
        this.toggleModel(showModel, characterId)
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
        let { characters, vault, needsToLogOn, isCheckingLogin } = this.state
        if (isCheckingLogin || !vault) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }

        let characterList
        if (needsToLogOn) {
            characterList = (<div className="loginShell">You Need to Log On to Add Characters
                <button className="reverseColors">  <a href={local.loginEndpoint}>
                    <div className="logindiv">Log In</div>
                </a></button>
            </div>)
        } else {
            if (characters.length > 0) {
                characterList = characters.map(({ name, race, primarya, secondarya, level, id }) => {
                    return (
                        <div key={id} className="character">
                            <Link className="characterLink" key={id} to={`/view/${id}`}>
                                <p><span>{name}</span></p>
                                <p><span>{race}</span></p>
                                <p><span>{primarya}/{secondarya}</span></p>
                                <p>Level: {level}</p>
                                <i className="fas fa-minus" onClick={e => this.toggleModelWithNoBubbling(true, id, e)}></i>
                            </Link>
                        </div>
                    )
                })
            } else {
                characterList = (<div className="noCharacters"><i className="fas fa-arrow-down"></i> Looks like you need to add some characters. Hit the + icon below to get started.</div>)
            }
        }
        let vaultList = vault.map(({ name, race, primarya, secondarya, level, id }) => {
            return (
                <div key={id} className="character">
                    <Link className="characterLink" key={id} to={`/view/${id}`}>
                        <p><span>{name}</span></p>
                        <p><span>{race}</span></p>
                        <p><span>{primarya}/{secondarya}</span></p>
                        <p>Level: {level}</p>
                    </Link>
                </div>
            )
        })

        return (
            <div className="homeShell">
                <div className="characterShell">
                    <h4><i className="fas fa-users"></i>Your Characters</h4>
                    <div>
                        {characterList}
                    </div>
                    <div className='characterListButtonShell'>
                        <p>
                            <i className={needsToLogOn || (this.state.limit && characters.length >= this.state.limit) ? "displayNone" : "fas fa-plus"} onClick={this.createNewCharacter}></i>
                            <i className={!needsToLogOn && (this.state.limit && characters.length >= this.state.limit) ? "fas fa-plus greyed-out" : "displayNone"}></i>
                        </p>
                        <div className={needsToLogOn ? "displayNone" : ""}>
                            <p>{characters.length} / {!this.state.limit ? 0 : this.state.limit}</p>
                        </div>
                    </div>
                </div>
                <div className="characterShell">
                    <h4><i className="fas fa-cogs"></i>Character Vault</h4>
                    <div>
                        {vaultList}
                    </div>
                    <div className='characterListButtonShell'>
                        <i className="fas fa-redo-alt" onClick={this.getVault}></i>
                        <div></div>
                    </div>
                </div>
                <Model showModel={this.state.showModel} toggleModel={this.toggleModel} characterId={this.state.characterId} />
            </div>)
    }
}