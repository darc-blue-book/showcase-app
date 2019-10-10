import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './sponsor.reducer';
import { ISponsor } from 'app/shared/model/sponsor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISponsorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Sponsor extends React.Component<ISponsorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { sponsorList, match } = this.props;
    return (
      <div>
        <h2 id="sponsor-heading">
          Sponsors
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Sponsor
          </Link>
        </h2>
        <div className="table-responsive">
          {sponsorList && sponsorList.length > 0 ? (
            <Table responsive aria-describedby="sponsor-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Iban</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>User Id</th>
                  <th>Project</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sponsorList.map((sponsor, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${sponsor.id}`} color="link" size="sm">
                        {sponsor.id}
                      </Button>
                    </td>
                    <td>{sponsor.iban}</td>
                    <td>{sponsor.amount}</td>
                    <td>{sponsor.currency}</td>
                    <td>{sponsor.userId ? sponsor.userId.id : ''}</td>
                    <td>{sponsor.project ? <Link to={`project/${sponsor.project.id}`}>{sponsor.project.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${sponsor.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${sponsor.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${sponsor.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Sponsors found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ sponsor }: IRootState) => ({
  sponsorList: sponsor.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sponsor);
