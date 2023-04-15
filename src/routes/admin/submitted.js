import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import SubmittedList from '../../container/submitted/SubmittedList';
import SubmittedDetail from '../../container/submitted/overview/SubmittedDetail';

function SubmittedRoute() {
  const { path } = useRouteMatch();
  console.log('path', path);
  return (
    <Switch>
      <Route exact path={path} component={SubmittedList} />
      <Route path={`${path}/:formId`} component={SubmittedDetail} />
    </Switch>
  );
}

export default SubmittedRoute;
