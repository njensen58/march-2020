const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue.js");
const Comment = require("../models/comment.js");

issueRouter
  .route("/")
  .get((req, res, next) => {
    Issue.find((err, issues) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(200).send(issues);
    });
  })
  .post((req, res, next) => {
    req.body.user = req.user._id;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      return res.status(201).send(savedIssue);
    });
  });

// Get issue and its comments by _id
issueRouter
  .route("/:_id")
  .get(async (req, res, next) => {
    try {
      const issue = await Issue.findOne({ _id: req.params._id });
      const comments = await Comment.find({ issue: issue._id });
      return res.status(200).send({...issue.toObject(), comments});
    } catch (err) {
      res.status(500);
      return next(err);
    }
  })
  // update an issue's title
  .put((req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params._id, user: req.user._id },
      req.body,
      { new: true },
      (err, updatedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(201).send(udpdatedIssue);
      }
    );
  })
  // delete an issue
  .delete((req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params._id, user: req.user._id },
      (err, deletedIssue) => {
        if (err) {
          res.status(500);
          return next(err);
        }
        return res.status(204).send(deletedIssue);
      }
    );
  });

// Upvote/downvote
issueRouter.put("/upvote/:_id", async (req, res, next) => {
  try {
    const issue = await Issue.findOne({ _id: req.params._id });
    if (issue.usersWhoHaveVoted.includes(req.user._id)) {
      res.status(403);
      throw new Error("You can only vote once per issue!");
    }
    const updated = await Issue.findOneAndUpdate(
      { _id: req.params._id },
      {
        $inc: { upVotes: 1 },
        $push: { usersWhoHaveVoted: req.user._id }
      },
      { new: true }
    );
    return res.status(200).send(updated);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

issueRouter.put("/downvote/:_id", async (req, res, next) => {
  try {
    const issue = await Issue.findOne({ _id: req.params._id });
    if (issue.usersWhoHaveVoted.includes(req.user._id)) {
      res.status(403);
      throw new Error("You can only vote once per issue!");
    }
    const updated = await Issue.findOneAndUpdate(
      { _id: req.params._id },
      {
        $inc: { downVotes: 1 },
        $push: { usersWhoHaveVoted: req.user._id }
      },
      { new: true }
    );
    return res.status(200).send(updated);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});

module.exports = issueRouter;
