import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, CardGroup, Card } from 'react-bootstrap';
const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Live Psychologist Help</h1>
          <p className="lead">
            Get one on one video counselling session with professional
            counselling psychologists and psychotherapists
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
        <CardGroup>
          <Card bg="primary" text="white" className="text-center p-3">
            {' '}
            <Card.Body>
              <Card.Title>Child Counselling</Card.Title>
              <Card.Text>
                <o>
                  <li>Kids</li>
                  <li>Emotional Outbursts</li>
                  <li>Childhood Problems</li>
                  <li>Parental Aspirations</li>
                  <li>Phobias ​</li>
                  <li>Adjustment problems in Schools</li>
                  <li>Bed Wetting ​</li>
                  <li>Sibling Rivalry</li>
                  <li>ADHD</li>
                  <li>ADD</li>
                </o>
                ​ ​ ​
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="secondary" text="white" className="text-center p-3">
            <Card.Body>
              <Card.Title> ADOLESCENT's PSYCHO-EMOTIONAL PROBLEMS</Card.Title>
              <Card.Text>
                <o>
                  <li>Lack of Concentration​</li>
                  <li>Memory Problems</li>
                  <li>Phobias</li>
                  <li>Teenage Love and Attraction​ ​</li>
                  <li>Smart phone and Internet addiction​</li>
                  <li>Adjustment Problems with Parents​ ​</li>
                  <li>Insecurity Feelings</li>
                  <li>Suicidal Thoughts </li>
                </o>
                ​ ​ ​ ​ ​ ​
              </Card.Text>
            </Card.Body>
          </Card>
          <Card bg="warning" text="white" className="text-center p-3">
            <Card.Body>
              <Card.Title>GENERAL PSYCHOLOGICAL DISORDERS</Card.Title>
              <Card.Text>
                <o>
                  <li>Adolescent's Problems at Home and Outside</li>
                  <li>​Anxiety and Depression among Youth ​ Depression</li>
                  <li>Employees ​ Depression</li>
                  <li>Women ​ Geriatric Problems ​</li>
                  <li>Loneliness​</li>
                  <li>Insecurity Feelings</li>
                  <li>Suicidal Thoughts </li>
                </o>
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
        <div>
          <p></p>
          <Badge variant="danger">Contact:+91 8328247738</Badge>
          <p>
            Disclaimer: Please note that we are not a crisis intervention
            helpline. Should you have severe symptoms or have thought about
            harming yourself, please seek immediate medical help or call suicide
            prevention helplines
          </p>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
