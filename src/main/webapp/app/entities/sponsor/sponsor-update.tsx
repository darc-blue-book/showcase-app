import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './sponsor.reducer';
import { ISponsor } from 'app/shared/model/sponsor.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISponsorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISponsorUpdateState {
  isNew: boolean;
  userIdId: string;
  projectId: string;
}

export class SponsorUpdate extends React.Component<ISponsorUpdateProps, ISponsorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userIdId: '0',
      projectId: '0',
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

    this.props.getUsers();
    this.props.getProjects();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { sponsorEntity } = this.props;
      const entity = {
        ...sponsorEntity,
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
    this.props.history.push('/entity/sponsor');
  };

  render() {
    const { sponsorEntity, users, projects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bluebookApp.sponsor.home.createOrEditLabel">Create or edit a Sponsor</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : sponsorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="sponsor-id">ID</Label>
                    <AvInput id="sponsor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ibanLabel" for="sponsor-iban">
                    Iban
                  </Label>
                  <AvField id="sponsor-iban" type="text" name="iban" />
                </AvGroup>
                <AvGroup>
                  <Label id="amountLabel" for="sponsor-amount">
                    Amount
                  </Label>
                  <AvField id="sponsor-amount" type="string" className="form-control" name="amount" />
                </AvGroup>
                <AvGroup>
                  <Label id="currencyLabel" for="sponsor-currency">
                    Currency
                  </Label>
                  <AvInput
                    id="sponsor-currency"
                    type="select"
                    className="form-control"
                    name="currency"
                    value={(!isNew && sponsorEntity.currency) || 'USD'}
                  >
                    <option value="USD">USD</option>
                    <option value="AUD">AUD</option>
                    <option value="POUND">POUND</option>
                    <option value="EURO">EURO</option>
                    <option value="REPEE">REPEE</option>
                    <option value="YEN">YEN</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sponsor-userId">User Id</Label>
                  <AvInput id="sponsor-userId" type="select" className="form-control" name="userId.id">
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
                <AvGroup>
                  <Label for="sponsor-project">Project</Label>
                  <AvInput id="sponsor-project" type="select" className="form-control" name="project.id">
                    <option value="" key="0" />
                    {projects
                      ? projects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/sponsor" replace color="info">
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
  users: storeState.userManagement.users,
  projects: storeState.project.entities,
  sponsorEntity: storeState.sponsor.entity,
  loading: storeState.sponsor.loading,
  updating: storeState.sponsor.updating,
  updateSuccess: storeState.sponsor.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getProjects,
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
)(SponsorUpdate);
