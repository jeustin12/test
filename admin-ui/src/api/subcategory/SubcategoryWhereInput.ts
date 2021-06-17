import { StringFilter } from "../../util/StringFilter";
import { CategoryWhereUniqueInput } from "../category/CategoryWhereUniqueInput";

export type SubcategoryWhereInput = {
  id?: StringFilter;
  title?: CategoryWhereUniqueInput;
};
