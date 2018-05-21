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
   }).fetch().then(user =>{
      Tasks.forge({
         name: title,
         text: issue,
         author: username,
         adminID: id,
         state: 'lane1',
         assigned: username,
         boardID: boardId
      }).save().then(task => {
         res.status(200).json({
            success:true
         });
      }).catch(err => {
         console.log(err);
         res.status(500).json({error:err});
      })
   }).catch(err => {
      res.status(500).json({error:err});
   })
});

router.get('/show', (req,res) => {
   const { boardID }  = req.query;
   Tasks.query().where({boardID}).select().then( tasks => {
      res.status(200).json(tasks);
   })
});

router.post('/change_lane', (req,res) => {
   const { cardId, sourceLaneId, targetLaneId } = req.body;
   Tasks.where({id: cardId})
       .save({state: targetLaneId},{patch:true})
       .then( task => {
      res.status(200).json({success: true});
   }).catch(err => {
      res.status(500).json({error:err});
   })
});

export default router;