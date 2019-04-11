import React, {Component} from 'react';

class Public extends Component {
    state = {
        message: ""
    }

    componentDidMount() {
        fetch('/public').then(response => {
            if (response.ok) return response.json();

            throw new Error("No Response");
        }).then(response =>
            this.setState({message: response.message})
        ).catch(err =>
            this.setState({message: err.message})
        );
    }

    render() {
        return (
            <div>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Public;