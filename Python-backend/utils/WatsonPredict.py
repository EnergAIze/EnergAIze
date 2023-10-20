import requests
import pandas as pd
import os


#  TODO: create function
#

def solar_predict(average_historical_data: pd.DataFrame):

    solar_energy = []
    payload_values = []
    for _, row in average_historical_data.iterrows():
        avgTemp = row["Temperature"]
        avgHumidity = row["Relative Humidity"]
        avgZAngle = row["Solar Zenith Angle"]
        avgWSpeed = row["Wind Speed"]
        payload_values.append([avgTemp, avgHumidity, avgZAngle, avgWSpeed])

    token_response = requests.post('https://iam.cloud.ibm.com/identity/token',
                                   data={"apikey": os.environ["IBM_API_KEY"],
                                         "grant_type": 'urn:ibm:params:oauth:grant-type:apikey'})

    mltoken = token_response.json()["access_token"]

    # NOTE: manually define and pass the array(s) of values to be scored in the next line
    payload_scoring = {"input_data": [{"fields": ['Temperature',  'Relative Humidity',
                                                  'Solar Zenith Angle', 'Wind Speed'], "values": payload_values}]}

    response_scoring = requests.post(os.environ["IBM_URL"],
                                     json=payload_scoring, headers={'Authorization': 'Bearer ' + mltoken})

    if response_scoring.json().get('predictions'):
        for i in response_scoring.json()['predictions'][0]['values']:
            solar_energy.append(i[0])
    else:
        return [0]*len(average_historical_data)

    return solar_energy
