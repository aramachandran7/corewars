import React, {PureComponent} from 'react'
import { Link } from 'react-router-dom'
import "./corewars/canvas.component.css"

export default class Navbar extends PureComponent {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#873AD4'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><h3>Corewars.Tech</h3></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className='nav-item'>
                                <a href='../downloads/hype.txt' className='nav-link' download>
                                    <button type="button" className="btn btn-outline-light">
                                        Instructions ⬇️
                                    </button>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/play/'>
                                    <button type="button" className="btn btn-outline-light">Leaderboard 📈️ </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/play/new/'>
                                    <button type="button" className="btn btn-outline-light">Play ➡️</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
