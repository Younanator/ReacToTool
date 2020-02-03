import { Route, Switch } from 'react-router-dom'
import React from 'react';


import {Sccm} from '../pages/sccm'
import { ActiveDirectory } from '../pages/ActiveD';
import { AdobePage } from '../pages/Adobe';
import { Trees } from '../pages/Trees';
import { Home } from '../pages/Home';

export default () => (
    
            <Switch>
                <Route exact path="/Sccm" component={Sccm} />
                <Route exact path="/Active" component={ActiveDirectory} />
                <Route exact path="/Adobe" component={AdobePage} />
                <Route exact path="/Tree" component={Trees} />
                <Route  path="/" component={Home} />

            </Switch>
);