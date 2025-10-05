
const gameState = {
    player: {
        level: 1,
        xp: 0,
        maxXP: 100,
        coins: 0,
        planetsFound: 0,
        score: 0
    },
    currentScreen: 'mainMenu',
    currentLevel: null,
    galacticProgress: {
        currentLevel: 1,
        levelsCompleted: [],
        totalStars: 0
    },
    missions: [
        {
            id: 1,
            title: "Discovery Mission",
            description: "Find your first habitable exoplanet!",
            type: "discover",
            target: 1,
            progress: 0,
            reward: { xp: 100, coins: 50 },
            completed: false
        }
    ],
    achievements: [
        {
            id: 1,
            name: "First Step in Space",
            description: "Start your first game",
            unlocked: false
        },
        {
            id: 2,
            name: "Novice Hunter",
            description: "Discover 5 exoplanets",
            unlocked: false
        },
        {
            id: 3,
            name: "Cosmic Scholar",
            description: "Pass 10 astronomy quizzes",
            unlocked: false
        }
    ],
    currentQuiz: {
        questions: [],
        currentQuestion: 0,
        score: 0,
        answers: []
    },
    tutorialStep: 1,
    settings: {
        soundEnabled: true,
        musicEnabled: true
    }
};

const quizQuestions = [
    {
        question: "Which planet is closest to the Sun?",
        answers: ["Mercury", "Venus", "Earth", "Mars"],
        correct: 0,
        explanation: "Mercury is the planet closest to the Sun, à environ 58 millions de km."
    },
    {
        question: "What is an exoplanet?",
        answers: ["Une planète éteinte", "Une planète en dehors de notre système solaire", "Une planète géante", "Une planète artificielle"],
        correct: 1,
        explanation: "An exoplanet is a planet that orbits a star other than the Sun."
    },
    {
        question: "Which method is most used to detect exoplanets?",
        answers: ["Observation directe", "Transit photométrique", "Imagerie radio", "Spectroscopie"],
        correct: 1,
        explanation: "The photometric transit method detects the decrease in brightness quand une planète passe devant son étoile."
    },
    {
        question: "What is the habitable zone of a star?",
        answers: ["La zone la plus chaude", "La zone où l'eau peut être liquide", "La zone la plus froide", "La zone sans atmosphère"],
        correct: 1,
        explanation: "The habitable zone is the region around a star where temperatures allow à l'eau d'être liquide."
    },
    {
        question: "How many exoplanets have been discovered to date?",
        answers: ["Moins de 100", "Entre 100 et 1000", "Plus de 5000", "Exactement 2000"],
        correct: 2,
        explanation: "More than 5000 exoplanets have been confirmed, avec des milliers d'autres candidates en attente de confirmation."
    },
    {
        question: "What is the closest exoplanet to Earth?",
        answers: ["Kepler-452b", "Proxima Centauri b", "TRAPPIST-1e", "TOI-715 b"],
        correct: 1,
        explanation: "Proxima Centauri b orbits the closest star to the Sun, à 4,24 années-lumière."
    },
    {
        question: "What is a hot Jupiter?",
        answers: ["Jupiter en été", "Une planète géante très proche de son étoile", "Jupiter avec des volcans", "Une étoile ratée"],
        correct: 1,
        explanation: "A hot Jupiter is a gas giant planet that orbits very close to its star, créant des températures extrêmes."
    },
    {
        question: "Which space telescope has discovered the most exoplanets?",
        answers: ["Hubble", "Kepler", "Spitzer", "Chandra"],
        correct: 1,
        explanation: "Le télescope spatial Kepler a découvert plus de 2600 exoplanètes confirmées grâce à sa méthode de transit."
    },
    {
        question: "What is radial velocity?",
        answers: ["La vitesse de rotation d'une planète", "L'oscillation d'une étoile causée par une planète", "La vitesse d'éloignement d'une galaxie", "La vitesse de la lumière"],
        correct: 1,
        explanation: "La vitesse radiale mesure l'oscillation d'une étoile causée par l'attraction gravitationnelle d'une planète en orbite."
    },
    {
        question: "Which planet in our solar system is most similar to Earth?",
        answers: ["Mars", "Venus", "Neptune", "Titan"],
        correct: 0,
        explanation: "Mars est la planète la plus similaire à la Terre en termes de taille, composition rocheuse et durée du jour."
    }
];

const knowledgeEntries = [
    {
        title: "Les Exoplanètes",
        content: "Les exoplanètes sont des planètes qui tournent autour d'étoiles autres que notre Soleil. Plus de 5000 ont été découvertes !",
        type: "discovery"
    },
    {
        title: "Zone Habitable",
        content: "The habitable zone is the region around a star where temperatures allow à l'eau liquide d'exister.",
        type: "science"
    },
    {
        title: "Méthode du Transit",
        content: "Cette méthode détecte les exoplanètes en observant la baisse de luminosité quand elles passent devant leur étoile.",
        type: "method"
    },
    {
        title: "Super-Terres",
        content: "Les super-Terres sont des planètes rocheuses plus grandes que la Terre mais plus petites que Neptune.",
        type: "classification"
    },
    {
        title: "Atmosphères Exoplanétaires",
        content: "L'étude des atmosphères d'exoplanètes peut révéler la présence d'eau, d'oxygène ou même de signes de vie.",
        type: "biosignatures"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ExoHunter: DOMContentLoaded fired');
    try {
        initializeGame();
        createStarField();
        startLoadingSequence();
    } catch (error) {
        console.error('🚨 Error during initialization:', error);
        
        document.getElementById('loadingScreen').classList.add('hidden');
        showScreen('mainMenu');
    }
});

function initializeGame() {
    console.log('🔧 Initializing game...');
    loadGameData();
    updateUI();

    window.addEventListener('resize', handleResize);

    initAudioSystem();
    
    console.log('✅ Game initialized successfully');
}

function loadGameData() {
    const saved = localStorage.getItem('exohunter-save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(gameState.player, data.player || {});
            Object.assign(gameState.achievements, data.achievements || {});
        } catch (e) {
            console.log('Error loading save data');
        }
    }
}

function saveGameData() {
    const saveData = {
        player: gameState.player,
        achievements: gameState.achievements,
        timestamp: Date.now()
    };
    localStorage.setItem('exohunter-save', JSON.stringify(saveData));
}

function createStarField() {
    console.log('⭐ Creating starfield...');
    try {
        const starfield = document.getElementById('starfield');
        if (!starfield) {
            console.warn('Starfield element not found');
            return;
        }
        
        const numStars = 200;
        
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: white;
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.2};
                animation: twinkle ${Math.random() * 4 + 2}s ease-in-out infinite;
            `;
            starfield.appendChild(star);
        }

        if (!document.getElementById('twinkle-style')) {
            const style = document.createElement('style');
            style.id = 'twinkle-style';
            style.textContent = `
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('✅ Starfield created successfully');
    } catch (error) {
        console.error('🚨 Error creating starfield:', error);
    }
}

function startLoadingSequence() {
    console.log('🌌 Starting loading sequence...');

    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        const progress = document.getElementById('loadingProgress');
        const text = document.getElementById('loadingText');
        
        console.log('Elements found:', {
            loadingScreen: !!loadingScreen,
            progress: !!progress, 
            text: !!text
        });
        
        if (!loadingScreen || !progress || !text) {
            console.error('🚨 Loading elements not found, skipping to main menu');
            showScreen('mainMenu');
            return;
        }

        let currentProgress = 0;
        const stages = [
            "Calibrage des senseurs...",
            "Connexion au réseau galactique...", 
            "Chargement des données stellaires...",
            "Initialisation du scanner...",
            "Prêt pour l'exploration !"
        ];
        
        const loadingInterval = setInterval(() => {
            currentProgress += 20;
            progress.style.width = currentProgress + '%';
            
            const stageIndex = Math.floor(currentProgress / 20) - 1;
            if (stageIndex >= 0 && stageIndex < stages.length) {
                text.textContent = stages[stageIndex];
            }
            
            console.log(`📊 Loading progress: ${currentProgress}%`);
            
            if (currentProgress >= 100) {
                clearInterval(loadingInterval);
                console.log('✅ Loading complete, transitioning to main menu');
                
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                        showScreen('mainMenu');
                        console.log('🎮 Main menu should now be visible');
                    }, 500);
                }, 500);
            }
        }, 300); 
        
    }, 100); 
}

function showScreen(screenName) {
    
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    const targetScreen = document.getElementById(screenName);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        gameState.currentScreen = screenName;

        if (screenName === 'gameScreen') {
            initializeGameScreen();
        } else if (screenName === 'quizScreen') {
            initializeQuiz();
        }
    }
}

function startGame() {
    
    unlockAchievement(1); 
    showScreen('gameScreen');
    playSound('scanSound');
}

function showTutorial() {
    showScreen('tutorialScreen');
    gameState.tutorialStep = 1;
    updateTutorial();
}

function hideTutorial() {
    showScreen('mainMenu');
}

function showLeaderboard() {
    
    alert('Fonctionnalité à venir : Classement des meilleurs chasseurs !');
}

function showSettings() {
    
    alert('Fonctionnalité à venir : Paramètres du jeu !');
}

function initializeGameScreen() {
    generateStellarSystem();
    updateMissionDisplay();
    updateKnowledgePanel();
}

