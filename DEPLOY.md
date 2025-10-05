# 🚀 Guide de Déploiement - FrostByte

## 🐳 Déploiement avec Docker (RECOMMANDÉ)

### Prérequis
- Docker 20+
- Docker Compose 2+

### Déploiement Simple

```bash
# 1. Cloner le projet
git clone https://github.com/Promis229/FrostByte.git
cd FrostByte

# 2. Construire et démarrer
docker-compose up -d

# 3. Vérifier les services
docker-compose ps
docker-compose logs frostbyte
```

### Déploiement avec Proxy (Production)

```bash
# Démarrer avec Nginx
docker-compose --profile with-proxy up -d

# Accès aux services
# - Jeu Cosmo: http://localhost/game/
# - Chatbot: http://localhost/chatbot
# - Dashboard: http://localhost/dashboard
# - APIs: http://localhost/api/
```

### Commandes Docker Utiles

```bash
# Logs en temps réel
docker-compose logs -f frostbyte

# Redémarrer un service
docker-compose restart frostbyte

# Mettre à jour après changements
docker-compose build --no-cache
docker-compose up -d

# Arrêter tous les services
docker-compose down

# Nettoyage complet
docker-compose down -v --rmi all
```

---

## 🌐 Déploiement Cloud

### Heroku

```bash
# 1. Installer Heroku CLI
# 2. Créer les applications
heroku create frostbyte-ml
heroku create frostbyte-chat
heroku create frostbyte-dashboard

# 3. Configurer les variables d'environnement
heroku config:set GROQ_API_KEY=your_key -a frostbyte-chat

# 4. Déployer
git push heroku main
```

### Vercel/Netlify (Frontend uniquement)

```bash
# Déployer le jeu et chatbot web
npm install -g vercel
vercel --prod

# Configuration automatique pour:
# - game/index.html → /game
# - chatbot_test.html → /chatbot
```

### Digital Ocean/AWS/GCP

```bash
# 1. Créer une instance Ubuntu 22.04
# 2. Installer Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 3. Cloner et déployer
git clone https://github.com/Promis229/FrostByte.git
cd FrostByte
docker-compose --profile with-proxy up -d

# 4. Configurer le domaine et SSL (optionnel)
# Utiliser Certbot pour Let's Encrypt
```

---

## 🔧 Configuration Production

### Variables d'Environnement

```bash
# .env.production
NODE_ENV=production
PYTHON_ENV=production
GROQ_API_KEY=your_real_groq_key
ML_MODEL_PATH=/app/models/
LOG_LEVEL=info
```

### Monitoring et Logs

```bash
# Prometheus + Grafana (optionnel)
docker-compose -f docker-compose.monitoring.yml up -d

# Logs centralisés avec ELK Stack
docker-compose -f docker-compose.logging.yml up -d
```

### Sécurité

```bash
# 1. Utiliser HTTPS
# 2. Configurer un firewall
ufw allow 80
ufw allow 443
ufw enable

# 3. Limiter les ressources Docker
# Ajouter dans docker-compose.yml:
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
```

---

## 📈 Mise à l'Échelle

### Load Balancing

```bash
# Plusieurs instances du backend
docker-compose up --scale frostbyte=3 -d
```

### Base de Données (Évolution)

```yaml
# Ajouter dans docker-compose.yml
postgres:
  image: postgres:15
  environment:
    POSTGRES_DB: frostbyte
    POSTGRES_USER: frostbyte
    POSTGRES_PASSWORD: secure_password
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

---

## 🚨 Dépannage Déploiement

### Problèmes Courants

```bash
# Port déjà utilisé
docker-compose down
sudo netstat -tlnp | grep :5000

# Permissions Docker
sudo usermod -aG docker $USER
newgrp docker

# Espace disque insuffisant
docker system prune -a
docker volume prune
```

### Logs de Debug

```bash
# Logs détaillés
docker-compose logs --tail=100 frostbyte

# Entrer dans le conteneur
docker exec -it frostbyte-app sh

# Vérifier les processus
docker exec frostbyte-app ps aux
```

---

## 📊 Métriques et Performance

### Monitoring de Base

```bash
# Utilisation des ressources
docker stats

# Santé des services
curl http://localhost:5000/api/test
curl http://localhost:5001/api/predict
curl http://localhost:8501
```

### Tests de Charge

```bash
# Installer Apache Bench
apt-get install apache2-utils

# Tester l'API
ab -n 1000 -c 10 http://localhost:5000/api/test

# Tester ML
ab -n 100 -c 5 -p test_data.json -T application/json http://localhost:5001/api/predict
```

---

## 🎯 Déploiement Automatisé (CI/CD)

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy FrostByte
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          docker-compose build
          docker-compose up -d
```

---

## 🌟 Post-Déploiement

### Vérifications

1. ✅ Jeu Cosmo accessible
2. ✅ Chatbot répond correctement  
3. ✅ Dashboard ML fonctionnel
4. ✅ APIs répondent en < 500ms
5. ✅ Logs sans erreurs

### Configuration Domaine

```bash
# DNS A Records
your-domain.com → YOUR_SERVER_IP
api.your-domain.com → YOUR_SERVER_IP
dashboard.your-domain.com → YOUR_SERVER_IP
```

---

**🎉 Votre FrostByte est maintenant déployé et prêt à explorer l'univers ! 🌌**
