import { ArgsType, Field } from "@nestjs/graphql";
import { SubcategoryWhereUniqueInput } from "./SubcategoryWhereUniqueInput";

@ArgsType()
class DeleteSubcategoryArgs {
  @Field(() => SubcategoryWhereUniqueInput, { nullable: false })
  where!: SubcategoryWhereUniqueInput;
}

export { DeleteSubcategoryArgs };
