#!/bin/bash

# 🌌 FrostByte - Script de Test Complet
# Teste automatiquement tous les composants du projet

echo "🌌 FrostByte - Test Complet de l'Écosystème"
echo "=============================================="
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction d'affichage
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Variables
PROJECT_DIR="/home/yannick-akoto/B-MATHS/B-MAT-100-COT-1-2-101pong-yannick.akoto/FrostByte"
VENV_PATH="$PROJECT_DIR/chatbot_env"

# Aller dans le répertoire du projet
cd "$PROJECT_DIR" || exit 1

echo "📁 Répertoire du projet: $PROJECT_DIR"
echo ""

# ==============================================================================
# 1. VÉRIFICATION DE L'ENVIRONNEMENT
# ==============================================================================

echo "🔍 1. VÉRIFICATION DE L'ENVIRONNEMENT"
echo "======================================"

# Vérifier Python
python3 --version > /dev/null 2>&1
print_status $? "Python 3 disponible"

# Vérifier Node.js
node --version > /dev/null 2>&1
print_status $? "Node.js disponible"

# Vérifier l'environnement virtuel
if [ -d "$VENV_PATH" ]; then
    print_status 0 "Environnement virtuel chatbot_env existe"
else
    print_status 1 "Environnement virtuel chatbot_env manquant"
    print_info "Création de l'environnement virtuel..."
    python3 -m venv chatbot_env
    source chatbot_env/bin/activate
    pip install flask numpy scikit-learn requests deep-translator langdetect streamlit plotly joblib
    print_status $? "Environnement virtuel créé et configuré"
fi

# Vérifier les dépendances Node.js
if [ -d "node_modules" ]; then
    print_status 0 "Dépendances Node.js installées"
else
    print_status 1 "Dépendances Node.js manquantes"
    print_info "Installation des dépendances Node.js..."
    npm install > /dev/null 2>&1
    print_status $? "Dépendances Node.js installées"
fi

echo ""

# ==============================================================================
# 2. TEST DES MODÈLES ML
# ==============================================================================

echo "🔬 2. TEST DES MODÈLES MACHINE LEARNING"
echo "======================================="

# Vérifier les fichiers de modèles
if [ -f "best_exoplanet_model.pkl" ]; then
    print_status 0 "Modèle principal disponible"
else
    print_status 1 "Modèle principal manquant"
    print_info "Création du modèle de test..."
    source chatbot_env/bin/activate
    python3 create_test_model.py > /dev/null 2>&1
    print_status $? "Modèle principal créé"
fi

if [ -f "exoplanet_scaler.pkl" ] && [ -f "exoplanet_label_encoder.pkl" ]; then
    print_status 0 "Preprocesseurs disponibles"
else
    print_status 1 "Preprocesseurs manquants"
    print_info "Création des preprocesseurs..."
    source chatbot_env/bin/activate
    python3 create_test_preprocessors.py > /dev/null 2>&1
    print_status $? "Preprocesseurs créés"
fi

echo ""

# ==============================================================================
# 3. TEST DU BACKEND ML (Port 5001)
# ==============================================================================

echo "🤖 3. TEST DU BACKEND ML"
echo "========================"

# Démarrer le backend ML en arrière-plan
print_info "Démarrage du backend ML..."
source chatbot_env/bin/activate
nohup python3 back.py > ml_backend.log 2>&1 &
ML_PID=$!
sleep 3

# Tester la connexion
curl -s http://localhost:5001/api/predict > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_status 0 "Backend ML opérationnel (Port 5001)"
    
    # Test de prédiction
    RESULT=$(curl -s -X POST http://localhost:5001/api/predict \
        -H "Content-Type: application/json" \
        -d '{"features": [1.2, 0.8, 5.4, 2.1, 0.9, 1.5, 3.2, 0.7, 2.8, 1.1]}')
    
    if [[ $RESULT == *"prediction"* ]]; then
        print_status 0 "API de prédiction fonctionnelle"
        echo "   Résultat: $RESULT"
    else
        print_status 1 "API de prédiction en erreur"
    fi
