const Story = require('../models/Story');
const scrapeHackerNews = require('../utils/scrapper');

exports.getStories = async (req, res) => {
    const stories = await Story.find().sort({ points: -1 }); // Descending order
    res.json(stories);
};

exports.triggerScrape = async (req, res) => {
    await scrapeHackerNews();
    res.json({ message: "Scraping triggered successfully" });
};

exports.toggleBookmark = async (req, res) => {
    const story = await Story.findById(req.params.id);
    const userId = req.user.id; // From Auth Middleware

    if (story.bookmarks.includes(userId)) {
        story.bookmarks.pull(userId);
    } else {
        story.bookmarks.addToSet(userId);
    }
    await story.save();
    res.json({ message: "Bookmark toggled", isBookmarked: story.bookmarks.includes(userId) });
};