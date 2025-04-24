# ai/train_model.py
import sys
import json
import numpy as np
import pandas as pd

def train_model_from_json(data_json):
    df = pd.DataFrame(data_json)

    X = df[['day', 'month']].values
    y = df['revenue'].values

    X = np.c_[np.ones(X.shape[0]), X]

    XTX = np.dot(X.T, X)
    XTX_inv = np.linalg.inv(XTX)
    XTy = np.dot(X.T, y)
    weights = np.dot(XTX_inv, XTy)

    np.save('ai/data/weights.npy', weights)
    return weights.tolist()

if __name__ == "__main__":
    input_data = sys.stdin.read()
    data_json = json.loads(input_data)
    weights = train_model_from_json(data_json)
    print(json.dumps({'weights': weights}))
