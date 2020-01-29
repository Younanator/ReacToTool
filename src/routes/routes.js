import { Route, Switch } from 'react-router-dom'
import React from 'react';


import {Sccm} from '../pages/sccm'
import { ActiveDirectory } from '../pages/ActiveD';
import { AdobePage } from '../pages/Adobe';
import { Trees } from '../pages/Trees';

export default () => (
    
            <Switch>
                <Route exact path="/" component={Sccm} />
                <Route exact path="/Active" component={ActiveDirectory} />
                <Route exact path="/Adobe" component={AdobePage} />
                <Route exact path="/Tree" component={Trees} />

            </Switch>
);