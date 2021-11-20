var express = require("express");
var router = express.Router();
const userHelper = require("../helpers/userHelper");
const admin = true;

/* GET home page. */
router.get("/", function (req, res, next) {
  userHelper.getUserdetails().then((userData)=>{
    res.render("admin/add-user", { admin,userData });
  })
});

router.post("/add-user", (req, res) => {
  let response = {};
  userHelper.userExist(req.body.email).then((userStatus) => {
    if (!userStatus) {
      userHelper.addUser(req.body).then((user) => {
        if (user) {
          response.added = true;
          res.json(response);
        } else {
          res.json(false);
        }
      });
    } else {
      response.user = true;
      res.json(response);
    }
  });
});


router.post('/view-user/:id',(req,res)=>{
  userHelper.findUser(req.params.id).then((user)=>{
    res.render('admin/view-user',{admin,user})
  })
})

module.exports = router;
