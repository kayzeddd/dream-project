"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const { v4: uuidv4 } = require("uuid");


const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project")
  const { userId, userData } = req.body;
  try {
    await client.connect();
    const existingUser = await db.collection("users_data").findOne({ _id: userId });
    if(!existingUser){
      await db.collection("users_data").insertOne({ _id: userId, userData, savedDreamsArr: [] });
      return res.status(200).json("new user created");
    }
    else{
      res.status(200).json("user exists");
    }

  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const addDream = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const {dreamData, userId, date, userData} = req.body;
  const _id = uuidv4();
  try{
    await client.connect();
    const postAllDreamsRes = await db.collection("all_dreams").insertOne({dreamData, userId, _id, date, userData, commentsArr: [], viewerArr: [], likesArr: []})
    // const postInUsersRes = await db.collection("users_data").updateOne({ _id: userId }, { $push: {dreamsArr: { _id, dreamData, date, userData }}})
    res.status(200).json({postAllDreamsRes, dreamId: _id})
    client.close();
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const getAllDreams = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  try{
    await client.connect();
    const allDreams = await db.collection("all_dreams").find().toArray();
    res.status(200).json({allDreams})
    client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const getUserDreams = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const { userId } = req.params;
  try{
    await client.connect();
    const resArr = await db.collection("all_dreams").find().toArray();
    let userData = resArr.filter( data => {
      return userId === data.userId
    })
    userData = userData.sort( (dreamOne, dreamTwo) => {
      const date1 = new Date(dreamOne.date);
      const date2 = new Date(dreamTwo.date);
      return date2 - date1
    })
    res.status(200).json(userData)
    client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const getOneDream = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const {dreamId} = req.params
  const {userId} = req.body
  try{
    await client.connect();
    let dreamData = await db.collection("all_dreams").findOne({ _id: dreamId });
    if(userId && !dreamData.viewerArr.includes(userId)){
      // const addView = await db.collection("all_dreams").updateOne({ _id: dreamId }, {$push: {viewerArr : userId }})
      const addView = await db.collection("all_dreams").updateOne({ _id: dreamId }, {$addToSet: {viewerArr : userId }})
      dreamData = await db.collection("all_dreams").findOne({ _id: dreamId });
    }
    res.status(200).json(dreamData)
    client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
} 

const addComment = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const {dreamId, userData, comment} = req.body;
  try{
    await client.connect();
    const mongoRes = await db.collection("all_dreams").updateOne({ _id: dreamId }, { $push: { commentsArr: {userData, comment} }})
    res.status(200).json({mongoRes, dreamId});
    await client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const saveDream = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const {dreamId, userData} = req.body;
  try{
    await client.connect();
    const mongoRes = await db.collection("users_data").updateOne({ _id: userData.email }, { $push: { savedDreamsArr: dreamId }})
    res.status(200).json({mongoRes});
    await client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const getSavedDreams = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const {userId} = req.params;
  try{
    await client.connect();
    const userData = await db.collection("users_data").findOne({ _id: userId });
    const allDreams = await db.collection("all_dreams").find().toArray();
    const savedDreams = allDreams.filter( dream => {
      return userData.savedDreamsArr.includes(dream._id)
    })
    res.status(200).json({savedDreams})
    await client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const addView =  async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const { userId, dreamId } = req.body;
  try{
    await client.connect();
    const dreamData = await db.collection("all_dreams").findOne({ _id: dreamId });
    if(!dreamData.viewerArr.includes(userId)){
        const addView = await db.collection("all_dreams").updateOne({ _id: dreamId }, {$addToSet: {viewerArr : userId }})
        res.status(200).json({addView})
    }
    await client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const deleteDream = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const { dreamId } = req.params;
  try{
    await client.connect()
    const deleteRes = await db.collection("all_dreams").deleteOne({ _id: dreamId });
    res.status(200).json({deleteRes});
    await client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  } 
}

const getUserData = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const { userId } = req.params;
  try{
    await client.connect();
    const userData = await db.collection("users_data").findOne({ _id: userId });
    res.status(200).json({userData})
    await client.close()
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
}

const addRemoveLike = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const { userId, dreamId } = req.body;
  try{
    await client.connect();
    const dream = await db.collection("all_dreams").findOne({ _id: dreamId });
    if(dream.likesArr.includes(userId)){
      let newLikesArr = dream.likesArr.filter( likedBy => {
        return likedBy !== userId
      })
      const mongoRes = await db.collection("all_dreams").updateOne({_id: dreamId }, { $set: { likesArr: newLikesArr }})
      return res.status(200).json({status:"disliked", mongoRes})
    }
    const mongoRes = await db.collection("all_dreams").updateOne({ _id: dreamId }, { $push : { likesArr: userId }})
    res.status(200).json({status:"liked", mongoRes})
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
  finally{
    await client.close()
  }
}

const deleteSavedDream = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("dream_project");
  const { userId, dreamId } = req.body;
  try{
    await client.connect();
    const mongoRes = await db.collection("users_data").updateOne({ _id: userId }, { $pull: { savedDreamsArr: dreamId }});
    res.status(200).json(mongoRes);
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
  finally{
    await client.close()
  }
}

module.exports = { 
  addUser, 
  addDream,
  getAllDreams, 
  getUserDreams,
  getOneDream,
  addComment,
  saveDream,
  getSavedDreams,
  addView,
  deleteDream,
  getUserData,
  addRemoveLike,
  deleteSavedDream,
}