import { AuthSchema } from "@schema/AuthSchema";
import { describe, expect, test } from "bun:test";

describe("AuthSchema", () => {
  const JWT_PAYLOAD: AuthSchema.JWTPayloadShape = {
    idAuthor: 1,
    exp: Date.now(),
  };

  describe("getValidJWTPayloadShape", () => {
    test("Should return a JWTPayloadShape when given valid data", () => {
      expect(AuthSchema.getValidJWTPayloadShape(JWT_PAYLOAD)).toEqual(JWT_PAYLOAD);
    });

    describe("idAuthor", () => {
      test("Should throw when given a null idAuthor", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({ ...JWT_PAYLOAD, idAuthor: null });
        }).toThrow();
      });

      test("Should throw when given an undefined idAuthor", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({ ...JWT_PAYLOAD, idAuthor: undefined });
        }).toThrow();
      });

      test("Should throw when given the minimum value - 1 (MIN--)", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({
            ...JWT_PAYLOAD,
            idAuthor: AuthSchema.MIN_ID_AUTHOR_VALUE - 1,
          });
        }).toThrow();
      });

      test("Should pass when given the minimum value (MIN)", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({
            ...JWT_PAYLOAD,
            idAuthor: AuthSchema.MIN_ID_AUTHOR_VALUE,
          });
        }).not.toThrow();
      });

      test("Should pass when given the minimum value + 1(MIN++)", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({
            ...JWT_PAYLOAD,
            idAuthor: AuthSchema.MIN_ID_AUTHOR_VALUE + 1,
          });
        }).not.toThrow();
      });
    });

    describe("exp", () => {
      test("Should throw when given a null exp", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({ ...JWT_PAYLOAD, exp: null });
        }).toThrow();
      });

      test("Should throw when given an undefined exp", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({ ...JWT_PAYLOAD, exp: undefined });
        }).toThrow();
      });

      test("Should throw when given a timestamp in the past", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({
            ...JWT_PAYLOAD,
            exp: Date.now() - 1000,
          });
        }).toThrow();
      });

      test("Should pass when given a timestamp in the future", () => {
        expect(() => {
          AuthSchema.getValidJWTPayloadShape({
            ...JWT_PAYLOAD,
            exp: Date.now() + 60_000,
          });
        }).not.toThrow();
      });
    });
  });
});
