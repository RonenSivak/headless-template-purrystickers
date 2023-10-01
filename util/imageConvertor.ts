import { media } from "@wix/sdk";

export const imageConvertor = (url: string) => {
  return media.getImageUrl(url).url;
};
