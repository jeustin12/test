import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type SubcategoryUpdateInput = {
  name?: string;
  slug?: Date;
  title?: CategoryWhereUniqueInput | null;
};
