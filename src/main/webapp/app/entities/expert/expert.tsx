import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './expert.reducer';
import { IExpert } from 'app/shared/model/expert.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpertProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Expert extends React.Component<IExpertProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { expertList, match } = this.props;
    return (
      <div>
        <h2 id="expert-heading">
          Experts
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Expert
          </Link>
        </h2>
        <div className="table-responsive">
          {expertList && expertList.length > 0 ? (
            <Table responsive aria-describedby="expert-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Expertise</th>
                  <th>User Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {expertList.map((expert, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${expert.id}`} color="link" size="sm">
                        {expert.id}
                      </Button>
                    </td>
                    <td>{expert.expertise}</td>
                    <td>{expert.userId ? expert.userId.id : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${expert.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${expert.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${expert.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Experts found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ expert }: IRootState) => ({
  expertList: expert.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expert);
