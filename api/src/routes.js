const express = require('express');

router = express.Router();

const Trucker = require('./controllers/TruckerController');

router.get("/", (request, response) => {
  return response.json({ success: true, message: "Running" });
});

router.get('/truckers', Trucker.index);
router.get('/truckers/:id', Trucker.show);
router.get('/truckers/group/truck_type', Trucker.groupByTruckType);
router.post('/truckers', Trucker.create);
router.put('/truckers/:id', Trucker.update);
router.delete('/truckers/:id', Trucker.remove);

module.exports = router;
