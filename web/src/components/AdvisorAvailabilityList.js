import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import actions from '../redux/actions';
import selectors from '../redux/selectors';

export class AdvisorAvailabilityList extends Component {
    constructor(props) {
        super(props);
        this.handleBookTimeRequest = this.handleBookTimeRequest.bind(this);
        this.handleBookTimeError = this.handleBookTimeError.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            this.handleBookTimeError(this.props.error.source);
        }
    }

    handleBookTimeRequest(e) {
        e.preventDefault();
        e.target.setAttribute('disabled', 'disabled');
        e.target.setAttribute('aria-disabled', 'true');
        this.props.bookTime(
            e.target,
            e.target.dataset.advisor_id,
            e.target.dataset.time
        );
    }

    handleBookTimeError(target) {
        if (target && target.removeAttribute) {
            target.removeAttribute('disabled');
            target.removeAttribute('aria-disabled');
        }
    }

    render() {
        let advisor_id = this.props.advisor_id;
        let availability = this.props.availability;
        return (
            <TransitionGroup className="list-unstyled" component="ul">
                {availability.map((time, index) => (
                    <CSSTransition key={advisor_id + '_' + time} timeout={500} classNames="advisors-time">
                        <li>
                            <time dateTime={time} className='book-time'>
                                {moment(time).format('M/D/YYYY h:mm a')}
                            </time>
                            <button
                                className='book btn-small btn-primary'
                                data-time={time}
                                data-advisor_id={advisor_id}
                                onClick={this.handleBookTimeRequest}
                            >Book
                            </button>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        );
    }
}

const mapStateToProps = state => {
    const error = selectors.getError(state);
    return { error };
  };

const mapDispatchToProps = (dispatch) => {
    return {
        bookTime: (target, advisor_id, time) => {
            dispatch(actions.bookTime(target, advisor_id, time));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorAvailabilityList);
