

class CosmoGuide {
    constructor() {
        this.currentMessage = 0;
        this.isVisible = false;
        this.autoMessageTimer = null;
        this.contextMessages = new Map();
        this.init();
    }

    init() {
        this.createCosmoElement();
        this.setupEventListeners();
        this.loadContextualMessages();
        this.startAutoMessages();
    }

    createCosmoElement() {
        
        const cosmoContainer = document.createElement('div');
        cosmoContainer.className = 'cosmo-guide';
        cosmoContainer.id = 'cosmo-guide';

        cosmoContainer.innerHTML = `
            <div class="cosmo-speech" id="cosmo-speech">
                <h4>🌟 Cosmo</h4>
                <p id="cosmo-message">Salut explorateur ! Je suis Cosmo, ton guide spatial ! Bienvenue dans mon univers ! 🚀</p>
                <div class="cosmo-tips" id="cosmo-tips"></div>
            </div>
            <div class="cosmo-avatar" id="cosmo-avatar">
                <img src="cosmo.png" alt="Cosmo le guide spatial" onerror="this.style.background='var(--accent-blue)'">
            </div>
        `;

        document.body.appendChild(cosmoContainer);
        
        this.speechBubble = document.getElementById('cosmo-speech');
        this.avatar = document.getElementById('cosmo-avatar');
        this.messageElement = document.getElementById('cosmo-message');
        this.tipsElement = document.getElementById('cosmo-tips');
    }

    setupEventListeners() {
        
        this.avatar.addEventListener('click', () => {
            this.toggleVisibility();
            this.addExcitedAnimation();
        });

        this.avatar.addEventListener('mouseenter', () => {
            this.avatar.classList.add('talking');
        });

        this.avatar.addEventListener('mouseleave', () => {
            this.avatar.classList.remove('talking');
        });

        this.startRandomAnimations();
    }

