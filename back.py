from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Charger le modèle
with open("best_exoplanet_model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/api/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = np.array(data["features"]).reshape(1, -1)
    
    # Prédiction
    pred = model.predict(features)[0]
    prob = model.predict_proba(features)[0].tolist() if hasattr(model, "predict_proba") else None
    
    return jsonify({"prediction": int(pred), "probabilities": prob})

if __name__ == "__main__":
    app.run(port=5001)
