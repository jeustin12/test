import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { BasicAuthGuard } from "../../auth/basicAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { SubcategoryController } from "../subcategory.controller";
import { SubcategoryService } from "../subcategory.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  slug: new Date(),
  title: "exampleTitle",
};
const CREATE_RESULT = {
  id: "exampleId",
  slug: new Date(),
  title: "exampleTitle",
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    slug: new Date(),
    title: "exampleTitle",
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  slug: new Date(),
  title: "exampleTitle",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Subcategory", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: SubcategoryService,
          useValue: service,
        },
      ],
      controllers: [SubcategoryController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(BasicAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /subcategories", async () => {
    await request(app.getHttpServer())
      .post("/subcategories")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        slug: CREATE_RESULT.slug.toISOString(),
      });
  });

  test("GET /subcategories", async () => {
    await request(app.getHttpServer())
      .get("/subcategories")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          slug: FIND_MANY_RESULT[0].slug.toISOString(),
        },
      ]);
  });

  test("GET /subcategories/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/subcategories"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /subcategories/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/subcategories"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        slug: FIND_ONE_RESULT.slug.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
