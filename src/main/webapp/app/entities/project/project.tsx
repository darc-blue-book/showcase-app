import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Project extends React.Component<IProjectProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { projectList, match } = this.props;
    return (
      <div>
        <h2 id="project-heading">
          Projects
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Project
          </Link>
        </h2>
        <div className="table-responsive">
          {projectList && projectList.length > 0 ? (
            <Table responsive aria-describedby="project-heading">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Description</th>
                  <th>Funds</th>
                  <th>Image</th>
                  <th>City</th>
                  <th>Country</th>
                  <th>Score</th>
                  <th>Expert Id</th>
                  <th>Initiator Id</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {projectList.map((project, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${project.id}`} color="link" size="sm">
                        {project.id}
                      </Button>
                    </td>
                    <td>{project.title}</td>
                    <td>
                      <TextFormat type="date" value={project.start} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={project.end} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{project.description}</td>
                    <td>{project.funds}</td>
                    <td>{project.image}</td>
                    <td>{project.city}</td>
                    <td>{project.country}</td>
                    <td>{project.score}</td>
                    <td>{project.expertId ? <Link to={`expert/${project.expertId.id}`}>{project.expertId.id}</Link> : ''}</td>
                    <td>{project.initiatorId ? project.initiatorId.id : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${project.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${project.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${project.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Projects found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ project }: IRootState) => ({
  projectList: project.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
