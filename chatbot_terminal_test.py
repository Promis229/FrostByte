#!/usr/bin/env python3
"""
Chatbot Terminal FrostByte - Version Test
Assistant IA multilingue pour les exoplanètes
"""

import requests
from deep_translator import GoogleTranslator
from langdetect import detect
import json

def query_backend_api(prompt):
    """Interroger l'API backend au lieu d'Ollama"""
    try:
        response = requests.post("http://localhost:5000/api/chat", 
                               json={"prompt": prompt}, 
                               timeout=10)
        if response.status_code == 200:
            return response.json().get("response", "Erreur de réponse")
        else:
            return f"Erreur API: {response.status_code}"
    except Exception as e:
        return f"Erreur de connexion: {e}"

def main():
    print("🌌 Chatbot Terminal FrostByte - Mode Test")
    print("Assistant IA spécialisé en exoplanètes")
    print("Tapez 'quit' pour quitter\n")
    
    while True:
        try:
            user_input = input("Vous: ").strip()
            
            if user_input.lower() in ['quit', 'exit', 'sortir']:
                print("👋 Au revoir !")
                break
                
            if not user_input:
                continue
            
            # Détecter la langue
            try:
                detected_lang = detect(user_input)
                print(f"🔍 Langue détectée: {detected_lang}")
            except:
                detected_lang = 'fr'
            
            # Traduire en anglais si nécessaire
            if detected_lang != 'en':
                try:
                    translated_input = GoogleTranslator(source=detected_lang, target='en').translate(user_input)
                    print(f"🔄 Traduction: {translated_input}")
                except:
                    translated_input = user_input
            else:
                translated_input = user_input
            
            # Obtenir la réponse via l'API backend
            print("🤖 Assistant réfléchit...")
            response_en = query_backend_api(translated_input)
            
            # Traduire la réponse dans la langue d'origine
            if detected_lang != 'en':
                try:
                    final_response = GoogleTranslator(source='en', target=detected_lang).translate(response_en)
                except:
                    final_response = response_en
            else:
                final_response = response_en
            
            print(f"🌌 Assistant: {final_response}\n")
            
        except KeyboardInterrupt:
            print("\n👋 Au revoir !")
            break
        except Exception as e:
            print(f"❌ Erreur: {e}\n")

if __name__ == "__main__":
    main()
