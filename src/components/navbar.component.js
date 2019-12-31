// navbar component


import React, {PureComponent} from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends PureComponent {
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: '#B6B5B7'}}>
                <div className="container">
                    <Link className="navbar-brand" to="/">Corewars.Tech</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className='nav-item'>
                                <a href='../downloads/hype.txt' download>
                                    <button type="button" className="btn btn-outline-success">
                                        Instructions ⬇️
                                    </button>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/play/'>
                                    <button type="button" className="btn btn-outline-success">Leaderboard 📈️ </button>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/play/new/'>
                                    <button type="button" className="btn btn-outline-success">Play ➡️</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
