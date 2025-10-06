# 🌌 FrostByte - Space Exploration Ecosystem

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.12+-green.svg)](https://python.org)
[![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)](https://nodejs.org)
[![Status](https://img.shields.io/badge/status-Operational-brightgreen.svg)](#)

> **Complete interactive platform for space learning and exploration integrating AI, Machine Learning, and educational gaming.**

---

## 🚀 Overview

FrostByte is a comprehensive ecosystem that combines:
- 🎮 **Cosmo Educational Game** - Interactive space exploration
- 🤖 **Multilingual AI Chatbot** - Exoplanet specialist assistant
- 📊 **ML Dashboard** - Exoplanet prediction with Streamlit
- 🔬 **Machine Learning Models** - NASA data analysis

## 📁 Project Structure

```
FrostByte/
├── 🎮 GAME/                     # Cosmo Game
│   ├── index.html               # Main interface
│   ├── game.js                  # Game logic
│   ├── cosmo-guide.js          # Guide and tutorials
│   ├── styles.css              # Styles and animations
│   └── images/                 # Planetary assets
├── 🤖 AI CHATBOT/              # AI Assistant
│   ├── chatbot_terminal.py     # Terminal version (Ollama)
│   ├── chatbot_terminal_test.py # API version
│   ├── chatbot_test.html       # Web test interface
│   ├── server.js               # Production backend (Groq)
│   ├── server_test.js          # Test backend (mock)
│   └── chatbot_env/            # Python virtual environment
├── 📊 DASHBOARD/               # Prediction interface
│   ├── dashboard.py            # Streamlit application
│   ├── model.ipynb            # Analysis notebook
│   └── one_eda.ipynb          # Exploratory analysis
├── 🔬 MACHINE LEARNING/        # Models and data
│   ├── back.py                 # Flask ML API
│   ├── best_exoplanet_model.pkl # Random Forest model
│   ├── exoplanet_scaler.pkl   # Normalization
│   ├── exoplanet_label_encoder.pkl # Encoding
│   ├── datas.csv              # Raw NASA dataset
│   └── datas_cleaned.csv      # Cleaned dataset
├── 🧪 TESTS/                   # Validation scripts
│   ├── test_api.sh            # ML API test
│   ├── test_chatbot.sh        # Complete chatbot test
│   └── test_ml_api.py         # Python ML test
├── ⚙️ CONFIG/                  # Configuration
│   ├── package.json           # Node.js dependencies
│   ├── .env                   # Environment variables
│   └── requirements.txt       # Python dependencies (in chatbot_env)
└── 📚 DOCS/                    # Documentation
    ├── README.md              # This file
    └── RAPPORT_TEST.md        # Detailed test report
```

---

## 🎯 Main Components

### 1. 🎮 Cosmo Game - Space Exploration

**Description**: Interactive educational space exploration game with progression system.

**Features**:
- ✅ Galactic exploration with planet scanning
- ✅ Multi-level astronomy quiz (10 levels)
- ✅ XP/Stardust progression system
- ✅ Interactive solar system simulator
- ✅ Exoplanet discovery with rewards
- ✅ Modern interface with space animations

**Technologies**: HTML5, CSS3, JavaScript ES6, Font Awesome

### 2. 🤖 FrostByte AI Chatbot

**Description**: Multilingual intelligent assistant specialized in exoplanets and astronomy.

**Features**:
- ✅ Modern web interface with quick tests
- ✅ Interactive terminal version
- ✅ Automatic language detection (langdetect)
- ✅ Real-time translation (Google Translator)
- ✅ ML integration for exoplanet analysis
- ✅ Contextual responses with emojis
- ✅ Exoplanet verification guide

**Technologies**: Node.js, Express, Python, Flask, Groq API

### 3. 📊 Kepler Dashboard - ML Prediction

**Description**: Advanced web interface for predicting and analyzing exoplanets.

**Features**:
- ✅ Interactive Streamlit interface
- ✅ Real-time prediction (Confirmed/Candidate/False Positive)
- ✅ Interactive visualizations (Plotly)
- ✅ Predefined examples and random generation
- ✅ Planetary profile radar charts
- ✅ Detailed metrics and probabilities

**Technologies**: Python, Streamlit, Plotly, Pandas

### 4. 🔬 Machine Learning Engine

**Description**: Machine learning system for exoplanet classification.

**Features**:
- ✅ Optimized Random Forest model (~95% accuracy)
- ✅ Flask REST API for predictions
- ✅ Advanced feature engineering
- ✅ Automatic normalization and encoding
- ✅ Cleaned NASA Kepler dataset

**Technologies**: scikit-learn, Flask, NumPy, Pandas

---

## 🚀 Installation and Configuration

### Prerequisites

```bash
# System requirements
- Python 3.12+
- Node.js 18+
- Git
- Modern web browser

# Optional for full version
- Groq API Key (for advanced AI)
- Ollama (for local terminal chatbot)
```

### Quick Installation

```bash
# 1. Clone the project
git clone https://github.com/Promis229/FrostByte.git
cd FrostByte

# 2. Install Node.js dependencies
npm install

# 3. Create Python environment
python3 -m venv chatbot_env
source chatbot_env/bin/activate
pip install flask numpy scikit-learn requests deep-translator langdetect streamlit plotly joblib

# 4. Configuration (optional)
cp .env.example .env
# Edit .env with your API keys
```

### 🎯 Ultra-Fast Startup

```bash
# Option 1: Automatic script (RECOMMENDED)
./start_frostbyte.sh

# Option 2: Test first
./test_complete.sh
./start_frostbyte.sh

# Option 3: Clean shutdown
./stop_frostbyte.sh
```

### Environment Configuration

```bash
# .env file (optional)
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
ML_PORT=5001
```

---

## 🎮 How to Test the Project

### � Recommended Method - Automatic Startup

```bash
# 1. Complete environment test
./test_complete.sh

# 2. Start all services
./start_frostbyte.sh
# ✅ Automatically opens all interfaces in browser

# 3. Clean shutdown (when finished)
./stop_frostbyte.sh
```

**This method automatically starts :**
- 🤖 Backend ML (Port 5001)
- 💬 Backend Chat (Port 5000)  
- 📊 Dashboard Streamlit (Port 8501)
- 🌐 Opens web interfaces in browser

### 🎯 Complete Test - Manual Service Startup

```bash
# Terminal 1: Backend ML (Port 5001)
source chatbot_env/bin/activate
python3 back.py

# Terminal 2: Backend Chat (Port 5000)
node server_test.js

# Terminal 3: Dashboard Streamlit (Port 8501)
source chatbot_env/bin/activate
streamlit run dashboard.py

# Terminal 4: Automated tests
./test_api.sh
./test_chatbot.sh
```

### 🎮 1. Test Cosmo Game

```bash
# Option A: Simple local server
cd game
python3 -m http.server 8080
# Ouvrir: http://localhost:8080

# Option B: Directly in browser
# Ouvrir: file:///chemin/vers/FrostByte/game/index.html
```

**Features to test** :
- ✅ Main menu and navigation
- ✅ Planet scanning in galactic map
- ✅ Multi-level quiz (Galactic Path)
- ✅ Interactive solar system
- ✅ XP progression and rewards

### 🤖 2. Test AI Chatbot

#### Web Interface
```bash
# Start backends
node server_test.js &
source chatbot_env/bin/activate && python3 back.py &

# Open test interface
# Navigateur: file:///chemin/vers/FrostByte/chatbot_test.html
```

#### Terminal Version
```bash
source chatbot_env/bin/activate
python3 chatbot_terminal_test.py
# Type questions in French or English
```

#### Direct API Tests
```bash
# Simple test
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Bonjour, qu'\''est-ce qu'\''une exoplanète ?"}'

# Test with ML data
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Analysis ces données", "features": [1.2, 0.8, 5.4, 2.1, 0.9, 1.5, 3.2, 0.7, 2.8, 1.1]}'
```

### 📊 3. Test ML Dashboard

```bash
# Start Streamlit
source chatbot_env/bin/activate
streamlit run dashboard.py
# Ouvrir: http://localhost:8501
```

**Features to test** :
- ✅ Predefined examples (Kepler-1b, Hot Jupiter, etc.)
- ✅ Manual parameter input
- ✅ Random value generation
- ✅ Interactive visualizations
- ✅ Radar charts for profiles

### 🔬 4. Test ML API

```bash
# Direct Flask API test
source chatbot_env/bin/activate
python3 back.py &

# Test avec curl
curl -X POST http://localhost:5001/api/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [1.2, 0.8, 5.4, 2.1, 0.9, 1.5, 3.2, 0.7, 2.8, 1.1]}'

# Expected result: {"prediction":0,"probabilities":[0.93,0.07]}
```

---

## 🧪 Automated Test Scripts

### Quick Global Test
```bash
chmod +x test_*.sh
./test_api.sh        # Test API ML
./test_chatbot.sh    # Test chatbot complet
```

### Detailed Manual Tests
```bash
# Dependency test
source chatbot_env/bin/activate
python3 -c "
from deep_translator import GoogleTranslator
from langdetect import detect
import flask, numpy, sklearn
print('✅ All dependencies are installed')
"

# ML model test
python3 -c "
import joblib
model = joblib.load('best_exoplanet_model.pkl')
print('✅ ML model loaded successfully')
"
```

---

## 🎯 Specific Usage Guides

### 🎮 Cosmo Game Guide

1. **Démarrage** : Cliquez sur "Start Adventure"
2. **Exploration** : Utilisez "Scan" pour découvrir des planètes
3. **Quiz** : Accédez au "Galactic Path" pour les défis
4. **Système Solaire** : Explorez les planètes de notre système
5. **Progression** : Gagnez XP et Stardust pour débloquer du contenu

### 🤖 Chatbot Guide

1. **Simple Questions** :
   - "Bonjour" → Greeting
   - "Qu'est-ce qu'une exoplanète ?" → General information
   - "Comment vérifier une exoplanète ?" → Technical guide

2. **ML Analysis** :
   - Fill in the 10 parameters in the web interface
   - Use quick test buttons
   - Observe ML results integration

### 📊 Dashboard Guide

1. **Manual Mode** : Enter your own values
2. **Examples** : Use predefined cases
3. **Random** : Generate test data
4. **Analysis** : Observe visualizations and metrics

---

## 🔧 Troubleshooting

### Common Issues

#### ❌ ML Backend won't start
```bash
# Solution 1: Regenerate model
source chatbot_env/bin/activate
python3 create_test_model.py
python3 create_test_preprocessors.py

# Solution 2: Check dependencies
pip install flask numpy scikit-learn
```

#### ❌ Chatbot not responding
```bash
# Check that backends are running
curl http://localhost:5000/api/test
curl http://localhost:5001/api/predict

# Restart services
node server_test.js &
python3 back.py &
```

#### ❌ Streamlit Dashboard not displaying
```bash
# Install Streamlit
pip install streamlit plotly

# Start with debug
streamlit run dashboard.py --logger.level debug
```

#### ❌ Game won't load
```bash
# Serveur local
cd game
python3 -m http.server 8080

# Or use a web server (nginx, apache)
```

### Logs and Debug

```bash
# Backend logs
tail -f nohup.out
tail -f server.log

# Python debug
source chatbot_env/bin/activate
python3 -c "import sys; print(sys.path)"

# Node.js debug
node --version
npm list
```

---

## 📈 Performance and Metrics

### System Metrics

- **Modèle ML** : ~95% accuracy on NASA dataset
- **Response time** : <200ms for predictions
- **Chatbot** : French/English support
- **Jeu** : 10 levels, 100+ astronomy questions

### Optimizations

- ML models cached
- Optimized chatbot responses
- Compressed game assets
- High-performance REST APIs

---

## 🚀 Production Deployment

### Production Configuration

```bash
# Environment variables
export GROQ_API_KEY="your_real_api_key"
export NODE_ENV="production"
export PYTHON_ENV="production"

# Services with PM2
npm install -g pm2
pm2 start server.js --name "frostbyte-chat"
pm2 start "python3 back.py" --name "frostbyte-ml"

# Nginx (optional)
# Configuration in /etc/nginx/sites-available/frostbyte
```

### Docker (optional)

```dockerfile
# Example Dockerfile
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

### How to Contribute

1. Fork the project
2. Create a branch (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards

- **JavaScript** : ES6+, camelCase
- **Python** : PEP 8, snake_case
- **HTML/CSS** : BEM methodology
- **Tests** : Required for new features

---

## 🔮 Roadmap

### Version 2.0 (Planned)

- [ ] 🌐 Complete React interface
- [ ] 🗄️ Persistent database
- [ ] 🔐 Authentication system
- [ ] 📱 Mobile application
- [ ] 🌍 Extended multilingual support
- [ ] 🎵 Immersive soundtrack
- [ ] 🏆 Ranking system

### Advanced Features

- [ ] VR/AR for space exploration
- [ ] Advanced conversational AI
- [ ] Real-time NASA API integration
- [ ] Collaborative multiplayer
- [ ] Procedural universe generation

---

## 📞 Support and Contact

### Getting Help

- 📚 **Documentation** : Check this README and `RAPPORT_TEST.md`
- 🐛 **Bugs** : Open a GitHub issue
- 💡 **Suggestions** : GitHub Discussions
- 📧 **Contact** : See GitHub profile

### Community

- 🌟 Star the project if you like it !
- 🍴 Fork for your modifications
- 📢 Share with the community

---

## 📄 License

This project is under MIT license. See the [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

- **NASA** : For public Kepler data
- **Groq** : For the artificial intelligence API
- **OpenSource Community** : For the many libraries used
- **Streamlit** : For the dashboard interface
- **Font Awesome** : For the icons

---

<div align="center">

**🌌 FrostByte - Explore the Universe with AI! 🚀**

[![GitHub stars](https://img.shields.io/github/stars/Promis229/FrostByte?style=social)](https://github.com/Promis229/FrostByte)
[![GitHub forks](https://img.shields.io/github/forks/Promis229/FrostByte?style=social)](https://github.com/Promis229/FrostByte)

*Made with ❤️ for space education*

</div>
