import { useState, useEffect } from "react";
import { Send, Plus, MessageCircle, BarChart3 } from "lucide-react";

export default function App() {
  const [mode, setMode] = useState(null);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");

  // Animation de points pendant chargement
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots("");
    }
  }, [loading]);

  // ---------- CHAT ----------
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      const data = await res.json();
      let botText = data.response || "Réponse indisponible.";

      // Si le bot parle de prédiction => propose le Dashboard
      if (
        /prédire|exoplanète|détecter|analyser/i.test(userMessage.text) ||
        /exoplanète/i.test(botText)
      ) {
        botText +=
          "\n\n🔭 Souhaites-tu faire une prédiction toi-même ?\n👉 [Ouvrir le Dashboard de Prédiction](#dashboard)";
      }

      const botMessage = { role: "assistant", text: botText };
      setMessages((prev) => [...prev, botMessage]);

      // Gestion du thème de chat
      let theme = "Chat";
      if (!currentChat) {
        const themeRes = await fetch("http://localhost:5000/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Donne un thème en 3 mots max pour cette entrée: "${userMessage.text}"`,
          }),
        });
        const themeData = await themeRes.json();
        theme =
          themeData.response.replace(/['".,!?]/g, "").trim() || "Conversation";

        const newChat = {
          id: Date.now(),
          title: theme,
          messages: [userMessage, botMessage],
        };
        setChats((prev) => [...prev, newChat]);
        setCurrentChat(newChat.id);
      } else {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === currentChat
              ? { ...chat, messages: [...chat.messages, botMessage] }
              : chat
          )
        );
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Erreur de connexion. Contacte-nous à : promis.fangnon@epitech.eu",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentChat(null);
    setMessages([]);
  };

  const loadChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    setCurrentChat(chatId);
    setMessages(chat.messages);
  };

  // ---------- PAGE D’ACCUEIL ----------
  if (!mode) {
    return (
      <div
        style={{
          height: "100vh",
          background: "linear-gradient(135deg, #1e3a8a, #111827)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "40px" }}>
          🚀 Bienvenue sur FrostByteAI
        </h1>
        <p style={{ marginBottom: "30px", fontSize: "1.2rem" }}>
          Choisis ton mode d’utilisation :
        </p>
        <div style={{ display: "flex", gap: "30px" }}>
          <button
            onClick={() => setMode("chat")}
            style={{
              background: "#3b82f6",
              border: "none",
              padding: "20px 40px",
              borderRadius: "15px",
              fontSize: "1.2rem",
              color: "white",
              cursor: "pointer",
            }}
          >
            <MessageCircle size={28} /> <br /> Chat FrostByteAI
          </button>

          <button
            onClick={() => setMode("dashboard")}
            style={{
              background: "#10b981",
              border: "none",
              padding: "20px 40px",
              borderRadius: "15px",
              fontSize: "1.2rem",
              color: "white",
              cursor: "pointer",
            }}
          >
            <BarChart3 size={28} /> <br /> Dashboard Prédiction
          </button>
        </div>
      </div>
    );
  }

  // ---------- DASHBOARD ----------
  if (mode === "dashboard") {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#0f172a",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "10px",
            backgroundColor: "#1e293b",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>📊 FrostByte Dashboard</h2>
          <button
            onClick={() => setMode(null)}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            ⬅️ Retour
          </button>
        </div>

        <iframe
          src="http://localhost:8501"
          style={{
            flex: 1,
            border: "none",
            width: "100%",
            height: "100%",
          }}
          title="Kepler Exoplanet Predictor"
        />
      </div>
    );
  }

  // ---------- CHAT MODE ----------
  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#1e3a8a", color: "white" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "25%",
          backgroundColor: "#1e40af",
          borderRight: "2px solid #374151",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            borderBottom: "1px solid #374151",
            paddingBottom: "15px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Conversations</h2>
          <button
            onClick={startNewChat}
            style={{
              backgroundColor: "#3b82f6",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            <Plus size={20} />
          </button>
        </div>
        <div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              style={{
                padding: "12px",
                cursor: "pointer",
                borderBottom: "1px solid #374151",
                backgroundColor: currentChat === chat.id ? "#3b82f6" : "transparent",
                borderRadius: "4px",
                marginBottom: "5px",
              }}
            >
              {chat.title}
            </div>
          ))}
        </div>
      </div>

      {/* Main zone */}
      <div style={{ flex: 1, position: "relative", backgroundColor: "#1e3a8a" }}>
        {messages.length === 0 && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <h1 style={{ fontSize: "5rem", fontWeight: "900", margin: 0 }}>
              Bienvenue à FrostByteAI !!
            </h1>
          </div>
        )}

        {/* Messages */}
        <div
          style={{
            height: "calc(100vh - 120px)",
            overflowY: "auto",
            padding: "20px",
            paddingBottom: "100px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "95%", margin: "0 auto" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    maxWidth: m.role === "user" ? "60%" : "85%",
                    padding: "20px",
                    borderRadius: "15px",
                    backgroundColor: m.role === "user" ? "#16a34a" : "#1e40af",
                    color: "white",
                    fontSize: "18px",
                    lineHeight: "1.6",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessage(m.text) }}
                />
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "20px",
                    borderRadius: "15px",
                    backgroundColor: "#1e40af",
                    color: "white",
                    fontSize: "18px",
                    fontStyle: "italic",
                  }}
                >
                  Assistant FrostByte réfléchit{dots}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Barre d’entrée */}
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            left: "35%",
            right: "30px",
            display: "flex",
            gap: "15px",
            zIndex: 20,
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Tapez votre message..."
            style={{
              flex: 1,
              padding: "15px 20px",
              fontSize: "20px",
              backgroundColor: "#1e40af",
              border: "2px solid #3b82f6",
              borderRadius: "15px",
              color: "white",
              outline: "none",
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            style={{
              padding: "15px",
              backgroundColor: "#06b6d4",
              border: "none",
              borderRadius: "15px",
              color: "white",
              cursor: "pointer",
              opacity: loading || !input.trim() ? 0.5 : 1,
            }}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Transforme les liens Markdown en vrais liens cliquables
function formatMessage(text) {
  return text.replace(
    /\[([^\]]+)\]\((#[^)]+)\)/g,
    `<a href="#" onclick="window.location.href='$2'" style="color:#06b6d4; text-decoration:none;">$1</a>`
  );
}
