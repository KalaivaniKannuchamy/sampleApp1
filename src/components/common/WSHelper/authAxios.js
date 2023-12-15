import axios from 'axios';
const localurl = 'http://202.131.123.86:8081/procurement/api?'
const stagingUrl = "https://dproc.mrsholdings.com/api"
const productionUrl = "https://procure.rockeye.com/api"

export default axios.create({
  baseURL: productionUrl,
  timeout: 50000,
});
