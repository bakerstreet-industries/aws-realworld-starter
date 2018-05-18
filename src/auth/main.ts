import { APIGatewayEvent } from "aws-lambda";
import container, { isLoaded } from "../container";
import * as Utils from "../utils";
import * as Services from "./services";
import * as Models from "./models";

export function register(event: APIGatewayEvent): Promise<Models.IUser> {
  return isLoaded.then(() => {
    const service = container.get<Services.IService>(Models.MODULE_TYPES.Service);
    return service.register(Utils.safeJsonParse(event.body || "", "[Auth.Main]::[register] "));
  });
}

export function del(event: APIGatewayEvent): Promise<string> {
  const request: Models.IDeleteUserRequest = event as Models.IDeleteUserRequest;
  return isLoaded.then(() => {
    const service = container.get<Services.IService>(Models.MODULE_TYPES.Service);
    return service.del(Utils.safeDecodeUri(request.pathParameters.email, "[Auth.Main]::[del] "));
  });
}