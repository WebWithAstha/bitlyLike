import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Click from "../models/click.model.js";
import { createRequire } from 'module';
import Link from "../models/link.model.js";
import mongoose from "mongoose";
const require = createRequire(import.meta.url);


export const getLinkAnalytics = catchAsyncErrors(async (req, res) => {
  try {
    let { linkId } = req.params;
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
    console.log(err)
    res.status(500).json({ message: 'Error getting analytics' });
  }
});


export const getUserLinksStats = async (req, res) => {
  try {
    const userId = req.user._id; 
    const stats = await Link.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          isExpired: {
            $cond: {
              if: { $and: [ { $ne: ["$expirationDate", null] }, { $lt: ["$expirationDate", new Date()] } ] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $group: {
          _id: "$date",
          totalLinks: { $sum: 1 },
          expiredLinks: {
            $sum: {
              $cond: [{ $eq: ["$isExpired", true] }, 1, 0]
            }
          },
          activeLinks: {
            $sum: {
              $cond: [{ $eq: ["$isExpired", false] }, 1, 0]
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("Error in getUserLinksStats:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


