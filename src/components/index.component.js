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
                    <div className="col-4">
                        <h3>Thanks for checking us out!</h3>
                        <p> We're still in a super early dev stage. Super Duper Early. Thanks for your patience, and our apologies for the bugs, shitty UI, etc! :) </p>
                        <p>Built with ❤️by Adi & Eamon</p>
                        <Link to="/play/">
                            <button type="button" className="btn btn-success">Play Now!!</button>
                        </Link>
                        <a href='../downloads/hype.txt' download><button type="button" className="btn btn-success">Download instructions</button></a>
                    </div>
                </div>
            </div>
        )
}