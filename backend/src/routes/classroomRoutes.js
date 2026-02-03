const express = require('express');
const router = express.Router();
const {
    addClassroom,
    getAllClassrooms,
    allocateExam,
} = require('../controllers/classroomController');

// @route   POST /api/classrooms
// @desc    Add a new classroom
router.post('/', addClassroom);

// @route   GET /api/classrooms
// @desc    Get all classrooms
router.get('/', getAllClassrooms);

// @route   POST /api/classrooms/allocate
// @desc    Allocate exam rooms
router.post('/allocate', allocateExam);

module.exports = router;
