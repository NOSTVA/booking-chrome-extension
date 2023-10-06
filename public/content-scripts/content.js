/*global chrome*/

const auto_fill = async (
  appointment,
  [location, { typology, category, visa }]
) => {
  const visa_arr = appointment.applicants.map(() => visa);
  return select_location(location)
    .then(() => accept_terms())
    .then(() => next())
    .then(() => set_folders_count(visa_arr.length))
    .then(() => select_folder(1))
    .then(() => set_folders_visa_typology(typology))
    .then(() => set_folders_visa_category(category))
    .then(() => set_folders_visa(visa_arr))
    .then(() => next())
    .then(() => set_folders_inputs(appointment))
    .catch((error) => {
      console.error(error);
    });
};

chrome.runtime.onMessage.addListener(async (req, sender, res) => {
  const { action, appointment } = req;
  switch (action) {
    case "AUTO_FILL":
      auto_fill(appointment, visaEnums[appointment.visa]).then(() =>
        res("ok!")
      );
      return true;
    default:
      return false;
  }
});
