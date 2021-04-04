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
            isEditingMode: false
        }
    }

    componentWillMount() {
        let id = this.props.match.params.id.split('.')[0]
        axios.get(`/api/view/${id}`).then(({ data: character }) => {
            this.setState({ character })
        })
    }

    changeEditStatus = () => {
        this.setState({ isEditingMode: !this.state.isEditingMode })
    }

    render() {
        let { downloadMode, character, isEditingMode } = this.state
        if (!character) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        }
        let { name, id } = character

        let view = <CharacterViewer character={character} downloadMode={downloadMode} />
        let bottomButtons = (<div className={downloadMode ? 'removeButtons' : 'Buttons'}>
            {/* ADD LOADING INDICATOR */}
            <a href={`http://localhost:4000/api/download/${id}.pdf`} download={name + ".pdf"}><i className="fas fa-file-download fa-lg"></i></a>
            <i onClick={this.changeEditStatus} className="fas fa-edit"></i>
        </div>)

        if (isEditingMode) {
            view = <CharacterEditor character={character} />
            bottomButtons = (<div className={downloadMode ? 'removeButtons' : 'Buttons'}>
                <div></div>
                <i onClick={this.changeEditStatus} className="fas fa-save"></i>
            </div>)
        }
        return (
            <div id="loaded">
                {view}
                {bottomButtons}
            </div>
        )
    }
}

export default withRouter(Character)