function generateStellarSystem() {
    const systemContainer = document.getElementById('stellarSystem');
    systemContainer.innerHTML = '';

    const star = document.createElement('div');
    star.className = 'star';
    systemContainer.appendChild(star);

    const numPlanets = Math.floor(Math.random() * 6) + 2; 
    
    for (let i = 0; i < numPlanets; i++) {
        const orbitRadius = 80 + (i * 60); 
        const planet = createPlanet(i, orbitRadius);

        const planetElement = planet.querySelector('.planet');
        planetElement.style.opacity = '0';
        planetElement.style.transform += ' scale(0.1)';
        
        systemContainer.appendChild(planet);
    }

    const instructionText = document.createElement('div');
    instructionText.id = 'scan-instruction';
    instructionText.textContent = '🔍 Utilisez le scanner pour révéler les planètes cachées !';
    instructionText.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(138, 43, 226, 0.3);
        color: var(--accent-purple);
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        font-size: 0.9rem;
        border: 1px solid var(--accent-purple);
        animation: instruction-pulse 2s ease-in-out infinite;
    `;
    
    const instructionStyle = document.createElement('style');
    instructionStyle.textContent = `
        @keyframes instruction-pulse {
            0%, 100% { 
                opacity: 0.7;
                transform: translateX(-50%) scale(1);
            }
            50% { 
                opacity: 1;
                transform: translateX(-50%) scale(1.05);
            }
        }
    `;
    document.head.appendChild(instructionStyle);
    
    systemContainer.appendChild(instructionText);
}

function createPlanet(index, orbitRadius) {
    
    const orbit = document.createElement('div');
    orbit.className = 'planet-orbit';
    orbit.style.width = orbitRadius * 2 + 'px';
    orbit.style.height = orbitRadius * 2 + 'px';

    const planet = document.createElement('div');
    planet.className = 'planet';
    planet.dataset.planetId = index;

    const isHabitable = Math.random() < 0.3; 
    if (isHabitable) {
        planet.classList.add('habitable');
    }

    const planetData = generatePlanetData(isHabitable);
    planet.dataset.planetInfo = JSON.stringify(planetData);
    planet.dataset.planetName = planetData.name; 

    const angle = Math.random() * 360;
    const x = Math.cos(angle * Math.PI / 180) * (orbitRadius / 2);
    const y = Math.sin(angle * Math.PI / 180) * (orbitRadius / 2);
    
    planet.style.left = '50%';
    planet.style.top = '50%';
    planet.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;

    planet.addEventListener('click', (e) => {
        console.log('🔍 Planet clicked:', planetData.name, 'Discovered:', planetData.discovered);
        console.log('🎯 Click event details:', e);
        console.log('🎮 Game state:', gameState);

        planet.style.boxShadow = '0 0 30px #ff0000';
        setTimeout(() => {
            planet.style.boxShadow = '';
        }, 300);
        
        e.stopPropagation();
        if (!planetData.discovered) {
            console.log('✨ Starting discovery animation...');
            
            planet.style.animation = 'planet-discover-click 0.5s ease-out';
            setTimeout(() => {
                console.log('🚀 Calling discoverPlanet function...');
                discoverPlanet(planetData);
                planet.classList.add('discovered');
            }, 250);
        } else {
            console.log('⚠️ Planet already discovered');
            
            showTemporaryMessage("Planète déjà découverte !", "info");
        }
    });

    planet.addEventListener('mouseenter', () => {
        if (!planetData.discovered) {
            planet.style.transform += ' scale(1.2)';
            planet.style.filter = 'brightness(1.4) drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))';
            planet.style.cursor = 'pointer';
            playHoverSound();
        }
    });
    
    planet.addEventListener('mouseleave', () => {
        if (!planetData.discovered) {
            planet.style.transform = planet.style.transform.replace(' scale(1.2)', '');
            planet.style.filter = '';
            planet.style.cursor = 'default';
        }
    });

    planet.style.border = '5px solid red';
    planet.style.cursor = 'pointer';
    planet.style.pointerEvents = 'auto';
    planet.style.zIndex = '1000';
    console.log('✅ Planet created with red border:', planetData.name);
    
    orbit.appendChild(planet);
    return orbit;
}

function showTemporaryMessage(message, type = "info") {
    const messageDiv = document.createElement('div');
    messageDiv.className = `temporary-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 150px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 212, 255, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1001;
        animation: message-slide-in 0.3s ease-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'message-slide-out 0.3s ease-in';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 2000);
}

