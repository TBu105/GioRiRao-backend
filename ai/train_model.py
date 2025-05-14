# ai/train_model.py
import sys
import json
import logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s:%(message)s")
import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error
from utils import create_features, get_feature_columns

def train_model_from_json(json_data):
    """
    Huấn luyện mô hình dự đoán doanh thu từ danh sách JSON object.

    Parameters:
    - json_data: List chứa các dict với 'createAt' và 'revenue'

    Returns:
    - weights: Array chứa các trọng số [w1, w2, ..., w9, b]
    - scaler: Obj chứa mean và std để tái chuẩn hóa    
    - last_date: Ngày cuối trong dữ liệu
    """
    # Tạo DataFrame từ JSON
    df = pd.DataFrame(json_data)

    # Đổi tên các cột để đồng bộ
    df = df.rename(columns={'createAt': 'ds', 'revenue': 'y'})
    df['ds'] = pd.to_datetime(df['ds'])
    df = df.sort_values('ds').reset_index(drop=True)

    # Kiểm tra dữ liệu
    if len(df) < 11:
        raise ValueError("Dữ liệu quá ít, cần ít nhất 11 dòng để huấn luyện.")
    if (df['y'] <= 0).any():
        print("Cảnh báo: Có giá trị doanh thu âm hoặc bằng 0.")

    # Tạo đặc trưng
    start_date = df['ds'].min()
    df = create_features(df, start_date)

    # Chuẩn bị dữ liệu
    feature_columns = get_feature_columns()
    # X = df[feature_columns].values
    X = df[feature_columns].to_numpy(dtype=np.float64).reshape(-1, len(feature_columns))
    y = df['y'].values.reshape(-1, 1)

    # Chuẩn hóa dữ liệu
    mean = X.mean(axis=0)
    std = X.std(axis=0)
    std[std == 0] = 1  # tránh chia cho 0
    X_scaled = (X - mean) / std

    # Thêm cột bias
    X_bias = np.hstack([X_scaled, np.ones((X_scaled.shape[0], 1))])

    # Ridge Regression: w = (X^T X + αI)^-1 X^T y
    alpha = 1.0
    n_features = X_bias.shape[1]
    I = np.eye(n_features)
    I[-1, -1] = 0  # không regularize bias
    XtX = X_bias.T @ X_bias
    Xty = X_bias.T @ y
    w = np.linalg.inv(XtX + alpha * I) @ Xty

    # Dự đoán và đánh giá
    y_pred = X_bias @ w
    mae = mean_absolute_error(y, y_pred)

    logging.info(f"MAE tren tap huyen luyen: {mae}")

    # Trả về trọng số, scaler thủ công và ngày cuối
    weights = w.flatten()
    scaler = {'mean': mean, 'std': std}
    last_date = df['ds'].max()

    return weights, scaler, last_date

if __name__ == "__main__":
    input_data = sys.stdin.read()
    data_json = json.loads(input_data)
    trainModelData = train_model_from_json(data_json)

    weights, scaler, last_date = trainModelData
    output = {
        'weights': weights.tolist(),
        'scaler': {
            'mean': scaler['mean'].tolist(),
            'std': scaler['std'].tolist()
        },
        'last_date': last_date.strftime("%Y-%m-%d")
    }

    print(json.dumps({'trainModelData': output}))