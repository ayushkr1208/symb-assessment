const Classroom = require('../models/Classroom');
const { allocateRooms } = require('../utils/allocator');

/**
 * @desc    Add a new classroom
 * @route   POST /api/classrooms
 * @access  Public
 */
const addClassroom = async (req, res) => {
    try {
        const { roomId, capacity, floorNo, nearWashroom } = req.body;

        // Validate required fields
        if (!roomId || !capacity || floorNo === undefined) {
            return res.status(400).json({
                success: false,
                message: 'Please provide roomId, capacity, and floorNo',
            });
        }

        // Check if classroom already exists
        const existingClassroom = await Classroom.findOne({ roomId });
        if (existingClassroom) {
            return res.status(400).json({
                success: false,
                message: `Classroom with roomId '${roomId}' already exists`,
            });
        }

        // Create new classroom
        const classroom = await Classroom.create({
            roomId,
            capacity,
            floorNo,
            nearWashroom: nearWashroom || false,
        });

        res.status(201).json({
            success: true,
            message: 'Classroom added successfully',
            data: classroom,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

/**
 * @desc    Get all classrooms
 * @route   GET /api/classrooms
 * @access  Public
 */
const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await Classroom.find().sort({ floorNo: 1, capacity: -1 });

        res.status(200).json({
            success: true,
            count: classrooms.length,
            data: classrooms,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

/**
 * @desc    Allocate exam rooms using greedy algorithm
 * @route   POST /api/classrooms/allocate
 * @access  Public
 */
const allocateExam = async (req, res) => {
    try {
        const { totalStudents } = req.body;

        // Validate input
        if (!totalStudents || totalStudents <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid number of students (greater than 0)',
            });
        }

        // Get all classrooms
        const classrooms = await Classroom.find();

        if (classrooms.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No classrooms available. Please add classrooms first.',
            });
        }

        // Run allocation algorithm
        const result = allocateRooms(classrooms, totalStudents);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

module.exports = {
    addClassroom,
    getAllClassrooms,
    allocateExam,
};
