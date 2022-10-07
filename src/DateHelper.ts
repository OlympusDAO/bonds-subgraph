import { BigInt } from "@graphprotocol/graph-ts";

/**
 * Returns in YYYY-MM-DD format
 *
 * @param date
 * @returns
 */
export const getISO8601String = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getDateFromUnixTimestamp = (timestamp: BigInt): Date => {
  return new Date(timestamp.toI64() * 1000);
};

export const getISO8601DateStringFromTimestamp = (timestamp: BigInt): string => {
  return getISO8601String(getDateFromUnixTimestamp(timestamp));
};

export const getISO8601StringFromTimestamp = (timestamp: BigInt): string => {
  return getDateFromUnixTimestamp(timestamp).toISOString();
};
