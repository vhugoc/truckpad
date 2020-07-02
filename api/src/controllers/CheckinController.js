/** @module CheckinController */

const Checkin = require('../models/Checkin');
const Trucker = require('../models/Trucker');
const moment = require('moment');

class CheckinController {

  /**
   * View checkins
   * @param {*} request 
   * @param {*} response 
   */
  async index(request, response) {
    try {
      const filter = request.query.filter;
      let now = moment().format('Y-MM-DD');
      let checkin_list = [];
      let checkins = [];

      switch(filter) {
        case 'daily':
          checkin_list = await Checkin.find();
          checkins = checkin_list.filter((checkin) => {
            return moment(checkin.createdAt).format('Y-MM-DD') == now;
          });
          break;

        case 'weekly':
          now = moment().subtract('7', 'days').format('Y-MM-DD');
          checkin_list = await Checkin.find();
          checkins = checkin_list.filter((checkin) => {
            return moment(checkin.createdAt).format('Y-MM-DD') >= now;
          });
          break;

        case 'monthly':
          now = moment().format('Y-MM');
          checkin_list = await Checkin.find();
          checkins = checkin_list.filter((checkin) => {
            return moment(checkin.createdAt).format('Y-MM') == now;
          });
          break;

        default:
          checkins = await Checkin.find();
          break;
      }
      
      return response.status(200).json({ checkins, count: checkins.length });
      
    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }

  /**
   * Create a checkin
   * @param {*} request 
   * @param {*} response 
   */
  async create(request, response) {
    try {
      const { trucker_id } = request.params;
      const { type } = request.body;

      if (!type)
        return response.status(400).json({ success: false, message: "Empty data" });

      if (type !== "in" && type !== "out")
        return response.status(400).json({ success: false, message: "Invalid type" });

      const exists = await Trucker.findOne({ _id: trucker_id });
      if (!exists)
        return response.status(400).json({ success: false, message: "Trucker does not exists" });

      const last_checkin = await Checkin.findOne({ trucker_id }).sort([['createdAt', -1]]);

      if((last_checkin && last_checkin.type == type) || (!last_checkin && type == "out") )
        return response.status(400).json({ success: false, message: "The last checkin was of the same type" });

      const create = await Checkin.create({
        trucker_id,
        type
      });

      if (!create)
        return response.status(500).json({ success: false, message: "Internal error" });

      return response.status(200).json({ success: true, message: "Checkin successfully created", create });

    } catch(err) {
      return response.status(500).json({ success: false, message: "Internal Error" });
    }
  }
}

module.exports = new CheckinController();
