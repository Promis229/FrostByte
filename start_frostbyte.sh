#!/bin/bash

# 🌌 FrostByte - Script de Démarrage Rapide
# Démarre tous les composants de l'écosystème

echo "🌌 FrostByte - Démarrage de l'Écosystème Complet"
echo "================================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_DIR="/home/yannick-akoto/B-MATHS/B-MAT-100-COT-1-2-101pong-yannick.akoto/FrostByte"
cd "$PROJECT_DIR" || exit 1

echo -e "${BLUE}📁 Répertoire: $PROJECT_DIR${NC}"
echo ""

# Fonction pour démarrer les services
start_service() {
    echo -e "${GREEN}🚀 Démarrage: $1${NC}"
    echo "   Commande: $2"
    echo "   Port: $3"
    echo ""
}

# ==============================================================================
# DÉMARRAGE DES SERVICES
# ==============================================================================

echo -e "${YELLOW}🔥 DÉMARRAGE DE TOUS LES SERVICES...${NC}"
echo ""

# 1. Backend ML (Port 5001)
start_service "Backend Machine Learning" "python3 back.py" "5001"
source chatbot_env/bin/activate
nohup python3 back.py > ml_backend.log 2>&1 &
ML_PID=$!
sleep 2

# 2. Backend Chat (Port 5000)
start_service "Backend Chat IA" "node server_test.js" "5000"
nohup node server_test.js > chat_backend.log 2>&1 &
CHAT_PID=$!
sleep 2

# 3. Dashboard Streamlit (Port 8501)
start_service "Dashboard Streamlit" "streamlit run dashboard.py" "8501"
source chatbot_env/bin/activate
nohup streamlit run dashboard.py --server.headless true > streamlit.log 2>&1 &
STREAMLIT_PID=$!
sleep 3

# ==============================================================================
# VÉRIFICATION DES SERVICES
# ==============================================================================

echo -e "${YELLOW}🔍 VÉRIFICATION DES SERVICES...${NC}"
echo ""

# Test Backend ML
echo -n "🤖 Backend ML (5001): "
if curl -s http://localhost:5001/api/predict > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Opérationnel${NC}"
else
    echo -e "${RED}❌ Échec${NC}"
fi

# Test Backend Chat
echo -n "💬 Backend Chat (5000): "
if curl -s http://localhost:5000/api/test > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Opérationnel${NC}"
else
    echo -e "${RED}❌ Échec${NC}"
fi

# Test Streamlit
echo -n "📊 Dashboard (8501): "
if curl -s http://localhost:8501 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Opérationnel${NC}"
else
    echo -e "${YELLOW}⏳ En cours de démarrage...${NC}"
fi

echo ""

# ==============================================================================
# GUIDE D'UTILISATION
# ==============================================================================

echo -e "${BLUE}📱 INTERFACES DISPONIBLES:${NC}"
echo ""
echo "🤖 1. CHATBOT IA - Interface Web"
echo "   📂 Fichier: chatbot_test.html"
echo "   🌐 URL: file://$PROJECT_DIR/chatbot_test.html"
echo "   ⚡ Test rapide: Ouvrir dans le navigateur"
echo ""

echo "🎮 2. JEU COSMO - Exploration Spatiale"
echo "   📂 Fichier: game/index.html"  
echo "   🌐 URL: file://$PROJECT_DIR/game/index.html"
echo "   ⚡ Test rapide: Ouvrir dans le navigateur"
echo ""

echo "📊 3. DASHBOARD ML - Prédiction d'Exoplanètes"
echo "   🌐 URL: http://localhost:8501"
echo "   ⚡ Test rapide: Ouvrir http://localhost:8501"
echo ""

echo "💻 4. CHATBOT TERMINAL - Version CLI"
echo "   📂 Script: chatbot_terminal.py"
echo "   ⚡ Commande: source chatbot_env/bin/activate && python3 chatbot_terminal.py"
echo ""

# ==============================================================================
# TESTS RAPIDES
# ==============================================================================

echo -e "${BLUE}🧪 TESTS RAPIDES:${NC}"
echo ""

echo "📡 Test API ML:"
echo "curl -X POST http://localhost:5001/api/predict -H 'Content-Type: application/json' -d '{\"features\": [1,2,3,4,5,6,7,8,9,0]}'"
echo ""

