import { environment } from "../environments/environment.dev";
import config from "../config/config";
import axios, { AxiosResponse } from "axios";
import { CatInterface } from "../interfaces/catinterface";


export const getCats = async () : Promise<AxiosResponse<CatInterface[]>> => {
    let headers = {
        Authorization: config.catApiToken.key,
      };
      return await axios.get<CatInterface[]>(
        `${environment.catApiURI}/v1/images/search?limit=100&page=3`,
        { headers }
      );
}