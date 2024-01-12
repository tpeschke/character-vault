import { Component } from "react";
import './character.css'
import { withRouter } from "react-router";
import axios from "axios"
import CharacterViewer from './views/viewer'
import CharacterEditor from './views/editor'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Character extends Component {
    constructor(props) {
        super(props)

        this.state = {
            downloadMode: props.match.path === "/download/:id",
            loading: true,
            character: null,
            isEditingMode:
                props.match.path === "/new/:id",
            // true,
            isUpdating: false
        }

        this.updateCharacter = this.updateCharacter.bind(this)
    }

    componentWillMount() {
        if (this.state.downloadMode) {
            this.setState({ isEditingMode: false })
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        let id = this.props.match.params.id.split('.')[0]
        if (this.props.location.search.split('=').length === 1) {
            if (id === 'blank') {
                let blankCharacter = {
                    id: "blank", honor: 1, skills: [], str: 1, trainrecovery: 0
                    , weaponone: { id, position: 'one' }
                    , weapontwo: { id, position: 'two' }
                    , weaponthree: { id, position: 'three' }
                    , weaponfour: { id, position: 'four' }
                }
                this.setState({ character: blankCharacter }, _ => {
                    document.title = "Blank Character"
                })
            } else {
                axios.get(`/api/view/${id}`).then(({ data: character }) => {
                    this.setState({ character }, _ => {
                        this.setState({ loading: false })
                        if (character) {
                            document.title = this.state.character.name
                        } else {
                            document.title = '404 Not Found'
                        }
                    })
                })
            }
        } else {
            axios.get(`/api/view/${id}`, { params: { template: this.props.location.search.split('=')[1] } }).then(({ data: character }) => {
                this.setState({ character }, _ => {
                    document.title = this.state.character.name
                })
            })
        }
    }

    componentWillUnmount() {
        if (this.props.match.path === "/new/:id") {
            axios.post('/api/upsertCharacter', this.state.character)
        }
        this.setState({ isEditingMode: false })
    }

    changeEditStatus = () => {
        this.setState({ isEditingMode: !this.state.isEditingMode })
    }

    updateCharacter = function (updatedCharacter) {
        this.setState({ isUpdating: true }, _ => {
            axios.post('/api/upsertCharacter', updatedCharacter).then(({ data }) => {
                if (data.error) {
                    toast.error(data.message, {
                        theme: "colored",
                        autoClose: false,
                    })
                    this.setState({ isUpdating: false })
                } else {
                    const character = data
                    if (this.props.match.path === "/new/:id") {
                        this.setState({ character, isEditingMode: !this.state.isEditingMode, isUpdating: false }, _ => {
                            this.props.history.push(`/view/${character.id}`)
                        })
                    } else {
                        this.setState({ character, isEditingMode: !this.state.isEditingMode, isUpdating: false })
                    }
                }
            })
        })
    }

    updateSharedCharacter = (object, key, value) => {
        let character = { ...this.state.character }
        if (key) {
            character[object][key] = value
        } else {
            character[object] = value
        }
        this.setState({ character })
    }

    cancelUpdate = () => {
        this.setState({ isUpdating: true }, _ => {
            let id = this.props.match.params.id.split('.')[0]
            axios.get(`/api/view/${id}`).then(({ data: character }) => {
                this.setState({ character, isEditingMode: !this.state.isEditingMode })
            })
        })
    }

    copyCharacter = () => {
        axios.post('/api/addCharacter').then(({ data }) => {
            this.props.history.push(`/new/${data.id}?template=${this.state.character.id}`)
        })
    }

    render() {
        let { downloadMode, character, isEditingMode, isUpdating, loading } = this.state
        if (!character && loading) {
            return (<div className="spinnerShell"><i className="fas fa-spinner"></i></div>)
        } else if (!character && !loading) {

            return (<div className="spinnerShell" id="not-found"><p>404</p><p>Character Not Found</p></div>)
        }
        let view = <CharacterViewer character={character} updateSharedCharacter={this.updateSharedCharacter} changeEditStatus={this.changeEditStatus} downloadMode={downloadMode} copyCharacter={this.copyCharacter} />

        if (isEditingMode) {
            view = <CharacterEditor character={character} updateCharacter={this.updateCharacter} cancelUpdate={this.cancelUpdate} isUpdating={isUpdating} />
        }
        return (
            <div id="loaded">
                {view}
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(Character)