echo "💬 Test API Chat:"
echo "curl -X POST http://localhost:5000/api/chat -H 'Content-Type: application/json' -d '{\"prompt\": \"Bonjour FrostByte!\"}'"
echo ""

# ==============================================================================
# DÉMONSTRATION AUTOMATIQUE
# ==============================================================================

echo -e "${YELLOW}🎯 DÉMONSTRATION AUTOMATIQUE:${NC}"
echo ""

# Test ML
echo "🔬 Test de prédiction ML..."
ML_RESULT=$(curl -s -X POST http://localhost:5001/api/predict \
    -H "Content-Type: application/json" \
    -d '{"features": [0.8, 10.5, 3.2, 1500, 150, 2.1, 800, 0, 0, 0]}')
echo "   Résultat: $ML_RESULT"
echo ""

# Test Chat
echo "💬 Test du chatbot..."
CHAT_RESULT=$(curl -s -X POST http://localhost:5000/api/chat \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Bonjour! Peux-tu me parler des exoplanètes?"}' | jq -r '.response' 2>/dev/null || echo "Test en cours...")
echo "   Réponse: $CHAT_RESULT"
echo ""

# ==============================================================================
# GESTION DES PROCESSUS
# ==============================================================================

echo -e "${BLUE}⚙️  GESTION DES SERVICES:${NC}"
echo ""
echo "📄 PIDs des processus:"
echo "   ML Backend: $ML_PID"
echo "   Chat Backend: $CHAT_PID"  
echo "   Streamlit: $STREAMLIT_PID"
echo ""

# Sauvegarder les PIDs pour arrêt ultérieur
echo "$ML_PID" > .ml_pid
echo "$CHAT_PID" > .chat_pid
echo "$STREAMLIT_PID" > .streamlit_pid

echo "💾 PIDs sauvegardés dans .ml_pid, .chat_pid, .streamlit_pid"
echo ""

echo -e "${YELLOW}🛑 Pour arrêter tous les services:${NC}"
echo "kill \$(cat .ml_pid .chat_pid .streamlit_pid 2>/dev/null) 2>/dev/null || echo 'Services déjà arrêtés'"
echo ""

# ==============================================================================
# OUVERTURE AUTOMATIQUE DES INTERFACES
# ==============================================================================

echo -e "${BLUE}🎯 VOULEZ-VOUS OUVRIR LES INTERFACES AUTOMATIQUEMENT?${NC}"
echo ""
echo "Appuyez sur une touche pour continuer ou Ctrl+C pour arrêter..."
read -n 1 -s

echo ""
echo "🌐 Ouverture des interfaces dans le navigateur..."

# Essayer d'ouvrir les interfaces (dépend du système)
if command -v xdg-open > /dev/null; then
    # Linux
    xdg-open "file://$PROJECT_DIR/chatbot_test.html" > /dev/null 2>&1 &
    xdg-open "file://$PROJECT_DIR/game/index.html" > /dev/null 2>&1 &
    xdg-open "http://localhost:8501" > /dev/null 2>&1 &
    echo "✅ Interfaces ouvertes avec xdg-open"
elif command -v open > /dev/null; then
    # macOS
    open "file://$PROJECT_DIR/chatbot_test.html" &
    open "file://$PROJECT_DIR/game/index.html" &
    open "http://localhost:8501" &
    echo "✅ Interfaces ouvertes avec open"
else
    echo "⚠️  Veuillez ouvrir manuellement:"
    echo "   - file://$PROJECT_DIR/chatbot_test.html"
    echo "   - file://$PROJECT_DIR/game/index.html"
    echo "   - http://localhost:8501"
fi

echo ""

# ==============================================================================
# FINALISATION
# ==============================================================================

echo -e "${GREEN}🎉 FROSTBYTE EST MAINTENANT OPÉRATIONNEL !${NC}"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "   - README.md : Guide complet"
echo "   - RAPPORT_TEST.md : Rapport de tests"
echo ""
echo -e "${BLUE}🔧 Logs des services:${NC}"
echo "   - ml_backend.log : Backend ML"
echo "   - chat_backend.log : Backend Chat"
echo "   - streamlit.log : Dashboard"
echo ""
echo -e "${YELLOW}💡 Conseil: Gardez ce terminal ouvert pour surveiller les services${NC}"
echo ""
echo "🌌 Bon voyage dans l'espace avec FrostByte ! 🚀"
