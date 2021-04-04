import { Component } from "react";
import './character.css'
import { withRouter } from "react-router";
import axios from "axios"

class Character extends Component {
    constructor(props) {
        super(props)

        this.state = {
            downloadMode: props.match.path === "/download/:id",
            character: null
        }
    }

    componentWillMount () {
        let id = this.props.match.params.id.split('.')[0]
        axios.get(`/api/view/${id}`).then(({data:character}) => {
            this.setState({character})
        })
    }

    render() {
        let { downloadMode, character } = this.state
        if (!character) {
            return (<div>loading...</div>)
        }
        let { name, id } = character
        return (
            <div id="loaded">
                <div id="pdf" className={downloadMode ? '' : 'pdfViewStylings'}>
                    <div className={downloadMode ? "pageOne pageBase" : "pageOne pageBase pageViewStylings"}>
                        <p className="nameLocation">{name}</p>
                    </div>
                    <div className={downloadMode ? "pageTwo pageBase" : "pageTwo pageTwoMargin pageBase pageViewStylings"}>

                    </div>
                </div>
                <div className={downloadMode ? 'removeDownloadButton' : 'downloadButton'}>
                    {/* ADD LOADING INDICATOR */}
                    <a href={`http://localhost:4000/api/download/${id}.pdf`} download={name + ".pdf"}><i className="fas fa-file-download fa-lg"></i></a>
                </div>
            </div>
        )
    }
}

export default withRouter(Character)