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
            isEditingMode: props.match.path === "/new/:id",
            isUpdating: false
        }

        this.updateCharacter = this.updateCharacter.bind(this)
    }

    componentWillMount() {
        if (this.state.downloadMode) {
            this.setState({isEditingMode: false})
        }
        let id = this.props.match.params.id.split('.')[0]
        axios.get(`/api/view/${id}`).then(({ data: character }) => {
            this.setState({ character })
        })
    }

    componentWillUnmount() {
        this.setState({ isEditingMode: false })
    }

    changeEditStatus = () => {
        this.setState({ isEditingMode: !this.state.isEditingMode })
    }

    updateCharacter = function (updatedCharacter) {
        this.setState({isUpdating: true}, _=> {
            axios.post('/api/upsertCharacter', updatedCharacter).then(({ data: character }) => {
                this.setState({character, isEditingMode: !this.state.isEditingMode, isUpdating: false})
            })
        })
    }

    render() {
        let { downloadMode, character, isEditingMode, isUpdating } = this.state
        if (!character) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }
        let view = <CharacterViewer character={character} changeEditStatus={this.changeEditStatus} downloadMode={downloadMode} />

        if (isEditingMode) {
            view = <CharacterEditor character={character} updateCharacter={this.updateCharacter} downloadMode={downloadMode} isUpdating={isUpdating}/>
        }
        return (
            <div id="loaded">
                {view}
            </div>
        )
    }
}

export default withRouter(Character)