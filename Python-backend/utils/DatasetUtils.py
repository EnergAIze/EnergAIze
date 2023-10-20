import pandas as pd


def loadDataset(path):
    df = pd.read_csv(path, low_memory=False)
    return df[['Year', 'Month', 'Day', 'Temperature', 'Relative Humidity', 'GHI', 'Solar Zenith Angle', 'Wind Speed']]


def avgPerDay(df:pd.DataFrame):
    """
    Required Columns  : 'Year', 'Month', 'Day', 'Temperature', 'Wind Speed', 'Relative Humidity'

    Optional Columns : GHI
    """
    return_df = pd.DataFrame()
    return_df = df[['Year', 'Month', 'Day', 'Temperature', 'Wind Speed', 'Relative Humidity']].groupby(by=['Year', 'Month', 'Day']).mean().reset_index().copy()
    if 'GHI' in df.columns.to_list():
        return_df['GHI'] = df[df['GHI'] != 0][['Year', 'Month', 'Day', 'GHI']].groupby(by=['Year', 'Month', 'Day']).mean().reset_index()['GHI']
    if 'Pressure Mean Sea Level' in df.columns.to_list():
        return_df['Pressure Mean Sea Level'] = df[df['Pressure Mean Sea Level'] != 0][['Year', 'Month', 'Day', 'Pressure Mean Sea Level']].groupby(by=['Year', 'Month', 'Day']).mean().reset_index()['Pressure Mean Sea Level']
    if 'Solar Zenith Angle' in df.columns.to_list():
        return_df['Solar Zenith Angle'] = df['Solar Zenith Angle'].mean()
    return return_df


def avgPerMonth(df:pd.DataFrame):
    """
    Required Columns  : 'Year', 'Month', 'Day', 'Temperature', 'Wind Speed', 'Relative Humidity'
    
    Optional Columns : GHI
    """
    return_df = pd.DataFrame()
    return_df = df[['Year', 'Month', 'Temperature', 'Wind Speed', 'Relative Humidity']].groupby(by=['Year', 'Month']).mean().reset_index().copy()
    if 'GHI' in df.columns.to_list():
        return_df['GHI'] = df[df['GHI'] != 0][['Year', 'Month', 'GHI']].groupby(by=['Year', 'Month']).mean().reset_index()['GHI']
    if 'Pressure Mean Sea Level' in df.columns.to_list():
        return_df['Pressure Mean Sea Level'] = df[df['Pressure Mean Sea Level'] != 0][['Year', 'Month', 'Pressure Mean Sea Level']].groupby(by=['Year', 'Month']).mean().reset_index()['Pressure Mean Sea Level']
    if 'Solar Zenith Angle' in df.columns.to_list():
        return_df['Solar Zenith Angle'] = df['Solar Zenith Angle'].mean()
    return return_df

def avgPerYear(df:pd.DataFrame):
    """
    Required Columns  : 'Year', 'Month', 'Day', 'Temperature', 'Wind Speed', 'Relative Humidity'
    
    Optional Columns : GHI
    """
    return_df = pd.DataFrame()
    return_df = df[['Year', 'Temperature', 'Wind Speed', 'Relative Humidity']].groupby(by=['Year']).mean().reset_index().copy()
    if 'GHI' in df.columns.to_list():
        return_df['GHI'] = df[df['GHI'] != 0][['Year', 'GHI']].groupby(by=['Year']).mean().reset_index()['GHI']
    if 'Pressure Mean Sea Level' in df.columns.to_list():
        return_df['Pressure Mean Sea Level'] = df[df['Pressure Mean Sea Level'] != 0][['Year', 'Pressure Mean Sea Level']].groupby(by=['Year']).mean().reset_index()['Pressure Mean Sea Level']
    if 'Solar Zenith Angle' in df.columns.to_list():
        return_df['Solar Zenith Angle'] = df['Solar Zenith Angle'].mean()
    return return_df