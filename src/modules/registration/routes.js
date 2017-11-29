import React from 'react';
import { Route } from 'react-router-dom';
import Registration from './containers'

export default function(){
 return <Route key="/registration" exact path="/registration" component={Registration} />
}
