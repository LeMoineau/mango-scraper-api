import config from "../config/config";
import RoutingError from "../errors/RoutingError";
import { SourceName } from "../types/primitives/scrapersConfig";
import { ArrayUtils } from "./array-utils";

export namespace RoutingUtils {
  /**
   * Convert a query param to string array
   * @param queryParam targeted query param
   * @throws RoutingError if cannot convert query param to array
   * @returns the string array
   */
  export function convertQueryParamToArray(queryParam: any): string[] {
    try {
      let srcs: string[] = [];
      if (queryParam) {
        if (Array.isArray(queryParam)) {
          srcs = queryParam;
        } else if (typeof queryParam === "string") {
          srcs = [queryParam];
        } else {
          srcs = JSON.parse(queryParam as string);
        }
      }
      return srcs;
    } catch {
      throw new RoutingError(`cannot convert "${queryParam}" to array`);
    }
  }

  /**
   * Convert a query param to string
   * @param queryParam targeted query param
   * @throws RoutingError if query param is not a string
   * @returns the string
   */
  export function convertQueryParamToString(queryParam: any): string {
    if (typeof queryParam === "string") {
      return queryParam as string;
    } else {
      throw new RoutingError(`"${queryParam}" is not a string`);
    }
  }

  export function isValidSrc(querySrc: string): boolean {
    return config.getEnabledSource().includes(querySrc as SourceName);
  }

  export function areValidSrcs(querySrcs: string[]): boolean {
    return ArrayUtils.includesAll(config.getEnabledSource(), querySrcs);
  }

  export function tryCatchAndPrint(
    tryCallback: () => void,
    catchCallback: (err: any) => void,
    dontLogError?: boolean
  ) {
    try {
      tryCallback();
    } catch (error: any) {
      if (!dontLogError) console.error(error);
      catchCallback(error);
    }
  }
}
