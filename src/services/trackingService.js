import apiClient from "./api";

const getTrackings = async (user) => {
  const queryParams = !!user ? { user } : null;
  try {
    const res = await apiClient.get("/api/tracking/get", {
      params: queryParams,
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const archiveTracking = async (id) => {
  try {
    const res = await apiClient.get("/api/tracking/archive", {
      params: {
        id,
      },
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export { getTrackings, archiveTracking };
