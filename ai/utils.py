import pandas as pd
import numpy as np

def create_features(df, start_date):
    """
    Tạo các đặc trưng cho dữ liệu chuỗi thời gian, không có is_holiday.

    Parameters:
    - df: DataFrame chứa cột 'ds' (ngày)
    - start_date: Ngày bắt đầu để tính t

    Returns:
    - DataFrame chứa các đặc trưng
    """
    df = df.copy()
    df['t'] = (df['ds'] - start_date).dt.days
    df['t2'] = df['t'] ** 2
    df['day_of_week'] = df['ds'].dt.dayofweek
    day_of_week_dummies = pd.get_dummies(df['day_of_week'], prefix='dow')
    for i in range(7):
        col = f'dow_{i}'
        if col not in day_of_week_dummies:
            day_of_week_dummies[col] = 0
    df = pd.concat([df, day_of_week_dummies[[f'dow_{i}' for i in range(7)]]], axis=1)
    df['year_fraction'] = df['ds'].dt.dayofyear / 365.25
    df['seasonal_sin'] = np.sin(2 * np.pi * df['year_fraction'])
    df['seasonal_cos'] = np.cos(2 * np.pi * df['year_fraction'])
    return df

def get_feature_columns():
    """
    Trả về danh sách các cột đặc trưng, không có is_holiday.
    """
    return ['t', 't2', 'dow_0', 'dow_1', 'dow_2', 'dow_3', 'dow_4', 'dow_5', 'dow_6',
            'seasonal_sin', 'seasonal_cos']