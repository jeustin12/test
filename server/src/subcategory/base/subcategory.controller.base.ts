import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as basicAuthGuard from "../../auth/basicAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { SubcategoryService } from "../subcategory.service";
import { SubcategoryCreateInput } from "./SubcategoryCreateInput";
import { SubcategoryWhereInput } from "./SubcategoryWhereInput";
import { SubcategoryWhereUniqueInput } from "./SubcategoryWhereUniqueInput";
import { SubcategoryFindManyArgs } from "./SubcategoryFindManyArgs";
import { SubcategoryUpdateInput } from "./SubcategoryUpdateInput";
import { Subcategory } from "./Subcategory";

export class SubcategoryControllerBase {
  constructor(
    protected readonly service: SubcategoryService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Subcategory })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: SubcategoryCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subcategory> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Subcategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Subcategory"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Subcategory] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SubcategoryFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subcategory[]> {
    const args = plainToClass(SubcategoryFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Subcategory",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Subcategory })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: SubcategoryWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subcategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Subcategory",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Subcategory })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: SubcategoryWhereUniqueInput,
    @common.Body()
    data: SubcategoryUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Subcategory | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Subcategory",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Subcategory"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          id: true,
          slug: true,
          title: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Subcategory",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Subcategory })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: SubcategoryWhereUniqueInput
  ): Promise<Subcategory | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          id: true,
          slug: true,
          title: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
