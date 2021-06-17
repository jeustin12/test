import { Category } from "../category/Category";

export type Subcategory = {
  id: string;
  name: string;
  slug: Date;
  title?: Category | null;
};
