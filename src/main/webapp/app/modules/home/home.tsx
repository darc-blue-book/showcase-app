import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Row>
      <Col >
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
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



        <h2>Welcome, DARC Developer!  TEST!</h2>
        <p className="lead">This will be our landing page, and you can edit the content in showcase-bluebook/src/main/webapp/app/modules/home/home.tsx</p>
        {account && account.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        ) : (
            <div>
              <Alert color="warning">
                If you want to
              <Link to="/login" className="alert-link">
                  {' '}
                  sign in
              </Link>
                , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
            </Alert>

              <Alert color="warning">
                You do not have an account yet?&nbsp;
              <Link to="/account/register" className="alert-link">
                  Register a new account
              </Link>
              </Alert>
            </div>
          )}
        <p>Useful links:</p>

        <ul>
          <li>
            <a href="https://github.com/darc-blue-book/showcase-bluebook/wiki" target="_blank" rel="noopener noreferrer">
              dark-blue-book wiki
            </a>
          </li>
          <li>
            <a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">
              JHipster homepage
             </a>
          </li>
        </ul>


      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
