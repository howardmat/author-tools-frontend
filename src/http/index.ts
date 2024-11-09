import axios from 'axios';
import { API_URL } from '../util/constants';

export default axios.create({
  baseURL: API_URL,
});
