import { ArgsType, Field } from "@nestjs/graphql";
import { SubcategoryWhereUniqueInput } from "./SubcategoryWhereUniqueInput";
import { SubcategoryUpdateInput } from "./SubcategoryUpdateInput";

@ArgsType()
class UpdateSubcategoryArgs {
  @Field(() => SubcategoryWhereUniqueInput, { nullable: false })
  where!: SubcategoryWhereUniqueInput;
  @Field(() => SubcategoryUpdateInput, { nullable: false })
  data!: SubcategoryUpdateInput;
}

export { UpdateSubcategoryArgs };
