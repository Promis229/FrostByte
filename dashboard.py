import streamlit as st
import pandas as pd
import numpy as np
import joblib
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots

# Configuration de la page
st.set_page_config(
    page_title="Kepler Exoplanet Predictor",
    page_icon="🔭",
    layout="wide",
    initial_sidebar_state="expanded"
)

# CSS personnalisé
st.markdown("""
    <style>
    .main {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .stApp {
        background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    }
    h1 {
        color: #ffffff;
        text-align: center;
        padding: 20px;
    }
    .prediction-box {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 20px;
        margin: 10px 0;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    </style>
    """, unsafe_allow_html=True)

# Titre principal
st.markdown("# 🔭 Kepler Exoplanet Prediction Dashboard")
st.markdown("### Prédisez si un objet céleste est une exoplanète confirmée, candidate ou un faux positif")

# ============================================================================
# CHARGEMENT DES MODÈLES
# ============================================================================

@st.cache_resource
def load_models():
    try:
        model = joblib.load("best_exoplanet_model.pkl")
        scaler = joblib.load("exoplanet_scaler.pkl")
        encoder = joblib.load("exoplanet_label_encoder.pkl")
        return model, scaler, encoder
    except FileNotFoundError:
        st.error("⚠️ Modèles non trouvés ! Veuillez d'abord exécuter le script d'entraînement.")
        return None, None, None

model, scaler, encoder = load_models()

# ============================================================================
# FONCTION DE PRÉDICTION
# ============================================================================

def predict_exoplanet(features_dict):
    """Fait une prédiction basée sur les features fournies"""
    
    # Créer un DataFrame avec les features de base
    base_features = pd.DataFrame([{
        'koi_score': features_dict['koi_score'],
        'koi_period': features_dict['koi_period'],
        'koi_duration': features_dict['koi_duration'],
        'koi_depth': features_dict['koi_depth'],
        'koi_model_snr': features_dict['koi_model_snr'],
        'koi_prad': features_dict['koi_prad'],
        'koi_teq': features_dict['koi_teq'],
        'koi_fpflag_nt': features_dict['koi_fpflag_nt'],
        'koi_fpflag_ss': features_dict['koi_fpflag_ss']
    }])
    
    # Créer les features engineered (comme dans le script d'entraînement)
    base_features['radius_period_ratio'] = base_features['koi_prad'] / np.sqrt(base_features['koi_period'])
    base_features['fp_flag_sum'] = base_features['koi_fpflag_nt'] + base_features['koi_fpflag_ss']
    base_features['log_period'] = np.log1p(base_features['koi_period'])
    base_features['log_depth'] = np.log1p(base_features['koi_depth'])
    base_features['log_snr'] = np.log1p(base_features['koi_model_snr'])
    
    # Standardiser
    features_scaled = scaler.transform(base_features)
    
    # Prédire
    prediction = model.predict(features_scaled)[0]
    probabilities = model.predict_proba(features_scaled)[0]
    
    return encoder.inverse_transform([prediction])[0], probabilities

# ============================================================================
# INTERFACE UTILISATEUR
# ============================================================================

