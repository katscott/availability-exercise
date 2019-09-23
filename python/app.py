from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import date, datetime
import requests
import requests_cache
import threading

from bookings import get_booked_times, add_booked_time

app = Flask(__name__)
if app.debug:
    CORS(app, resources={r"/*": {"origins": "*"}})
else:
    CORS(app)

# Cache may not be necessary for the availability respose as that is likely more needed to be always up-to-date,
# but many times a cache is necessary or useful for external APIs
requests_cache.install_cache('thinkful_cache', backend='memory', expire_after=600)

@app.route("/today", methods=["GET"])
def today():
    return jsonify({"today": date.today().isoformat()})


@app.route("/availability", methods=["GET"])
def availability():
    booked_times = get_booked_times()

    # the api seems to return past data...
    r = requests.get("https://www.thinkful.com/api/advisors/availability")
    data = r.json()

    merged_data = {}
    for _, date_values in data.items():
        for datetime_key, advisor_id in date_values.items():
            if advisor_id in booked_times:
                if datetime_key in booked_times[advisor_id]:
                    continue
            merged_data.setdefault(advisor_id, []).extend([datetime_key])

    for key, value in merged_data.items():
        sorted_values = sorted(value)
        merged_data[key] = sorted_values

    return jsonify(merged_data)


@app.route("/bookings", methods=["GET", "POST"])
def bookings():
    booked_times = get_booked_times()

    if request.method == 'POST':
        advisor_id = request.form.get('advisor_id')
        student_name = request.form.get('student_name')
        time = request.form.get('time')
        advisor_id_int = int(advisor_id)
        
        if advisor_id_int in booked_times and time in booked_times[advisor_id_int]:
            return jsonify({"booked": False, "message": "Time already booked"})
        
        add_booked_time(advisor_id_int, time, student_name)

        return jsonify({"booked": True})
    else:
        return jsonify(booked_times)
