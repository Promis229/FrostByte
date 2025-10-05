#!/bin/sh

# 🌌 FrostByte - Docker Entry Point
echo "🚀 Démarrage de FrostByte dans Docker..."

# Activer l'environnement Python
export PATH="/app/venv/bin:$PATH"

# Démarrer le backend ML en arrière-plan
echo "🤖 Démarrage du backend ML..."
python3 back.py &

# Attendre que le backend ML soit prêt
sleep 5

# Démarrer le backend Chat en arrière-plan  
echo "💬 Démarrage du backend Chat..."
node server_test.js &

# Attendre que le backend Chat soit prêt
sleep 3

# Démarrer Streamlit en mode headless
echo "📊 Démarrage du dashboard Streamlit..."
streamlit run dashboard.py --server.headless true --server.port 8501 --server.address 0.0.0.0 &

# Attendre que tous les services soient prêts
sleep 10

echo "🎉 FrostByte est opérationnel !"
echo "🌐 Services disponibles:"
echo "   - Backend ML: http://localhost:5001"
echo "   - Backend Chat: http://localhost:5000" 
echo "   - Dashboard: http://localhost:8501"
echo "   - Jeu Cosmo: Ouvrir game/index.html"
echo "   - Chatbot: Ouvrir chatbot_test.html"

# Garder le conteneur en vie
tail -f /dev/null
