import axios from "axios";

export default axios.create({
  baseURL: 'https://react-quiz-c4f15-default-rtdb.firebaseio.com'
})