const express = require('express');
const router = express.Router();
const StudyPlanController = require('../controllers/studyPlanController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authentication middleware


router.use(authMiddleware); 

router.get('/', StudyPlanController.getAllStudyPlans);
router.post('/', StudyPlanController.createStudyPlan);
router.put('/:id', StudyPlanController.updateStudyPlan);
router.delete('/:id', StudyPlanController.deleteStudyPlan);

module.exports = router;