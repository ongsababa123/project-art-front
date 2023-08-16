import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});
// const instance = Axios.create({
//     baseURL: 'http://20.189.116.250:3001',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'

//   }
//   });

// const instance = Axios.create({
//   baseURL: 'https://dull-puce-parrot-toga.cyclic.app/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'

// }
export default instance;
