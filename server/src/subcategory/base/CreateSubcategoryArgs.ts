import { ArgsType, Field } from "@nestjs/graphql";
import { SubcategoryCreateInput } from "./SubcategoryCreateInput";

@ArgsType()
class CreateSubcategoryArgs {
  @Field(() => SubcategoryCreateInput, { nullable: false })
  data!: SubcategoryCreateInput;
}

export { CreateSubcategoryArgs };
