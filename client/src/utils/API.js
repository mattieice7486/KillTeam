import axios from "axios";

export default {
  // Gets all units
  getUnits: function() {
    return axios.get("/api/units");
  },
  // Gets the unit with the given id
  getUnit: function(id) {
    return axios.get("/api/units/" + id);
  },
  // Deletes the unit with the given id
  deleteUnit: function(id) {
    return axios.delete("/api/units/" + id);
  },
  // Saves a unit to the database
  saveUnit: function(unitData) {
    return axios.post("/api/units", unitData);
  },
  // Updates a unit in the database
  updateUnit: function(id, unitData) {
    return axios.put("/api/units/" + id, unitData);
  }
};