const messageStyles = document.createElement('style');
messageStyles.textContent = `
    @keyframes message-slide-in {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes message-slide-out {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    @keyframes planet-discover-click {
        0% { transform: scale(1); }
        50% { 
            transform: scale(1.5);
            box-shadow: 0 0 30px currentColor;
        }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(messageStyles);

let audioContext;
let masterVolume = 0.3;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

function createSynthSound(frequency, duration, type = 'sine', volume = 0.3) {
    if (!gameState.settings.soundEnabled) return;
    
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * masterVolume, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
}

function playHoverSound() {
    createSynthSound(400, 0.1, 'sine', 0.2);
}

function playDiscoverySound() {
    
    createSynthSound(523, 0.2, 'sine', 0.4); 
    setTimeout(() => createSynthSound(659, 0.2, 'sine', 0.4), 200); 
    setTimeout(() => createSynthSound(784, 0.3, 'sine', 0.5), 400); 
}

function playSuccessSound() {
    
    createSynthSound(523, 0.5, 'sine', 0.3); 
    createSynthSound(659, 0.5, 'sine', 0.3); 
    createSynthSound(784, 0.5, 'sine', 0.3); 
}

function playScanSound() {
    
    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.5);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2 * masterVolume, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 1.5);
}

function playAmbientSpace() {
    if (!gameState.settings.soundEnabled) return;

    const ctx = initAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(80, ctx.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.05 * masterVolume, ctx.currentTime);
    
    oscillator.start(ctx.currentTime);

    setTimeout(() => {
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2);
        oscillator.stop(ctx.currentTime + 2);
    }, 8000);
}

function playLegendarySound() {
    
    createSynthSound(1047, 0.3, 'sine', 0.6); 
    setTimeout(() => createSynthSound(1319, 0.3, 'sine', 0.6), 300); 
    setTimeout(() => createSynthSound(1568, 0.4, 'sine', 0.7), 600); 
    setTimeout(() => createSynthSound(2093, 0.5, 'sine', 0.8), 900); 
}

function initAudioSystem() {
    console.log('🔊 Initializing audio system...');

    const volumeSlider = document.getElementById('volumeSlider');
    const audioIcon = document.getElementById('audioIcon');
    
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            masterVolume = e.target.value / 100;
            updateAudioIcon(masterVolume);

            if (masterVolume > 0) {
                createSynthSound(440, 0.1, 'sine', 0.3);
            }
        });

        masterVolume = volumeSlider.value / 100;
        updateAudioIcon(masterVolume);
    }
    
    if (audioIcon) {
        audioIcon.addEventListener('click', toggleMute);
    }

    addButtonSounds();

    setTimeout(() => {
        if (gameState.settings.soundEnabled && masterVolume > 0) {
            playAmbientSpace();
        }
    }, 2000);
}

function updateAudioIcon(volume) {
    const audioIcon = document.getElementById('audioIcon');
    if (!audioIcon) return;
    
    if (volume === 0) {
        audioIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        audioIcon.className = 'fas fa-volume-down';
    } else {
        audioIcon.className = 'fas fa-volume-up';
    }
}

function toggleMute() {
    const volumeSlider = document.getElementById('volumeSlider');
    if (!volumeSlider) return;
    
    if (masterVolume > 0) {
        volumeSlider.setAttribute('data-prev-volume', masterVolume * 100);
        volumeSlider.value = 0;
        masterVolume = 0;
    } else {
        const prevVolume = volumeSlider.getAttribute('data-prev-volume') || 30;
        volumeSlider.value = prevVolume;
        masterVolume = prevVolume / 100;
    }
    
    updateAudioIcon(masterVolume);
}

function addButtonSounds() {
    
    const buttons = document.querySelectorAll('button, .btn, .menu-option');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (masterVolume > 0) {
                createSynthSound(600, 0.05, 'square', 0.1);
            }
        });
        
        button.addEventListener('mouseenter', () => {
            if (masterVolume > 0) {
                playHoverSound();
            }
        });
    });
}

function getPlanetImagePath(imageName) {

    const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg'];

    if (imageExtensions.some(ext => imageName.endsWith(ext))) {
        return `images/${imageName}`;
    }

    return `images/${imageName}.svg`;
}

function generatePlanetData(isHabitable) {
    const planetTypes = isHabitable ? 
        [
            {
                name: 'Terre-like',
                image: 'earth-like.svg',
                description: 'Une planète remarquablement similaire à la Terre, avec des océans liquides, des continents et une atmosphère respirable.',
                characteristics: ['Océans liquides', 'Atmosphère dense', 'Activité tectonique', 'Champ magnétique'],
                rarity: 'Très rare'
            },
            {
                name: 'Super-Terre',
                image: 'super-earth.svg', 
                description: 'Une planète rocheuse plus massive que la Terre, avec une gravité intense mais potentiellement habitable.',
                characteristics: ['Gravité élevée', 'Atmosphère épaisse', 'Saisons longues', 'Montagnes géantes'],
                rarity: 'Rare'
            },
            {
                name: 'Planète Océan',
                image: 'ocean-planet.svg',
                description: 'Un monde entièrement recouvert d\'océans profonds, abritant potentiellement une vie aquatique complexe.',
                characteristics: ['Océans globaux', 'Pas de continents', 'Courants puissants', 'Vie marine possible'],
                rarity: 'Rare'
            }
        ] :
        [
            {
                name: 'Jupiter Chaud',
                image: 'hot-jupiter.svg',
                description: 'Une géante gazeuse brûlante orbitant très près de son étoile, avec des vents supersonniques et des températures infernales.',
                characteristics: ['Température extrême', 'Vents à 2000 km/h', 'Nuages métalliques', 'Orbite rapide'],
                rarity: 'Commun'
            },
            {
                name: 'Géante Gazeuse',
                image: 'gas-giant.svg',
                description: 'Une massive planète composée principalement d\'hydrogène et d\'hélium, ornée d\'anneaux spectaculaires.',
                characteristics: ['Système d\'anneaux', 'Nombreuses lunes', 'Tempêtes géantes', 'Champ magnétique intense'],
                rarity: 'Commun'
            },
            {
                name: 'Planète Rocheuse',
                image: 'rocky-planet.svg',
                description: 'Un monde aride et désolé, criblé de cratères et balayé par des tempêtes de poussière.',
                characteristics: ['Surface cratérisée', 'Atmosphère fine', 'Tempêtes de poussière', 'Activité volcanique'],
                rarity: 'Très commun'
            },
            {
                name: 'Mars',
                image: 'mars.svg',
                description: 'La planète rouge de notre système solaire, avec ses calottes polaires glacées et ses canyons gigantesques.',
                characteristics: ['Calottes polaires', 'Valles Marineris', 'Olympus Mons', 'Tempêtes de poussière'],
                rarity: 'Légendaire'
            },
            {
                name: 'Vénus',
                image: 'venus.svg',
                description: 'L\'étoile du matin, un monde infernal avec une atmosphère d\'acide sulfurique et un effet de serre extrême.',
                characteristics: ['Atmosphère toxique', 'Effet de serre', 'Nuages d\'acide', 'Rotation rétrograde'],
                rarity: 'Légendaire'
            },
            {
                name: 'Saturne',
                image: 'saturn.svg',
                description: 'Le joyau du système solaire, une géante gazeuse ornée de magnifiques anneaux et de dizaines de lunes.',
                characteristics: ['Anneaux spectaculaires', '82 lunes connues', 'Densité faible', 'Hexagone polaire'],
                rarity: 'Légendaire'
            }
        ];
    
    const selectedType = planetTypes[Math.floor(Math.random() * planetTypes.length)];
    
    const names = ['Kepler', 'TRAPPIST', 'TOI', 'HD', 'GJ', 'K2', 'WASP', 'HAT-P'];
    const namePrefix = names[Math.floor(Math.random() * names.length)];
    const nameNumber = Math.floor(Math.random() * 9999) + 1;
    const nameSuffix = String.fromCharCode(97 + Math.floor(Math.random() * 8)); 
    
    const distance = (Math.random() * 50 + 5).toFixed(1);
    const size = (Math.random() * 3 + 0.5).toFixed(1);
    const baseTemp = isHabitable ? 200 : 100;
    const temperature = Math.floor(Math.random() * 600) + baseTemp;
    const mass = (Math.random() * 5 + 0.3).toFixed(1);
    const orbitalPeriod = (Math.random() * 500 + 1).toFixed(1);

    const facts = generatePlanetFacts(selectedType.name, isHabitable);
    
    return {
        name: `${namePrefix}-${nameNumber}${nameSuffix}`,
        type: selectedType.name,
        image: selectedType.image,
        description: selectedType.description,
        characteristics: selectedType.characteristics,
        rarity: selectedType.rarity,
        size: size + ' × Terre',
        mass: mass + ' × Terre',
        temperature: temperature + 'K',
        temperatureCelsius: (temperature - 273).toFixed(0) + '°C',
        distance: distance + ' années-lumière',
        orbitalPeriod: orbitalPeriod + ' jours',
        habitable: isHabitable,
        discovered: false,
        facts: facts,
        discoveryDate: new Date().toLocaleDateString('fr-FR')
    };
}

function generatePlanetFacts(planetType, isHabitable) {
    const factDatabase = {
        'Terre-like': [
            'Cette planète pourrait avoir des saisons similaires à la Terre',
            'La présence d\'eau liquide suggère un climat stable',
            'Une atmosphère protectrice permettrait la vie en surface',
            'Des aurores boréales pourraient illuminer ses pôles'
        ],
        'Super-Terre': [
            'La gravité y serait 2 à 3 fois plus forte qu\'sur Terre',
            'Les montagnes pourraient atteindre des hauteurs impossibles sur Terre',
            'Un jour y durerait probablement plus longtemps',
            'L\'atmosphère dense pourrait créer un effet de serre'
        ],
        'Planète Océan': [
            'Les océans pourraient être 10 fois plus profonds que sur Terre',
            'Des formes de vie uniques pourraient vivre dans les abysses',
            'Des geysers de glace pourraient s\'élever dans l\'espace',
            'Pas de terre ferme, que des îles flottantes'
        ],
        'Jupiter Chaud': [
            'Les vents y soufflent à plus de 2000 km/h',
            'Il pleut du verre fondu dans son atmosphère',
            'Un jour y dure moins de 24 heures terrestres',
            'Sa face éclairée est 1000°C plus chaude que sa face sombre'
        ],
        'Géante Gazeuse': [
            'Ses anneaux s\'étendent sur des millions de kilomètres',
            'Elle possède probablement plus de 20 lunes',
            'Ses tempêtes durent des siècles entiers',
            'Son champ magnétique est 10 fois plus fort que celui de Jupiter'
        ],
        'Planète Rocheuse': [
            'Des volcans crachent encore de la lave',
            'Les cratères racontent l\'histoire du système',
            'Le vent sculpte des formations rocheuses étranges',
            'Des cristaux rares pourraient briller à sa surface'
        ],
        'Mars': [
            'Olympus Mons est le plus grand volcan du système solaire',
            'Ses calottes polaires sont composées de glace d\'eau et de CO2',
            'Valles Marineris s\'étend sur 4000 km de long',
            'Des traces d\'anciens fleuves marquent sa surface',
            'Ses tempêtes de poussière peuvent recouvrir toute la planète',
            'Un jour martien dure 24h 37min'
        ],
        'Vénus': [
            'Sa pression atmosphérique écrase comme 900m sous l\'océan',
            'Il y pleut de l\'acide sulfurique',
            'Une journée vénusienne dure plus qu\'une année',
            'Elle tourne dans le sens inverse des autres planètes',
            'Sa température de 462°C fait fondre le plomb',
            'Ses nuages cachent totalement sa surface'
        ],
        'Saturne': [
            'Ses anneaux sont composés de milliards de particules de glace',
            'Elle possède un hexagone parfait au pôle Nord',
            'Sa densité est plus faible que celle de l\'eau',
            'Titan, sa plus grande lune, a des lacs de méthane',
            'Ses anneaux ne font que 10 mètres d\'épaisseur',
            'Elle possède 82 lunes confirmées'
        ]
    };
    
    const facts = factDatabase[planetType] || ['Une planète mystérieuse aux secrets encore cachés'];
    const numFacts = Math.min(2 + Math.floor(Math.random() * 2), facts.length);
    
    return facts.sort(() => 0.5 - Math.random()).slice(0, numFacts);
}

function scanForPlanets() {
    playSound('scanSound');

    if (typeof triggerCosmoMessage === 'function') {
        triggerCosmoMessage('scan_start');
    }

    const instructionText = document.getElementById('scan-instruction');
    if (instructionText) {
        instructionText.style.animation = 'fade-out 0.5s ease-out';
        setTimeout(() => {
            if (instructionText.parentNode) {
                instructionText.parentNode.removeChild(instructionText);
            }
        }, 500);
    }

    const systemContainer = document.getElementById('stellarSystem');
    const scanEffect = document.createElement('div');
    scanEffect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border: 3px solid rgba(0, 212, 255, 0.8);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: scanPulse 2.5s ease-out;
        pointer-events: none;
        z-index: 5;
    `;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes scanPulse {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
                border-width: 3px;
            }
            30% {
                width: 200px;
                height: 200px;
                opacity: 0.8;
                border-width: 2px;
            }
            60% {
                width: 400px;
                height: 400px;
                opacity: 0.6;
                border-width: 2px;
            }
            100% {
                width: 700px;
                height: 700px;
                opacity: 0;
                border-width: 1px;
            }
        }
        
        @keyframes fade-out {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    systemContainer.appendChild(scanEffect);

    const scanningText = document.createElement('div');
    scanningText.textContent = '🔍 Analyse en cours...';
    scanningText.style.cssText = `
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 212, 255, 0.2);
        color: var(--accent-blue);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.9rem;
        animation: scanning-blink 0.5s ease-in-out infinite;
        z-index: 6;
    `;
    
    const blinkStyle = document.createElement('style');
    blinkStyle.textContent = `
        @keyframes scanning-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
    `;
    document.head.appendChild(blinkStyle);
    
    systemContainer.appendChild(scanningText);
    
    setTimeout(() => {
        systemContainer.removeChild(scanEffect);
        systemContainer.removeChild(scanningText);

        const planets = document.querySelectorAll('.planet');
        planets.forEach((planet, index) => {
            setTimeout(() => {
                planet.style.opacity = '1';
                planet.style.transform = planet.style.transform.replace('scale(0.1)', 'scale(1)');
                planet.classList.add('scanned');
                planet.style.animation = 'planet-reveal 0.8s ease-out';

                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 4px;
                    height: 4px;
                    background: var(--accent-gold);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    animation: sparkle-burst 1s ease-out;
                    pointer-events: none;
                `;
                
                const sparkleStyle = document.createElement('style');
                sparkleStyle.textContent = `
                    @keyframes sparkle-burst {
                        0% {
                            transform: translate(-50%, -50%) scale(0);
                            opacity: 1;
                        }
                        50% {
                            transform: translate(-50%, -50%) scale(3);
                            opacity: 0.8;
                        }
                        100% {
                            transform: translate(-50%, -50%) scale(0);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(sparkleStyle);
                
                planet.appendChild(sparkle);
                setTimeout(() => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                }, 1000);
                
            }, index * 200); 
        });

        setTimeout(() => {
            showTemporaryMessage(`🌟 ${planets.length} planètes détectées ! Cliquez pour les explorer.`, "success");

            addPersistentInstruction();
        }, planets.length * 200 + 500);
        
    }, 2500);

    addKnowledgeEntry({
        title: "Scan Effectué",
        content: "Votre scanner quantique a révélé la structure de ce système stellaire. Les planètes sont maintenant visibles et prêtes à être explorées !",
        type: "scan"
    });
}

function addPersistentInstruction() {
    
    const existingInstruction = document.getElementById('planet-click-instruction');
    if (existingInstruction) {
        existingInstruction.remove();
    }
    
    const systemContainer = document.getElementById('stellarSystem');
    const instructionText = document.createElement('div');
    instructionText.id = 'planet-click-instruction';
    instructionText.innerHTML = '🪐 Cliquez sur les planètes scannées pour les découvrir !';
    instructionText.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 215, 0, 0.2);
        color: var(--accent-gold);
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        font-size: 0.9rem;
        font-weight: 600;
        border: 2px solid rgba(255, 215, 0, 0.3);
        animation: instruction-glow 2s ease-in-out infinite alternate;
        z-index: 10;
        backdrop-filter: blur(5px);
        text-align: center;
        box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
    `;

    const instructionStyle = document.createElement('style');
    instructionStyle.textContent = `
        @keyframes instruction-glow {
            from { 
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.2);
                border-color: rgba(255, 215, 0, 0.3);
            }
            to { 
                box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
                border-color: rgba(255, 215, 0, 0.6);
            }
        }
    `;
    document.head.appendChild(instructionStyle);
    
    systemContainer.appendChild(instructionText);
}

function removePersistentInstruction() {
    const instructionText = document.getElementById('planet-click-instruction');
    if (instructionText) {
        instructionText.style.animation = 'fade-out 0.5s ease-out';
        setTimeout(() => {
            if (instructionText.parentNode) {
                instructionText.parentNode.removeChild(instructionText);
            }
        }, 500);
    }
}

function discoverPlanet(planetData) {
    if (planetData.discovered) return;

    removePersistentInstruction();
    
    planetData.discovered = true;
    gameState.player.planetsFound++;

    const baseXP = 25;
    const baseCoins = 10;
    const habitableBonus = planetData.habitable ? 2 : 1;
    
    const xpGain = baseXP * habitableBonus;
    const coinGain = baseCoins * habitableBonus;
    
    gainXP(xpGain);
    gainCoins(coinGain);

    updateMissionProgress('discover', 1);

    if (typeof triggerCosmoMessage === 'function') {
        if (planetData.rarity === 'Légendaire') {
            triggerCosmoMessage('legendary_discovered', planetData.name);
        } else {
            triggerCosmoMessage('planet_discovered', planetData.type);
        }
    }

    showPlanetDiscovery(planetData, xpGain, coinGain);

    if (gameState.player.planetsFound >= 5) {
        unlockAchievement(2); 
    }
    
    playSound('discoverySound');
    updateUI();
    saveGameData();
}

function showPlanetDiscovery(planetData, xpGain, coinGain) {
    
    if (planetData.rarity === 'Légendaire') {
        playLegendarySound();
    } else {
        playDiscoverySound();
    }
    
    const modal = document.getElementById('planetModal');
    const infoContainer = document.getElementById('discoveredPlanetInfo');

    infoContainer.innerHTML = `
        <div class="planet-discovery-content">
            <div class="planet-image-container">
                <img src="${getPlanetImagePath(planetData.image)}" alt="${planetData.name}" class="planet-image" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
                <div class="planet-image-fallback" style="display: none;">
                    <i class="fas fa-globe planet-fallback-icon"></i>
                </div>
                <div class="planet-rarity ${planetData.rarity.toLowerCase().replace(' ', '-')}">
                    ${planetData.rarity}
                </div>
            </div>
            
            <div class="planet-details">
                <h3 class="planet-name">${planetData.name}</h3>
                <p class="planet-type">${planetData.type}</p>
                <p class="planet-description">${planetData.description}</p>
                
                <div class="planet-stats">
                    <div class="stat-row">
                        <div class="stat-item">
                            <i class="fas fa-ruler"></i>
                            <span><strong>Taille:</strong> ${planetData.size}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-weight"></i>
                            <span><strong>Masse:</strong> ${planetData.mass}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-item">
                            <i class="fas fa-thermometer-half"></i>
                            <span><strong>Température:</strong> ${planetData.temperature} (${planetData.temperatureCelsius})</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-clock"></i>
                            <span><strong>Période:</strong> ${planetData.orbitalPeriod}</span>
                        </div>
                    </div>
                    <div class="stat-row">
                        <div class="stat-item">
                            <i class="fas fa-route"></i>
                            <span><strong>Distance:</strong> ${planetData.distance}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-calendar"></i>
                            <span><strong>Découverte:</strong> ${planetData.discoveryDate}</span>
                        </div>
                    </div>
                </div>
                
                <div class="planet-characteristics">
                    <h4><i class="fas fa-list"></i> Caractéristiques</h4>
                    <div class="characteristics-grid">
                        ${planetData.characteristics.map(char => 
                            `<span class="characteristic-tag">${char}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="planet-facts">
                    <h4><i class="fas fa-lightbulb"></i> Faits Fascinants</h4>
                    <ul class="facts-list">
                        ${planetData.facts.map(fact => 
                            `<li><i class="fas fa-star"></i> ${fact}</li>`
                        ).join('')}
                    </ul>
                </div>
                
                ${planetData.habitable ? `
                    <div class="habitability-badge">
                        <i class="fas fa-seedling"></i>
                        <span>Zone Habitable - Potentiel de Vie !</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;

    const rewardItems = modal.querySelector('.reward-items');
    const habitableBonus = planetData.habitable ? ' (Bonus Habitable!)' : '';
    rewardItems.innerHTML = `
        <div class="reward-item ${planetData.habitable ? 'bonus' : ''}">
            <i class="fas fa-star"></i>
            <span>+${xpGain} XP${habitableBonus}</span>
        </div>
        <div class="reward-item ${planetData.habitable ? 'bonus' : ''}">
            <i class="fas fa-coins"></i>
            <span>+${coinGain} Stardust${habitableBonus}</span>
        </div>
        ${planetData.habitable ? `
            <div class="reward-item special">
                <i class="fas fa-trophy"></i>
                <span>Découverte Majeure!</span>
            </div>
        ` : ''}
    `;
    
    modal.classList.remove('hidden');

    setTimeout(() => {
        const planetImage = modal.querySelector('.planet-image');
        if (planetImage) {
            planetImage.style.animation = 'planet-discover-enhanced 2s ease-in-out';
        }
    }, 100);
}

function closePlanetModal() {
    document.getElementById('planetModal').classList.add('hidden');
}

const galacticLevels = [
    {
        id: 1,
        title: "Solar System",
        description: "Discover our solar system",
        unlocked: true,
        completed: false,
        stars: 0
    },
    {
        id: 2,
        title: "Rocky Planets",
        description: "Mercury, Venus, Earth and Mars",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 3,
        title: "Gas Giants",
        description: "Jupiter, Saturn, Uranus and Neptune",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 4,
        title: "Asteroids & Comets",
        description: "Small bodies of the solar system",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 5,
        title: "Exoplanets",
        description: "Planets outside the solar system",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 6,
        title: "Stars & Galaxies",
        description: "Stars and our galaxy",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 7,
        title: "NASA Missions",
        description: "Space exploration and missions",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 8,
        title: "Black Holes",
        description: "Mysteries of space-time",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 9,
        title: "Cosmology",
        description: "Origin and evolution of the universe",
        unlocked: false,
        completed: false,
        stars: 0
    },
    {
        id: 10,
        title: "Galactic Master",
        description: "Final astronomy challenge",
        unlocked: false,
        completed: false,
        stars: 0
    }
];

function showGalacticPath() {
    
    syncGalacticLevels();
    showScreen('galacticPathScreen');
    updateLevelDisplay();

    if (typeof cosmoGuide !== 'undefined' && cosmoGuide) {
        cosmoGuide.onGalacticPathEntered();
    }
}

function syncGalacticLevels() {
    
    gameState.galacticProgress.levelsCompleted.forEach(completedLevel => {
        const level = galacticLevels.find(l => l.id === completedLevel.id);
        if (level) {
            level.completed = true;
            level.stars = completedLevel.stars;

            if (completedLevel.id < galacticLevels.length) {
                galacticLevels[completedLevel.id].unlocked = true;
            }
        }
    });
}

function updateLevelDisplay() {
    const levels = document.querySelectorAll('.level-node');
    levels.forEach((levelNode, index) => {
        const level = galacticLevels[index];
        const levelNumber = levelNode.querySelector('.level-number');
        const levelTitle = levelNode.querySelector('.level-title');
        const starsContainer = levelNode.querySelector('.level-stars');

        if (levelNumber) levelNumber.textContent = level.id;
        if (levelTitle) levelTitle.textContent = level.title;

        if (level.completed) {
            levelNode.className = 'level-node completed';
        } else if (level.unlocked) {
            levelNode.className = 'level-node available';
        } else {
            levelNode.className = 'level-node locked';
        }

        if (starsContainer) {
            let starsHTML = '';
            for (let i = 1; i <= 3; i++) {
                if (i <= level.stars) {
                    starsHTML += '<i class="fas fa-star earned"></i>';
                } else {
                    starsHTML += '<i class="far fa-star empty"></i>';
                }
            }
            starsContainer.innerHTML = starsHTML;
        }
    });
}

function startLevel(levelId) {
    const level = galacticLevels[levelId - 1];
    if (!level.unlocked) return;
    
    gameState.currentLevel = levelId;
    gameState.currentQuiz.currentQuestion = 0;
    gameState.currentQuiz.score = 0;
    gameState.currentQuiz.answers = [];

    gameState.currentQuiz.questions = getLevelQuestions(levelId);

    document.getElementById('quizTitle').innerHTML = `<i class="fas fa-brain"></i> Level ${levelId} - ${level.title}`;
    
    showScreen('quizScreen');
    displayQuestion();
}

function getLevelQuestions(levelId) {
    
    const levelQuestions = {
        1: [ 
            {
                question: "Which planet is closest to the Sun?",
                answers: ["Mercury", "Venus", "Earth", "Mars"],
                correct: 0
            },
            {
                question: "How many planets are in our solar system?",
                answers: ["7", "8", "9", "10"],
                correct: 1
            },
            {
                question: "What is the largest planet in the solar system?",
                answers: ["Saturn", "Jupiter", "Uranus", "Neptune"],
                correct: 1
            },
            {
                question: "What is the name of our star?",
                answers: ["Proxima", "Alpha", "Sun", "Sirius"],
                correct: 2
            },
            {
                question: "Which planet is nicknamed the 'red planet'?",
                answers: ["Mars", "Venus", "Jupiter", "Saturn"],
                correct: 0
            },
            {
                question: "How many moons does Earth have?",
                answers: ["0", "1", "2", "3"],
                correct: 1
            },
            {
                question: "Which planet has visible rings?",
                answers: ["Jupiter", "Mars", "Saturn", "Uranus"],
                correct: 2
            },
            {
                question: "What is the hottest planet in the solar system?",
                answers: ["Mercury", "Venus", "Earth", "Mars"],
                correct: 1
            },
            {
                question: "Which planet is farthest from the Sun?",
                answers: ["Uranus", "Neptune", "Pluto", "Mars"],
                correct: 1
            },
            {
                question: "How long does Earth take to orbit the Sun?",
                answers: ["365 days", "366 days", "364 days", "360 days"],
                correct: 0
            }
        ],
        2: [ 
            {
                question: "What are the rocky planets of the solar system?",
                answers: ["Mercury, Venus, Earth, Mars", "Jupiter, Saturn", "Uranus, Neptune", "All planets"],
                correct: 0
            },
            {
                question: "Which rocky planet has no significant atmosphere?",
                answers: ["Venus", "Earth", "Mars", "Mercury"],
                correct: 3
            },
            {
                question: "On which planet do we find giant volcanoes like Olympus Mons?",
                answers: ["Venus", "Mars", "Mercury", "Earth"],
                correct: 1
            },
            {
                question: "Which planet has an extreme greenhouse effect?",
                answers: ["Mars", "Mercury", "Venus", "Earth"],
                correct: 2
            },
            {
                question: "Which rocky planet has polar ice caps?",
                answers: ["Mercury", "Venus", "Mars", "Toutes"],
                correct: 2
            },
            {
                question: "What is the surface temperature of Venus?",
                answers: ["100°C", "300°C", "462°C", "600°C"],
                correct: 2
            },
            {
                question: "Which planet has the longest day?",
                answers: ["Mercury", "Venus", "Earth", "Mars"],
                correct: 1
            },
            {
                question: "On which planet do we find liquid water on the surface?",
                answers: ["Mars", "Venus", "Earth", "Mercury"],
                correct: 2
            },
            {
                question: "Which rocky planet has two small moons?",
                answers: ["Venus", "Mars", "Mercury", "Earth"],
                correct: 1
            },
            {
                question: "Which planet has the strongest gravity among rocky planets?",
                answers: ["Mercury", "Venus", "Earth", "Mars"],
                correct: 2
            }
        ],
        3: [ 
            {
                question: "What is the largest planet in the solar system?",
                answers: ["Saturn", "Jupiter", "Uranus", "Neptune"],
                correct: 1
            },
            {
                question: "How many major moons does Jupiter have?",
                answers: ["4", "16", "79", "Plus de 80"],
                correct: 3
            },
            {
                question: "Which planet has the most spectacular rings?",
                answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correct: 1
            },
            {
                question: "Which gas giant is tilted on its side?",
                answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correct: 2
            },
            {
                question: "Which planet has the Great Red Spot?",
                answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correct: 0
            },
            {
                question: "Which gas planet is farthest from the Sun?",
                answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correct: 3
            },
            {
                question: "Which moon of Jupiter is volcanic?",
                answers: ["Europa", "Ganymède", "Io", "Callisto"],
                correct: 2
            },
            {
                question: "Which planet has a density lower than water?",
                answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correct: 1
            },
            {
                question: "How long does Jupiter take to rotate on its axis?",
                answers: ["10 heures", "24 heures", "30 heures", "48 heures"],
                correct: 0
            },
            {
                question: "Which gas giant has winds over 2000 km/h?",
                answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correct: 3
            }
        ],
        4: [ 
            {
                question: "Where is the main asteroid belt located?",
                answers: ["Entre Mars et Jupiter", "Entre Jupiter et Saturne", "Au-delà de Neptune", "Près du Soleil"],
                correct: 0
            },
            {
                question: "What are comets mainly composed of?",
                answers: ["Roche", "Métal", "Glace et poussière", "Gaz"],
                correct: 2
            },
            {
                question: "What is the largest asteroid in the main belt?",
                answers: ["Vesta", "Pallas", "Cérès", "Eros"],
                correct: 2
            },
            {
                question: "Where do most long-period comets come from?",
                answers: ["Ceinture d'astéroïdes", "Nuage d'Oort", "Ceinture de Kuiper", "Système solaire interne"],
                correct: 1
            },
            {
                question: "What causes a comet's tail?",
                answers: ["La gravité", "Le vent solaire", "La rotation", "La température"],
                correct: 1
            },
            {
                question: "How many known asteroids are there approximately?",
                answers: ["1000", "10 000", "100 000", "Plus d'un million"],
                correct: 3
            },
            {
                question: "Which object was reclassified from planet to dwarf planet?",
                answers: ["Cérès", "Pluton", "Éris", "Makémaké"],
                correct: 1
            },
            {
                question: "What is Halley's comet orbital period?",
                answers: ["50 ans", "76 ans", "100 ans", "200 ans"],
                correct: 1
            },
            {
                question: "What happens if an asteroid hits Earth's atmosphere?",
                answers: ["Il explose", "Il devient une météorite", "Il devient un météore", "Il rebondit"],
                correct: 2
            },
            {
                question: "Where is the Kuiper belt located?",
                answers: ["Près du Soleil", "Entre Mars et Jupiter", "Au-delà de Neptune", "Au centre du système solaire"],
                correct: 2
            }
        ],
        5: [ 
            {
                question: "What was the first exoplanet discovered around a Sun-like star?",
                answers: ["51 Eridani b", "51 Pegasi b", "HD 209458 b", "Kepler-7b"],
                correct: 1
            },
            {
                question: "How many exoplanets have been discovered approximately?",
                answers: ["1000", "5000", "Plus de 5000", "100 000"],
                correct: 2
            },
            {
                question: "What is a 'Super-Earth'?",
                answers: ["Une planète plus grande que la Terre", "Une planète parfaite", "Une planète avec de la vie", "Une planète très chaude"],
                correct: 0
            },
            {
                question: "Which exoplanet detection method is most used?",
                answers: ["Imagerie directe", "Transit", "Vitesse radiale", "Microlentille gravitationnelle"],
                correct: 1
            },
            {
                question: "What is the habitable zone of a star?",
                answers: ["La zone la plus chaude", "Zone où l'eau peut être liquide", "Zone sans radiation", "Zone la plus froide"],
                correct: 1
            },
            {
                question: "Which space telescope has discovered the most exoplanets?",
                answers: ["Hubble", "Spitzer", "Kepler", "James Webb"],
                correct: 2
            },
            {
                question: "What is a 'hot Jupiter'?",
                answers: ["Jupiter réchauffé", "Géante gazeuse proche de son étoile", "Petite planète chaude", "Étoile ressemblant à Jupiter"],
                correct: 1
            },
            {
                question: "What is the closest planet to Earth outside the solar system?",
                answers: ["Proxima Centauri b", "Alpha Centauri Bb", "Wolf 359 b", "Kepler-452b"],
                correct: 0
            },
            {
                question: "What can we detect in an exoplanet's atmosphere?",
                answers: ["La couleur", "Les gaz comme l'eau", "La température du sol", "Les océans"],
                correct: 1
            },
            {
                question: "How many potentially habitable exoplanets have been discovered?",
                answers: ["Aucune", "Quelques dizaines", "Des centaines", "Des milliers"],
                correct: 1
            }
        ],
        6: [ 
            {
                question: "What is our galaxy called?",
                answers: ["Andromeda", "Milky Way", "Triangle Galaxy", "Great Bear"],
                correct: 1
            },
            {
                question: "How many stars does our galaxy contain approximately?",
                answers: ["1 million", "1 billion", "100 billion", "1 trillion"],
                correct: 2
            },
            {
                question: "What is the closest star to Earth after the Sun?",
                answers: ["Alpha Centauri", "Proxima Centauri", "Sirius", "Vega"],
                correct: 1
            },
            {
                question: "What is a nebula?",
                answers: ["A planet", "A cloud of gas and dust", "A comet", "An asteroid"],
                correct: 1
            },
            {
                question: "How do stars produce their energy?",
                answers: ["Combustion", "Nuclear fusion", "Electricity", "Friction"],
                correct: 1
            },
            {
                question: "What is the end of life for a massive star?",
                answers: ["White dwarf", "Supernova then black hole", "It disappears", "It becomes a planet"],
                correct: 1
            },
            {
                question: "How many galaxies can we observe in the universe?",
                answers: ["Thousands", "Millions", "Billions", "More than 2 trillion"],
                correct: 3
            },
            {
                question: "Which galaxy is closest to the Milky Way?",
                answers: ["Andromeda", "Triangle Galaxy", "Large Magellanic Cloud", "Small Magellanic Cloud"],
                correct: 2
            },
            {
                question: "What type is our Sun?",
                answers: ["Red giant", "Yellow dwarf", "White dwarf", "Neutron star"],
                correct: 1
            },
            {
                question: "What is a globular cluster?",
                answers: ["A group of planets", "A group of stars", "A group of galaxies", "A group of comets"],
                correct: 1
            }
        ],
        7: [ 
            {
                question: "Quelle fut la première mission habitée sur la Lune ?",
                answers: ["Apollo 8", "Apollo 10", "Apollo 11", "Apollo 12"],
                correct: 2
            },
            {
                question: "Quel rover explore actuellement Mars ?",
                answers: ["Curiosity", "Perseverance", "Opportunity", "Spirit"],
                correct: 1
            },
            {
                question: "Quelle sonde a quitté le système solaire en premier ?",
                answers: ["Voyager 1", "Voyager 2", "Pioneer 10", "New Horizons"],
                correct: 0
            },
            {
                question: "Quelle mission étudie Jupiter depuis 2016 ?",
                answers: ["Cassini", "Juno", "Galileo", "Ulysses"],
                correct: 1
            },
            {
                question: "Quel télescope spatial a révolutionné l'astronomie ?",
                answers: ["Kepler", "Spitzer", "Hubble", "James Webb"],
                correct: 2
            },
            {
                question: "Quelle mission a étudié Saturne pendant 13 ans ?",
                answers: ["Voyager", "Cassini", "Pioneer", "New Horizons"],
                correct: 1
            },
            {
                question: "Où se trouve actuellement la sonde New Horizons ?",
                answers: ["Autour de Jupiter", "Vers Pluton", "Au-delà de Pluton", "Retour vers la Terre"],
                correct: 2
            },
            {
                question: "Quelle mission recherche des signes de vie passée sur Mars ?",
                answers: ["Curiosity", "Opportunity", "Perseverance", "InSight"],
                correct: 2
            },
            {
                question: "Combien d'humains ont marché sur la Lune ?",
                answers: ["6", "8", "10", "12"],
                correct: 3
            },
            {
                question: "Quelle est la prochaine grande mission lunaire de la NASA ?",
                answers: ["Apollo 18", "Artemis", "Orion", "Gateway"],
                correct: 1
            }
        ],
        8: [ 
            {
                question: "Qu'est-ce qu'un trou noir ?",
                answers: ["Une étoile très sombre", "Une région où rien ne peut s'échapper", "Un tunnel spatial", "Une planète noire"],
                correct: 1
            },
            {
                question: "Comment se forment la plupart des trous noirs ?",
                answers: ["Collision de planètes", "Effondrement d'étoiles massives", "Explosion du Soleil", "Mystère total"],
                correct: 1
            },
            {
                question: "Qu'est-ce que l'horizon des événements ?",
                answers: ["Le bord du système solaire", "Point de non-retour d'un trou noir", "Limite de l'univers", "Surface d'une étoile"],
                correct: 1
            },
            {
                question: "Quel trou noir supermassif est au centre de notre galaxie ?",
                answers: ["Sagittarius A*", "Cygnus X-1", "M87*", "Andromède A"],
                correct: 0
            },
            {
                question: "Qui a prédit l'existence des trous noirs ?",
                answers: ["Newton", "Einstein", "Hawking", "Schwarzschild"],
                correct: 3
            },
            {
                question: "Que se passe-t-il avec le temps près d'un trou noir ?",
                answers: ["Il accélère", "Il ralentit", "Il s'arrête", "Il recule"],
                correct: 1
            },
            {
                question: "Quel phénomène permet de détecter les trous noirs ?",
                answers: ["Leur lumière", "Leur effet sur la matière environnante", "Leur son", "Leur chaleur"],
                correct: 1
            },
            {
                question: "Qu'est-ce que la radiation de Hawking ?",
                answers: ["Énergie émise par les trous noirs", "Radiation solaire", "Rayons X", "Lumière visible"],
                correct: 0
            },
            {
                question: "Quelle est la première image d'un trou noir obtenue ?",
                answers: ["Sagittarius A*", "M87*", "Cygnus X-1", "Aucune encore"],
                correct: 1
            },
            {
                question: "Que deviennent les trous noirs avec le temps selon Hawking ?",
                answers: ["Ils grandissent toujours", "Ils s'évaporent lentement", "Ils explosent", "Ils se transforment en étoiles"],
                correct: 1
            }
        ],
        9: [ 
            {
                question: "Quel âge a l'univers ?",
                answers: ["4,6 milliards d'années", "13,8 milliards d'années", "20 milliards d'années", "Infini"],
                correct: 1
            },
            {
                question: "Comment l'univers a-t-il commencé selon la théorie actuelle ?",
                answers: ["Big Crunch", "Big Bang", "Création divine", "Il a toujours existé"],
                correct: 1
            },
            {
                question: "Qu'est-ce que la matière noire ?",
                answers: ["Matière invisible qui compose 85% de la matière", "Trous noirs", "Poussière spatiale", "Énergie"],
                correct: 0
            },
            {
                question: "Que représente l'énergie sombre ?",
                answers: ["5% de l'univers", "25% de l'univers", "70% de l'univers", "Elle n'existe pas"],
                correct: 2
            },
            {
                question: "Qu'est-ce que le rayonnement de fond cosmologique ?",
                answers: ["Lumière des étoiles", "Résidu du Big Bang", "Radiation solaire", "Lumière des galaxies"],
                correct: 1
            },
            {
                question: "L'univers est-il en expansion ?",
                answers: ["Non, il est statique", "Oui, et l'expansion accélère", "Oui, mais l'expansion ralentit", "Il se contracte"],
                correct: 1
            },
            {
                question: "Qu'est-ce que la constante de Hubble ?",
                answers: ["Âge de l'univers", "Vitesse d'expansion de l'univers", "Taille de l'univers", "Température de l'univers"],
                correct: 1
            },
            {
                question: "Quels sont les éléments les plus abondants dans l'univers ?",
                answers: ["Oxygène et carbone", "Hydrogène et hélium", "Fer et nickel", "Silicium et magnésium"],
                correct: 1
            },
            {
                question: "Qu'est-ce que l'inflation cosmique ?",
                answers: ["Expansion rapide initiale", "Formation des galaxies", "Création des étoiles", "Fin de l'univers"],
                correct: 0
            },
            {
                question: "Que dit le principe cosmologique ?",
                answers: ["L'univers a un centre", "L'univers est homogène et isotrope", "L'univers est fini", "L'univers est cyclique"],
                correct: 1
            }
        ],
        10: [ 
            {
                question: "Quelle est la limite de Chandrasekhar ?",
                answers: ["Masse maximale d'une naine blanche", "Taille maximale d'une étoile", "Vitesse de la lumière", "Température d'un trou noir"],
                correct: 0
            },
            {
                question: "Qu'est-ce qu'une kilonova ?",
                answers: ["Explosion d'étoiles à neutrons", "Naissance d'un trou noir", "Collision de galaxies", "Formation d'exoplanètes"],
                correct: 0
            },
            {
                question: "Quel phénomène a confirmé la relativité générale d'Einstein ?",
                answers: ["Précession de Mercure", "Lentille gravitationnelle", "Ondes gravitationnelles", "Toutes ces réponses"],
                correct: 3
            },
            {
                question: "Qu'est-ce que la métrique de Schwarzschild ?",
                answers: ["Description de l'espace-temps autour d'un trou noir", "Vitesse d'expansion", "Courbure de l'univers", "Distance entre galaxies"],
                correct: 0
            },
            {
                question: "Quelle est la température de l'univers aujourd'hui ?",
                answers: ["0 K", "2,7 K", "273 K", "1000 K"],
                correct: 1
            },
            {
                question: "Qu'est-ce qu'un magnetar ?",
                answers: ["Étoile magnétique ultra-puissante", "Planète métallique", "Galaxie magnétique", "Comète magnétique"],
                correct: 0
            },
            {
                question: "Quelle est la vitesse d'évasion d'un trou noir stellaire ?",
                answers: ["300 000 km/s", "Plus que la vitesse de la lumière", "150 000 km/s", "Variable selon la masse"],
                correct: 1
            },
            {
                question: "Qu'est-ce que l'effet Doppler relativiste ?",
                answers: ["Changement de fréquence dû au mouvement", "Courbure de l'espace", "Dilatation du temps", "Contraction des longueurs"],
                correct: 0
            },
            {
                question: "Combien de dimensions spatiales possède notre univers ?",
                answers: ["2", "3", "4", "11 selon la théorie des cordes"],
                correct: 1
            },
            {
                question: "Qu'est-ce que le paradoxe de Fermi ?",
                answers: ["Pourquoi ne voit-on pas d'extraterrestres", "Pourquoi l'univers existe", "Pourquoi les trous noirs existent", "Pourquoi la gravité existe"],
                correct: 0
            }
        ]
    };
    
    return levelQuestions[levelId] || levelQuestions[1];
}

function showQuiz() {
    
    if (typeof triggerCosmoMessage === 'function') {
        triggerCosmoMessage('quiz_start');
    }

    showGalacticPath();
}

function initializeQuiz() {
    
    const shuffled = [...quizQuestions].sort(() => 0.5 - Math.random());
    gameState.currentQuiz.questions = shuffled.slice(0, 10);
    gameState.currentQuiz.currentQuestion = 0;
    gameState.currentQuiz.score = 0;
    gameState.currentQuiz.answers = [];
    
    displayQuestion();
}

function displayQuestion() {
    const quiz = gameState.currentQuiz;
    const question = quiz.questions[quiz.currentQuestion];
    
    document.getElementById('questionNumber').textContent = quiz.currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('quizProgress').style.width = ((quiz.currentQuestion + 1) / 10) * 100 + '%';
    document.getElementById('quizScore').textContent = quiz.score;
    
    const answersGrid = document.getElementById('answersGrid');
    answersGrid.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = `${String.fromCharCode(65 + index)}. ${answer}`;
        button.onclick = () => selectAnswer(index);
        answersGrid.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    const quiz = gameState.currentQuiz;
    const question = quiz.questions[quiz.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');

    buttons.forEach(btn => btn.disabled = true);

    buttons[question.correct].classList.add('correct');
    if (selectedIndex !== question.correct) {
        buttons[selectedIndex].classList.add('incorrect');
    }

    if (selectedIndex === question.correct) {
        quiz.score += 10;
        gainXP(15);
        gainCoins(5);
    }
    
    quiz.answers.push({
        question: quiz.currentQuestion,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: selectedIndex === question.correct
    });

    addKnowledgeEntry({
        title: `Question ${quiz.currentQuestion + 1}`,
        content: question.explanation,
        type: "quiz"
    });
    
    setTimeout(() => {
        nextQuestion();
    }, 2000);
}

function nextQuestion() {
    const quiz = gameState.currentQuiz;
    quiz.currentQuestion++;
    
    if (quiz.currentQuestion >= quiz.questions.length) {
        finishQuiz();
    } else {
        displayQuestion();
    }
}

function skipQuestion() {
    nextQuestion();
}

function finishQuiz() {
    const quiz = gameState.currentQuiz;
    const percentage = (quiz.score / (quiz.questions.length * 10)) * 100;
    const currentLevel = gameState.currentLevel;
    
    let message = `Level ${currentLevel} completed!\n\nScore: ${quiz.score}/${quiz.questions.length * 10} (${percentage.toFixed(1)}%)\n\n`;

    let stars = 0;
    if (percentage >= 90) {
        stars = 3;
        message += "🌟🌟🌟 Perfect! Total mastery!";
        gainXP(100);
        gainCoins(50);
    } else if (percentage >= 70) {
        stars = 2;
        message += "🌟🌟 Excellent! Very good understanding!";
        gainXP(75);
        gainCoins(35);
    } else if (percentage >= 50) {
        stars = 1;
        message += "🌟 Bien ! Keep up your efforts!";
        gainXP(50);
        gainCoins(20);
    } else {
        message += "📚 Keep learning! Try this level again!";
        gainXP(25);
        gainCoins(10);
    }

    if (currentLevel && currentLevel <= galacticLevels.length) {
        const level = galacticLevels[currentLevel - 1];
        if (stars > 0) {
            level.completed = true;
            level.stars = Math.max(level.stars, stars);

            const existingLevel = gameState.galacticProgress.levelsCompleted.find(l => l.id === currentLevel);
            if (existingLevel) {
                existingLevel.stars = Math.max(existingLevel.stars, stars);
            } else {
                gameState.galacticProgress.levelsCompleted.push({
                    id: currentLevel,
                    stars: stars
                });
            }

            if (currentLevel < galacticLevels.length) {
                galacticLevels[currentLevel].unlocked = true;
                message += `\n\n🚀 Level ${currentLevel + 1} unlocked!`;
            }

            gameState.galacticProgress.totalStars = gameState.galacticProgress.levelsCompleted.reduce((total, level) => total + level.stars, 0);
        }
    }
    
    alert(message);

    if (typeof cosmoGuide !== 'undefined' && cosmoGuide) {
        if (stars > 0) {
            cosmoGuide.onLevelCompleted(currentLevel, stars);
        } else {
            cosmoGuide.onLevelFailed(currentLevel);
        }
    }

    if (percentage >= 80) {
        unlockAchievement(3); 
    }

    showGalacticPath();
    updateUI();
    saveGameData();
}

function updateTutorial() {
    const steps = document.querySelectorAll('.tutorial-step');
    const dots = document.querySelectorAll('.step-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    steps.forEach(step => step.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    const currentStep = document.querySelector(`[data-step="${gameState.tutorialStep}"]`);
    if (currentStep) {
        currentStep.classList.add('active');
    }
    
    const currentDot = document.querySelector(`.step-dot[data-step="${gameState.tutorialStep}"]`);
    if (currentDot) {
        currentDot.classList.add('active');
    }

    prevBtn.disabled = gameState.tutorialStep === 1;
    nextBtn.textContent = gameState.tutorialStep === 3 ? 'Terminer' : 'Suivant';
    nextBtn.innerHTML = gameState.tutorialStep === 3 ? 
        'Terminer <i class="fas fa-check"></i>' : 
        'Suivant <i class="fas fa-chevron-right"></i>';
}

function nextTutorialStep() {
    if (gameState.tutorialStep < 3) {
        gameState.tutorialStep++;
        updateTutorial();
    } else {
        hideTutorial();
    }
}

function previousTutorialStep() {
    if (gameState.tutorialStep > 1) {
        gameState.tutorialStep--;
        updateTutorial();
    }
}

function updateMissionDisplay() {
    const missionContainer = document.getElementById('currentMission');
    const currentMission = gameState.missions.find(m => !m.completed);
    
    if (currentMission) {
        const progressPercent = (currentMission.progress / currentMission.target) * 100;
        
        missionContainer.innerHTML = `
            <h4>${currentMission.title}</h4>
            <p>${currentMission.description}</p>
            <div class="mission-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span>${currentMission.progress}/${currentMission.target} ${getMissionTypeText(currentMission.type)}</span>
            </div>
            <div class="mission-reward">
                <i class="fas fa-gift"></i>
                Récompense: ${currentMission.reward.xp} XP + ${currentMission.reward.coins} Stardust
            </div>
        `;
    }
}

function getMissionTypeText(type) {
    const texts = {
        'discover': 'Planètes trouvées',
        'quiz': 'Quiz réussis',
        'scan': 'Scans effectués'
    };
    return texts[type] || 'Objectifs';
}

function updateMissionProgress(type, amount) {
    const mission = gameState.missions.find(m => m.type === type && !m.completed);
    if (mission) {
        mission.progress += amount;
        if (mission.progress >= mission.target) {
            completeMission(mission);
        }
        updateMissionDisplay();
    }
}

function completeMission(mission) {
    mission.completed = true;
    gainXP(mission.reward.xp);
    gainCoins(mission.reward.coins);
    
    showAchievementNotification(`Mission Accomplie: ${mission.title}`);

    generateNextMission();
}

function generateNextMission() {
    const missionTypes = [
        {
            type: 'discover',
            title: 'Exploration Avancée',
            description: 'Découvrez 3 nouvelles exoplanètes',
            target: 3,
            reward: { xp: 150, coins: 75 }
        },
        {
            type: 'quiz',
            title: 'Formation Astronomique',
            description: 'Réussissez 2 quiz avec un score parfait',
            target: 2,
            reward: { xp: 200, coins: 100 }
        }
    ];
    
    const newMission = missionTypes[Math.floor(Math.random() * missionTypes.length)];
    newMission.id = gameState.missions.length + 1;
    newMission.progress = 0;
    newMission.completed = false;
    
    gameState.missions.push(newMission);
}

function updateKnowledgePanel() {
    const container = document.getElementById('knowledgeContent');
    const randomEntry = knowledgeEntries[Math.floor(Math.random() * knowledgeEntries.length)];
    
    container.innerHTML = `
        <div class="knowledge-entry">
            <h4><i class="fas fa-info-circle"></i> ${randomEntry.title}</h4>
            <p>${randomEntry.content}</p>
        </div>
    `;
}

function addKnowledgeEntry(entry) {
    const container = document.getElementById('knowledgeContent');
    const entryDiv = document.createElement('div');
    entryDiv.className = 'knowledge-entry fade-in';
    entryDiv.innerHTML = `
        <h4><i class="fas fa-lightbulb"></i> ${entry.title}</h4>
        <p>${entry.content}</p>
    `;
    container.insertBefore(entryDiv, container.firstChild);

    const entries = container.querySelectorAll('.knowledge-entry');
    if (entries.length > 5) {
        container.removeChild(entries[entries.length - 1]);
    }
}

function gainXP(amount) {
    gameState.player.xp += amount;

    while (gameState.player.xp >= gameState.player.maxXP) {
        levelUp();
    }
    
    updateUI();
}

function gainCoins(amount) {
    gameState.player.coins += amount;
    updateUI();
}

function levelUp() {
    gameState.player.xp -= gameState.player.maxXP;
    gameState.player.level++;
    gameState.player.maxXP = Math.floor(gameState.player.maxXP * 1.5);
    
    showAchievementNotification(`Level ${gameState.player.level} Atteint !`);

    gainCoins(gameState.player.level * 10);
}

function unlockAchievement(achievementId) {
    const achievement = gameState.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked) {
        achievement.unlocked = true;
        showAchievementNotification(achievement.name);
        updateUI();
        saveGameData();
    }
}

function showAchievementNotification(text) {
    const notification = document.getElementById('achievementNotification');
    const nameSpan = document.getElementById('achievementName');
    
    nameSpan.textContent = text;
    notification.classList.remove('hidden');
    
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 4000);
}

function updateUI() {
    
    document.getElementById('playerLevel').textContent = gameState.player.level;
    document.getElementById('playerCoins').textContent = gameState.player.coins;
    document.getElementById('planetsFound').textContent = gameState.player.planetsFound;
    document.getElementById('playerScore').textContent = gameState.player.score;

    const xpPercent = (gameState.player.xp / gameState.player.maxXP) * 100;
    document.getElementById('xpFill').style.width = xpPercent + '%';
    document.getElementById('currentXP').textContent = gameState.player.xp;
    document.getElementById('maxXP').textContent = gameState.player.maxXP;

    updateAchievementsPreview();
}

function updateAchievementsPreview() {
    const container = document.getElementById('recentAchievements');
    const recentAchievements = gameState.achievements.slice(-3);
    
    container.innerHTML = recentAchievements.map(achievement => `
        <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
            <i class="fas fa-${achievement.unlocked ? 'trophy' : 'lock'}"></i>
            <span>${achievement.name}</span>
        </div>
    `).join('');
}

function togglePanel(panelClass) {
    const panel = document.querySelector(`.${panelClass}`);
    const content = panel.querySelector('.mission-content, .knowledge-content');
    const icon = panel.querySelector('.minimize-btn i');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.className = 'fas fa-minus';
    } else {
        content.style.display = 'none';
        icon.className = 'fas fa-plus';
    }
}

