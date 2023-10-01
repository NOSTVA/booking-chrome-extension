const BASE_QUERY = "https://booking-app-team.vercel.app/api/v2";

const getAppointments = async () => {
  try {
    const res = await fetch(`${BASE_QUERY}/appointments`);
    const data = await res.json();
    return data.payload.appointments;
  } catch (err) {
    console.log(err.message);
  }
};

const updateAppointement = async (appointmentId, payload) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const res = await fetch(
      `${BASE_QUERY}/appointments/${appointmentId}`,
      options
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

export { getAppointments, updateAppointement };
