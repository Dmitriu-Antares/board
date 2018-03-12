import express from 'express'
import Tasks from '../models/Tasks';

const router = express.Router();

router.post('/add', (req,res) => {
   console.log(req);
});

export default router;