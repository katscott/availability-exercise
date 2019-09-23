import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import actions from '../redux/actions';
import selectors from "../redux/selectors";

export class BookingsList extends Component {
  componentDidMount() {
    this.props.getBookings();
  }

  render() {
    let bookings = this.props.bookings;
    let bookings_keys = Object.keys(bookings);
    return (
      <table className="bookings table">
        <thead>
          <tr>
            <th>Advisor ID</th>
            <th>Student Name</th>
            <th>Date/Time</th>
          </tr>
        </thead>
        <TransitionGroup className="list-unstyled" component="tbody">
          {bookings && bookings_keys.length 
            ? bookings_keys.map((advisor_id, index) => (
              Object.keys(bookings[advisor_id]).map((time, index) => (
                <CSSTransition key={advisor_id + '_' + time} timeout={500} classNames="booked-time">
                  <tr className="bookings-item">
                    <td>{advisor_id}</td>
                    <td>{bookings[advisor_id][time]}</td>
                    <td>
                      <time dateTime="{time}">{moment(time).format("M/D/YYYY h:mm a")}</time>
                    </td>
                  </tr>
                </CSSTransition>
              ))
            )) : <CSSTransition timeout={500} classNames="booked-time"><tr><td colSpan="3">No Bookings</td></tr></CSSTransition>}
        </TransitionGroup>
      </table>
    );
  }
}

const mapStateToProps = state => {
  const bookings = selectors.getBookings(state);
  return { bookings };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookings: () => {
      dispatch(actions.getBookings());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingsList);