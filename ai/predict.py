import sys
import json
import numpy as np
import pandas as pd

def predict(weights, future_data):
    future_df = pd.DataFrame(future_data)
    features = ['day', 'month']
    X_future = future_df[features].values
    X_future = np.c_[np.ones(X_future.shape[0]), X_future]

    weights = np.array(weights)
    future_pred = np.dot(X_future, weights)
    future_df['predicted_revenue'] = future_pred

    print(future_df[['day', 'month', 'predicted_revenue']].to_json(orient='records'))

if __name__ == "__main__":
    input_data = sys.stdin.read()
    data = json.loads(input_data)

    weights = data['weights']
    future_data = data['future_data']

    predict(weights, future_data)
