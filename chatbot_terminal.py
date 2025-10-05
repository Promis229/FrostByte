import subprocess
from langdetect import detect
from deep_translator import GoogleTranslator

GREEN = "\033[92m"
BLUE = "\033[94m"
RESET = "\033[0m"

def detect_and_translate(user_input, target="en"):
    detected_lang = detect(user_input)
    translation = GoogleTranslator(source="auto", target=target).translate(user_input)
    return detected_lang, translation

def query_ollama(prompt, model="promis"):
    result = subprocess.run(
        ["ollama", "run", model],
        input=prompt,
        text=True,
        capture_output=True
    )
    return result.stdout.strip()

def main():
    while True:
        user_input = input(f"{GREEN}Vous:{RESET} ")
        if user_input.lower() in ["exit", "quit", "q", "au revoir", "bye",]:
            break
        detected_lang, translated_input = detect_and_translate(user_input, target="en")
        #print(f"[Langue détectée: {detected_lang}]")
        #print(f"Message en anglais: {translated_input}")
        response_en = query_ollama(translated_input, model="promis")
        #print(f"Réponse du modèle en anglais: {response_en}")
        if detected_lang != "en":
            response_final = GoogleTranslator(source="en", target=detected_lang).translate(response_en)
        else:
            response_final = response_en
        print(f"{BLUE}Assistant Promis:{RESET} {response_final}\n")

if __name__ == "__main__":
    main()
