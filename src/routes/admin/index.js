import React, { Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Dashboard from './dashboard';
import Submitted from './submitted';

import withAdminLayout from '../../layout/withAdminLayout';

const Admin = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/submitted`} component={Submitted} />
      <Route path={path} component={Dashboard} />
    </Switch>
  );
};

export default withAdminLayout(Admin);
