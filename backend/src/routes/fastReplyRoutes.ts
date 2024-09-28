import express from "express";
import isAuth from "../middleware/isAuth";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

import * as FastReplyController from "../controllers/FastReplyController";

const fastReplyRoutes = express.Router();

fastReplyRoutes.post("/fastreply", isAuth, upload.single('file'), FastReplyController.store);
fastReplyRoutes.get("/fastreply", isAuth, FastReplyController.index);
fastReplyRoutes.put(
  "/fastreply/:fastReplyId",
  isAuth,
  upload.single('file'),
  FastReplyController.update
);
fastReplyRoutes.delete(
  "/fastreply/:fastReplyId",
  isAuth,
  FastReplyController.remove
);

export default fastReplyRoutes;
