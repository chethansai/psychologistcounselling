import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import { Badge } from 'react-bootstrap';

import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import api from '../../utils/api';
import auth from '../../reducers/auth';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { v1 as uuid } from 'uuid';
import {
  getRoomidstatus,
  getPsychologistavailablity
} from '../../actions/dashboard';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === 'localhost';
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
  getRoomidstatus,
  roomidstatus,
  getPsychologistavailablity,
  psychologistavailablity
}) => {
  useEffect(() => {
    getCurrentProfile();
    getRoomidstatus();
    getPsychologistavailablity();
  }, [getCurrentProfile]);
  const [name, setName] = useState('');

  async function gotoroom() {
    const linktoroom = { uuser: user };
    await fetch('/gotoroom', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(linktoroom)
    })
      .then((response) => response.json())

      .then((linktoroom) => {
        console.log('Success:', linktoroom);

        window.location = '/room/' + String(linktoroom);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function create() {
    console.log('sd');
    window.location = '/profiles';
  }
  async function displayRazorpay() {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const data = await fetch('/razorpay', {
      method: 'POST'
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? 'rzp_test_LLMu3MmYvL8st8' : 'rzp_test_LLMu3MmYvL8st8',
      currency: data.currency,
      amount: data.amount.toString(),

      name: 'Psychologist Help ',
      description: 'One on One 1 hour psychology help session over video',

      handler: async function (response) {
        const data = { paymentid: response.razorpay_payment_id, uuser: user };
        await fetch('/sessions', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        window.location.reload();
      },
      prefill: {
        name,
        email: '',
        phone_number: ''
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function roomy() {
    console.log('roomy', psychologistavailablity);
    console.log('ssd', getPsychologistavailablity());
  }
  function ee() {
    function qq() {
      var b = roomidstatus();
      console.log('bfqq', b);
      if (b == true) {
        console.log('qq', 'true');
        return true;
      } else {
        console.log('qq', 'false');
        return false;
      }
    }
    qq();
  }
  const ww = {};
  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>

      {true ? (
        <Fragment>
          <div className="my-2">
            <p>
              One on One 1 hour psychologist help session over video at
              Rupees-1999/-Only
            </p>
            <div>
              {psychologistavailablity ? (
                <div>
                  {roomidstatus ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => displayRazorpay()}
                      target="_blank"
                    >
                      <i className="fas fa-user-minus" /> Pay Now To Talk To
                      Psychologist
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() => gotoroom()}
                      target="_blank"
                    >
                      <i className="fas fa-user-minus" /> Talk To Psychologist
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  Currently our psychologists are busy helping others. Please
                  wait!
                </div>
              )}
            </div>
          </div>
          <div>
            {' '}
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
            <Badge variant="secondary">Contact:094905 49227</Badge>
            <p> </p>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  roomidstatus: state.dashboard.roomidstatus,
  psychologistavailablity: state.dashboard.psychologistavailablity
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getRoomidstatus,
  deleteAccount,
  getPsychologistavailablity
})(Dashboard);
