import { Module } from "@nestjs/common";
import { SubcategoryModuleBase } from "./base/subcategory.module.base";
import { SubcategoryService } from "./subcategory.service";
import { SubcategoryController } from "./subcategory.controller";
import { SubcategoryResolver } from "./subcategory.resolver";

@Module({
  imports: [SubcategoryModuleBase],
  controllers: [SubcategoryController],
  providers: [SubcategoryService, SubcategoryResolver],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
