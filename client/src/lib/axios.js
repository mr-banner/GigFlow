import axios from "axios";

export default axios.create({
  baseURL: "https://gig-flow-ashy.vercel.app",
  withCredentials: true, 
});