function playSound(soundId) {
    if (!gameState.settings.soundEnabled) return;

    const soundMap = {
        'scanSound': playScanSound,
        'discoverySound': playDiscoverySound,
        'successSound': playSuccessSound,
        'hoverSound': playHoverSound,
        'legendarySound': playLegendarySound,
        'ambientSound': playAmbientSpace
    };
    
    if (soundMap[soundId]) {
        soundMap[soundId]();
    }
}

function handleResize() {
    
    const gameContent = document.querySelector('.game-content');
    if (window.innerWidth < 992) {
        gameContent.style.gridTemplateColumns = '1fr';
    } else if (window.innerWidth < 1200) {
        gameContent.style.gridTemplateColumns = '250px 1fr 250px';
    } else {
        gameContent.style.gridTemplateColumns = '300px 1fr 300px';
    }
}

document.addEventListener('keydown', function(e) {
    if (gameState.currentScreen === 'gameScreen') {
        switch(e.key) {
            case 's':
            case 'S':
                scanForPlanets();
                break;
            case 'q':
            case 'Q':
                showQuiz();
                break;
            case 'Escape':
                showScreen('mainMenu');
                break;
        }
    } else if (gameState.currentScreen === 'quizScreen') {
        if (e.key >= '1' && e.key <= '4') {
            const answerIndex = parseInt(e.key) - 1;
            const buttons = document.querySelectorAll('.answer-btn');
            if (buttons[answerIndex] && !buttons[answerIndex].disabled) {
                selectAnswer(answerIndex);
            }
        }
    }
});

