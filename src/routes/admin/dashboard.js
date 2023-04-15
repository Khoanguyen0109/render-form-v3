import React, { lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import FormDetail from '../../container/project/FormDetail';
import Project from '../../container/project/Project';

const Dashboard = lazy(() => import('../../container/dashboard'));

function DashboardRoutes() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/:formId`} component={FormDetail} />
      <Route exact path={path} component={Project} />
    </Switch>
  );
}

export default DashboardRoutes;
