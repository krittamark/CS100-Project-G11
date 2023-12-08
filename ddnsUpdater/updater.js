const dotenv = require('dotenv');

let ip = "0.0.0.0";

const axios = require('axios');

(async () => {
  await dotenv.config();

  const api = {
    login: process.env.API_DDNS_LOGIN,
    host: process.env.API_HOSTNAME
  };
  const server = {
    login: process.env.SERVER_DDNS_LOGIN,
    host: process.env.SERVER_HOSTNAME
  };

  await axios.get('https://domains.google.com/checkip')
    .then((response) => {
      ip = response.data;
      console.log(`[DDNS]: IP address is ${ip}`);
    })
    .catch((error) => {
      console.error(`[DDNS]: IP address check failed! ${error}`);
    });
  
  const datetime = new Date().toLocaleString();
  const apiDNSUpdateURL = `https://${api.login}@domains.google.com/nic/update?hostname=${api.host}&myip=${ip}`;
  await axios.get(apiDNSUpdateURL)
    .then((response) => {
      console.log(`[DDNS]: ${api.host} updated to ${response.data} at ${datetime}`);
    })
    .catch((error) => {
      console.error(`[DDNS]: ${api.host} update failed! ${error}`);
    });
  
  const serverDNSUpdateURL = `https://${server.login}@domains.google.com/nic/update?hostname=${server.host}&myip=${ip}`;
  await axios.get(serverDNSUpdateURL)
    .then((response) => {
      console.log(`[DDNS]: ${server.host} updated to ${response.data} at ${datetime}`);
    })
    .catch((error) => {
      console.error(`[DDNS]: ${server.host} update failed! ${error}`);
    });

})();