setInterval(saveGameData, 30000);

function skipToMainMenu() {
    console.log('🔧 Debug: Skipping to main menu');
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
    showScreen('mainMenu');
}

window.addEventListener('error', function(e) {
    console.error('🚨 Global error:', e.error);
    console.error('Error details:', {
        message: e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno
    });
});

console.log('🎮 ExoHunter game script loaded successfully');

const solarSystemPlanets = [
    {
        name: "Mercury",
        className: "mercury",
        distance: 80, 
        angle: 0,
        temperature: "430°C le jour, -170°C la nuit",
        realDistance: "58 millions km",
        composition: "Fer et silicates rocheux",
        gravity: "3.7 m/s² (38% de la Terre)",
        funFact: "Mercure est si proche du Soleil qu'une année dure seulement 88 jours terrestres ! 🔥",
        image: "images/mercure.png"
    },
    {
        name: "Venus",
        className: "venus",
        distance: 120,
        angle: 45,
        temperature: "462°C (plus chaud que Mercure !)",
        realDistance: "108 millions km",
        composition: "Surface rocheuse, atmosphère de CO₂",
        gravity: "8.87 m/s² (90% de la Terre)",
        funFact: "Vénus tourne à l'envers ! Un jour sur Vénus dure plus longtemps qu'une année ! 🔄",
        image: "images/venus.png"
    },
    {
        name: "Earth",
        className: "earth",
        distance: 160,
        angle: 90,
        temperature: "15°C (moyenne globale)",
        realDistance: "150 millions km",
        composition: "71% d'océans, atmosphère riche en oxygène",
        gravity: "9.81 m/s² (référence)",
        funFact: "La seule planète connue avec de la vie ! Elle a un satellite naturel : la Lune 🌍",
        image: "images/terre.png"
    },
    {
        name: "Mars",
        className: "mars",
        distance: 200,
        angle: 135,
        temperature: "-80°C à 20°C",
        realDistance: "228 millions km",
        composition: "Déserts rouges, calottes polaires de glace",
        gravity: "3.71 m/s² (38% de la Terre)",
        funFact: "Mars a les plus grandes tempêtes de poussière du système solaire et le plus grand volcan : Olympus Mons ! 🌋",
        image: "images/mars.png"
    },
    {
        name: "Jupiter",
        className: "jupiter",
        distance: 280,
        angle: 180,
        temperature: "-110°C à -140°C",
        realDistance: "778 millions km",
        composition: "Géante gazeuse (hydrogène et hélium)",
        gravity: "24.79 m/s² (2.5x la Terre)",
        funFact: "Jupiter est si massive qu'elle protège la Terre des astéroïdes ! Elle a plus de 80 lunes ! 🛡️",
        image: "images/jupiter.png"
    },
    {
        name: "Saturn",
        className: "saturn",
        distance: 340,
        angle: 225,
        temperature: "-140°C à -180°C",
        realDistance: "1.4 milliards km",
        composition: "Géante gazeuse avec des anneaux spectaculaires",
        gravity: "10.44 m/s² (1.1x la Terre)",
        funFact: "Saturne est si légère qu'elle flotterait dans l'eau ! Ses anneaux sont faits de glace et de roche ✨",
        image: "images/saturne.png"
    },
    {
        name: "Uranus",
        className: "uranus",
        distance: 400,
        angle: 270,
        temperature: "-195°C à -220°C",
        realDistance: "2.9 milliards km",
        composition: "Géante de glace (eau, méthane, ammoniac)",
        gravity: "8.69 m/s² (87% de la Terre)",
        funFact: "Uranus roule sur le côté ! Elle a été renversée par une collision géante il y a des milliards d'années 🎳",
        image: "images/uranus.png"
    },
    {
        name: "Neptune",
        className: "neptune",
        distance: 460,
        angle: 315,
        temperature: "-200°C à -220°C",
        realDistance: "4.5 milliards km",
        composition: "Géante de glace avec des vents supersoniques",
        gravity: "11.15 m/s² (1.1x la Terre)",
        funFact: "Neptune a les vents les plus rapides du système solaire : jusqu'à 2100 km/h ! 💨",
        image: "images/nepturne.png"
    },
    {
        name: "Pluton",
        className: "pluto",
        distance: 520,
        angle: 0,
        temperature: "-230°C à -240°C",
        realDistance: "5.9 milliards km",
        composition: "Planète naine rocheuse et glacée",
        gravity: "0.62 m/s² (6% de la Terre)",
        funFact: "Pluton était considérée comme la 9ème planète jusqu'en 2006 ! Elle est plus petite que notre Lune ! 🌙",
        image: "images/rocky-planet.svg"
    }
];

