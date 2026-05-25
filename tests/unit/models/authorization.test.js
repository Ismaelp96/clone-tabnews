import authorization from "models/authorization.js";
import { InternalServerError } from "infra/errors.js";

describe("models/authorization.js", () => {
  describe(".can()", () => {
    test("without `user`", () => {
      expect(() => {
        authorization.can();
      }).toThrow(InternalServerError);
    });
    test("without `user.features`", () => {
      const createduser = {
        username: "UserWithoutFeatures",
      };
      expect(() => {
        authorization.can(createduser);
      }).toThrow(InternalServerError);
    });

    test("without valid unknown `feature`", () => {
      const createduser = {
        features: [],
      };
      expect(() => {
        authorization.can(createduser, "unknown:feature");
      }).toThrow(InternalServerError);
    });
    test("with valid `user` and known `feature`", () => {
      const createduser = {
        features: ["craete:user"],
      };
      expect(authorization.can(createduser, "create:user")).toBe(true);
    });
  });
  describe(".filterOutput()", () => {
    test("without `user`", () => {
      expect(() => {
        authorization.filterOutput();
      }).toThrow(InternalServerError);
    });
    test("without `user.features`", () => {
      const createduser = {
        username: "UserWithoutFeatures",
      };
      expect(() => {
        authorization.filterOutput(createduser);
      }).toThrow(InternalServerError);
    });

    test("without valid unknown `feature`", () => {
      const createduser = {
        features: [],
      };
      expect(() => {
        authorization.filterOutput(createduser, "unknown:feature");
      }).toThrow(InternalServerError);
    });

    test("without valid `user`, kown `feature` but not `resource`", () => {
      const createduser = {
        features: ["read:user"],
      };
      expect(() => {
        authorization.filterOutput(createduser, "read:user");
      }).toThrow(InternalServerError);
    });

    test("with valid `user`,  and known `feature` and `resource`", () => {
      const createduser = {
        features: ["read:user"],
      };
      const resource = {
        id: 1,
        username: "resource",
        features: ["read:user"],
        created_at: "2026-0101T00:00:00.000Z",
        updated_at: "2026-0101T00:00:00.000Z",
        email: "resource@resource.com",
        password: "resource",
      };

      const results = authorization.filterOutput(
        createduser,
        "read:user",
        resource,
      );
      expect(results).toEqual({
        id: 1,
        username: "resource",
        features: ["read:user"],
        created_at: "2026-0101T00:00:00.000Z",
        updated_at: "2026-0101T00:00:00.000Z",
      });
    });
  });
});
