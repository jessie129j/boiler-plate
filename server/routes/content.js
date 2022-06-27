const express = require('express');
const router = express.Router();

const { Content } = require("../models/Content");
const { auth } = require("../middleware/auth");

//=================================
//             Content
//=================================

router.post("/", (req, res) => {
  console.log(JSON.stringify(req.body))
  res.json({ success: true, message: 'test!' })
});


router.post("/create", (req, res) => {
  const content = new Content(req.body);
  content.save((err, _contentInfo) => {
    if (err) return res.json({
      success: false,
      message: err
    })
    return res.status(200).json({
      success: true,
      contentInfo: _contentInfo
    })
  })
});

router.get("/read/:seq", (req, res) => {
  console.log('seq is '+req.params.seq)
  Content.findOne({ seq: req.params.seq },
    (err, _contentInfo) => {
      console.log(_contentInfo)
      if (err) return res.json({
        success: false,
        message: err
      });
      if(_contentInfo==null) return res.json({
        success: false,
        message: 'cannot find content'
      });

      res.status(200).send({
        success: true,
        contentInfo: _contentInfo
      });
    })
});



router.post("/update/:seq", (req, res) => {
  const _description = req.body.content.description;
  Content.findOneAndUpdate({seq:req.params.seq },
    { description: _description },
    { new: true },
    (err, _contentInfo) => {
      if (err) return res.json({
        success: false,
        message: err
      });
      res.status(200).send({
        success: true,
        contentInfo: _contentInfo
      });
    })

});

router.post("/delete/:seq", (req, res) => {
  Content.findOneAndDelete({ seq:req.params.seq },
    (err) => {
      if (err) return res.json({
        success: false,
        message: err
      });
      res.status(200).send({
        success: true
      });
    })

});

router.get('/count', (req, res) => {
  Content.count({}, function (err, _count) {
    if (err) return res.json({
      success: false,
      message: err
    });
    res.status(200).send({
      success: true,
      count: _count
    });
  })
})

router.get("/list", (req, res) => {
  Content.find({},
    (err, _contents) => {
      if (err) return res.json({
        success: false,
        message: err
      });
      res.status(200).send({
        success: true,
        contents: _contents
      });
    })
});

module.exports = router;