import axios from "axios";
import domain from '../Content/domain.json'

export default axios.create({
    baseURL: domain.domain,
});