import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Click from "../models/click.model.js";
import Link from "../models/link.model.js";
import { generateShortCode } from "../utils/generateShortCode.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const UAParser = require('ua-parser-js');
// const par = new UAParser();


export const createShortLink = catchAsyncErrors(async (req, res) => {
  const { originalUrl, customAlias, expirationDate } = req.body;
  const userId = req.user.id;

    let shortCode = customAlias || generateShortCode();

    // Check if alias already exists
    const existing = await Link.findOne({ shortCode });
    if (existing)
      return res.status(400).json({ message: "Alias already in use" });

    const newLink = new Link({
      originalUrl,
      shortCode,
      customAlias,
      expirationDate,
      userId,
    });

    await newLink.save();
    res
      .status(201)
      .json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}` });

});


export const handleRedirect = catchAsyncErrors(async (req, res) => {
  const { shortCode } = req.params;

  try {
    const link = await Link.findOne({ shortCode });
    if (!link) return res.status(404).send('Link not found');

    // Check for expiration
    if (link.expirationDate && new Date(link.expirationDate) < new Date()) {
      return res.status(410).send('Link expired');
    }

    // Increase click count
    link.clickCount += 1;
    await link.save();

    const parser = new UAParser(req.headers['user-agent']);
    const result = parser.getResult();

    const click = new Click({
      linkId: link._id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      device: result.device.type || 'desktop',
      browser: result.browser.name,
      os: result.os.name,
    });

    click.save().catch(console.error); // save without blocking redirect


    // Later: Log click details here (device, IP, etc.)
    res.redirect(link.originalUrl);
  } catch (err) {
    console.log(err)
    res.status(500).send('Server error');
  }
});


export const getAllLinks = catchAsyncErrors(async (req, res) => {
  try {
    const links = await Link.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(links);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
});

export const getLinkAnalytics = catchAsyncErrors(async (req, res) => {
  try {
    const { linkId } = req.params;
    const clicks = await Click.find({ linkId });

    const deviceMap = {};
    const browserMap = {};
    const dateMap = {};

    clicks.forEach(click => {
      const dateKey = new Date(click.timestamp).toLocaleDateString();
      deviceMap[click.device] = (deviceMap[click.device] || 0) + 1;
      browserMap[click.browser] = (browserMap[click.browser] || 0) + 1;
      dateMap[dateKey] = (dateMap[dateKey] || 0) + 1;
    });

    res.json({
      totalClicks: clicks.length,
      deviceStats: deviceMap,
      browserStats: browserMap,
      clickTimeline: dateMap,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error getting analytics' });
  }
});

