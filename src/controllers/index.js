const express = require("express");
const { AuthController } = require('./auth.ctrl');
const { MemoController } = require('./memo.ctrl');
const { TodoController } = require('./todo.ctrl');

const { upload } = require('../middleware/multer');
const { auth } = require('../middleware/athentiate');



const router = express.Router();



router.post("/api/auth/login", AuthController.login);
router.post("/api/auth/new", AuthController.regist);

router.post("/api/users/profile",auth, upload.single('file'), AuthController.updateProfile);
router.patch("/api/users",auth, AuthController.modifyInfo);
router.delete("/api/upload", AuthController.remove);
router.post("/api/users/:id", AuthController.checkId);

router.get("/api/memos/:userId", MemoController.fetchMemos);
router.patch("/api/memos", MemoController.modifyMemo);
router.post("/api/memos", MemoController.addMemo);
router.delete("/api/memos", MemoController.removeMemo);
router.get("/api/memos/all");

router.post("/api/todos", TodoController.addTodo);
router.get("/api/todos/:userId", TodoController.fetchTodos);
router.patch("/api/todos", TodoController.modifyTodo);
router.delete("/api/todos", TodoController.removeTodo);


module.exports= router;