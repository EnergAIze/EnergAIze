import os
from utils import WeatherAPIUtils, DatasetUtils, WindUtils, WatsonPredict
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/predict", methods=["GET"])
def hello_world():
    # Constants and values
    args = request.args
    latitude = args.get("latitude")
    longitude = args.get("longitude")
    area = int(args.get("area"))
    print("latitude", latitude)
    print("longitude", longitude)
    print("area", area)

    preferred = ""
    wind_mill_area = 400 * 400
    hwind = [0] * 3
    fwind = [0] * 15

    # latitude = "28.7041"  # delhi
    # longitude = "77.1025"  # delhi

    # historical compute
    historical_df = WeatherAPIUtils.historicalDataForPastYears(latitude, longitude, 3)
    prepared_hdf = WeatherAPIUtils.prepareHistoricalData(
        latitude, longitude, historical_df
    )
    average_historical_data = DatasetUtils.avgPerYear(prepared_hdf)

    # wind direction median
    med_winddir = prepared_hdf["Wind Direction"].median()

    # compute historical solar output
    historical_solar_output = WatsonPredict.solar_predict(average_historical_data)

    # compute historical wind output
    if area > wind_mill_area:
        historical_wind_output = WindUtils.get_windOutput(average_historical_data)
        hwind = [i * (area // wind_mill_area) for i in historical_wind_output]

    if sum(historical_solar_output) / len(historical_solar_output) > sum(
        historical_wind_output
    ) / len(historical_wind_output):
        preferred = "solar"
    else:
        preferred = "wind"

    # FORECAST
    forecast_data = WeatherAPIUtils.forecastData(latitude, longitude)
    prepared_fdf = WeatherAPIUtils.prepareForecastData(
        latitude, longitude, forecast_data
    )
    average_forecast_data = DatasetUtils.avgPerDay(prepared_fdf)
    # compute forecast solar output
    forcast_solar_output = WatsonPredict.solar_predict(average_forecast_data)

    # compute forecast wind output
    if area > wind_mill_area:
        forcast_wind_output = WindUtils.get_windOutput(average_forecast_data)
        fwind = [i * (area // wind_mill_area) for i in forcast_wind_output]

    # json build
    prediction_output = {
        "wind-mill-direction": med_winddir,
        "preferred": preferred,
        "historical": {
            "wind": hwind,
            "solar": [i * area for i in historical_solar_output],
        },
        "forecast": {"wind": fwind, "solar": [i * area for i in forcast_solar_output]},
    }
    return jsonify(prediction_output)


# main driver function
if __name__ == "__main__":
    app.run(port=5100)
