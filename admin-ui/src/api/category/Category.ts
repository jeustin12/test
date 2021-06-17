import { Subcategory } from "../subcategory/Subcategory";

export type Category = {
  createdAt: Date;
  id: string;
  subcategory?: Array<Subcategory>;
  updatedAt: Date;
};