if model is not None:
    
    # Sidebar pour les paramètres
    st.sidebar.header("🎛️ Paramètres de l'objet céleste")
    st.sidebar.markdown("---")
    
    # Mode de saisie
    input_mode = st.sidebar.radio(
        "Mode de saisie",
        ["Manuel", "Exemples prédéfinis", "Valeurs aléatoires"]
    )
    
    st.sidebar.markdown("---")
    
    # Initialisation des valeurs
    if input_mode == "Exemples prédéfinis":
        example_choice = st.sidebar.selectbox(
            "Choisir un exemple",
            ["Kepler-1b (Confirmé)", "Hot Jupiter (Confirmé)", "Super-Terre (Candidate)", "Faux Positif"]
        )
        
        examples = {
            "Kepler-1b (Confirmé)": {
                'koi_score': 0.811,
                'koi_period': 2.47,
                'koi_duration': 1.74,
                'koi_depth': 14231,
                'koi_model_snr': 4304.3,
                'koi_prad': 13.04,
                'koi_teq': 1339,
                'koi_fpflag_nt': 0,
                'koi_fpflag_ss': 0
            },
            "Hot Jupiter (Confirmé)": {
                'koi_score': 0.998,
                'koi_period': 3.52,
                'koi_duration': 3.20,
                'koi_depth': 9145,
                'koi_model_snr': 1741.5,
                'koi_prad': 14.59,
                'koi_teq': 1521,
                'koi_fpflag_nt': 0,
                'koi_fpflag_ss': 0
            },
            "Super-Terre (Candidate)": {
                'koi_score': 0.0,
                'koi_period': 19.90,
                'koi_duration': 1.78,
                'koi_depth': 10829,
                'koi_model_snr': 76.3,
                'koi_prad': 14.60,
                'koi_teq': 638,
                'koi_fpflag_nt': 0,
                'koi_fpflag_ss': 0
            },
            "Faux Positif": {
                'koi_score': 0.0,
                'koi_period': 1.74,
                'koi_duration': 2.41,
                'koi_depth': 8079,
                'koi_model_snr': 505.6,
                'koi_prad': 33.46,
                'koi_teq': 1395,
                'koi_fpflag_nt': 0,
                'koi_fpflag_ss': 1
            }
        }
        
        input_values = examples[example_choice]
        
    elif input_mode == "Valeurs aléatoires":
        if st.sidebar.button("🎲 Générer des valeurs aléatoires"):
            input_values = {
                'koi_score': np.random.uniform(0, 1),
                'koi_period': np.random.uniform(0.5, 100),
                'koi_duration': np.random.uniform(0.5, 15),
                'koi_depth': np.random.uniform(10, 20000),
                'koi_model_snr': np.random.uniform(5, 5000),
                'koi_prad': np.random.uniform(0.5, 30),
                'koi_teq': np.random.uniform(200, 2500),
                'koi_fpflag_nt': np.random.choice([0, 1]),
                'koi_fpflag_ss': np.random.choice([0, 1])
            }
        else:
            input_values = {
                'koi_score': 0.8,
                'koi_period': 10.0,
                'koi_duration': 3.0,
                'koi_depth': 1000,
                'koi_model_snr': 100,
                'koi_prad': 2.5,
                'koi_teq': 500,
                'koi_fpflag_nt': 0,
                'koi_fpflag_ss': 0
            }
    else:
        input_values = None
    
    # Interface de saisie manuelle
    st.sidebar.markdown("### 📊 Paramètres de transit")
    
    koi_score = st.sidebar.slider(
        "Score de confiance (koi_score)",
        min_value=0.0,
        max_value=1.0,
        value=input_values['koi_score'] if input_values else 0.8,
        step=0.01,
        help="Score calculé par l'algorithme Kepler (0-1)"
    )
    
    koi_model_snr = st.sidebar.number_input(
        "Signal-to-Noise Ratio (koi_model_snr)",
        min_value=0.0,
        max_value=10000.0,
        value=float(input_values['koi_model_snr']) if input_values else 100.0,
        step=10.0,
        help="Qualité du signal de transit détecté"
    )
    
    st.sidebar.markdown("### 🪐 Paramètres orbitaux")
    
    koi_period = st.sidebar.number_input(
        "Période orbitale [jours] (koi_period)",
        min_value=0.1,
        max_value=1000.0,
        value=float(input_values['koi_period']) if input_values else 10.0,
        step=0.1,
        help="Temps pour un tour complet autour de l'étoile"
    )
    
    koi_duration = st.sidebar.number_input(
        "Durée du transit [heures] (koi_duration)",
        min_value=0.1,
        max_value=24.0,
        value=float(input_values['koi_duration']) if input_values else 3.0,
        step=0.1,
        help="Durée pendant laquelle la planète passe devant l'étoile"
    )
    
    koi_depth = st.sidebar.number_input(
        "Profondeur du transit [ppm] (koi_depth)",
        min_value=1.0,
        max_value=50000.0,
        value=float(input_values['koi_depth']) if input_values else 1000.0,
        step=10.0,
        help="Baisse de luminosité en parties par million"
    )
    
    st.sidebar.markdown("### 🌍 Propriétés planétaires")
    
    koi_prad = st.sidebar.number_input(
        "Rayon planétaire [R⊕] (koi_prad)",
        min_value=0.1,
        max_value=50.0,
        value=float(input_values['koi_prad']) if input_values else 2.5,
        step=0.1,
        help="Taille par rapport à la Terre (1 = Terre, 11.2 = Jupiter)"
    )
    
    koi_teq = st.sidebar.number_input(
        "Température d'équilibre [K] (koi_teq)",
        min_value=0.0,
        max_value=3000.0,
        value=float(input_values['koi_teq']) if input_values else 500.0,
        step=10.0,
        help="Température théorique de la planète"
    )
    
    st.sidebar.markdown("### 🚩 Drapeaux de faux positifs")
    
    koi_fpflag_nt = st.sidebar.selectbox(
        "Transit non ressemblant (koi_fpflag_nt)",
        [0, 1],
        index=input_values['koi_fpflag_nt'] if input_values else 0,
        help="1 = Signal ne ressemble pas à un transit"
    )
    
    koi_fpflag_ss = st.sidebar.selectbox(
        "Éclipse stellaire (koi_fpflag_ss)",
        [0, 1],
        index=input_values['koi_fpflag_ss'] if input_values else 0,
        help="1 = Signal probablement causé par une éclipse binaire"
    )
    
    # Bouton de prédiction
    st.sidebar.markdown("---")
    predict_button = st.sidebar.button("🚀 LANCER LA PRÉDICTION", use_container_width=True)
    
    # ============================================================================
    # ZONE PRINCIPALE - RÉSULTATS
    # ============================================================================
    
    # Créer les colonnes principales
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### 📋 Valeurs d'entrée")
        
        input_df = pd.DataFrame([{
            'Paramètre': 'Score de confiance',
            'Valeur': f"{koi_score:.3f}",
            'Unité': '-'
        }, {
            'Paramètre': 'Période orbitale',
            'Valeur': f"{koi_period:.2f}",
            'Unité': 'jours'
        }, {
            'Paramètre': 'Durée du transit',
            'Valeur': f"{koi_duration:.2f}",
            'Unité': 'heures'
        }, {
            'Paramètre': 'Profondeur',
            'Valeur': f"{koi_depth:.1f}",
            'Unité': 'ppm'
        }, {
            'Paramètre': 'Signal-to-Noise',
            'Valeur': f"{koi_model_snr:.1f}",
            'Unité': '-'
        }, {
            'Paramètre': 'Rayon planétaire',
            'Valeur': f"{koi_prad:.2f}",
            'Unité': 'R⊕'
        }, {
            'Paramètre': 'Température',
            'Valeur': f"{koi_teq:.0f}",
            'Unité': 'K'
        }, {
            'Paramètre': 'Flag transit non ressemblant',
            'Valeur': str(koi_fpflag_nt),
            'Unité': '-'
        }, {
            'Paramètre': 'Flag éclipse stellaire',
            'Valeur': str(koi_fpflag_ss),
            'Unité': '-'
        }])
        
        st.dataframe(input_df, use_container_width=True, hide_index=True)
    
    with col2:
        st.markdown("### 🎯 Résultat de la prédiction")
        
        if predict_button or input_mode != "Manuel":
            features = {
                'koi_score': koi_score,
                'koi_period': koi_period,
                'koi_duration': koi_duration,
                'koi_depth': koi_depth,
                'koi_model_snr': koi_model_snr,
                'koi_prad': koi_prad,
                'koi_teq': koi_teq,
                'koi_fpflag_nt': koi_fpflag_nt,
                'koi_fpflag_ss': koi_fpflag_ss
            }
            
            prediction, probabilities = predict_exoplanet(features)
            
            # Affichage de la prédiction
            colors = {
                'CONFIRMED': '#28a745',
                'CANDIDATE': '#ffc107',
                'FALSE POSITIVE': '#dc3545'
            }
            
            icons = {
                'CONFIRMED': '✅',
                'CANDIDATE': '⚠️',
                'FALSE POSITIVE': '❌'
            }
            
            st.markdown(f"""
            <div style='background: {colors.get(prediction, '#666')}; 
                        padding: 30px; 
                        border-radius: 15px; 
                        text-align: center;
                        box-shadow: 0 8px 16px rgba(0,0,0,0.3);'>
                <h1 style='color: white; margin: 0; font-size: 3em;'>{icons.get(prediction, '🔍')}</h1>
                <h2 style='color: white; margin: 10px 0 0 0;'>{prediction}</h2>
            </div>
            """, unsafe_allow_html=True)
            
            st.markdown("---")
            
            # Graphique des probabilités
            prob_df = pd.DataFrame({
                'Classe': encoder.classes_,
                'Probabilité': probabilities
            })
            
            fig_prob = px.bar(
                prob_df,
                x='Classe',
                y='Probabilité',
                color='Classe',
                color_discrete_map={
                    'CONFIRMED': '#28a745',
                    'CANDIDATE': '#ffc107',
                    'FALSE POSITIVE': '#dc3545'
                },
                title='Probabilités par classe',
                text='Probabilité'
            )
            
            fig_prob.update_traces(texttemplate='%{text:.2%}', textposition='outside')
            fig_prob.update_layout(
                showlegend=False,
                yaxis_title='Probabilité',
                yaxis_tickformat='.0%',
                plot_bgcolor='rgba(0,0,0,0)',
                paper_bgcolor='rgba(0,0,0,0)',
                font=dict(color='white')
            )
            
            st.plotly_chart(fig_prob, use_container_width=True)
        else:
            st.info("👈 Cliquez sur 'LANCER LA PRÉDICTION' dans la barre latérale")
    
    # ============================================================================
    # SECTION INFORMATIONS COMPLÉMENTAIRES
    # ============================================================================
    
    st.markdown("---")
    st.markdown("### 📊 Analyse des paramètres")
    
    col3, col4, col5 = st.columns(3)
    
    with col3:
        st.metric(
            label="Type de planète estimé",
            value="Jupiter chaud" if koi_prad > 8 else "Super-Terre" if koi_prad > 1.5 else "Taille Terre",
            delta=f"{koi_prad:.1f} R⊕"
        )
    
    with col4:
        zone_habit = "Zone habitable" if 200 < koi_teq < 350 else "Trop chaud" if koi_teq > 350 else "Trop froid"
        st.metric(
            label="Zone orbitale",
            value=zone_habit,
            delta=f"{koi_teq:.0f} K"
        )
    
    with col5:
        orbit_type = "Très proche" if koi_period < 10 else "Proche" if koi_period < 100 else "Éloignée"
        st.metric(
            label="Orbite",
            value=orbit_type,
            delta=f"{koi_period:.1f} jours"
        )
    
    # Graphique radar des caractéristiques
    st.markdown("### 📈 Profil de l'objet")
    
    # Normaliser les valeurs pour le graphique radar
    radar_values = [
        min(koi_score * 100, 100),
        min((koi_model_snr / 100) * 100, 100),
        min((koi_prad / 20) * 100, 100),
        min((koi_depth / 10000) * 100, 100),
        100 if koi_fpflag_nt == 0 and koi_fpflag_ss == 0 else 0
    ]
    
    fig_radar = go.Figure(data=go.Scatterpolar(
        r=radar_values,
        theta=['Score<br>confiance', 'SNR', 'Rayon', 'Profondeur<br>transit', 'Qualité<br>signal'],
        fill='toself',
        line=dict(color='cyan'),
        fillcolor='rgba(0, 255, 255, 0.3)'
    ))
    
    fig_radar.update_layout(
        polar=dict(
            radialaxis=dict(
                visible=True,
                range=[0, 100],
                tickfont=dict(color='white')
            ),
            angularaxis=dict(
                tickfont=dict(color='white')
            ),
            bgcolor='rgba(0,0,0,0.3)'
        ),
        showlegend=False,
        plot_bgcolor='rgba(0,0,0,0)',
        paper_bgcolor='rgba(0,0,0,0)',
        font=dict(color='white'),
        height=400
    )
    
    st.plotly_chart(fig_radar, use_container_width=True)
    
    # ============================================================================
    # FOOTER
    # ============================================================================
    
    st.markdown("---")
    st.markdown("""
    <div style='text-align: center; color: #aaa; padding: 20px;'>
        <p>🔭 Kepler Exoplanet Predictor | Données NASA Exoplanet Archive</p>
        <p>Modèle: Random Forest optimisé | Précision: ~95%</p>
    </div>
    """, unsafe_allow_html=True)

else:
    st.error("❌ Impossible de charger les modèles. Veuillez exécuter le script d'entraînement d'abord.")
