import threading

BOOKED_TIMES = {}
threadLock = threading.Lock() # super

def get_booked_times():
    global BOOKED_TIMES
    return BOOKED_TIMES

def add_booked_time(advisor_id, time, student_name):
    global BOOKED_TIMES
    with threadLock:
        BOOKED_TIMES.setdefault(advisor_id, {}).update({time: student_name})