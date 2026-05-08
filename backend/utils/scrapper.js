const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => { // Naam server.js wala hi rakhein
    try {
        const { data } = await axios.get('https://ycombinator.com'); // URL sahi karein
        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').slice(0, 10).each((i, el) => {
            const metadata = $(el).next();
            stories.push({
                title: $(el).find('.titleline > a').first().text(),
                url: $(el).find('.titleline > a').first().attr('href'),
                author: metadata.find('.hnuser').text() || 'Unknown',
                points: parseInt(metadata.find('.score').text()) || 0,
                postedAt: metadata.find('.age').attr('title') || new Date().toISOString(),
                hnId: $(el).attr('id') // Mandatory for unique identification
            });
        });

        await Story.deleteMany({}); 
        await Story.insertMany(stories);
        console.log("✅ Scraping Done! Top 10 stories saved.");
    } catch (error) {
        console.error("❌ Scraper Error:", error.message);
    }
};

// YEH LINE SABSE ZAROORI HAI
module.exports = scrapeHackerNews;