else
    print_status 1 "Backend ML non accessible"
fi

echo ""

# ==============================================================================
# 4. TEST DU BACKEND CHAT (Port 5000)
# ==============================================================================

echo "💬 4. TEST DU BACKEND CHAT"
echo "=========================="

# Démarrer le backend chat en arrière-plan
print_info "Démarrage du backend chat..."
nohup node server_test.js > chat_backend.log 2>&1 &
CHAT_PID=$!
sleep 3

# Tester la connexion
CHAT_STATUS=$(curl -s http://localhost:5000/api/test)
if [[ $CHAT_STATUS == *"opérationnel"* ]]; then
    print_status 0 "Backend Chat opérationnel (Port 5000)"
    
    # Test de chat simple
    CHAT_RESULT=$(curl -s -X POST http://localhost:5000/api/chat \
        -H "Content-Type: application/json" \
        -d '{"prompt": "Bonjour"}')
    
    if [[ $CHAT_RESULT == *"FrostByte"* ]]; then
        print_status 0 "API de chat fonctionnelle"
    else
        print_status 1 "API de chat en erreur"
    fi
    
    # Test avec ML
    ML_CHAT_RESULT=$(curl -s -X POST http://localhost:5000/api/chat \
        -H "Content-Type: application/json" \
        -d '{"prompt": "Analyse", "features": [1.2, 0.8, 5.4, 2.1, 0.9, 1.5, 3.2, 0.7, 2.8, 1.1]}')
    
    if [[ $ML_CHAT_RESULT == *"Analyse ML"* ]]; then
        print_status 0 "Intégration Chat + ML fonctionnelle"
    else
        print_status 1 "Intégration Chat + ML en erreur"
    fi
else
    print_status 1 "Backend Chat non accessible"
fi

echo ""

# ==============================================================================
# 5. TEST DU CHATBOT TERMINAL
# ==============================================================================

echo "💻 5. TEST DU CHATBOT TERMINAL"
echo "=============================="

# Tester les dépendances
source chatbot_env/bin/activate
python3 -c "
try:
    from deep_translator import GoogleTranslator
    from langdetect import detect
    import requests
    print('DEPS_OK')
except ImportError as e:
    print(f'DEPS_ERROR: {e}')
" > deps_test.log 2>&1

if grep -q "DEPS_OK" deps_test.log; then
    print_status 0 "Dépendances chatbot terminal disponibles"
    
    # Test de fonctionnement (non interactif)
    if [ -f "chatbot_terminal_test.py" ]; then
        print_status 0 "Script chatbot terminal prêt"
        print_info "Pour tester interactivement: source chatbot_env/bin/activate && python3 chatbot_terminal_test.py"
    else
        print_status 1 "Script chatbot terminal manquant"
    fi
else
    print_status 1 "Dépendances chatbot terminal manquantes"
fi

echo ""

# ==============================================================================
# 6. TEST DU JEU COSMO
# ==============================================================================

echo "🎮 6. TEST DU JEU COSMO"
echo "======================="

if [ -f "game/index.html" ] && [ -f "game/game.js" ] && [ -f "game/styles.css" ]; then
    print_status 0 "Fichiers du jeu Cosmo disponibles"
    
    # Vérifier les images
    if [ -d "game/images" ]; then
        IMAGE_COUNT=$(ls game/images/*.png 2>/dev/null | wc -l)
        if [ $IMAGE_COUNT -gt 0 ]; then
            print_status 0 "Assets du jeu disponibles ($IMAGE_COUNT images)"
        else
            print_warning "Aucune image trouvée dans game/images/"
        fi
    fi
    
    print_info "Pour tester le jeu:"
    print_info "  Option 1: Ouvrir game/index.html dans le navigateur"
    print_info "  Option 2: cd game && python3 -m http.server 8080"
    
else
    print_status 1 "Fichiers du jeu Cosmo manquants"
fi

echo ""

# ==============================================================================
# 7. TEST DU DASHBOARD STREAMLIT
# ==============================================================================

echo "📊 7. TEST DU DASHBOARD STREAMLIT"
echo "================================="

if [ -f "dashboard.py" ]; then
    print_status 0 "Script dashboard disponible"
    
    # Tester les imports Streamlit
    source chatbot_env/bin/activate
    python3 -c "
try:
    import streamlit as st
    import plotly.graph_objects as go
    import plotly.express as px
    import pandas as pd
    print('STREAMLIT_OK')
except ImportError as e:
    print(f'STREAMLIT_ERROR: {e}')
" > streamlit_test.log 2>&1

    if grep -q "STREAMLIT_OK" streamlit_test.log; then
        print_status 0 "Dépendances Streamlit disponibles"
        print_info "Pour démarrer le dashboard: streamlit run dashboard.py"
    else
        print_status 1 "Dépendances Streamlit manquantes"
        print_info "Installation: pip install streamlit plotly"
    fi
else
    print_status 1 "Script dashboard manquant"
fi

echo ""

# ==============================================================================
# 8. TEST DE L'INTERFACE WEB DE TEST
# ==============================================================================

echo "🌐 8. TEST DE L'INTERFACE WEB"
echo "============================="

if [ -f "chatbot_test.html" ]; then
    print_status 0 "Interface web de test disponible"
    print_info "Pour tester l'interface:"
    print_info "  Ouvrir dans le navigateur: file://$PROJECT_DIR/chatbot_test.html"
    print_info "  Ou démarrer un serveur: python3 -m http.server 8080"
else
    print_status 1 "Interface web de test manquante"
fi

echo ""

# ==============================================================================
# 9. RÉSUMÉ ET COMMANDES UTILES
# ==============================================================================

echo "📋 9. RÉSUMÉ ET COMMANDES UTILES"
echo "================================"

echo ""
print_info "🚀 COMMANDES POUR DÉMARRER TOUS LES SERVICES:"
echo ""
echo "# Terminal 1: Backend ML"
echo "source chatbot_env/bin/activate && python3 back.py"
echo ""
echo "# Terminal 2: Backend Chat"
echo "node server_test.js"
echo ""
echo "# Terminal 3: Dashboard (optionnel)"
echo "source chatbot_env/bin/activate && streamlit run dashboard.py"
echo ""
echo "# Terminal 4: Chatbot Terminal (optionnel)"
echo "source chatbot_env/bin/activate && python3 chatbot_terminal_test.py"
echo ""
echo "# Jeu Cosmo (navigateur)"
echo "# Ouvrir: game/index.html"
echo ""
echo "# Interface Chat Web (navigateur)"
echo "# Ouvrir: chatbot_test.html"
echo ""

print_info "🧪 TESTS RAPIDES:"
echo ""
echo "# Test API ML"
echo "curl -X POST http://localhost:5001/api/predict -H 'Content-Type: application/json' -d '{\"features\": [1,2,3,4,5,6,7,8,9,0]}'"
echo ""
echo "# Test API Chat"
echo "curl -X POST http://localhost:5000/api/chat -H 'Content-Type: application/json' -d '{\"prompt\": \"Bonjour\"}'"
echo ""

print_info "📁 FICHIERS IMPORTANTS:"
echo "  - README.md : Documentation complète"
echo "  - RAPPORT_TEST.md : Rapport de tests détaillé"
echo "  - package.json : Dépendances Node.js"
echo "  - .env : Configuration (optionnel)"
echo ""

# ==============================================================================
# 10. NETTOYAGE
# ==============================================================================

print_info "🧹 Nettoyage des processus de test..."

# Arrêter les processus lancés pour les tests
if [ ! -z "$ML_PID" ]; then
    kill $ML_PID 2>/dev/null
fi

if [ ! -z "$CHAT_PID" ]; then
    kill $CHAT_PID 2>/dev/null
fi

# Supprimer les fichiers de log temporaires
rm -f deps_test.log streamlit_test.log ml_backend.log chat_backend.log

print_status 0 "Nettoyage terminé"

echo ""
echo "🌌 Test complet terminé ! Consultez le README.md pour plus de détails."
echo "=============================================="
