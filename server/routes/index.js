const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(JSON.stringify(req.body))
    res.status(200).json({
        message: "hello world!"
    })
})

module.exports = router;
