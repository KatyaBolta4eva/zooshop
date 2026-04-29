const express = require('express');
const { createOrder } = require('../controllers/order');
const authenticated = require('../middlewares/authenticated');

const router = express.Router({ mergeParams: true });

router.post('/', authenticated, async (req, res) => {
  try {
    await createOrder(req.user._id);
    res.send({ error: null });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

module.exports = router;