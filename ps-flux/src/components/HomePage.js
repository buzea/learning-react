import React from 'react';
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div className="jumbotron">
            <h1>Pluralsight Administration</h1>
            <p>Reacr, Flux and React Router</p>
            <Link to="/about" className="btn btn-primary">About</Link>
        </div>
    );
}

export default HomePage;