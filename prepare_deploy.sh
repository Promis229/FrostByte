#!/bin/bash

# 🌌 FrostByte - Préparation Git et Déploiement
echo "🌌 FrostByte - Préparation pour Git et Déploiement"
echo "=================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# 1. Vérifier Git
print_step "Vérification de Git..."
if git status > /dev/null 2>&1; then
    print_success "Repository Git détecté"
else
    print_info "Initialisation du repository Git..."
    git init
    git remote add origin https://github.com/Promis229/FrostByte.git
fi

# 2. Ajouter tous les fichiers principaux
print_step "Ajout des fichiers au staging..."
git add \
    README.md \
    QUICKSTART.md \
    DEPLOY.md \
    package.json \
    package-lock.json \
    requirements.txt \
    Dockerfile \
    docker-compose.yml \
    docker-entrypoint.sh \
    nginx.conf \
    .gitignore \
    .env \
    start_frostbyte.sh \
    stop_frostbyte.sh \
    deploy.sh \
    back.py \
    dashboard.py \
    server.js \
    server_test.js \
    chatbot_terminal.py \
    chatbot_test.html \
    best_exoplanet_model.pkl \
    exoplanet_scaler.pkl \
    exoplanet_label_encoder.pkl \
    datas_cleaned.csv \
    datas.csv \
    model.ipynb \
    one_eda.ipynb \
    game/

print_success "Fichiers ajoutés"

# 3. Vérifier le statut
print_step "Statut Git:"
git status --short

echo ""

# 4. Créer le commit
print_step "Création du commit..."
read -p "Message de commit (ou Entrée pour message par défaut): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="🚀 FrostByte v1.0 - Écosystème d'exploration spatiale complet

✨ Fonctionnalités principales:
- 🎮 Jeu Cosmo d'exploration spatiale
- 🤖 Chatbot IA multilingue spécialisé exoplanètes  
- 📊 Dashboard ML de prédiction d'exoplanètes
- 🔬 API Flask avec modèles scikit-learn
- 💬 Backend Node.js Express

🛠️ Technologies:
- Frontend: HTML5, CSS3, JavaScript ES6
- Backend: Node.js, Python Flask
- ML: scikit-learn, Random Forest
- Déploiement: Docker, Docker Compose
- Interface: Streamlit pour dashboard

📦 Déploiement:
- ./deploy.sh pour déploiement automatique
- Docker ready avec docker-compose
- Support Heroku, Vercel, cloud providers

🌌 Prêt pour production et démonstration!"
fi

git commit -m "$COMMIT_MSG"
print_success "Commit créé"

# 5. Informations de déploiement
echo ""
print_step "🚀 ÉTAPES SUIVANTES:"
echo ""
print_info "📤 PUSH VERS GITHUB:"
echo "   git push -u origin main"
echo ""
print_info "🐳 DÉPLOIEMENT DOCKER:"
echo "   ./deploy.sh"
echo "   Choisir option 2 (Docker)"
echo ""
print_info "💻 DÉPLOIEMENT LOCAL:"
echo "   ./deploy.sh"  
echo "   Choisir option 1 (Local)"
echo ""
print_info "🌐 DÉPLOIEMENT CLOUD:"
echo "   ./deploy.sh"
echo "   Choisir option 3 (Cloud)"
echo ""

print_step "📁 STRUCTURE FINALE DU PROJET:"
echo ""
echo "FrostByte/"
echo "├── 🎮 game/               # Jeu Cosmo"
echo "├── 🤖 chatbot_test.html   # Interface chatbot"
echo "├── 📊 dashboard.py        # Dashboard Streamlit"
echo "├── 🔬 back.py            # API ML Flask"
echo "├── 💬 server_test.js     # Backend Chat Node.js"
echo "├── 🐳 Dockerfile         # Conteneurisation"
echo "├── 🚀 start_frostbyte.sh # Démarrage auto"
echo "├── 🛑 stop_frostbyte.sh  # Arrêt propre"
echo "├── 📋 deploy.sh          # Déploiement auto"
echo "├── 📚 README.md          # Documentation"
echo "├── ⚡ QUICKSTART.md      # Guide rapide"
echo "└── 🚀 DEPLOY.md          # Guide déploiement"
echo ""

print_step "🎯 URLS DE DÉMONSTRATION:"
echo ""
echo "🌐 Local:"
echo "   - Jeu: file://$(pwd)/game/index.html"
echo "   - Chatbot: file://$(pwd)/chatbot_test.html"
echo "   - Dashboard: http://localhost:8501"
echo ""
echo "🐳 Docker:"
echo "   - Jeu: http://localhost/game/"
echo "   - Chatbot: http://localhost/chatbot"  
echo "   - Dashboard: http://localhost/dashboard"
echo ""

print_success "🎉 FrostByte prêt pour le déploiement !"
print_info "Consultez DEPLOY.md pour les options de déploiement avancées"
