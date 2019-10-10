import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sponsor.reducer';
import { ISponsor } from 'app/shared/model/sponsor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISponsorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SponsorDetail extends React.Component<ISponsorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sponsorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Sponsor [<b>{sponsorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="iban">Iban</span>
            </dt>
            <dd>{sponsorEntity.iban}</dd>
            <dt>
              <span id="amount">Amount</span>
            </dt>
            <dd>{sponsorEntity.amount}</dd>
            <dt>
              <span id="currency">Currency</span>
            </dt>
            <dd>{sponsorEntity.currency}</dd>
            <dt>User Id</dt>
            <dd>{sponsorEntity.userId ? sponsorEntity.userId.id : ''}</dd>
            <dt>Project</dt>
            <dd>{sponsorEntity.project ? sponsorEntity.project.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/sponsor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/sponsor/${sponsorEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ sponsor }: IRootState) => ({
  sponsorEntity: sponsor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SponsorDetail);
