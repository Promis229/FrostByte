from sklearn.preprocessing import StandardScaler, LabelEncoder
import pickle

# Créer un scaler de test
scaler = StandardScaler()
# Simuler un fit avec des données de test
import numpy as np
test_data = np.random.rand(100, 10)
scaler.fit(test_data)

# Sauvegarder le scaler
with open("exoplanet_scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

# Créer un label encoder de test
label_encoder = LabelEncoder()
# Simuler des labels
test_labels = ['Not Exoplanet', 'Exoplanet'] * 50
label_encoder.fit(test_labels)

# Sauvegarder l'encodeur
with open("exoplanet_label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("✅ Scaler et label encoder créés !")
print(f"Classes: {label_encoder.classes_}")
