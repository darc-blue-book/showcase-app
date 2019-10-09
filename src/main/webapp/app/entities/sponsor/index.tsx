import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Sponsor from './sponsor';
import SponsorDetail from './sponsor-detail';
import SponsorUpdate from './sponsor-update';
import SponsorDeleteDialog from './sponsor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SponsorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SponsorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SponsorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Sponsor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SponsorDeleteDialog} />
  </>
);

export default Routes;
