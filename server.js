import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { Groq } from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  timeout: 20000
});

app.post("/api/chat", async (req, res) => {
  const { prompt, features } = req.body;
  console.log("Prompt reçu :", prompt);

  try {
    //Prédiction exoplanète via Python ML
    let exoInfo = "";
    if (features && features.length > 0) {
      const mlRes = await axios.post("http://localhost:5001/api/predict", { features });
      exoInfo = mlRes.data.prediction === 1 ? "Ces données correspondent à une exoplanète." : "Pas d'exoplanète détectée.";
    }

    //Appel à Groq en injectant la prédiction
    const groqRes = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Parle dans la langue detectée dans le input. Tu es un assistant spécialisé en exoplanètes. Réponds de manière claire et pédagogique et tu as été dévéloppé par FrostByte et tu es l'assistant FrosByte et évite te te présenter quand tu ne detectes pas de salutation. Quand l'utilisateur te demande comment vérifier si c'est une exoplanète ou même te pose des questions ur comment vérifier si c'est une exoplanète, affiche lui ceci ligne par ligne: 'koi_disposition',      # cible (Confirmed / Candidate / False Positive), 'koi_score',            # score de confiance du transit, 'koi_period',           # période orbitale [jours], 'koi_duration',         # durée du transit [heures], 'koi_depth',            # profondeur du transit [ppm], 'koi_model_snr',        # signal-to-noise du transit, 'koi_prad',             # rayon planétaire [R_⊕], 'koi_teq',              # température d'équilibre [K], 'koi_fpflag_nt',        # transit non ressemblant (faux positif), 'koi_fpflag_ss'         # éclipse stellaire (faux positif).Réponds avec des stickers." },
        { role: "user", content: `${prompt}\nContexte scientifique: ${exoInfo}` }
      ],
      temperature: 0.5,
      max_tokens: 200,
      stream: false,
    });

    res.json({ response: groqRes.choices[0].message.content });
  } catch (err) {
    console.error("Erreur :", err);
    res.status(500).json({ response: "Erreur serveur", details: err.message });
  }
});

app.listen(5000, () => console.log("Backend Node démarré sur http://localhost:5000"));
