#!/bin/bash

MODEL="mistral"

echo "Vérification d'Ollama..."
if ! command -v ollama &> /dev/null; then
    echo "Ollama n'est pas installé. Installe-le depuis https://ollama.com/download"
    exit 1
fi

# Boucle de téléchargement avec reprise
while true; do
    echo "⬇Téléchargement/reprise du modèle $MODEL..."
    ollama pull $MODEL
    if [ $? -eq 0 ]; then
        echo "Téléchargement terminé."
        break
    else
        echo "Téléchargement interrompu, nouvelle tentative dans 10s..."
        sleep 10
    fi
done

echo "Lancement du modèle $MODEL..."
ollama run $MODEL
