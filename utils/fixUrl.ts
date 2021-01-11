/**
 * Fixes the URL by prepending `https://` if no other protocol is specified and
 * removing trailing `/`.
 *
 * @param url The URL to be fixed.
 */
export const fixUrl = (url: string) =>
  url.replace(/^(?!.+:\/\/)/, "https://").replace(/\/+$/, "")
