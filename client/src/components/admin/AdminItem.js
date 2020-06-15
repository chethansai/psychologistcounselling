import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteSession } from '../../actions/admin';
import { connect } from 'react-redux';

const AdminItem = ({
  session: { _id, roomid, user, date },
  deleteSession,
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}></Link>
    </div>
    <div>
      <p className="my-1">{roomid}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      <button
        onClick={() => {
          deleteSession(_id, user);
          window.location.reload();
        }}
        type="button"
        className="btn btn-danger"
      >
        <i className="fas fa-times" />
      </button>
      <Link to={`/room/${roomid}`} className="btn btn-primary">
        Go to chat room
      </Link>
    </div>
  </div>
);

AdminItem.defaultProps = {
  showActions: true
};

AdminItem.propTypes = {
  session: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteSession })(AdminItem);
