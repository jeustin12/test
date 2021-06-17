import { SortOrder } from "../../util/SortOrder";

export type CategoryOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  subcategory?: SortOrder;
  updatedAt?: SortOrder;
};
