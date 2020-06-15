import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSessions } from '../../actions/admin';
import AdminItem from './AdminItem';
import { getPsychologistavailablity } from '../../actions/dashboard';
const Admin = ({
  getSessions,
  sessions,
  getPsychologistavailablity,
  psychologistavailablity
}) => {
  useEffect(() => {
    getSessions();
    getPsychologistavailablity();
  }, [getSessions]);
  async function available() {
    {
      await fetch('/available', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      })
        .then((response) => response.json())

        .then((linktoroom) => {
          console.log('Success:', linktoroom);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    window.location.reload();
  }

  async function unavailable() {
    {
      await fetch('/unavailable', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      })
        .then((response) => response.json())

        .then((linktoroom) => {
          console.log('Success:', linktoroom);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    window.location.reload();
  }
  function sessionsrendering() {
    var e = getSessions();
    console.log('sessio', sessions);
    const list = [
      {
        id: 'a',
        firstname: 'Robin',
        lastname: 'Wieruch',
        year: 1988
      },
      {
        id: 'b',
        firstname: 'Dave',
        lastname: 'Davidds',
        year: 1990
      }
    ];

    return (
      <ul>
        {sessions.map((item) => (
          <li key={item.date}>
            <div>{item.date}</div>
            <div>{item.roomid}</div>
            <div>{item.user}</div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Fragment>
      <div>
        <div>
          <h1>Availablity</h1>
          <div>
            {psychologistavailablity ? <p>Available</p> : <p>Unavailable</p>}
          </div>
          <button
            className="btn btn-danger"
            onClick={() => available()}
            target="_blank"
          >
            <i className="fas fa-user-minus" /> Make Service Available
          </button>
          <button
            className="btn btn-danger"
            onClick={() => unavailable()}
            target="_blank"
          >
            <i className="fas fa-user-minus" /> Make Service Unavailable
          </button>
        </div>

        <h1>Gotoroom</h1>
        <div className="posts">
          {sessions.map((item) => (
            <AdminItem key={item._id} session={item} />
          ))}
        </div>

        <h1>Makenull</h1>
      </div>
    </Fragment>
  );
};
Admin.propTypes = {
  getSessions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  sessions: state.admin.sessions,
  psychologistavailablity: state.dashboard.psychologistavailablity
});

export default connect(mapStateToProps, {
  getSessions,
  getPsychologistavailablity
})(Admin);
