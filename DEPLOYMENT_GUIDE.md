# 🚀 Guide de Déploiement Vercel - FrostByte

## 📋 Stratégie de Déploiement

### 🎯 Déploiement Principal (Ce Repository)
**URL finale** : `https://frostbyte.vercel.app`
**Contenu** :
- ✅ Page d'accueil (`index.html`)
- ✅ Jeu Cosmo (`game/`)
- ✅ Interface Chatbot (`chatbot_test.html`)
- ✅ API Backend Node.js (`server_test.js`)

### 📊 Dashboard Séparé (À créer)
**URL finale** : `https://frostbyte-dashboard.vercel.app`
**Contenu** :
- ✅ Dashboard Streamlit (`dashboard.py`)
- ✅ API ML Flask (`back.py`)
- ✅ Modèles ML (`.pkl`)

---

## 🚀 ÉTAPE 1 : Déploiement Principal

### A. Préparation
```bash
# 1. Vérifier que tout est committé
git add .
git commit -m "feat: Prepare for Vercel deployment"
git push origin main

# 2. Vérifier les fichiers de configuration
# ✅ vercel.json (configuré)
# ✅ package.json (configuré)
# ✅ .vercelignore (configuré)
```

### B. Sur Vercel
1. **Aller sur** : https://vercel.com/new
2. **Importer** : `https://github.com/Promis229/FrostByte`
3. **Configuration** :
   - **Project Name** : `frostbyte`
   - **Framework Preset** : `Other`
   - **Root Directory** : `./`
   - **Build Command** : `npm run vercel-build`
   - **Output Directory** : `./`

4. **Variables d'Environnement** :
   - `GROQ_API_KEY` = `votre_clé_groq`

5. **Déployer** : Cliquer "Deploy"

### C. Vérification Post-Déploiement
```bash
# Tester les endpoints
curl https://frostbyte.vercel.app/api/test
curl https://frostbyte.vercel.app/api/chat

# Vérifier les pages
https://frostbyte.vercel.app/
https://frostbyte.vercel.app/game/
https://frostbyte.vercel.app/chatbot
```

---

## 📊 ÉTAPE 2 : Dashboard Séparé (Optionnel)

### Option A : Streamlit Cloud (Recommandé)
1. **Créer nouveau repo** : `FrostByte-Dashboard`
2. **Copier fichiers** :
   ```
   dashboard.py
   back.py
   requirements.txt
   *.pkl files
   ```
3. **Déployer sur** : https://streamlit.io/cloud

### Option B : Python Runtime (Vercel)
1. **Créer** `api/dashboard.py`
2. **Configurer** `vercel.json` pour Python
3. **Déployer** sur Vercel séparément

---

## 🔧 Configuration Avancée

### Domaine Personnalisé
1. **Sur Vercel** : Settings → Domains
2. **Ajouter** : `frostbyte.com`
3. **Configurer DNS** chez votre registrar

### Variables d'Environnement
```env
GROQ_API_KEY=gsk_...
NODE_ENV=production
API_URL=https://frostbyte.vercel.app
DASHBOARD_URL=https://frostbyte-dashboard.vercel.app
```

### Monitoring
- **Vercel Analytics** : Activé automatiquement
- **Error Tracking** : Intégré à Vercel
- **Logs** : Disponibles dans Vercel Dashboard

---

## 🎯 Points de Vérification

### ✅ Checklist Pré-Déploiement
- [ ] Repository GitHub public et à jour
- [ ] `vercel.json` configuré correctement
- [ ] `.vercelignore` optimisé
- [ ] `package.json` avec bonnes dépendances
- [ ] Variables d'environnement notées
- [ ] API Groq fonctionnelle

### ✅ Checklist Post-Déploiement
- [ ] Site accessible via URL Vercel
- [ ] Jeu Cosmo fonctionne
- [ ] Chatbot répond aux messages
- [ ] API `/api/chat` répond
- [ ] Liens vers dashboard configurés
- [ ] Performance acceptable (<3s)

---

## 🚨 Dépannage

### Problème : Build Failed
```bash
# Vérifier les logs Vercel
# Souvent lié aux dépendances Node.js
npm install
npm run vercel-build
```

### Problème : API ne répond pas
```bash
# Vérifier server_test.js
# Vérifier les variables d'environnement
# Vérifier les CORS
```

### Problème : 404 sur les routes
```bash
# Vérifier vercel.json routes
# Vérifier que les fichiers existent
```

---

## 📈 Optimisations Production

### Performance
- **Static files** : Optimisés par Vercel CDN
- **API responses** : Cache headers appropriés
- **Images** : Compression automatique

### SEO
- **Meta tags** : Dans index.html
- **Sitemap** : Généré automatiquement
- **robots.txt** : Configuré pour indexation

### Sécurité
- **HTTPS** : Automatique sur Vercel
- **Headers** : Security headers activés
- **API Rate Limiting** : À implémenter si nécessaire

---

## 🎉 Félicitations !

Une fois déployé, votre FrostByte sera accessible à :
- **🌐 Site principal** : `https://frostbyte.vercel.app`
- **🎮 Jeu** : `https://frostbyte.vercel.app/game/`
- **🤖 Chatbot** : `https://frostbyte.vercel.app/chatbot`
- **📊 Dashboard** : `https://frostbyte-dashboard.vercel.app`

**Recherche Google** : Tapez "FrostByte space exploration" pour trouver votre site ! 🚀
