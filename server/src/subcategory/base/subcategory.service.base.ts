import { PrismaService } from "nestjs-prisma";
import { Prisma, Subcategory } from "@prisma/client";

export class SubcategoryServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.SubcategoryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubcategoryFindManyArgs>
  ): Promise<number> {
    return this.prisma.subcategory.count(args);
  }

  async findMany<T extends Prisma.SubcategoryFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubcategoryFindManyArgs>
  ): Promise<Subcategory[]> {
    return this.prisma.subcategory.findMany(args);
  }
  async findOne<T extends Prisma.SubcategoryFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubcategoryFindUniqueArgs>
  ): Promise<Subcategory | null> {
    return this.prisma.subcategory.findUnique(args);
  }
  async create<T extends Prisma.SubcategoryCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubcategoryCreateArgs>
  ): Promise<Subcategory> {
    return this.prisma.subcategory.create<T>(args);
  }
  async update<T extends Prisma.SubcategoryUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubcategoryUpdateArgs>
  ): Promise<Subcategory> {
    return this.prisma.subcategory.update<T>(args);
  }
  async delete<T extends Prisma.SubcategoryDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SubcategoryDeleteArgs>
  ): Promise<Subcategory> {
    return this.prisma.subcategory.delete(args);
  }
}
