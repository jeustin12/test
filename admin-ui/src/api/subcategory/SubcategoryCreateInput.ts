import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type SubcategoryCreateInput = {
  name: string;
  slug: Date;
  title?: CategoryWhereUniqueInput | null;
};
