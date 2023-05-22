const Memo = require("../models/memos/Memo");

const MemoController = {
  addMemo: async (req, res) => {
    try {
      const memo = new Memo(req.body);
      const response = await memo.addMemo();
      res.status(200).json();
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  fetchMemos: async (req, res) => {
    try {
      const memo = new Memo(req.params.userId);
      const response = await memo.fetchMemos();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  removeMemo: async (req, res) => {
    try {
      const memo = new Memo(req.body.id);
      const response = await memo.removeMemo();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  modifyMemo: async (req, res) => {
    try {
      const memo = new Memo(req.body);
      const response = await memo.modifyMemo();
      res.status(200).json(response);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = { MemoController };
