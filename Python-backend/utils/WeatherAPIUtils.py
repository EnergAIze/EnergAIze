import requests
import io
import pandas as pd
import os
from datetime import datetime, timedelta
import json
import time

from utils.SolarUtils import get_solar_zenith_angle_by_row, get_utcoffset_from_coordinates


def historicalDataForPastYears(latitude: str, longitude: str, years: int = 3):
    dt_today = datetime.now()
    curr_yr = int(dt_today.year)
    first_yr, last_yr = curr_yr-years, curr_yr-1
    url = "https://api.weather.com/v3/wx/hod/r1/direct"
    querystring = {"geocode": f"{latitude},{longitude}",
                   "startDateTime": f"{first_yr}-01-01",
                   "endDateTime": f"{last_yr}-12-31",
                   "language": "en-US",
                   "units": "si",
                   "format": "csv",
                   "apiKey": os.environ['WEATHER_API_KEY'],
                   "compact": "true",
                   "products": "windDirection,windSpeed,temperature,relativeHumidity,pressureMeanSeaLevel"}
    payload = ""

    dataframes = []
    while True:
        response = requests.request(
            "GET", url, data=payload, params=querystring)
        if response.status_code == 200:
            file = io.StringIO(response.text)
            df = pd.read_csv(file)
            dataframes.append(df)
            next_page = response.headers.get('next-page-number')
            if next_page:
                querystring['pageNumber'] = next_page
            else:
                break
        else:
            print(f"Error: {response.status_code}")
        time.sleep(0.2)
    return pd.concat(dataframes, ignore_index=True)


def forecastData(latitude: str, longitude: str):
    url = "https://api.weather.com/v3/wx/forecast/hourly/15day/enterprise"
    querystring = {"geocode": f"{latitude},{longitude}",
                   "format": "json",
                   "units": "s",
                   "language": "en-US",
                   "apiKey": os.environ['WEATHER_API_KEY']}
    payload = ""
    response = requests.request("GET", url, data=payload, params=querystring)
    d = json.loads(response.text)
    return pd.DataFrame(d)

# 2022-10-22T00:00:00+0000


def parseYear(row):
    return int(row['validTimeUtc'].split('T')[0].split('-')[0])


def parseMonth(row):
    return int(row['validTimeUtc'].split('T')[0].split('-')[1])


def parseDay(row):
    return int(row['validTimeUtc'].split('T')[0].split('-')[2])


def prepareHistoricalData(latitude, longitude, historical_df):
    uts_offset = get_utcoffset_from_coordinates(latitude, longitude)
    historical_df.rename(columns={'windDirection': 'Wind Direction',
                                  'windSpeed': 'Wind Speed',
                                  'temperature': 'Temperature',
                                  'relativeHumidity': 'Relative Humidity',
                                  'pressureMeanSeaLevel': 'Pressure Mean Sea Level'}, inplace=True)

    historical_df['Temperature'] = historical_df['Temperature'] - 273.15
    historical_df['Year'] = historical_df.apply(
        lambda row: parseYear(row), axis=1)
    historical_df['Month'] = historical_df.apply(
        lambda row: parseMonth(row), axis=1)
    historical_df['Day'] = historical_df.apply(
        lambda row: parseDay(row), axis=1)
    historical_df['Hour'] = 12
    historical_df['Minute'] = 00
    historical_df['Solar Zenith Angle'] = historical_df.apply(
        lambda row: get_solar_zenith_angle_by_row(latitude, longitude, uts_offset, row), axis=1)
    return historical_df[['Year', 'Month', 'Day', 'Temperature', 'Wind Speed', 'Relative Humidity', 'Wind Direction', 'Pressure Mean Sea Level', 'Solar Zenith Angle']]


def prepareForecastData(latitude, longitude, df: pd.DataFrame):
    uts_offset = get_utcoffset_from_coordinates(latitude, longitude)
    df['validTimeUtc'] = df.apply(lambda row: time.strftime(
        '%Y-%m-%dT%H:%M:%S', time.localtime(row['validTimeUtc'])), axis=1)

    df.rename(columns={'pressureMeanSeaLevel': 'Pressure Mean Sea Level',
                       'relativeHumidity': 'Relative Humidity',
                       'temperature': "Temperature",
                       "windSpeed": "Wind Speed",
                       "windDirection": "Wind Direction",
                       "pressureAltimeter": "Pressure Altimeter"
                       }, inplace=True)

    df['Year'] = df.apply(lambda row: parseYear(row), axis=1)
    df['Month'] = df.apply(lambda row: parseMonth(row), axis=1)
    df['Day'] = df.apply(lambda row: parseDay(row), axis=1)
    df['Hour'] = 12
    df['Minute'] = 00
    df['Solar Zenith Angle'] = df.apply(
        lambda row: get_solar_zenith_angle_by_row(latitude, longitude, uts_offset, row), axis=1)

    return df[['Year', 'Month', 'Day', 'Temperature', 'Wind Speed', 'Relative Humidity', 'Wind Direction', 'Pressure Mean Sea Level', 'Pressure Altimeter', 'Solar Zenith Angle']]
