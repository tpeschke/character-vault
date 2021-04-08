import { Component } from "react";
import './character.css'
import { withRouter } from "react-router";
import axios from "axios"
import CharacterViewer from './views/viewer'
import CharacterEditor from './views/editor'
class Character extends Component {
    constructor(props) {
        super(props)

        this.state = {
            downloadMode: props.match.path === "/download/:id",
            character: null,
            isEditingMode: true
        }

        this.updateCharacter = this.updateCharacter.bind(this)
    }

    componentWillMount() {
        let id = this.props.match.params.id.split('.')[0]
        axios.get(`/api/view/${id}`).then(({ data: character }) => {
            console.log(character)
            this.setState({ character })
        })
    }

    changeEditStatus = () => {
        this.setState({ isEditingMode: !this.state.isEditingMode })
    }

    updateCharacter = function (newCharacter) {
        axios.post('/api/upsertCharacter', newCharacter).then(({ data: character }) => {
            console.log(character)
            this.setState({character, isEditingMode: !this.state.isEditingMode})
        })
    }

    render() {
        let { downloadMode, character, isEditingMode } = this.state
        if (!character) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }
        let view = <CharacterViewer character={character} changeEditStatus={this.changeEditStatus} downloadMode={downloadMode} />

        if (isEditingMode) {
            view = <CharacterEditor character={character} updateCharacter={this.updateCharacter} downloadMode={downloadMode}/>
        }
        return (
            <div id="loaded">
                {view}
            </div>
        )
    }
}

export default withRouter(Character)