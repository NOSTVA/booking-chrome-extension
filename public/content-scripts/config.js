const VISA = {
  LONG_STAY: {
    RELIGIOUS: {
      RELIGIOUS_D: {
        typology: 0,
        category: 0,
        visa: 0,
      },
    },
    STUDY: {
      TIROCINIO: {
        typology: 0,
        category: 1,
        visa: 0,
      },
      STUDY_D: {
        typology: 0,
        category: 1,
        visa: 1,
      },
    },
    FAMILY: {
      SPOUSE: {
        typology: 0,
        category: 2,
        visa: 0,
      },
      PARENTS: {
        typology: 0,
        category: 2,
        visa: 1,
      },
      CHILDREN: {
        typology: 0,
        category: 2,
        visa: 2,
      },
    },
    EMPLOYMENT: {
      EMPLOYMENT_D: {
        typology: 0,
        category: 3,
        visa: 0,
      },
    },
    RE_ENTRY: {
      RE_ENTRY: {
        typology: 0,
        category: 4,
        visa: 0,
      },
    },
    MISSION: {
      MISSION: {
        typology: 0,
        category: 5,
        visa: 0,
      },
    },
  },
  AIRPORT_TRANSIT: {},
};

const LOCATION = {
  CAIRO: 0,
  ALEX: 1,
};

const BUSINESS_CAIRO = [LOCATION.CAIRO, VISA.LONG_STAY.MISSION.MISSION];
const FAMILY_CAIRO = [LOCATION.CAIRO, VISA.LONG_STAY.FAMILY.PARENTS];
