import { ArgsType, Field } from "@nestjs/graphql";
import { SubcategoryWhereUniqueInput } from "./SubcategoryWhereUniqueInput";

@ArgsType()
class SubcategoryFindUniqueArgs {
  @Field(() => SubcategoryWhereUniqueInput, { nullable: false })
  where!: SubcategoryWhereUniqueInput;
}

export { SubcategoryFindUniqueArgs };
