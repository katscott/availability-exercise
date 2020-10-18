from datetime import date
from app import app, findClosestTime
from bookings import BOOKED_TIMES
from unittest import mock
import copy

BOOKED_TIME_MOCK_DEFAULT = {12345: {"2000-01-01T15:00:00-04:00": "John Doe"}}

# in a production app, I'd also use cucumber testing with apickli so you can run api tests on any deployment

def test_today():
    with app.test_client() as cli:
        resp = cli.get('/today')
        assert resp.status_code == 200
        assert resp.json == {"today": "{}".format(date.today())}


def test_availability(requests_mock):
    BOOKED_TIMES.clear()

    requests_mock.get(
        'https://www.thinkful.com/api/advisors/availability', 
        json={
            "01-01-2000": {"2000-01-01T15:00:00-04:00": 12345},
        },
    )

    with app.test_client() as cli:
        resp = cli.get('/availability')
        assert resp.status_code == 200
        assert resp.json == {"12345": ["2000-01-01T15:00:00-04:00"]}


def test_availability_booked(requests_mock):
    BOOKED_TIMES.clear()
    BOOKED_TIMES.update(copy.deepcopy(BOOKED_TIME_MOCK_DEFAULT))

    requests_mock.get(
        'https://www.thinkful.com/api/advisors/availability', 
        json={
            "01-01-2000": {"2000-01-01T15:00:00-04:00": 12345},
            "01-02-2000": {"2000-01-02T15:00:00-04:00": 12345},
        },
    )

    with app.test_client() as cli:
        resp = cli.get('/availability')
        assert resp.status_code == 200
        assert resp.json == {"12345": ["2000-01-02T15:00:00-04:00"]}


def test_availability_sorted(requests_mock):
    BOOKED_TIMES.clear()

    requests_mock.get(
        'https://www.thinkful.com/api/advisors/availability', 
        json={
            "01-04-2000": {"2000-01-04T15:00:00-04:00": 12345},
            "01-01-2000": {"2000-01-01T15:00:00-04:00": 12345},
            "01-03-2000": {"2000-01-03T15:00:00-04:00": 12345},
            "01-02-2000": {"2000-01-02T15:00:00-04:00": 12345},
        },
    )

    with app.test_client() as cli:
        resp = cli.get('/availability')
        assert resp.status_code == 200
        assert resp.json == {"12345": ["2000-01-01T15:00:00-04:00", "2000-01-02T15:00:00-04:00", "2000-01-03T15:00:00-04:00", "2000-01-04T15:00:00-04:00"]}


def test_booking_empty():
    BOOKED_TIMES.clear()

    with app.test_client() as cli:
        resp = cli.get('/bookings')
        assert resp.status_code == 200
        assert resp.json == {}


def test_booking():
    BOOKED_TIMES.clear()
    BOOKED_TIMES.update(copy.deepcopy(BOOKED_TIME_MOCK_DEFAULT))

    with app.test_client() as cli:
        resp = cli.get('/bookings')
        assert resp.status_code == 200
        assert resp.json == {"12345": {"2000-01-01T15:00:00-04:00": "John Doe"}}


def test_bookings_post():
    BOOKED_TIMES.clear()
    
    with app.test_client() as cli:
        resp = cli.post(
                '/bookings', 
                data=dict(advisor_id='12345', time='2000-01-01T15:00:00-04:00', student_name='John Doe')
        )
        assert resp.status_code == 200
        assert resp.json == {"booked": True}
        assert BOOKED_TIMES == BOOKED_TIME_MOCK_DEFAULT


def test_bookings_post_append():
    BOOKED_TIMES.clear()
    BOOKED_TIMES.update(copy.deepcopy(BOOKED_TIME_MOCK_DEFAULT))

    with app.test_client() as cli:
        resp = cli.post(
                '/bookings', 
                data=dict(advisor_id='12345', time='2000-01-02T15:00:00-04:00', student_name='John Doe')
        )
        assert resp.status_code == 200
        assert resp.json == {"booked": True}
        assert BOOKED_TIMES == {12345: {"2000-01-01T15:00:00-04:00": "John Doe", "2000-01-02T15:00:00-04:00": "John Doe"}}


def test_bookings_post_time_conflict():
    BOOKED_TIMES.clear()
    BOOKED_TIMES.update(copy.deepcopy(BOOKED_TIME_MOCK_DEFAULT))

    with app.test_client() as cli:
        resp = cli.post(
                '/bookings', 
                data=dict(advisor_id='12345', time='2000-01-01T15:00:00-04:00', student_name='Jane Doe')
        )
        assert resp.status_code == 200
        assert resp.json == {"booked": False, "message": "Time already booked"}
        assert BOOKED_TIMES == BOOKED_TIME_MOCK_DEFAULT


def test_get_closest_time_basic():
        time = '2000-01-01T15:00:00-04:00'
        times = [
                '2000-01-01T16:00:00-04:00',
                '2000-01-01T17:00:00-04:00'
                ]

        result = findClosestTime(time, times)

        assert result == '2000-01-01T16:00:00-04:00'


def test_get_closest_time_unordered():
        time = '2000-01-02T15:00:00-04:00'
        times = [
                '2000-01-01T16:00:00-04:00',
                '2000-01-02T16:00:00-04:00',
                '2000-01-01T18:00:00-04:00',
                '2000-01-03T16:00:00-04:00',
                '2000-01-01T17:00:00-04:00'
                ]

        result = findClosestTime(time, times)

        assert result == '2000-01-02T16:00:00-04:00'


def test_get_closest_time_after_midnight():
        time = '2000-01-01T23:00:00-04:00'
        times = [
                '2000-01-01T16:00:00-04:00',
                '2000-01-02T00:00:00-04:00'
                ]

        result = findClosestTime(time, times)

        assert result == '2000-01-02T00:00:00-04:00'