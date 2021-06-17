import { Subcategory as TSubcategory } from "../api/subcategory/Subcategory";

export const SUBCATEGORY_TITLE_FIELD = "title";

export const SubcategoryTitle = (record: TSubcategory) => {
  return record.title;
};
