/** @module TruckerController */

const Trucker = require('../models/Trucker');

class TruckerController {

  /**
   * Show truckers
   * @param {*} request 
   * @param {*} response 
   */
  async index(request, response) {
    try {
      let { is_loaded, have_vehicle } = request.query;
      let truckers = [];

      if (typeof is_loaded !== "undefined" && (is_loaded == 'true' || is_loaded == 'false')) {
        truckers = await Trucker.find({
          is_loaded
        });
      } else if(typeof have_vehicle !== "undefined" && (have_vehicle == 'true' || have_vehicle == 'false')) {
        truckers = await Trucker.find({
          have_vehicle
        });
      } else {
        truckers = await Trucker.find();
      }

      return response.status(200).json({ truckers, count: truckers.length });

    } catch(err) {
      console.log(err);
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Show a trucker
   * @param {*} request 
   * @param {*} response 
   */
  async show(request, response) {
    try {
      const id = request.params.id;

      const trucker = await Trucker.findOne({ _id: id });
      if (!trucker)
        return response.status(400).json({ success: false, message: "Trucker does not exists" });

      return response.status(200).json(trucker);

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Group by truck type
   * @param {*} request 
   * @param {*} response 
   */
  async groupByTruckType(request, response) {
    try {
      const truckers = await Trucker.aggregate([
        {
          $group: {
            _id: '$vehicle_type',
            entry: {
              $push: {
                trucker_id: "$_id",
                origin: "$origin",
                destiny: "$destiny"
              }
            }
          }
        }
      ]);
      return response.status(200).json(truckers);
    } catch(err) {
      console.log(err);
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Add a trucker
   * @param {*} request 
   * @param {*} response 
   */
  async create(request, response) {
    try {
      let { name, age, gender, have_vehicle, cnh_type, is_loaded, vehicle_type, origin, destiny } = request.body;
      
      if (!name || !age || !gender || !cnh_type || !vehicle_type || !origin || !destiny)
        return response.status(400).json({ success: false, message: "Empty data" });

      const exists = await Trucker.findOne({
        $and: [
          { name: { $eq: name } },
          { cnh_type: { $eq: cnh_type } }
        ]
      });

      if (exists)
        return response.status(400).json({ success: false, message: "Trucker already exists" });

      const create = await Trucker.create({
        name,
        age,
        gender,
        have_vehicle,
        cnh_type,
        is_loaded,
        vehicle_type,
        origin,
        destiny
      });

      if (!create)
        return response.status(500).json({ success: false, message: "Internal error" });

      return response.status(200).json({ success: true, message: "Trucker successfully created", create });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }
  
  /**
   * Update a trucker
   * @param {*} request 
   * @param {*} response 
   */
  async update(request, response) {
    try {
      let { name, age, gender, have_vehicle, cnh_type, is_loaded, vehicle_type, origin, destiny } = request.body;
      let id = request.params.id;

      const trucker = await Trucker.findById(id);

      if (!trucker)
        return response.status(400).json({ success: false, message: "Trucker does not exists" });

      
      if (!name || !age || !gender || !cnh_type || !vehicle_type || !origin || !destiny)
        return response.status(400).json({ success: false, message: "Empty data" });

      const exists = await Trucker.findOne({
        $and: [
          { _id: { $ne: id } },
          { name: { $eq: name } },
          { cnh_type: { $eq: cnh_type } }
        ]
      });

      if (exists)
        return response.status(400).json({ success: false, message: "Trucker already exists" });

      const update = await Trucker.updateOne({ _id: id }, {
        name,
        age,
        gender,
        have_vehicle,
        cnh_type,
        is_loaded,
        vehicle_type,
        origin,
        destiny
      });

      if (!update)
        return response.status(500).json({ success: false, message: "Internal error" });

      return response.status(200).json({ success: true, message: "Trucker successfully updated" });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Delete a trucker
   * @param {*} request 
   * @param {*} response 
   */
   async remove(request, response) {
    try {
      const id  = request.params.id;

      const exists = await Trucker.findOne({ _id: id });

      if (!exists)
        return response.status(400).json({ success: false, message: "Trucker does not exists" });

      const del = await Trucker.deleteOne({ _id: id });

      if (!del)
        return response.status(500).json({ success: false, message: "Internal error" });

      return response.status(200).json({ success: true, message: "Trucker successfully deleted" });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal error" });
    }
  }
}

module.exports = new TruckerController();
