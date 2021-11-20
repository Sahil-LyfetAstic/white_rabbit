const db = require("../config/connection");
const collection = require("../config/collection");
const objId = require("mongodb").ObjectId;

module.exports = {
  userExist: (emailId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          email: emailId,
        })
        .then((user) => {
          user ? resolve(true) : resolve(false);
        })
        .catch((err) => {
          if (err) throw err;
        });
    });
  },

  addUser: (userData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData)
        .then((response) => {
          if (response) resolve(true);
          else resolve(false);
        })
        .catch((err) => {
          throw err;
        });
    });
  },
  getUserdetails: () => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .aggregate([
          {
            $project: {
              _id: 1,
              fname: 1,
              lname: 1,
              email: 1,
            },
          },
        ])
        .toArray()
        .then((userData) => {
          resolve(userData);
        })
        .catch((err) => {
          throw err;
        });
    });
  },
  findUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          _id: objId(userId),
        })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => console.log(err));
    });
  },
};