function showSolarSystem() {
    console.log('🌟 Opening Solar System Explorer');
    showScreen('solarSystemScreen');
    initializeSolarSystem();
}

function hideSolarSystem() {
    console.log('🌟 Closing Solar System Explorer');
    showScreen('gameScreen');
    hidePlanetInfo();

    resetGameStats();
}

function initializeSolarSystem() {
    const solarSystemContainer = document.getElementById('solarSystem');

    const existingElements = solarSystemContainer.querySelectorAll('.solar-planet, .orbit-ring');
    existingElements.forEach(element => element.remove());

    solarSystemPlanets.forEach((planetData) => {
        createOrbitRing(planetData.distance);
    });

    solarSystemPlanets.forEach((planetData, index) => {
        createSolarPlanet(planetData, index);
    });
    
    console.log('🪐 Solar system initialized with', solarSystemPlanets.length, 'planets');
}

function createOrbitRing(distance) {
    const solarSystemContainer = document.getElementById('solarSystem');
    const orbitRing = document.createElement('div');
    
    orbitRing.className = 'orbit-ring';
    orbitRing.style.width = (distance * 2) + 'px';
    orbitRing.style.height = (distance * 2) + 'px';
    
    solarSystemContainer.appendChild(orbitRing);
}

function createSolarPlanet(planetData, index) {
    const solarSystemContainer = document.getElementById('solarSystem');
    const planet = document.createElement('div');
    
    planet.className = `solar-planet ${planetData.className}`;
    planet.dataset.planetName = planetData.name;

    const centerX = solarSystemContainer.offsetWidth / 2;
    const centerY = solarSystemContainer.offsetHeight / 2;
    const x = centerX + Math.cos(planetData.angle * Math.PI / 180) * planetData.distance;
    const y = centerY + Math.sin(planetData.angle * Math.PI / 180) * planetData.distance;
    
    planet.style.left = x + 'px';
    planet.style.top = y + 'px';
    planet.style.transform = 'translate(-50%, -50%)';

    planet.style.opacity = '0';
    planet.style.transform += ' scale(0)';
    
    setTimeout(() => {
        planet.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        planet.style.opacity = '1';
        planet.style.transform = 'translate(-50%, -50%) scale(1)';
    }, index * 200);

    planet.addEventListener('mouseenter', () => {
        console.log('🖱️ Hovering over', planetData.name);
        playHoverSound();
    });
    
    planet.addEventListener('click', () => {
        console.log('🖱️ Clicked on', planetData.name);
        showPlanetInfo(planetData);
        playClickSound();
    });
    
    solarSystemContainer.appendChild(planet);
    console.log('✅ Created planet:', planetData.name);
}

