import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { SubcategoryWhereInput } from "./SubcategoryWhereInput";
import { Type } from "class-transformer";
import { SubcategoryOrderByInput } from "./SubcategoryOrderByInput";

@ArgsType()
class SubcategoryFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => SubcategoryWhereInput,
  })
  @Field(() => SubcategoryWhereInput, { nullable: true })
  @Type(() => SubcategoryWhereInput)
  where?: SubcategoryWhereInput;

  @ApiProperty({
    required: false,
    type: SubcategoryOrderByInput,
  })
  @Field(() => SubcategoryOrderByInput, { nullable: true })
  @Type(() => SubcategoryOrderByInput)
  orderBy?: SubcategoryOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { SubcategoryFindManyArgs };
