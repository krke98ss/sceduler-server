const Schdule = require("../models/schedules/schdule");

const ScheduleController = {
  addSchdule: async (req, res) => {
    const param = { ...req.body, userId: req.userId };
    console.log(param);
    try {
      const schdule = new Schdule(param);
      const response = await schdule.addSchdule();
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  fetchSchedules: async (req, res) => {
    try {
      const schdule = new Schdule(req.userId);
      const response = await schdule.fetchSchedules();
      console.log(response);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeSchedule: async (req, res) => {
    
    try {
      const schdule = new Schdule(req.body.id);
      const response = await schdule.removeSchedule();
      console.log(response);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
module.exports = { ScheduleController };
