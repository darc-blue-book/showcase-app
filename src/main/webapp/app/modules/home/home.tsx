import './home.scss';

import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';


import { getEntities } from '../../entities/project/project.reducer';

import Projects from '../../entities/project/projects';
// import { ProjectCard } from '../../entities/project/project-card';

import { Row, Col, Alert } from 'reactstrap';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row >
      <Col >
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1" ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="content/images/carousel01.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Start your project and find experts and sponsors.</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src="content/images/carousel02.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>View the project you are interested in and apply as a volonteer.</h5>
              </div>
            </div>
            <div className="carousel-item">
              <img src="content/images/carousel03.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Many projects have published their success story here.</h5>
                <h5>You can learn from them.</h5>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>


        <Projects match={""} />




      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {
  getEntities
};

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
