const express = require('express');
const router = express.Router();
const { getStories, triggerScrape, toggleBookmark } = require('../controllers/storyController');
const auth = require('../middleware/auth');

router.get('/', getStories);
router.post('/scrape', triggerScrape);
router.post('/:id/bookmark', auth, toggleBookmark);

module.exports = router;