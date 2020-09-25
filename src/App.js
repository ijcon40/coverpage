import React from 'react';
import Splash from './routing/splash/splash'
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Switch>
                {/*switch matches first, so put content above default*/}
                <Route path="/*">
                    <Splash/>
                </Route>
            </Switch>
        </Router>

    );
}

export default App;
