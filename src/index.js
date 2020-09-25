import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '*': {
                    'scrollbar-width': 'thin',
                    'scrollbar-color': 'grey transparent',
                },
                'body::-webkit-scrollbar': {
                    'background-color': 'fff',
                    width: '16px',

                },

                /* background of the scrollbar except button or resizer */
                'body::-webkit-scrollbar-track': {
                    'background-color': '#fff',
                },

                /* scrollbar itself */
                'body::-webkit-scrollbar-thumb': {
                    'background-color': '#babac0',
                    'border-radius': '16px',
                    'border': '4px solid #fff',
                },

                /* set button(top and bottom of the scrollbar) */
                'body::-webkit-scrollbar-button': {
                    display: 'none'
                }
            },
        },
    },
});


ReactDOM.render(
    <React.StrictMode>
        <Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <App/>
            </ThemeProvider>
        </Fragment>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
