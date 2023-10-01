/*global chrome*/
import { getAppointments } from "../utils/api.js";

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.action) {
    case "GET_APPOINTMENTS":
      getAppointments().then(res);
      return true;
    default:
      console.log(`Unknown action: ${req.action}`);
      return false;
  }
});
