const query = (selector, i = 0, callback) => {
  const intervalID = setInterval(() => {
    if (document.querySelectorAll(selector)[i]) {
      clearInterval(intervalID);
      callback(document.querySelectorAll(selector)[i]);
    }
  }, 100);
};

const select_location = (optionIndex) => {
  return new Promise((resolve, reject) => {
    query("p-tabpanel p-dropdown div[role='button']", 0, (list) => {
      list.click();
      query(
        "p-tabpanel p-dropdown p-dropdownitem li",
        optionIndex,
        (option) => {
          option.click();
          resolve();
        }
      );
    });
  });
};

const accept_terms = () => {
  new Promise((resolve, reject) => {
    query("p-tabpanel input[type='checkbox']", 0, (btn) => btn.click());
    resolve();
  });
};

const next = () => {
  return new Promise((resolve, reject) => {
    query("button[type='submit']:not([disabled])", 0, (btn) => btn.click());
    resolve();
  });
};

const select_folder = (optionIndex) => {
  return new Promise((resolve, reject) => {
    query("p-tabview ul[role='tablist'] a[role='tab']", optionIndex, (btn) =>
      btn.click()
    );
    resolve();
  });
};

const set_folders_count = (folder_count) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    for (let i = 1; i < folder_count; i++) {
      promises.push(
        new Promise((resolve, reject) => {
          query("p-tabview ul[role='tablist'] a[role='tab']", 0, (btn) =>
            btn.click()
          );
          resolve();
        })
      );
    }
    Promise.all(promises).then(() => resolve());
  });
};

const set_folders_visa_typology = (optionIndex) => {
  return new Promise((resolve, reject) => {
    query("p-tabpanel section p-dropdown div[role='button']", 0, (list) => {
      list.click();
      query(
        "p-tabpanel section p-dropdown p-dropdownitem li",
        optionIndex,
        (option) => {
          option.click();
          resolve();
        }
      );
    });
  });
};

const set_folders_visa_category = (optionIndex) => {
  return new Promise((resolve, reject) => {
    query("p-tabpanel section p-dropdown div[role='button']", 1, (list) => {
      list.click();
      query(
        "p-tabpanel section p-dropdown p-dropdownitem li",
        optionIndex,
        (option) => {
          option.click();
          resolve();
        }
      );
    });
  });
};

const set_folder_visa = (folderIndex, optionIndex) => {
  return new Promise((resolve, reject) => {
    query(
      `.p-tabview-panels p-tabpanel:nth-of-type(${folderIndex}) p-dropdown div[role='button']`,
      2,
      (list) => {
        list.click();
        query(
          `.p-tabview-panels p-tabpanel:nth-of-type(${folderIndex}) p-dropdown div[role='button'] + div li`,
          optionIndex,
          (option) => {
            option.click();
            resolve();
          }
        );
      }
    );
  });
};

const set_input = (folderIndex, field, value) => {
  return new Promise((resolve, reject) => {
    query(
      `app-no-form form input[name="${field}"]`,
      [folderIndex - 1],
      (input) => {
        input.value = value;
        input.dispatchEvent(new Event("input"));
        input.dispatchEvent(new Event("change"));
        input.dispatchEvent(new Event("compositionend"));
        resolve();
      }
    );
  });
};

const set_folder_inputs = (folderIndex, applicant) => {
  return set_input(folderIndex, "name", applicant.firstName)
    .then(() => set_input(folderIndex, "surname", applicant.lastName))
    .then(() =>
      set_input(
        folderIndex,
        "birthLocalDate",
        applicant.dateOfBirth.split("T")[0]
      )
    )
    .then(() => set_input(folderIndex, "passport", applicant.passportNumber))
    .then(() => set_input(folderIndex, "applicantEmail", applicant.email))
    .then(() => set_input(folderIndex, "phone", applicant.phone))
    .then(() =>
      set_input(
        folderIndex,
        "expectedDepartureLocalDate",
        applicant.expectedTravelDate.split("T")[0]
      )
    );
};

const set_folders_visa = (visa_arr) => {
  return visa_arr.reduce((previousPromise, visa, index) => {
    return previousPromise.then(() => {
      return set_folder_visa(index + 2, visa);
    });
  }, Promise.resolve());
};

const set_folders_inputs = (appointment) => {
  const { applicants, email, phone, expectedTravelDate } = appointment;

  return applicants.reduce((previousPromise, applicant, index) => {
    return previousPromise.then(() => {
      return set_folder_inputs(index + 1, {
        ...applicant,
        email,
        phone,
        expectedTravelDate,
      });
    });
  }, Promise.resolve());
};
