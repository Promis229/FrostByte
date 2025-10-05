#!/bin/bash

# 🚀 FrostByte - Script de Déploiement Automatique
echo "🚀 FrostByte - Déploiement Automatique"
echo "======================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Fonction d'affichage
print_step() {
    echo -e "${BLUE}📋 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Vérifications préalables
print_step "Vérification des prérequis..."

# Vérifier Git
if ! command -v git &> /dev/null; then
    print_error "Git n'est pas installé"
    exit 1
fi
print_success "Git disponible"

# Vérifier Docker (optionnel)
if command -v docker &> /dev/null; then
    print_success "Docker disponible"
    DOCKER_AVAILABLE=true
else
    print_warning "Docker non disponible (déploiement local uniquement)"
    DOCKER_AVAILABLE=false
fi

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js n'est pas installé"
    exit 1
fi
print_success "Node.js disponible"

# Vérifier Python
if ! command -v python3 &> /dev/null; then
    print_error "Python 3 n'est pas installé"
    exit 1
fi
print_success "Python 3 disponible"

echo ""

# Menu de déploiement
print_step "Choisissez le type de déploiement:"
echo "1. 🖥️  Déploiement local (développement)"
echo "2. 🐳 Déploiement Docker (recommandé)"
echo "3. 🌐 Déploiement cloud (Heroku/Vercel)"
echo "4. 🔧 Configuration seulement"
echo ""

read -p "Votre choix (1-4): " DEPLOY_TYPE

case $DEPLOY_TYPE in
    1)
        print_step "Déploiement local sélectionné"
        
        # Installer les dépendances
        print_step "Installation des dépendances..."
        npm install
        
        # Créer l'environnement Python
        if [ ! -d "chatbot_env" ]; then
            python3 -m venv chatbot_env
        fi
        
        source chatbot_env/bin/activate
        pip install -r requirements.txt
        
        print_success "Dépendances installées"
        
        # Créer les modèles si nécessaire
        if [ ! -f "best_exoplanet_model.pkl" ]; then
            print_step "Création des modèles ML..."
            python3 -c "
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder

# Créer dataset
X, y = make_classification(n_samples=1000, n_features=10, n_informative=8, n_redundant=2, n_classes=2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Sauvegarder modèle
with open('best_exoplanet_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Créer scaler
scaler = StandardScaler()
scaler.fit(np.random.rand(100, 10))
with open('exoplanet_scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

# Créer encodeur
encoder = LabelEncoder()
encoder.fit(['Not Exoplanet', 'Exoplanet'])
with open('exoplanet_label_encoder.pkl', 'wb') as f:
    pickle.dump(encoder, f)

print('Modèles créés avec succès')
"
        fi
        
        print_success "Déploiement local terminé"
        print_step "Pour démarrer: ./start_frostbyte.sh"
        ;;
        
    2)
        if [ "$DOCKER_AVAILABLE" = false ]; then
            print_error "Docker n'est pas disponible"
            exit 1
        fi
        
        print_step "Déploiement Docker sélectionné"
        
        # Construire l'image
        print_step "Construction de l'image Docker..."
        docker-compose build
        
        # Démarrer les services
        print_step "Démarrage des services..."
        docker-compose up -d
        
        print_success "Déploiement Docker terminé"
        print_step "Services disponibles:"
        echo "   - Jeu Cosmo: http://localhost/game/"
        echo "   - Chatbot: http://localhost/chatbot"
        echo "   - Dashboard: http://localhost:8501"
        echo "   - APIs: http://localhost:5000 et http://localhost:5001"
        ;;
        
    3)
        print_step "Déploiement cloud sélectionné"
        
        echo "Choisissez la plateforme:"
        echo "1. Heroku"
        echo "2. Vercel"
        echo "3. DigitalOcean/AWS/GCP"
        
        read -p "Votre choix (1-3): " CLOUD_TYPE
        
        case $CLOUD_TYPE in
            1)
                print_step "Configuration pour Heroku..."
                
                # Créer Procfile
                cat > Procfile << EOF
web: node server_test.js
ml: python3 back.py
dashboard: streamlit run dashboard.py --server.headless true --server.port \$PORT
EOF
                
                print_success "Procfile créé"
                print_step "Commandes à exécuter:"
                echo "   heroku create votre-app-name"
                echo "   git push heroku main"
                ;;
                
            2)
                print_step "Configuration pour Vercel..."
                
                # Créer vercel.json
                cat > vercel.json << EOF
{
  "builds": [
    {
      "src": "server_test.js",
      "use": "@vercel/node"
    },
    {
      "src": "requirements.txt",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server_test.js"
    },
    {
      "src": "/predict/(.*)",
      "dest": "back.py"
    },
    {
      "src": "/(.*)",
      "dest": "/game/index.html"
    }
  ]
}
EOF
                
                print_success "vercel.json créé"
                print_step "Commandes à exécuter:"
                echo "   npm install -g vercel"
                echo "   vercel --prod"
                ;;
                
            3)
                print_step "Configuration pour serveur cloud..."
                print_step "1. Créer une instance Ubuntu 22.04"
                print_step "2. Installer Docker:"
                echo "   curl -fsSL https://get.docker.com -o get-docker.sh"
                echo "   sh get-docker.sh"
                print_step "3. Cloner et déployer:"
                echo "   git clone https://github.com/Promis229/FrostByte.git"
                echo "   cd FrostByte"
                echo "   docker-compose --profile with-proxy up -d"
                ;;
        esac
        ;;
        
    4)
        print_step "Configuration seulement"
        
        # Créer .env s'il n'existe pas
        if [ ! -f ".env" ]; then
            cat > .env << EOF
# FrostByte Configuration
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
ML_PORT=5001
NODE_ENV=development
PYTHON_ENV=development
EOF
            print_success ".env créé"
        fi
        
        # Vérifier requirements.txt
        if [ ! -f "requirements.txt" ]; then
            print_error "requirements.txt manquant"
        else
            print_success "requirements.txt présent"
        fi
        
        # Vérifier package.json
        if [ ! -f "package.json" ]; then
            print_error "package.json manquant"
        else
            print_success "package.json présent"
        fi
        
        print_success "Configuration terminée"
        ;;
        
    *)
        print_error "Choix invalide"
        exit 1
        ;;
esac

echo ""
print_step "🎉 Déploiement terminé !"
print_step "📚 Consultez DEPLOY.md pour plus de détails"
print_step "🚀 Pour démarrer localement: ./start_frostbyte.sh"
print_step "🛑 Pour arrêter: ./stop_frostbyte.sh"
echo ""
