from pysolar.solar import *
from timezonefinder import TimezoneFinder
import datetime
import pytz
import pandas as pd

def get_utcoffset_from_coordinates(latitude, longitude):
    if isinstance(latitude, str): latitude = float(latitude)
    if isinstance(longitude, str): longitude = float(longitude)
    # initialize Nominatim API
    obj = TimezoneFinder()
    result = obj.timezone_at(lng=longitude, lat=latitude)
    timezone = pytz.timezone(result)
    dt = datetime.datetime.now()
    return timezone.utcoffset(dt)


def get_solar_zenith_angle_incl_offset(latitude, longitude, year, month, day, hour, minute, utc_offset):
    if isinstance(latitude, str): latitude = float(latitude)
    if isinstance(longitude, str): longitude = float(longitude)
    dobj = datetime.datetime(year, month, day, hour,
                            minute, tzinfo=datetime.timezone.utc) + utc_offset
    sza = float(90) - get_altitude_fast(latitude, longitude, dobj)
    return sza


def get_solar_zenith_angle_by_row(latitude, longitude, utc_offset, row):
    # global latitude, longitude, utc_offset
    return get_solar_zenith_angle_incl_offset(latitude, longitude, row['Year'], row['Month'], row['Day'], row['Hour'], row['Minute'], utc_offset)

