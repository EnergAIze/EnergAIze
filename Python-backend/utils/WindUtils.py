import pandas as pd


def get_windOutput(average_historical_data:pd.DataFrame):
    # 400 * 400 sq. m for 1 turbine
    radius = 35.35  # reference - https://blog.arcadia.com/common-sizes-wind-turbines/
    wind_energy = []
    for index, row in average_historical_data.iterrows():
        avgTemp = row["Temperature"]
        avgPressure = row["Pressure Mean Sea Level"]
        avgWSpeed = row["Wind Speed"]
        density = avgPressure / (287.05 * (avgTemp + 273.15))
        wind_energy.append(density * pow(avgWSpeed, 3) * 3.14 * radius * radius)
    return wind_energy
