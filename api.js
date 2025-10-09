// FrostByte Exoplanet Prediction API - Client-side simulation
// This is a lightweight simulation of the ML model for when the Python API is not available

class ExoplanetPredictor {
    constructor() {
        this.model = new SimpleMLModel();
    }
    
    predict(features) {
        return this.model.predict(features);
    }
}

class SimpleMLModel {
    constructor() {
        // Simplified decision tree based on real exoplanet patterns
        this.rules = [
            {
                condition: (f) => f[0] > 0.8 && f[7] === 0 && f[8] === 0 && f[4] > 100,
                prediction: 'CONFIRMED',
                probability: [0.85, 0.10, 0.05]
            },
            {
                condition: (f) => f[7] === 1 || f[8] === 1,
                prediction: 'FALSE POSITIVE',
                probability: [0.05, 0.15, 0.80]
            },
            {
                condition: (f) => f[0] < 0.3 && f[4] < 50,
                prediction: 'FALSE POSITIVE',
                probability: [0.10, 0.20, 0.70]
            },
            {
                condition: (f) => f[0] > 0.5 && f[4] > 50 && f[7] === 0 && f[8] === 0,
                prediction: 'CONFIRMED',
                probability: [0.70, 0.25, 0.05]
            },
            {
                condition: (f) => f[1] > 100 || f[5] > 20,
                prediction: 'FALSE POSITIVE',
                probability: [0.05, 0.25, 0.70]
            }
        ];
    }
    
    predict(features) {
        // Normalize features for better prediction
        const normalizedFeatures = this.normalizeFeatures(features);
        
        // Apply rules
        for (let rule of this.rules) {
            if (rule.condition(normalizedFeatures)) {
                return {
                    prediction_label: rule.prediction,
                    probabilities: rule.probability,
                    confidence_score: Math.max(...rule.probability),
                    classes: ['CONFIRMED', 'CANDIDATE', 'FALSE POSITIVE']
                };
            }
        }
        
        // Default case - candidate
        return {
            prediction_label: 'CANDIDATE',
            probabilities: [0.30, 0.50, 0.20],
            confidence_score: 0.50,
            classes: ['CONFIRMED', 'CANDIDATE', 'FALSE POSITIVE']
        };
    }
    
    normalizeFeatures(features) {
        // Basic normalization and feature engineering
        const [score, period, duration, depth, snr, radius, temp, flag_nt, flag_ss] = features;
        
        // Calculate some derived features
        const periodRatio = Math.log(period + 1);
        const durationRatio = duration / period;
        const depthLog = Math.log(depth + 1);
        const tempZone = this.getTemperatureZone(temp);
        const sizeCategory = this.getSizeCategory(radius);
        
        return [
            score,
            period,
            duration,
            depth,
            snr,
            radius,
            temp,
            flag_nt,
            flag_ss,
            periodRatio,
            durationRatio,
            depthLog,
            tempZone,
            sizeCategory
        ];
    }
    
    getTemperatureZone(temp) {
        if (temp < 200) return 0; // Too cold
        if (temp < 350) return 1; // Habitable
        if (temp < 1000) return 2; // Hot
        return 3; // Very hot
    }
    
    getSizeCategory(radius) {
        if (radius < 1.25) return 0; // Earth-size
        if (radius < 2) return 1; // Super-Earth
        if (radius < 4) return 2; // Mini-Neptune
        if (radius < 10) return 3; // Neptune-size
        return 4; // Jupiter-size or larger
    }
}

// Global predictor instance
const exoplanetPredictor = new ExoplanetPredictor();

// API simulation function
async function predictExoplanet(features) {
    try {
        // Try to call the real API first
        const response = await fetch('http://localhost:5001/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ features })
        });
        
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('Python API not available, using simulation');
    }
    
    // Fallback to simulation
    return exoplanetPredictor.predict(features);
}

// Real exoplanet examples for testing
const realExoplanetData = {
    'Kepler-442b': {
        features: [0.84, 112.3, 3.8, 288, 45.5, 1.34, 233, 0, 0],
        description: 'Potentially habitable super-Earth'
    },
    'Kepler-186f': {
        features: [0.81, 129.9, 4.2, 211, 38.2, 1.11, 188, 0, 0],
        description: 'Earth-size planet in habitable zone'
    },
    'TRAPPIST-1e': {
        features: [0.95, 6.1, 0.68, 389, 142.3, 0.91, 251, 0, 0],
        description: 'Earth-size planet, potentially habitable'
    },
    'Hot Jupiter': {
        features: [0.99, 3.2, 2.8, 12450, 847.2, 11.2, 1542, 0, 0],
        description: 'Gas giant very close to its star'
    },
    'False Positive': {
        features: [0.12, 0.8, 1.2, 8923, 23.4, 28.7, 2341, 1, 1],
        description: 'Binary star system mimicking transit'
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined') {
    module.exports = { predictExoplanet, realExoplanetData, exoplanetPredictor };
}
