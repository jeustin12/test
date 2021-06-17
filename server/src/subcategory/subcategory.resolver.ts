import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SubcategoryResolverBase } from "./base/subcategory.resolver.base";
import { Subcategory } from "./base/Subcategory";
import { SubcategoryService } from "./subcategory.service";

@graphql.Resolver(() => Subcategory)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SubcategoryResolver extends SubcategoryResolverBase {
  constructor(
    protected readonly service: SubcategoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
