import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import actions from '../redux/actions';
import selectors from '../redux/selectors';

import AdvisorAvailabilityList from './AdvisorAvailabilityList';

export class AdvisorsAvailabilityList extends Component {
    componentDidMount() {
        this.props.getAvailability();
    }

    render() {
        let availability = this.props.availability;
        let keys = Object.keys(availability);
        return (
            <table className="advisors table">
                {/* USABILITY NOTES: This really could use some accordians/collapsing as lots of advisors/availability makes it a longer list. */}
                <thead>
                    <tr>
                        <th>Advisor ID</th>
                        <th>Available Times</th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    {availability && keys.length
                        ? keys.map((advisor_id, index) => (
                            <CSSTransition key={advisor_id} timeout={500} classNames="advisors">
                                <tr className="advisor-row">
                                    <td>{advisor_id}</td>
                                    <td>
                                        <AdvisorAvailabilityList advisor_id={advisor_id} availability={availability[advisor_id]} />
                                    </td>
                                </tr>
                            </CSSTransition>
                        )
                        ) : <CSSTransition timeout={500} classNames="advisors"><tr><td colSpan="3">No advisors have upcoming availability.</td></tr></CSSTransition>}
                </TransitionGroup>
            </table>
        );
    }
}

const mapStateToProps = state => {
    const availability = selectors.getAvailability(state);
    return { availability };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAvailability: () => {
            dispatch(actions.getAvailability());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvisorsAvailabilityList);