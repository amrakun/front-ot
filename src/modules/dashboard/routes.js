import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers'

export default function(){
 return <Route key="/" exact path="/" component={Dashboard} />
}
