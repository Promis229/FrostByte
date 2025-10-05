# 🌌 FrostByte - Écosystème d'Exploration Spatiale

[![Licence](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.12+-green.svg)](https://python.org)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org)
[![Status](https://img.shields.io/badge/status-Opérationnel-brightgreen.svg)](#)

> **Plateforme interactive complète d'apprentissage et d'exploration spatiale intégrant IA, Machine Learning et gaming éducatif.**

---

## 🚀 Vue d'Ensemble

FrostByte est un écosystème complet qui combine :
- 🎮 **Jeu éducatif Cosmo** - Exploration spatiale interactive
- 🤖 **Chatbot IA multilingue** - Assistant spécialisé en exoplanètes
- 📊 **Dashboard ML** - Prédiction d'exoplanètes avec Streamlit
- 🔬 **Modèles d'apprentissage automatique** - Analyse de données NASA

## 📁 Structure du Projet

```
FrostByte/
├── 🎮 GAME/                     # Jeu Cosmo
│   ├── index.html               # Interface principale
│   ├── game.js                  # Logique du jeu
│   ├── cosmo-guide.js          # Guide et tutoriels
│   ├── styles.css              # Styles et animations
│   └── images/                 # Assets planétaires
├── 🤖 CHATBOT IA/              # Assistant IA
│   ├── chatbot_terminal.py     # Version terminal (Ollama)
│   ├── chatbot_terminal_test.py # Version API
│   ├── chatbot_test.html       # Interface web de test
│   ├── server.js               # Backend production (Groq)
│   ├── server_test.js          # Backend test (mock)
│   └── chatbot_env/            # Environnement virtuel Python
├── 📊 DASHBOARD/               # Interface de prédiction
│   ├── dashboard.py            # Application Streamlit
│   ├── model.ipynb            # Notebook d'analyse
│   └── one_eda.ipynb          # Analyse exploratoire
├── 🔬 MACHINE LEARNING/        # Modèles et données
│   ├── back.py                 # API Flask ML
│   ├── best_exoplanet_model.pkl # Modèle Random Forest
│   ├── exoplanet_scaler.pkl   # Normalisation
│   ├── exoplanet_label_encoder.pkl # Encodage
│   ├── datas.csv              # Dataset brut NASA
│   └── datas_cleaned.csv      # Dataset nettoyé
├── 🧪 TESTS/                   # Scripts de validation
│   ├── test_api.sh            # Test API ML
│   ├── test_chatbot.sh        # Test chatbot complet
│   └── test_ml_api.py         # Test Python ML
├── ⚙️ CONFIG/                  # Configuration
│   ├── package.json           # Dépendances Node.js
│   ├── .env                   # Variables d'environnement
│   └── requirements.txt       # Dépendances Python (dans chatbot_env)
└── 📚 DOCS/                    # Documentation
    ├── README.md              # Ce fichier
    └── RAPPORT_TEST.md        # Rapport de tests détaillé
```

---

## 🎯 Composants Principaux

### 1. 🎮 Jeu Cosmo - Exploration Spatiale

**Description** : Jeu éducatif interactif d'exploration de l'espace avec système de progression.

**Fonctionnalités** :
- ✅ Exploration galactique avec scan de planètes
- ✅ Quiz multi-niveaux d'astronomie (10 niveaux)
- ✅ Système de progression XP/Stardust
- ✅ Simulateur du système solaire interactif
- ✅ Découverte d'exoplanètes avec récompenses
- ✅ Interface moderne avec animations spatiales

**Technologies** : HTML5, CSS3, JavaScript ES6, Font Awesome

### 2. 🤖 Chatbot IA FrostByte

**Description** : Assistant intelligent multilingue spécialisé en exoplanètes et astronomie.

**Fonctionnalités** :
- ✅ Interface web moderne avec tests rapides
- ✅ Version terminal interactive
- ✅ Détection automatique de langue (langdetect)
- ✅ Traduction temps réel (Google Translator)
- ✅ Intégration ML pour analyse d'exoplanètes
- ✅ Réponses contextuelles avec emojis
- ✅ Guide de vérification d'exoplanètes

**Technologies** : Node.js, Express, Python, Flask, Groq API

### 3. 📊 Dashboard Kepler - Prédiction ML

**Description** : Interface web avancée pour prédire et analyser les exoplanètes.

**Fonctionnalités** :
- ✅ Interface Streamlit interactive
- ✅ Prédiction temps réel (Confirmed/Candidate/False Positive)
- ✅ Visualisations interactives (Plotly)
- ✅ Exemples prédéfinis et génération aléatoire
- ✅ Graphiques radar de profil planétaire
- ✅ Métriques détaillées et probabilités

**Technologies** : Python, Streamlit, Plotly, Pandas

### 4. 🔬 Machine Learning Engine

**Description** : Système d'apprentissage automatique pour classification d'exoplanètes.

**Fonctionnalités** :
- ✅ Modèle Random Forest optimisé (~95% précision)
- ✅ API REST Flask pour prédictions
- ✅ Feature engineering avancé
- ✅ Normalisation et encodage automatique
- ✅ Dataset NASA Kepler nettoyé

**Technologies** : scikit-learn, Flask, NumPy, Pandas

---

## 🚀 Installation et Configuration

### Prérequis

```bash
# Système requis
- Python 3.12+
- Node.js 18+
- Git
- Navigateur web moderne

# Optionnel pour version complète
- Groq API Key (pour IA avancée)
- Ollama (pour chatbot terminal local)
```

### Installation Rapide

```bash
# 1. Cloner le projet
git clone https://github.com/Promis229/FrostByte.git
cd FrostByte

# 2. Installer les dépendances Node.js
npm install

# 3. Créer l'environnement Python
python3 -m venv chatbot_env
source chatbot_env/bin/activate
pip install flask numpy scikit-learn requests deep-translator langdetect streamlit plotly joblib

# 4. Configuration (optionnel)
cp .env.example .env
# Éditer .env avec vos clés API
```

### 🎯 Démarrage Ultra-Rapide

```bash
# Option 1: Script automatique (RECOMMANDÉ)
./start_frostbyte.sh

# Option 2: Test complet d'abord
./test_complete.sh
./start_frostbyte.sh

# Option 3: Arrêt propre
./stop_frostbyte.sh
```

### Configuration Environnement

```bash
# Fichier .env (optionnel)
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
ML_PORT=5001
```

---

## 🎮 Comment Tester le Projet

### � Méthode Recommandée - Démarrage Automatique

```bash
# 1. Test complet de l'environnement
./test_complete.sh

# 2. Démarrage de tous les services
./start_frostbyte.sh
# ✅ Ouvre automatiquement toutes les interfaces dans le navigateur

# 3. Arrêt propre (quand terminé)
./stop_frostbyte.sh
```

**Cette méthode démarre automatiquement :**
- 🤖 Backend ML (Port 5001)
- 💬 Backend Chat (Port 5000)  
- 📊 Dashboard Streamlit (Port 8501)
- 🌐 Ouvre les interfaces web dans le navigateur

### 🎯 Test Complet - Démarrage Manuel des Services

```bash
# Terminal 1: Backend ML (Port 5001)
source chatbot_env/bin/activate
python3 back.py

# Terminal 2: Backend Chat (Port 5000)
node server_test.js

# Terminal 3: Dashboard Streamlit (Port 8501)
source chatbot_env/bin/activate
streamlit run dashboard.py

# Terminal 4: Tests automatisés
./test_api.sh
./test_chatbot.sh
```

### 🎮 1. Tester le Jeu Cosmo

```bash
# Option A: Serveur local simple
cd game
python3 -m http.server 8080
# Ouvrir: http://localhost:8080

# Option B: Directement dans le navigateur
# Ouvrir: file:///chemin/vers/FrostByte/game/index.html
```

**Fonctionnalités à tester** :
- ✅ Menu principal et navigation
- ✅ Scan de planètes dans la carte galactique
- ✅ Quiz multi-niveaux (Galactic Path)
- ✅ Système solaire interactif
- ✅ Progression XP et récompenses

### 🤖 2. Tester le Chatbot IA

#### Interface Web
```bash
# Démarrer les backends
node server_test.js &
source chatbot_env/bin/activate && python3 back.py &

# Ouvrir l'interface de test
# Navigateur: file:///chemin/vers/FrostByte/chatbot_test.html
```

#### Version Terminal
```bash
source chatbot_env/bin/activate
python3 chatbot_terminal_test.py
# Taper des questions en français ou anglais
```

#### Tests API Directs
```bash
# Test simple
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Bonjour, qu'\''est-ce qu'\''une exoplanète ?"}'

# Test avec données ML
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Analyse ces données", "features": [1.2, 0.8, 5.4, 2.1, 0.9, 1.5, 3.2, 0.7, 2.8, 1.1]}'
```

### 📊 3. Tester le Dashboard ML

```bash
# Démarrer Streamlit
source chatbot_env/bin/activate
streamlit run dashboard.py
# Ouvrir: http://localhost:8501
```

**Fonctionnalités à tester** :
- ✅ Exemples prédéfinis (Kepler-1b, Hot Jupiter, etc.)
- ✅ Saisie manuelle de paramètres
- ✅ Génération de valeurs aléatoires
- ✅ Visualisations interactives
- ✅ Graphiques radar de profil

### 🔬 4. Tester l'API ML

```bash
# Test direct de l'API Flask
source chatbot_env/bin/activate
python3 back.py &

# Test avec curl
curl -X POST http://localhost:5001/api/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [1.2, 0.8, 5.4, 2.1, 0.9, 1.5, 3.2, 0.7, 2.8, 1.1]}'

# Résultat attendu: {"prediction":0,"probabilities":[0.93,0.07]}
```

---

## 🧪 Scripts de Test Automatisés

### Test Rapide Global
```bash
chmod +x test_*.sh
./test_api.sh        # Test API ML
./test_chatbot.sh    # Test chatbot complet
```

### Tests Manuels Détaillés
```bash
# Test des dépendances
source chatbot_env/bin/activate
python3 -c "
from deep_translator import GoogleTranslator
from langdetect import detect
import flask, numpy, sklearn
print('✅ Toutes les dépendances sont installées')
"

# Test du modèle ML
python3 -c "
import joblib
model = joblib.load('best_exoplanet_model.pkl')
print('✅ Modèle ML chargé avec succès')
"
```

---

## 🎯 Guides d'Utilisation Spécifiques

### 🎮 Guide du Jeu Cosmo

1. **Démarrage** : Cliquez sur "Start Adventure"
2. **Exploration** : Utilisez "Scan" pour découvrir des planètes
3. **Quiz** : Accédez au "Galactic Path" pour les défis
4. **Système Solaire** : Explorez les planètes de notre système
5. **Progression** : Gagnez XP et Stardust pour débloquer du contenu

### 🤖 Guide du Chatbot

1. **Questions Simples** :
   - "Bonjour" → Salutation
   - "Qu'est-ce qu'une exoplanète ?" → Information générale
   - "Comment vérifier une exoplanète ?" → Guide technique

2. **Analyse ML** :
   - Remplir les 10 paramètres dans l'interface web
   - Utiliser les boutons de test rapide
   - Observer l'intégration des résultats ML

### 📊 Guide du Dashboard

1. **Mode Manuel** : Saisissez vos propres valeurs
2. **Exemples** : Utilisez les cas prédéfinis
3. **Aléatoire** : Générez des données de test
4. **Analyse** : Observez les visualisations et métriques

---

## 🔧 Dépannage

### Problèmes Courants

#### ❌ Backend ML ne démarre pas
```bash
# Solution 1: Régénérer le modèle
source chatbot_env/bin/activate
python3 create_test_model.py
python3 create_test_preprocessors.py

# Solution 2: Vérifier les dépendances
pip install flask numpy scikit-learn
```

#### ❌ Chatbot ne répond pas
```bash
# Vérifier que les backends tournent
curl http://localhost:5000/api/test
curl http://localhost:5001/api/predict

# Redémarrer les services
node server_test.js &
python3 back.py &
```

#### ❌ Dashboard Streamlit ne s'affiche pas
```bash
# Installer Streamlit
pip install streamlit plotly

# Démarrer avec debug
streamlit run dashboard.py --logger.level debug
```

#### ❌ Jeu ne se charge pas
```bash
# Serveur local
cd game
python3 -m http.server 8080

# Ou utiliser un serveur web (nginx, apache)
```

### Logs et Debug

```bash
# Logs des backends
tail -f nohup.out
tail -f server.log

# Debug Python
source chatbot_env/bin/activate
python3 -c "import sys; print(sys.path)"

# Debug Node.js
node --version
npm list
```

---

## 📈 Performance et Métriques

### Métriques du Système

- **Modèle ML** : ~95% de précision sur dataset NASA
- **Temps de réponse** : <200ms pour prédictions
- **Chatbot** : Support français/anglais
- **Jeu** : 10 niveaux, 100+ questions astronomie

### Optimisations

- Modèles ML mis en cache
- Réponses chatbot optimisées
- Assets jeu compressés
- APIs REST performantes

---

## 🚀 Déploiement Production

### Configuration Production

```bash
# Variables d'environnement
export GROQ_API_KEY="your_real_api_key"
export NODE_ENV="production"
export PYTHON_ENV="production"

# Services avec PM2
npm install -g pm2
pm2 start server.js --name "frostbyte-chat"
pm2 start "python3 back.py" --name "frostbyte-ml"

# Nginx (optionnel)
# Configuration dans /etc/nginx/sites-available/frostbyte
```

### Docker (optionnel)

```dockerfile
# Dockerfile exemple
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

---

## 🤝 Contribution

### Comment Contribuer

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

### Standards de Code

- **JavaScript** : ES6+, camelCase
- **Python** : PEP 8, snake_case
- **HTML/CSS** : BEM methodology
- **Tests** : Obligatoires pour nouvelles fonctionnalités

---

## 🔮 Roadmap

### Version 2.0 (Planifiée)

- [ ] 🌐 Interface React complète
- [ ] 🗄️ Base de données persistante
- [ ] 🔐 Système d'authentification
- [ ] 📱 Application mobile
- [ ] 🌍 Support multilingue étendu
- [ ] 🎵 Bande sonore immersive
- [ ] 🏆 Système de classements

### Fonctionnalités Avancées

- [ ] VR/AR pour exploration spatiale
- [ ] IA conversationnelle avancée
- [ ] Intégration APIs NASA temps réel
- [ ] Multijoueur collaboratif
- [ ] Génération procédurale d'univers

---

## 📞 Support et Contact

### Obtenir de l'Aide

- 📚 **Documentation** : Consultez ce README et `RAPPORT_TEST.md`
- 🐛 **Bugs** : Ouvrir une issue GitHub
- 💡 **Suggestions** : Discussions GitHub
- 📧 **Contact** : Voir profil GitHub

### Communauté

- 🌟 Star le projet si il vous plaît !
- 🍴 Fork pour vos modifications
- 📢 Partagez avec la communauté

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **NASA** : Pour les données Kepler publiques
- **Groq** : Pour l'API d'intelligence artificielle
- **OpenSource Community** : Pour les nombreuses bibliothèques utilisées
- **Streamlit** : Pour l'interface dashboard
- **Font Awesome** : Pour les icônes

---

<div align="center">

**🌌 FrostByte - Explorez l'Univers avec l'IA ! 🚀**

[![GitHub stars](https://img.shields.io/github/stars/Promis229/FrostByte?style=social)](https://github.com/Promis229/FrostByte)
[![GitHub forks](https://img.shields.io/github/forks/Promis229/FrostByte?style=social)](https://github.com/Promis229/FrostByte)

*Fait avec ❤️ pour l'éducation spatiale*

</div>
