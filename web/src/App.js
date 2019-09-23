import React, { Component } from 'react';
import { connect } from "react-redux";

import actions from './redux/actions';
import selectors from "./redux/selectors";

import AdvisorsAvailabilityList from './components/AdvisorsAvailabilityList';
import BookingsList from './components/BookingsList';

export class App extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.hideMessage = this.hideMessage.bind(this);
    }

    componentDidMount() {
        this.props.getToday();
    }

    componentWillUnmount() {
        clearTimeout(this.messageTimeout)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            this.showMessage();
        }
    }

    showMessage() {
        this.refs.fixedMessage.style.display = "block";
        this.messageTimeout = setTimeout(this.hideMessage, 5000)
    }

    hideMessage() {
        this.refs.fixedMessage.style.display = "none";
        this.messageTimeout = null;
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    handleChange(e) {
        this.props.updateStudentName(e.target.value);
    }

    render() {
        const today = this.props.today;
        const student_name = this.props.student_name;
        const error = this.props.error;
        return (
            <div className="App container">
                <h1>Book Time with an Advisor</h1>

                {today && <span id="today">Today is {today}.</span>}

                <div id="fixed-message" ref="fixedMessage" style={{ display: 'none' }}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="alert alert-danger" role="alert">
                                {error.message}
                            </div>
                        </div>
                    </div>
                </div>

                <form id="name-form" className="col-md-6" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name-field">Your Name</label>
                        <input type="text" id="name-field" className="form-control" required value={student_name} onChange={this.handleChange} />
                    </div>
                </form>

                <h2>Available Times</h2>
                <AdvisorsAvailabilityList />

                <h2>Booked Times</h2>
                <BookingsList />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const today = selectors.getToday(state);
    const studentName = selectors.getStudentName(state);
    const error = selectors.getError(state);
    return { today, studentName, error };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getToday: () => {
            dispatch(actions.getToday());
        },
        updateStudentName: (name) => {
            dispatch(actions.updateStudentName(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

