import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProjectDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProjectDetail extends React.Component<IProjectDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { projectEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            {projectEntity.title}
          </h2>
          <dl className="jh-entity-details">
            <dd>
              <img className="bd-placeholder-img" width="195px" height="129px" src={'content/images/projects/' + projectEntity.image} />
            </dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{projectEntity.description}</dd>
            <dt>
              <span id="city">City</span>
            </dt>
            <dd>{projectEntity.city}</dd>
            <dt>
              <span id="country">Country</span>
            </dt>
            <dd>{projectEntity.country}</dd>
            <dt>
              <span id="score">Score</span>
            </dt>
            <dd>{projectEntity.score}</dd>

            <dt>
              <span id="start">Start</span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.start} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="end">End</span>
            </dt>
            <dd>
              <TextFormat value={projectEntity.end} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="funds">Funds</span>
            </dt>
            <dd>{projectEntity.funds}</dd>
            {/* <dt>
              <span id="image">Image</span>
            </dt>
            <dd>{projectEntity.image}</dd> */}
            <dt>
              <span id="volunteerNumber">Volunteer Number</span>
            </dt>
            <dd>{projectEntity.volunteerNumber}</dd>
            <dt>
              <span id="videoUrl">Video Url</span>
            </dt>
            <dd>{projectEntity.videoUrl}</dd>
            <dt>Expert Id</dt>
            <dd>{projectEntity.expertId ? projectEntity.expertId.id : ''}</dd>
            <dt>Initiator Id</dt>
            <dd>{projectEntity.initiatorId ? projectEntity.initiatorId.id : ''}</dd>
          </dl>


          <Button tag={Link} to="/entity/sponsor/new" replace color="info">
            <span className="">Become a Sponsor</span>
          </Button>
          &nbsp;
          <Button tag={Link} to="" replace color="info">
            <span className="">Volunteer</span>
          </Button>
          &nbsp;
          <Button tag={Link} to="" replace color="info">
            <span className="">Apply as Expert</span>
          </Button>
          &nbsp;

          <Button tag={Link} to={`/entity/project/${projectEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ project }: IRootState) => ({
  projectEntity: project.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectDetail);
