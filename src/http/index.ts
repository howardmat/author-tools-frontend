import axios from 'axios';
import { API_URL } from '../util/Constants';

export default axios.create({
  baseURL: API_URL,
});
