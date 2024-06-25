import apiClient from "./api";

const getTrackings = async (params) => {
  const queryParams = !!params?.name ? { name: params?.name } : null;
  try {
    const res = await apiClient.get("/api/tracking/get", {
      params: queryParams,
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

const downloadFileTracking = async (params) => {
  try {
    const res = await apiClient.get("/api/tracking/download", {
      params: params?.id,
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};

export { getTrackings, downloadFileTracking };
