import axios from "axios";

axios.defaults.baseURL = "https://husan.airi.uz";

export async function service(url, method, body, headers) {
  try {
    const config = {
      method,
      url,
      headers,
    };
    if (body) {
      config.data = body;
    }
    const res = await axios(config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
