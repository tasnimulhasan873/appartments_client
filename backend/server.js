const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('flat_rentBD');
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Connect to database
connectDB();

// Middleware to check if Firebase token is valid (simplified for now)
const verifyFBToken = (req, res, next) => {
    // For now, just pass through - you can implement proper Firebase token verification here
    next();
};

// System Settings Routes
app.get('/api/system-settings', async (req, res) => {
    try {
        console.log('Getting system settings from database...');

        if (!db) {
            throw new Error('Database not connected');
        }

        const systemSettingsCollection = db.collection('systemSettings');
        const settings = await systemSettingsCollection.findOne({});

        if (settings) {
            console.log('Settings found in database:', settings);
            res.json({
                success: true,
                data: settings
            });
        } else {
            console.log('No settings found in database');
            res.json({
                success: false,
                message: 'No settings found'
            });
        }
    } catch (error) {
        console.error('Error fetching system settings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch system settings',
            error: error.message
        });
    }
});

app.post('/api/system-settings', verifyFBToken, async (req, res) => {
    try {
        console.log('Saving system settings to database:', req.body);

        if (!db) {
            throw new Error('Database not connected');
        }

        const systemSettingsCollection = db.collection('systemSettings');

        const settingsData = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        // Use upsert to update if exists, create if doesn't exist
        const result = await systemSettingsCollection.replaceOne(
            {}, // Empty filter to match any document (since we only want one settings document)
            settingsData,
            { upsert: true }
        );

        console.log('Database save result:', result);

        res.json({
            success: true,
            message: 'System settings saved successfully',
            data: settingsData
        });
    } catch (error) {
        console.error('Error saving system settings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save system settings',
            error: error.message
        });
    }
});

// Banner Slider API endpoint
app.get('/bannerSlider', async (req, res) => {
    try {
        console.log('Getting banner images from database...');

        if (!db) {
            throw new Error('Database not connected');
        }

        const systemSettingsCollection = db.collection('systemSettings');
        const settings = await systemSettingsCollection.findOne({});

        if (settings && settings.bannerImages && settings.bannerImages.length > 0) {
            console.log('Banner images found:', settings.bannerImages);
            res.json({
                success: true,
                data: {
                    bannerImages: settings.bannerImages,
                    siteName: settings.siteName || 'BMS - Building Management System',
                    siteDescription: settings.siteDescription || 'Professional building management platform'
                }
            });
        } else {
            console.log('No banner images found in database');
            res.json({
                success: false,
                message: 'No banner images found',
                data: {
                    bannerImages: [],
                    siteName: 'BMS - Building Management System',
                    siteDescription: 'Professional building management platform'
                }
            });
        }
    } catch (error) {
        console.error('Error fetching banner images:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch banner images',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Backend server is running',
        timestamp: new Date().toISOString()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
    });
});

app.listen(port, () => {
    console.log(`🚀 Backend server running on port ${port}`);
    console.log(`📡 API endpoints available at http://localhost:${port}/api`);
});

module.exports = app;
