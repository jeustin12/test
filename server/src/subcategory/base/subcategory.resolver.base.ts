import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateSubcategoryArgs } from "./CreateSubcategoryArgs";
import { UpdateSubcategoryArgs } from "./UpdateSubcategoryArgs";
import { DeleteSubcategoryArgs } from "./DeleteSubcategoryArgs";
import { SubcategoryFindManyArgs } from "./SubcategoryFindManyArgs";
import { SubcategoryFindUniqueArgs } from "./SubcategoryFindUniqueArgs";
import { Subcategory } from "./Subcategory";
import { Category } from "../../category/base/Category";
import { SubcategoryService } from "../subcategory.service";

@graphql.Resolver(() => Subcategory)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class SubcategoryResolverBase {
  constructor(
    protected readonly service: SubcategoryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "read",
    possession: "any",
  })
  async _subcategoriesMeta(
    @graphql.Args() args: SubcategoryFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Subcategory])
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "read",
    possession: "any",
  })
  async subcategories(
    @graphql.Args() args: SubcategoryFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subcategory[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subcategory",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Subcategory, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "read",
    possession: "own",
  })
  async subcategory(
    @graphql.Args() args: SubcategoryFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subcategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Subcategory",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Subcategory)
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "create",
    possession: "any",
  })
  async createSubcategory(
    @graphql.Args() args: CreateSubcategoryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subcategory> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Subcategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Subcategory"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        title: args.data.title
          ? {
              connect: args.data.title,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Subcategory)
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "update",
    possession: "any",
  })
  async updateSubcategory(
    @graphql.Args() args: UpdateSubcategoryArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Subcategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Subcategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Subcategory"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          title: args.data.title
            ? {
                connect: args.data.title,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Subcategory)
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "delete",
    possession: "any",
  })
  async deleteSubcategory(
    @graphql.Args() args: DeleteSubcategoryArgs
  ): Promise<Subcategory | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Category, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "read",
    possession: "any",
  })
  async title(
    @graphql.Parent() parent: Subcategory,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Category | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Category",
    });
    const result = await this.service.getTitle(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
