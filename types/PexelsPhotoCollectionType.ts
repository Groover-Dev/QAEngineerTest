import { PhotoResourceType } from "./PhotoResourceType";

export interface PexelsPhotoCollectionType {
  page: number;
  per_page: number;
  photos: PhotoResourceType[];
  total_results: number;
  prev_page?: string;
  next_page?: string;
}
