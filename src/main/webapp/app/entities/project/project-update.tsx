import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IExpert } from 'app/shared/model/expert.model';
import { getEntities as getExperts } from 'app/entities/expert/expert.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './project.reducer';
import { IProject } from 'app/shared/model/project.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProjectUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProjectUpdateState {
  isNew: boolean;
  expertIdId: string;
  initiatorIdId: string;
  userId: string;
}

export class ProjectUpdate extends React.Component<IProjectUpdateProps, IProjectUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      expertIdId: '0',
      initiatorIdId: '0',
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getExperts();
    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.start = convertDateTimeToServer(values.start);
    values.end = convertDateTimeToServer(values.end);

    if (errors.length === 0) {
      const { projectEntity } = this.props;
      const entity = {
        ...projectEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/project');
  };

  render() {
    const { projectEntity, experts, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bluebookApp.project.home.createOrEditLabel">Create or edit a Project</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : projectEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="project-id">ID</Label>
                    <AvInput id="project-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="project-title">
                    Title
                  </Label>
                  <AvField id="project-title" type="text" name="title" />
                </AvGroup>
                <AvGroup>
                  <Label id="startLabel" for="project-start">
                    Start
                  </Label>
                  <AvInput
                    id="project-start"
                    type="datetime-local"
                    className="form-control"
                    name="start"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.projectEntity.start)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="endLabel" for="project-end">
                    End
                  </Label>
                  <AvInput
                    id="project-end"
                    type="datetime-local"
                    className="form-control"
                    name="end"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.projectEntity.end)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="project-description">
                    Description
                  </Label>
                  <AvField id="project-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="fundsLabel" for="project-funds">
                    Funds
                  </Label>
                  <AvField id="project-funds" type="string" className="form-control" name="funds" />
                </AvGroup>
                <AvGroup>
                  <Label id="imageLabel" for="project-image">
                    Image
                  </Label>
                  <AvField id="project-image" type="text" name="image" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="project-city">
                    City
                  </Label>
                  <AvField id="project-city" type="text" name="city" />
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="project-country">
                    Country
                  </Label>
                  <AvField id="project-country" type="text" name="country" />
                </AvGroup>
                <AvGroup>
                  <Label id="scoreLabel" for="project-score">
                    Score
                  </Label>
                  <AvField id="project-score" type="string" className="form-control" name="score" />
                </AvGroup>
                <AvGroup>
                  <Label for="project-expertId">Expert Id</Label>
                  <AvInput id="project-expertId" type="select" className="form-control" name="expertId.id">
                    <option value="" key="0" />
                    {experts
                      ? experts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="project-initiatorId">Initiator Id</Label>
                  <AvInput id="project-initiatorId" type="select" className="form-control" name="initiatorId.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/project" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  experts: storeState.expert.entities,
  users: storeState.userManagement.users,
  projectEntity: storeState.project.entity,
  loading: storeState.project.loading,
  updating: storeState.project.updating,
  updateSuccess: storeState.project.updateSuccess
});

const mapDispatchToProps = {
  getExperts,
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectUpdate);
