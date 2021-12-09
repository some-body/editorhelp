import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/app/App';
import './ui.css';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('react-page'));
});
