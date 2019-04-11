import React from 'react';
import ReactDOM from 'react-dom';
import {App, Game} from './App';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('computes right possible solutions', () => {
    const game = new Game();
    console.log(game.doBacktracking(5, [], [2, 3, 4]));
});


