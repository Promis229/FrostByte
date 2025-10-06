from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
import pickle
import numpy as np

# Créer un dataset de test pour les exoplanètes
X, y = make_classification(
    n_samples=1000,
    n_features=10,
    n_informative=8,
    n_redundant=2,
    n_classes=2,
    random_state=42
)

# Créer et entraîner un modèle simple
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Sauvegarder le modèle
with open("best_exoplanet_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Modèle de test créé et sauvegardé !")
print(f"Précision sur les données d'entraînement: {model.score(X, y):.2f}")

# Test du modèle
test_features = np.random.rand(1, 10)
prediction = model.predict(test_features)[0]
probabilities = model.predict_proba(test_features)[0]

print(f"Test: Features aléatoires -> Prédiction: {'Exoplanète' if prediction == 1 else 'Pas exoplanète'}")
print(f"Probabilités: {probabilities}")
