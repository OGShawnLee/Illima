import AuthorSchema from "@schema/AuthorSchema";
import { AccountSchema } from "@schema/AccountSchema";
import { describe, expect, test } from "bun:test";

describe("AccountSchema", () => {
  const ACCOUNT: AccountSchema.SignUpShape = {
    name: "Shawn",
    last_name: "Lee",
    display_name: "OGShawnLee",
    email: "OGShawnLee@example.com",
    password: "StrongP4ssword",
  };

  describe("getValidSignUpShape", () => {
    test("Should return a SignUpShape when given valid data", () => {
      expect(AccountSchema.getValidSignUpShape(ACCOUNT)).toEqual(ACCOUNT);
    });

    describe("name", () => {
      test("Should throw when given an empty name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name: "" });
        }).toThrow();
      });

      test("Should throw when given a null name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name: null });
        }).toThrow();
      });

      test("Should throw when given an undefined name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name: undefined });
        }).toThrow();
      });

      test("Should throw when given a name too short (MIN--)", () => {
        const name = "A".repeat(AuthorSchema.MIN_NAME_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name });
        }).toThrow();
      });

      test("Should pass when given a name with the minimum length (MIN)", () => {
        const name = "A".repeat(AuthorSchema.MIN_NAME_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name });
        }).not.toThrow();
      });

      test("Should pass when given a name with the minimum length + 1 (MIN++)", () => {
        const name = "A".repeat(AuthorSchema.MIN_NAME_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name });
        }).not.toThrow();
      });

      test("Should pass when given a name with the maximum length - 1 (MAX--)", () => {
        const name = "A".repeat(AuthorSchema.MAX_NAME_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name });
        }).not.toThrow();
      });

      test("Should pass when given a name with the maximum length (MAX)", () => {
        const name = "A".repeat(AuthorSchema.MAX_NAME_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name });
        }).not.toThrow();
      });

      test("Should throw when given a name too large (MAX++)", () => {
        const name = "A".repeat(AuthorSchema.MAX_NAME_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, name });
        }).toThrow();
      });
    });

    describe("last_name", () => {
      test("Should throw when given an empty last_name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name: "" });
        }).toThrow();
      });

      test("Should throw when given a null last_name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name: null });
        }).toThrow();
      });

      test("Should throw when given an undefined last_name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name: undefined });
        }).toThrow();
      });

      test("Should throw when given a last_name too short (MIN--)", () => {
        const last_name = "A".repeat(AuthorSchema.MIN_LAST_NAME_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name });
        }).toThrow();
      });

      test("Should pass when given a last_name with the minimum length (MIN)", () => {
        const last_name = "A".repeat(AuthorSchema.MIN_LAST_NAME_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name });
        }).not.toThrow();
      });

      test("Should pass when given a last_name with the minimum length + 1 (MIN++)", () => {
        const last_name = "A".repeat(AuthorSchema.MIN_LAST_NAME_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name });
        }).not.toThrow();
      });

      test("Should pass when given a last_name with the maximum length - 1 (MAX--)", () => {
        const last_name = "A".repeat(AuthorSchema.MAX_LAST_NAME_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name });
        }).not.toThrow();
      });

      test("Should pass when given a last_name with the maximum length (MAX)", () => {
        const last_name = "A".repeat(AuthorSchema.MAX_LAST_NAME_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name });
        }).not.toThrow();
      });

      test("Should throw when given a last_name too large (MAX++)", () => {
        const last_name = "A".repeat(AuthorSchema.MAX_LAST_NAME_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, last_name });
        }).toThrow();
      });
    });

    describe("display_name", () => {
      test("Should throw when given an empty display_name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name: "" });
        }).toThrow();
      });

      test("Should throw when given a null display_name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name: null });
        }).toThrow();
      });

      test("Should throw when given an undefined display_name", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name: undefined });
        }).toThrow();
      });

      test("Should throw when given a display_name too short (MIN--)", () => {
        const display_name = "A".repeat(AuthorSchema.MIN_DISPLAY_NAME_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name });
        }).toThrow();
      });

      test("Should pass when given a display_name with the minimum length (MIN)", () => {
        const display_name = "A".repeat(AuthorSchema.MIN_DISPLAY_NAME_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name });
        }).not.toThrow();
      });

      test("Should pass when given a display_name with the minimum length + 1 (MIN++)", () => {
        const display_name = "A".repeat(AuthorSchema.MIN_DISPLAY_NAME_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name });
        }).not.toThrow();
      });

      test("Should pass when given a display_name with the maximum length - 1 (MAX--)", () => {
        const display_name = "A".repeat(AuthorSchema.MAX_DISPLAY_NAME_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name });
        }).not.toThrow();
      });

      test("Should pass when given a display_name with the maximum length (MAX)", () => {
        const display_name = "A".repeat(AuthorSchema.MAX_DISPLAY_NAME_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name });
        }).not.toThrow();
      });

      test("Should throw when given a display_name too large (MAX++)", () => {
        const display_name = "A".repeat(AuthorSchema.MAX_DISPLAY_NAME_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, display_name });
        }).toThrow();
      });
    });

    describe("email", () => {
      test("Should throw when given an invalid email format", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email: "invalid-email" });
        }).toThrow();
      });

      test("Should throw when given an empty email", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email: "" });
        }).toThrow();
      });

      test("Should throw when given a null email", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email: null });
        }).toThrow();
      });

      test("Should throw when given an undefined email", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email: undefined });
        }).toThrow();
      });

      test("Should throw when given a email too short (MIN--)", () => {
        const email = "A@g.c";
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email });
        }).toThrow();
      });

      test("Should pass when given a email with the minimum length (MIN)", () => {
        const email = "A@g.cn";
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email });
        }).not.toThrow();
      });

      test("Should pass when given a email with the minimum length + 1 (MIN++)", () => {
        const email = "A@g.com";
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email });
        }).not.toThrow();
      });

      test("Should pass when given a email with the maximum length - 1 (MAX--)", () => {
        const email = "A".repeat(AccountSchema.MAX_EMAIL_LENGTH - 1 - 6) + "@e.com";
        expect(email.length).toBe(AccountSchema.MAX_EMAIL_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email });
        }).not.toThrow();
      });

      test("Should pass when given a email with the maximum length (MAX)", () => {
        const email = "A".repeat(AccountSchema.MAX_EMAIL_LENGTH - 6) + "@e.com";
        expect(email.length).toBe(AccountSchema.MAX_EMAIL_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email });
        }).not.toThrow();
      });

      test("Should throw when given a email too large (MAX++)", () => {
        const email = "A".repeat(AccountSchema.MAX_EMAIL_LENGTH + 1 - 6) + "@e.com";
        expect(email.length).toBe(AccountSchema.MAX_EMAIL_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, email });
        }).toThrow();
      });
    });

    describe("password", () => {
      test("Should throw when given an invalid password format", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password: "invalid-password" });
        }).toThrow();
      });

      test("Should throw when given an empty password", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password: "" });
        }).toThrow();
      });

      test("Should throw when given a null password", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password: null });
        }).toThrow();
      });

      test("Should throw when given an undefined password", () => {
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password: undefined });
        }).toThrow();
      });

      test("Should throw when given a password too short (MIN--)", () => {
        const password = "S4trong";
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password });
        }).toThrow();
      });

      test("Should pass when given a password with the minimum length (MIN)", () => {
        const password = "S4trongA";
        expect(password.length).toBe(AccountSchema.MIN_PASSWORD_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password });
        }).not.toThrow();
      });

      test("Should pass when given a password with the minimum length + 1 (MIN++)", () => {
        const password = "S4trongAR";
        expect(password.length).toBe(AccountSchema.MIN_PASSWORD_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password });
        }).not.toThrow();
      });

      test("Should pass when given a password with the maximum length - 1 (MAX--)", () => {
        const password = "A".repeat(AccountSchema.MAX_PASSWORD_LENGTH - 1 - 2) + "f4";
        expect(password.length).toBe(AccountSchema.MAX_PASSWORD_LENGTH - 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password });
        }).not.toThrow();
      });

      test("Should pass when given a password with the maximum length (MAX)", () => {
        const password = "A".repeat(AccountSchema.MAX_PASSWORD_LENGTH - 2) + "f4";
        expect(password.length).toBe(AccountSchema.MAX_PASSWORD_LENGTH);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password });
        }).not.toThrow();
      });

      test("Should throw when given a password too large (MAX++)", () => {
        const password = "A".repeat(AccountSchema.MAX_PASSWORD_LENGTH + 1 - 2) + "f4";
        expect(password.length).toBe(AccountSchema.MAX_PASSWORD_LENGTH + 1);
        expect(() => {
          AccountSchema.getValidSignUpShape({ ...ACCOUNT, password });
        }).toThrow();
      });
    });
  });
});
