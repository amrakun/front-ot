import React from 'react';
import { Route } from 'react-router-dom';
import Eoi from './containers'

export default function(){
 return <Route key="/eoi" exact path="/eoi" component={Eoi} />
}
