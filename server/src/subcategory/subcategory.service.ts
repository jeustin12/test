import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { SubcategoryServiceBase } from "./base/subcategory.service.base";

@Injectable()
export class SubcategoryService extends SubcategoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
