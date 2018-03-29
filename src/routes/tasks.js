import express from 'express'
import { Tasks } from '../models/Tasks';
import { Users } from '../models/Users';

import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

authMiddleware(router);

router.post('/add', (req,res) => {
   const { id, username } = req;
   const { title, issue, boardId } = req.body;
   Users.query({
      where: { username },
      orWhere: { id }
   }).fetch().then(() =>{
      Tasks.forge({
         name: title,
         text: issue,
         author: username,
         adminID: id,
         state: 'todo',
         assigned: username,
         boardID: boardId
      }).save().then(task => {
         res.status(200).json({
            success:true
         });
      }).catch(err => {
         console.log(err)
         res.status(500).json({error:err});
      })
   }).catch(err => {
      res.status(500).json({error:err});
   })
});

export default router;