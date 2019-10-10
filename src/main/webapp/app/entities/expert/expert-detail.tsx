import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './expert.reducer';
import { IExpert } from 'app/shared/model/expert.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IExpertDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ExpertDetail extends React.Component<IExpertDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { expertEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Expert [<b>{expertEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="picture">Picture</span>
            </dt>
            <dd>
              {expertEntity.picture ? (
                <div>
                  <a onClick={openFile(expertEntity.pictureContentType, expertEntity.picture)}>
                    <img src={`data:${expertEntity.pictureContentType};base64,${expertEntity.picture}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {expertEntity.pictureContentType}, {byteSize(expertEntity.picture)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="expertise">Expertise</span>
            </dt>
            <dd>{expertEntity.expertise}</dd>
            <dt>User Id</dt>
            <dd>{expertEntity.userId ? expertEntity.userId.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/expert" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/expert/${expertEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ expert }: IRootState) => ({
  expertEntity: expert.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpertDetail);
