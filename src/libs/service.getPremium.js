const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getPremiumService = async function (params) {
  try {
    const grpCode = params.grp.value;
    const suminsured = params.suminsured.value;

    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_PREMIUM.URL}?grp_code=${grpCode}&suminsured=${suminsured}`
    });

    // Transform response to easy-to-use structure
    // - easier to change and test later
    // - no copy-pasted transformation code everywhere
    return response;
  } catch (error) {
    // Unexpected errors like 4XX, 5XX or internal errors.
    // Construct error message and re-throw.
    // throw error;
    throw new Error(error);
  }
};

export default getPremiumService;
