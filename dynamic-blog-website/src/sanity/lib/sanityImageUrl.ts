import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity";

interface ImageAsset {
  _type: 'reference';
  _ref: string;
}

const builder = createImageUrlBuilder(client);

export const urlFor = (source: ImageAsset) => builder.image(source);
