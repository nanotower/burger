import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-exercise-94473.firebaseio.com/'
})

export default instance;