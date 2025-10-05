#!/bin/bash

# 🌌 FrostByte - Script d'Arrêt
# Arrête proprement tous les services

echo "🛑 FrostByte - Arrêt des Services"
echo "================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

PROJECT_DIR="/home/yannick-akoto/B-MATHS/B-MAT-100-COT-1-2-101pong-yannick.akoto/FrostByte"
cd "$PROJECT_DIR" || exit 1

# Fonction d'arrêt de service
stop_service() {
    SERVICE_NAME="$1"
    PID_FILE="$2"
    
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if kill -0 "$PID" 2>/dev/null; then
            echo -n "🛑 Arrêt de $SERVICE_NAME (PID: $PID)... "
            kill "$PID" 2>/dev/null
            sleep 2
            
            # Vérifier si le processus est vraiment arrêté
            if kill -0 "$PID" 2>/dev/null; then
                echo -n "Force kill... "
                kill -9 "$PID" 2>/dev/null
            fi
            
            echo -e "${GREEN}✅ Arrêté${NC}"
        else
            echo -e "${YELLOW}⚠️  $SERVICE_NAME déjà arrêté${NC}"
        fi
        rm -f "$PID_FILE"
    else
        echo -e "${YELLOW}⚠️  Fichier PID de $SERVICE_NAME non trouvé${NC}"
    fi
}

# Arrêt des services par fichiers PID
echo "📄 Arrêt via fichiers PID..."
stop_service "Backend ML" ".ml_pid"
stop_service "Backend Chat" ".chat_pid"
stop_service "Dashboard Streamlit" ".streamlit_pid"

echo ""

# Arrêt par nom de processus (backup)
echo "🔍 Recherche de processus FrostByte restants..."

# Rechercher les processus Python et Node.js liés au projet
PYTHON_PROCS=$(pgrep -f "back.py\|dashboard.py\|streamlit.*dashboard.py")
NODE_PROCS=$(pgrep -f "server_test.js\|server.js")

if [ ! -z "$PYTHON_PROCS" ]; then
    echo "🐍 Arrêt des processus Python restants..."
    echo "$PYTHON_PROCS" | while read pid; do
        if [ ! -z "$pid" ]; then
            echo "   Arrêt du processus $pid"
            kill "$pid" 2>/dev/null
        fi
    done
fi

if [ ! -z "$NODE_PROCS" ]; then
    echo "📦 Arrêt des processus Node.js restants..."
    echo "$NODE_PROCS" | while read pid; do
        if [ ! -z "$pid" ]; then
            echo "   Arrêt du processus $pid"
            kill "$pid" 2>/dev/null
        fi
    done
fi

echo ""

# Vérification des ports
echo "🔍 Vérification des ports..."

check_port() {
    PORT=$1
    SERVICE=$2
    
    if netstat -tlnp 2>/dev/null | grep -q ":$PORT "; then
        echo -e "${RED}❌ Port $PORT ($SERVICE) encore occupé${NC}"
        return 1
    else
        echo -e "${GREEN}✅ Port $PORT ($SERVICE) libéré${NC}"
        return 0
    fi
}

check_port 5000 "Chat Backend"
check_port 5001 "ML Backend"
check_port 8501 "Streamlit"

echo ""

# Nettoyage des fichiers temporaires
echo "🧹 Nettoyage des fichiers temporaires..."

TEMP_FILES=(
    "ml_backend.log"
    "chat_backend.log"
    "streamlit.log"
    "nohup.out"
    ".ml_pid"
    ".chat_pid"
    ".streamlit_pid"
)

for file in "${TEMP_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   Suppression de $file"
        rm -f "$file"
    fi
done

echo -e "${GREEN}✅ Nettoyage terminé${NC}"
echo ""

# Vérification finale
echo "🏁 Vérification finale..."

REMAINING_PROCS=$(pgrep -f "back.py\|dashboard.py\|streamlit.*dashboard.py\|server_test.js\|server.js" | wc -l)

if [ "$REMAINING_PROCS" -eq 0 ]; then
    echo -e "${GREEN}🎉 Tous les services FrostByte sont arrêtés !${NC}"
else
    echo -e "${YELLOW}⚠️  $REMAINING_PROCS processus potentiellement liés encore actifs${NC}"
    echo "   Vous pouvez les vérifier avec: ps aux | grep -E 'back.py|dashboard.py|streamlit|server'"
fi

echo ""
echo -e "${GREEN}🌌 FrostByte arrêté proprement. À bientôt ! 🚀${NC}"