    loadContextualMessages() {
        
        const page = this.getCurrentPage();
        
        const welcomeMessages = {
            'index': [
                "Welcome to my space world! Press 'S' to scan space! 🔍",
                "You'll discover incredible planets in my universe! Start exploring! 🌍",
                "Each planet has its secrets... It's up to you to discover them with me! ✨"
            ],
            'test': [
                "Test mode activated! Perfect for checking that everything works! 🧪",
                "Here you can test my functions and planet generation! 🔬",
                "Tests are important to ensure my system works well! ✅"
            ],
            'debug': [
                "Debug page! You're a real developer! 👨‍💻",
                "Here we can check that clicks work well with me! 🖱️",
                "Debugging is essential to fix my little problems! 🔧"
            ],
            'audio': [
                "Sound test! Audio makes my universe more immersive! 🔊",
                "Make sure all my sound effects work! 🎵",
                "Good spatial sound enhances the experience in my world! 🎧"
            ]
        };

        const encouragementMessages = [
            "You're doing great work! Keep it up! 💪",
            "Each discovery brings you closer to the stars! ⭐",
            "Space exploration is exciting! 🚀",
            "You're becoming an exoplanet expert! 🌟",
            "Bravo for your scientific curiosity! 🔭",
            "Keep exploring, the universe is infinite! ♾️"
        ];

        const tipMessages = [
            "💡 Tip: Use 'S' to scan quickly!",
            "🎯 Advice: Rare planets are harder to find!",
            "⚡ Info : Chaque planète a des propriétés uniques !",
            "🎮 Raccourci : 'Q' lance un quiz d'astronomie !",
            "🏆 Objective: Find all legendary planets!",
            "📚 Knowledge: Exoplanets are fascinating worlds!"
        ];

        this.contextMessages.set('welcome', welcomeMessages[page] || welcomeMessages['index']);
        this.contextMessages.set('encouragement', encouragementMessages);
        this.contextMessages.set('tips', tipMessages);

        this.contextMessages.set('galactic_path', [
            "Welcome to the Galactic Path! Each level tests your astronomical knowledge! 🚀",
            "Progress level by level to become a Galactic Master! 🌟",
            "Each unlocked level brings you closer to the secrets of the universe! ⭐"
        ]);
        
        this.contextMessages.set('level_complete', [
            "Bravo! You completed this level brilliantly! 🎉",
            "Excellent performance! Keep it up! 💫",
            "Your astronomical knowledge is improving! 🌟"
        ]);
        
        this.contextMessages.set('level_failed', [
            "Don't worry! Learning requires patience! 📚",
            "Try this level again, you'll make it! 💪",
            "Every mistake is a learning opportunity! 🔬"
        ]);
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('test.html')) return 'test';
        if (path.includes('debug')) return 'debug';
        if (path.includes('audio')) return 'audio';
        return 'index';
    }

    showMessage(message, tips = '', duration = 5000) {
        this.messageElement.textContent = message;
        this.tipsElement.textContent = tips;
        
        this.speechBubble.classList.add('active');
        this.avatar.classList.add('talking');
        this.isVisible = true;

        if (message.includes('🏆') || message.includes('INCROYABLE') || message.includes('Légendaire')) {
            this.addExcitedAnimation();
        }

        if (duration > 0) {
            setTimeout(() => {
                this.hideMessage();
            }, duration);
        }
    }

    hideMessage() {
        this.speechBubble.classList.remove('active');
        this.avatar.classList.remove('talking');
        this.isVisible = false;
    }

    toggleVisibility() {
        if (this.isVisible) {
            this.hideMessage();
        } else {
            this.showRandomMessage();
        }
    }

    showRandomMessage() {
        const categories = ['encouragement', 'tips'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const messages = this.contextMessages.get(randomCategory);
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        this.showMessage(randomMessage, '', 4000);
    }

    showWelcomeMessage() {
        const welcomeMessages = this.contextMessages.get('welcome');
        if (welcomeMessages && welcomeMessages.length > 0) {
            const message = welcomeMessages[0];
            this.showMessage(message, "Clique sur moi pour plus de conseils !", 6000);
        }
    }

    startAutoMessages() {
        
        setTimeout(() => {
            this.showWelcomeMessage();
        }, 2000);

        this.autoMessageTimer = setInterval(() => {
            if (!this.isVisible) {
                this.showRandomMessage();
            }
        }, 30000);
    }

    onGalacticPathEntered() {
        const messages = this.contextMessages.get('galactic_path');
        if (messages && messages.length > 0) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            this.showMessage(randomMessage, "Choose a level to start your adventure!", 4000);
        }
    }

    onLevelCompleted(levelNumber, stars) {
        const messages = this.contextMessages.get('level_complete');
        if (messages && messages.length > 0) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const starsText = stars > 1 ? `${stars} stars` : `${stars} star`;
            this.showMessage(randomMessage, `Level ${levelNumber} - ${starsText} earned${stars > 1 ? 's' : ''} !`, 4000);
        }
    }

    onLevelFailed(levelNumber) {
        const messages = this.contextMessages.get('level_failed');
        if (messages && messages.length > 0) {
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            this.showMessage(randomMessage, `Level ${levelNumber} - You can try again!`, 4000);
        }
    }

    onPlanetDiscovered(planetType) {
        const messages = [
            `Wow ! Tu as trouvé ${planetType} ! Excellente découverte ! 🎉`,
            `Bravo ! ${planetType} est maintenant dans ta collection ! ⭐`,
            `Fantastique ! ${planetType} va enrichir tes connaissances ! 🌟`
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showMessage(randomMessage, "Keep exploring to find others!");
    }

    onLegendaryDiscovered(planetName) {
        this.showMessage(
            `🏆 INCROYABLE ! Tu as découvert ${planetName} ! Une planète légendaire ! 🏆`,
            "Legendary planets are very rare! Congratulations!",
            8000
        );
    }

    onScanStart() {
        const scanMessages = [
            "Scanning... Let's see what we'll find! 🔍",
            "Searching for new planets... Let's cross our fingers! 🤞",
            "Analyzing space... A discovery might await us! 🌌"
        ];
        const randomMessage = scanMessages[Math.floor(Math.random() * scanMessages.length)];
        this.showMessage(randomMessage, "", 3000);
    }

    onQuizStart() {
        this.showMessage(
            "Quiz d'astronomie ! Montre tes connaissances ! 🧠",
            "Les quiz t'aident à apprendre tout en t'amusant !",
            4000
        );
    }

    addExcitedAnimation() {
        this.avatar.classList.add('excited');
        setTimeout(() => {
            this.avatar.classList.remove('excited');
        }, 2000);
    }

    startRandomAnimations() {
        
        const randomAnimation = () => {
            const animations = ['talking', 'excited'];
            const randomAnim = animations[Math.floor(Math.random() * animations.length)];
            
            this.avatar.classList.add(randomAnim);
            setTimeout(() => {
                this.avatar.classList.remove(randomAnim);
            }, 1500);

            const nextTime = 10000 + Math.random() * 10000; 
            setTimeout(randomAnimation, nextTime);
        };

        setTimeout(randomAnimation, 5000);
    }

    destroy() {
        if (this.autoMessageTimer) {
            clearInterval(this.autoMessageTimer);
        }
        const cosmoElement = document.getElementById('cosmo-guide');
        if (cosmoElement) {
            cosmoElement.remove();
        }
    }
}

let cosmoGuide = null;

document.addEventListener('DOMContentLoaded', () => {
    cosmoGuide = new CosmoGuide();
});

function triggerCosmoMessage(type, data = null) {
    if (!cosmoGuide) return;
    
    switch(type) {
        case 'planet_discovered':
            cosmoGuide.onPlanetDiscovered(data);
            break;
        case 'legendary_discovered':
            cosmoGuide.onLegendaryDiscovered(data);
            break;
        case 'scan_start':
            cosmoGuide.onScanStart();
            break;
        case 'quiz_start':
            cosmoGuide.onQuizStart();
            break;
        default:
            cosmoGuide.showRandomMessage();
    }
}
