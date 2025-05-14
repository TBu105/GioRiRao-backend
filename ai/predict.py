import sys
import json
import numpy as np
import pandas as pd
from utils import create_features, get_feature_columns

def predict_revenue(weights, std, mean, start_date, num_days):
    """
    Dự đoán doanh thu dựa trên trọng số.

    Parameters:
    - weights: Array chứa các trọng số [w1, w2, ..., w9, b]
    - std: Đối tượng chứa độ lệch chuẩn để chuẩn hóa
    - mean: Đối tượng chứa giá trị trung bình để chuẩn hóa
    - start_date: Ngày bắt đầu dự đoán (str hoặc datetime)
    - num_days: Số ngày cần dự đoán

    Returns:
    - predictions: Array chứa doanh thu dự đoán
    - dates: Danh sách ngày tương ứng
    """
    if isinstance(start_date, str):
        start_date = pd.to_datetime(start_date)
        start_date = start_date + pd.Timedelta(days=1)

    future_dates = pd.date_range(start=start_date, periods=num_days)
    future_df = pd.DataFrame({'ds': future_dates})

    # Tạo đặc trưng
    future_df = create_features(future_df, start_date=future_df['ds'].min())

    # Chuẩn bị ma trận đặc trưng
    feature_columns = get_feature_columns()
    X_future = future_df[feature_columns].values

    # Chuẩn hóa thủ công
    std[std == 0] = 1  # tránh chia cho 0
    X_scaled = (X_future - mean) / std

    # Thêm cột 1 để cộng bias
    X_bias = np.hstack([X_scaled, np.ones((X_scaled.shape[0], 1))])

    # Dự đoán
    predictions = np.dot(X_bias, weights)
    predictions = np.maximum(0, predictions)  # không cho doanh thu âm
    predictions = predictions.tolist()

    future_dates = future_dates.strftime('%Y-%m-%d').tolist()


    return predictions, future_dates

if __name__ == "__main__":
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    weights = data['weights']
    start_date = data['start_date']
    num_days = data['num_days']
    std = data['std']
    mean = data['mean']

    predictions, dates = predict_revenue(weights, std, mean, start_date, num_days)

    output = {
        "dates": dates,
        "predictions": predictions
    }

    print(json.dumps(output))
