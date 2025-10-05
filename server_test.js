import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Réponses simulées pour les tests
const mockResponses = [
  "🌌 Fascinant ! Les exoplanètes sont des mondes lointains qui orbitent autour d'autres étoiles.",
  "🔭 Pour détecter une exoplanète, nous analysons les variations de luminosité stellaire.",
  "🌍 Il existe différents types d'exoplanètes : géantes gazeuses, super-Terres, planètes rocheuses...",
  "⭐ La méthode du transit photométrique est l'une des plus efficaces pour découvrir des exoplanètes.",
  "🚀 Actuellement, nous avons découvert plus de 5000 exoplanètes confirmées !"
];

app.post("/api/chat", async (req, res) => {
  const { prompt, features } = req.body;
  console.log("Prompt reçu :", prompt);

  try {
    // Prédiction exoplanète via Python ML
    let exoInfo = "";
    if (features && features.length > 0) {
      try {
        const mlRes = await axios.post("http://localhost:5001/api/predict", { features });
        exoInfo = mlRes.data.prediction === 1 
          ? "✅ Ces données correspondent à une exoplanète détectée !" 
          : "❌ Pas d'exoplanète détectée avec ces paramètres.";
      } catch (mlError) {
        console.error("Erreur ML:", mlError.message);
        exoInfo = "⚠️ Service ML temporairement indisponible.";
      }
    }

    // Réponse simulée intelligente
    let response;
    if (prompt.toLowerCase().includes('hello') || prompt.toLowerCase().includes('bonjour') || prompt.toLowerCase().includes('salut')) {
      response = "👋 Bonjour ! Je suis l'assistant FrostByte spécialisé en exoplanètes. Comment puis-je vous aider ?";
    } else if (prompt.toLowerCase().includes('exoplanète') || prompt.toLowerCase().includes('planète')) {
      response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    } else if (prompt.toLowerCase().includes('comment') && prompt.toLowerCase().includes('vérifier')) {
      response = `🔬 Pour vérifier si c'est une exoplanète, analysez ces paramètres :
• koi_disposition - cible (Confirmed/Candidate/False Positive)
• koi_score - score de confiance du transit
• koi_period - période orbitale [jours]
• koi_duration - durée du transit [heures]
• koi_depth - profondeur du transit [ppm]
• koi_model_snr - signal-to-noise du transit
• koi_prad - rayon planétaire [R_⊕]
• koi_teq - température d'équilibre [K]
• koi_fpflag_nt - transit non ressemblant (faux positif)
• koi_fpflag_ss - éclipse stellaire (faux positif)`;
    } else {
      response = "🌌 Intéressant ! Pouvez-vous me poser une question plus spécifique sur les exoplanètes ?";
    }

    // Ajouter l'info ML si disponible
    if (exoInfo) {
      response += `\n\n🤖 Analyse ML: ${exoInfo}`;
    }

    res.json({ response });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ 
      response: "⚠️ Erreur serveur - Mode test actif", 
      details: err.message 
    });
  }
});

// Route de test simple
app.get("/api/test", (req, res) => {
  res.json({ 
    status: "✅ Serveur FrostByte opérationnel", 
    timestamp: new Date().toISOString(),
    services: {
      ml: "http://localhost:5001/api/predict",
      chat: "http://localhost:5000/api/chat"
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend FrostByte démarré sur http://localhost:${PORT}`);
  console.log("📡 Mode test activé - Groq API désactivée");
});