function showPlanetInfo(planetData) {
    const overlay = document.getElementById('planetInfoOverlay');
    const planetImage = document.getElementById('planetInfoImage');
    const planetName = document.getElementById('planetInfoName');
    const planetTemperature = document.getElementById('planetTemperature');
    const planetDistance = document.getElementById('planetDistance');
    const planetComposition = document.getElementById('planetComposition');
    const planetGravity = document.getElementById('planetGravity');
    const planetFunFact = document.getElementById('planetFunFact');

    planetImage.src = planetData.image;
    planetImage.alt = planetData.name;
    planetName.textContent = planetData.name;
    planetTemperature.textContent = planetData.temperature;
    planetDistance.textContent = planetData.realDistance;
    planetComposition.textContent = planetData.composition;
    planetGravity.textContent = planetData.gravity;
    planetFunFact.textContent = planetData.funFact;

    overlay.classList.remove('hidden');

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hidePlanetInfo();
        }
    });
    
    console.log('📋 Showing info for', planetData.name);
}

function hidePlanetInfo() {
    const overlay = document.getElementById('planetInfoOverlay');
    overlay.classList.add('hidden');
    console.log('📋 Planet info hidden');
}

function showMainGame() {
    hideSolarSystem();
}

function resetGameStats() {
    console.log('📊 Resetting game statistics...');

    gameState.xp = 0;
    gameState.level = 1;
    gameState.stardust = 100;
    gameState.planetsDiscovered = 0;
    gameState.questsCompleted = 0;
    gameState.achievements = [];
    gameState.discoveredPlanets = [];

    updateUI();

    localStorage.removeItem('exohunter-save');
    
    console.log('✅ Game statistics reset successfully');
}

function resetGameProgress() {
    console.log('🔄 Resetting game progress...');

    gameState.xp = 0;
    gameState.level = 1;
    gameState.stardust = 100;
    gameState.planetsDiscovered = 0;
    gameState.questsCompleted = 0;
    gameState.achievements = [];
    gameState.discoveredPlanets = [];

    const stellarSystem = document.getElementById('stellarSystem');
    if (stellarSystem) {
        
        const discoveredPlanets = stellarSystem.querySelectorAll('.planet.discovered');
        discoveredPlanets.forEach(planet => planet.remove());

        const allPlanets = stellarSystem.querySelectorAll('.planet');
        allPlanets.forEach(planet => planet.remove());
    }

    updateUI();

    localStorage.removeItem('exohunter-save');
    
    console.log('✅ Game progress reset successfully');
}

console.log('🌟 Solar System Explorer module loaded');
