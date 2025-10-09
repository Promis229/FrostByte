# 🌌 FrostByte - Exoplanet Discovery Platform

![FrostByte Banner](https://img.shields.io/badge/FrostByte-Exoplanet%20Discovery-blue?style=for-the-badge&logo=nasa)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen?style=for-the-badge&logo=vercel)](https://frost-byte-owu8.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Promis229/FrostByte)

An advanced AI-powered platform for exoplanet detection and space exploration, featuring interactive dashboards, intelligent chatbots, and immersive space games.

## 🚀 [🌐 **VISIT LIVE DEMO** →](https://frost-byte-owu8.vercel.app)

## ✨ Features

### 🤖 AI Chatbot
- **Intelligent conversations** about exoplanets and space science
- **Real-time responses** in English with scientific accuracy
- **Interactive interface** with conversation history
- **Educational content** about detection methods and discoveries

### 📊 ML Dashboard
- **Advanced exoplanet prediction** using Random Forest AI model
- **Interactive visualizations** with Plotly charts
- **Real-time parameter analysis** and classification
- **Professional space-themed interface**
- **Multiple input modes**: Manual, Examples, Random generation

### 🎮 Space Game
- **Interactive cosmic exploration** game
- **Educational planet discovery** mechanics
- **Immersive space environment**

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Promis229/FrostByte.git
   cd FrostByte
   ```

2. **Start the HTTP server:**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8000`

4. **Explore the features:**
   - Click **"Chatbot"** for AI conversations
   - Click **"ML Dashboard"** for exoplanet predictions
   - Click **"Space Game"** for interactive exploration

## 📁 Project Structure

```
FrostByte/
├── index.html              # Main landing page
├── chatbot_test.html        # AI chatbot interface
├── dashboard.html           # ML prediction dashboard
├── api.js                   # Client-side ML simulation
├── game/                    # Space exploration game
│   ├── index.html
│   ├── game.js
│   ├── styles.css
│   └── images/
├── best_exoplanet_model.pkl # Trained ML model
├── exoplanet_scaler.pkl     # Data scaler
├── exoplanet_label_encoder.pkl # Label encoder
├── data.csv                 # NASA Kepler dataset
└── README.md               # This file
```

## 🔬 Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **ML Framework:** Python scikit-learn (Random Forest)
- **Visualization:** Plotly.js for interactive charts
- **Data:** NASA Kepler Exoplanet Archive
- **Deployment:** Static HTTP server (no dependencies)

## 🌟 Key Features

### Exoplanet Detection
- **9 core parameters** from NASA Kepler data
- **Feature engineering** for enhanced accuracy
- **Real-time classification**: Confirmed, Candidate, False Positive
- **Confidence scoring** and probability distributions

### AI Responses
- **Educational content** about exoplanets
- **Detection methods** explanation
- **Space mission information** (Kepler, TESS, JWST)
- **Habitability analysis** and biosignatures

### Interactive Experience
- **Responsive design** for all devices
- **Dark space theme** with cosmic aesthetics
- **Smooth animations** and visual effects
- **Professional scientific interface**

## 📈 Model Performance

- **Accuracy:** ~95% on NASA Kepler dataset
- **Algorithm:** Random Forest Classifier
- **Features:** 14 engineered parameters
- **Classes:** 3 (Confirmed, Candidate, False Positive)

## 🌍 Educational Value

Perfect for:
- **Students** learning about exoplanets
- **Educators** teaching space science
- **Enthusiasts** exploring astronomy
- **Researchers** visualizing exoplanet data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🔭 Acknowledgments

- **NASA Exoplanet Archive** for providing the dataset
- **Kepler Space Telescope** mission for the discoveries
- **Python scikit-learn** for machine learning capabilities
- **Plotly.js** for interactive visualizations

---

**Made with ❤️ for space exploration and scientific education**

🌌 *"The cosmos is within us. We are made of star-stuff."* - Carl Sagan
