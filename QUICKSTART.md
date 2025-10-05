# 🚀 Guide de Démarrage Rapide - FrostByte

## ⚡ Démarrage en 3 Étapes

### 1. 📦 Installation (1 fois)
```bash
git clone https://github.com/Promis229/FrostByte.git
cd FrostByte
npm install
python3 -m venv chatbot_env
source chatbot_env/bin/activate
pip install flask numpy scikit-learn requests deep-translator langdetect streamlit plotly joblib
```

### 2. 🧪 Test (optionnel)
```bash
./test_complete.sh
```

### 3. 🚀 Lancement
```bash
./start_frostbyte.sh
```

**C'est tout ! L'écosystème complet se lance automatiquement ! 🎉**

---

## 🌐 Interfaces Ouvertes Automatiquement

| Interface | URL | Description |
|-----------|-----|-------------|
| 🤖 **Chatbot IA** | `chatbot_test.html` | Assistant IA multilingue |
| 🎮 **Jeu Cosmo** | `game/index.html` | Exploration spatiale interactive |
| 📊 **Dashboard ML** | `http://localhost:8501` | Prédiction d'exoplanètes |

---

## 🧪 Tests Rapides

```bash
# Test API ML
curl -X POST http://localhost:5001/api/predict -H 'Content-Type: application/json' -d '{"features": [1,2,3,4,5,6,7,8,9,0]}'

# Test Chatbot
curl -X POST http://localhost:5000/api/chat -H 'Content-Type: application/json' -d '{"prompt": "Bonjour FrostByte!"}'
```

---

## 🛑 Arrêt Propre

```bash
./stop_frostbyte.sh
```

---

## 🆘 En Cas de Problème

1. **Ports occupés** : `./stop_frostbyte.sh` puis relancer
2. **Dépendances manquantes** : Relancer l'installation Python
3. **Processus zombies** : `killall python3 node` puis relancer

---

## 📚 Documentation Complète

Consultez le [README.md](README.md) principal pour tous les détails !

---

<div align="center">

**🌌 FrostByte - L'univers en quelques commandes ! 🚀**

</div>
