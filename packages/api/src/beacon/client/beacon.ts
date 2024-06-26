import {ChainForkConfig} from "@lodestar/config";
import {Api, ReqTypes, routesData, getReqSerializers, getReturnTypes} from "../routes/beacon/index.js";
import {IHttpClient, generateGenericJsonClient} from "../../utils/client/index.js";

/**
 * REST HTTP client for beacon routes
 */
export function getClient(config: ChainForkConfig, httpClient: IHttpClient): Api {
  const reqSerializers = getReqSerializers(config);
  const returnTypes = getReturnTypes();
  // All routes return JSON, use a client auto-generator
  return generateGenericJsonClient<Api, ReqTypes>(routesData, reqSerializers, returnTypes, httpClient);
}
