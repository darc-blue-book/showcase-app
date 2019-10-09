import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Expert from './expert';
import ExpertDetail from './expert-detail';
import ExpertUpdate from './expert-update';
import ExpertDeleteDialog from './expert-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ExpertUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ExpertUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ExpertDetail} />
      <ErrorBoundaryRoute path={match.url} component={Expert} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ExpertDeleteDialog} />
  </>
);

export default Routes;
