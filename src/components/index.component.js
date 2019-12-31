import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default function IndexComponent(){
        return(
            <div className="container">
                <div className="row" >
                    <div className="col-12">
                        <h1>Welcome to the Corewars.tech webapp alpha!</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <h3>Thanks for checking us out!</h3>
                        <p>We're still in a super early dev stage, and are super open to feedback, comments, and concerns. Thanks for your patience & support!</p>
                        <br />
                        <Link to="/play/">
                            <button type="button" className="btn btn-outline-success mb-2 mr-sm-2">Play ➡️</button>
                        </Link>
                        <a href='../downloads/hype.txt' download><button type="button" className="btn btn-outline-success ml-2 mb-2 mr-sm-2">Instructions ⬇️</button></a>
                        <br />
                        <br />
                        <br />
                        <p>Built with ❤️ by Adi & Eamon.</p>
                    </div>
                </div>
            </div>
        )
}