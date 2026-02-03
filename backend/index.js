const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const classroomRoutes = require('./src/routes/classroomRoutes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/classrooms', classroomRoutes);

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Exam Room Allocation API is running',
        endpoints: {
            addClassroom: 'POST /api/classrooms',
            getAllClassrooms: 'GET /api/classrooms',
            allocateExam: 'POST /api/classrooms/allocate',
        },
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
