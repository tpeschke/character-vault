import React, { Component } from 'react'
import axios from 'axios'

export default class Modal extends Component {
    constructor() {
        super()

        this.state = {
            loading: false

        }
    }

    removeCharacter = () => {
        this.setState({ loading: true }, _ => {
            axios.patch(`/api/removeCharacter/${this.props.characterId}`).then(data => {
                this.props.toggleModel(false)
                this.setState({ loading: false })
            })
        })
    }


    render() {
        let { showModel, toggleModel } = this.props
        if (this.state.loading) {
            return (<div className={showModel ? "overlay" : "displayNone"}>
                <div className="spinnerShell"><i className="fas fa-spinner"></i></div>
            </div>)
        }
        return (
            <div className={showModel ? "overlay" : "displayNone"}>
                <div className="modelBody">
                    <h5><i class="fas fa-exclamation-triangle"></i>Sure You Want to Remove This Character?</h5>
                    <div className="modelInnards">
                        <p>You'll still be able to access it through the Vault if you've filled out the following:</p>
                        <ul>
                            <li>Race</li>
                            <li>Archetypes</li>
                            <li>Level</li>
                            <li>Primary Drawback</li>
                            <li>Stats</li>
                            <li>Honor</li>
                            <li>Temperament</li>
                            <li>Devotions</li>
                            <li>Flaws</li>
                            <li>Traits</li>
                            <li>Archetype Ability</li>
                            <li>Gear</li>
                        </ul>
                        <p>However, it'll be a pain to find and you won't be able to edit it.</p>
                        <div className="modelButtons">
                            <button className="yes" onClick={this.removeCharacter}>Go For It</button>
                            <button className="no" onClick={_ => toggleModel(false)}>Wait, Nevermind</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}