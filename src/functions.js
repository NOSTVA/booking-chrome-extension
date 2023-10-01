/*global chrome*/

async function getAppointments() {
  //get appointemnts data from background.js
  const data = await chrome.runtime.sendMessage({
    action: "GET_APPOINTMENTS",
  });
  return data;
}

function autoFill(appointment) {
  // start action in content.js
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "AUTO_FILL",
      appointment,
    });
    console.log(appointment._id);
    saveAction(appointment._id);
  });
}

function saveAction(id) {
  localStorage.setItem(id, { date: new Date() });
}

function getAction(id) {
  return localStorage.getItem(id);
}

function filterAppointments(appointments, searchTerm, field) {
  return appointments.filter(
    (appointment) =>
      appointment.applicants.length === 0 ||
      appointment[field]?.startsWith(searchTerm.toLowerCase()) ||
      appointment.applicants.some((applicant) =>
        applicant[field]?.startsWith(searchTerm.toUpperCase())
      )
  );
}

function getTimeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now.getTime() - date.getTime()) / 1000; // diff in seconds

  if (diff < 60) {
    return `${Math.floor(diff)} seconds ago`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)} minutes ago`;
  } else if (diff < 86400) {
    return `${Math.floor(diff / 3600)} hours ago`;
  } else if (diff < 604800) {
    return `${Math.floor(diff / 86400)} days ago`;
  } else if (diff < 2592000) {
    return `${Math.floor(diff / 604800)} weeks ago`;
  } else if (diff < 31536000) {
    return `${Math.floor(diff / 2592000)} months ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export {
  getAppointments,
  autoFill,
  filterAppointments,
  getTimeAgo,
  saveAction,
  getAction,
};
