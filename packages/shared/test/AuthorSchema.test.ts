import AuthorSchema from "@schema/AuthorSchema";
import { describe, expect, test } from "bun:test";

describe("AuthorSchema", () => {
  describe("getValidAuthor", () => {
    const AUTHOR: AuthorSchema.AuthorShape = {
      id_author: 1,
      name: "Shawn",
      last_name: "Lee",
      display_name: "OGShawnLee",
      created_at: new Date(),
    };

    test("Should return an AuthorShape when given valid data", () => {
      expect(AuthorSchema.getValidAuthor(AUTHOR)).toEqual(AUTHOR);
    });

    describe("id_author", () => {
      test("Should throw when given a null id_author", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, id_author: null });
        }).toThrow();
      });

      test("Should throw when given an undefined id_author", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, id_author: undefined });
        }).toThrow();
      });

      test("Should throw when given a non-numeric id_author", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, id_author: "1" });
        }).toThrow();
      });
    });

    describe("name", () => {
      test("Should throw when given an empty name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name: "" });
        }).toThrow();
      });

      test("Should throw when given a null name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name: null });
        }).toThrow();
      });

      test("Should throw when given an undefined name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name: undefined });
        }).toThrow();
      });

      test("Should throw when given a name too short (MIN--)", () => {
        const name = "A".repeat(AuthorSchema.MIN_NAME_LENGTH - 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name });
        }).toThrow();
      });

      test("Should pass when given a name with the minimum length (MIN)", () => {
        const name = "A".repeat(AuthorSchema.MIN_NAME_LENGTH);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name });
        }).not.toThrow();
      });

      test("Should pass when given a name with the minimum length + 1 (MIN++)", () => {
        const name = "A".repeat(AuthorSchema.MIN_NAME_LENGTH + 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name });
        }).not.toThrow();
      });

      test("Should pass when given a name with the maximum length - 1 (MAX--)", () => {
        const name = "A".repeat(AuthorSchema.MAX_NAME_LENGTH - 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name });
        }).not.toThrow();
      });

      test("Should pass when given a name with the maximum length (MAX)", () => {
        const name = "A".repeat(AuthorSchema.MAX_NAME_LENGTH);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name });
        }).not.toThrow();
      });

      test("Should throw when given a name too large (MAX++)", () => {
        const name = "A".repeat(AuthorSchema.MAX_NAME_LENGTH + 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, name });
        }).toThrow();
      });
    });

    describe("last_name", () => {
      test("Should throw when given an empty last_name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name: "" });
        }).toThrow();
      });

      test("Should throw when given a null last_name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name: null });
        }).toThrow();
      });

      test("Should throw when given an undefined last_name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name: undefined });
        }).toThrow();
      });

      test("Should throw when given a last_name too short (MIN--)", () => {
        const last_name = "A".repeat(AuthorSchema.MIN_LAST_NAME_LENGTH - 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name });
        }).toThrow();
      });

      test("Should pass when given a last_name with the minimum length (MIN)", () => {
        const last_name = "A".repeat(AuthorSchema.MIN_LAST_NAME_LENGTH);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name });
        }).not.toThrow();
      });

      test("Should pass when given a last_name with the minimum length + 1 (MIN++)", () => {
        const last_name = "A".repeat(AuthorSchema.MIN_LAST_NAME_LENGTH + 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name });
        }).not.toThrow();
      });

      test("Should pass when given a last_name with the maximum length - 1 (MAX--)", () => {
        const last_name = "A".repeat(AuthorSchema.MAX_LAST_NAME_LENGTH - 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name });
        }).not.toThrow();
      });

      test("Should pass when given a last_name with the maximum length (MAX)", () => {
        const last_name = "A".repeat(AuthorSchema.MAX_LAST_NAME_LENGTH);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name });
        }).not.toThrow();
      });

      test("Should throw when given a last_name too large (MAX++)", () => {
        const last_name = "A".repeat(AuthorSchema.MAX_LAST_NAME_LENGTH + 1);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, last_name });
        }).toThrow();
      });
    });

    describe("display_name", () => {
      test("Should throw when given an empty display_name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name: "" });
        }).toThrow();
      });

      test("Should throw when given a null display_name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name: null });
        }).toThrow();
      });

      test("Should throw when given an undefined display_name", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name: undefined });
        }).toThrow();
      });

      test("Should throw when given a display_name too short (MIN--)", () => {
        const display_name = "A".repeat(
          AuthorSchema.MIN_DISPLAY_NAME_LENGTH - 1
        );
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name });
        }).toThrow();
      });

      test("Should pass when given a display_name with the minimum length (MIN)", () => {
        const display_name = "A".repeat(AuthorSchema.MIN_DISPLAY_NAME_LENGTH);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name });
        }).not.toThrow();
      });

      test("Should pass when given a display_name with the minimum length + 1 (MIN++)", () => {
        const display_name = "A".repeat(
          AuthorSchema.MIN_DISPLAY_NAME_LENGTH + 1
        );
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name });
        }).not.toThrow();
      });

      test("Should pass when given a display_name with the maximum length - 1 (MAX--)", () => {
        const display_name = "A".repeat(
          AuthorSchema.MAX_DISPLAY_NAME_LENGTH - 1
        );
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name });
        }).not.toThrow();
      });

      test("Should pass when given a display_name with the maximum length (MAX)", () => {
        const display_name = "A".repeat(AuthorSchema.MAX_DISPLAY_NAME_LENGTH);
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name });
        }).not.toThrow();
      });

      test("Should throw when given a display_name too large (MAX++)", () => {
        const display_name = "A".repeat(
          AuthorSchema.MAX_DISPLAY_NAME_LENGTH + 1
        );
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, display_name });
        }).toThrow();
      });
    });

    describe("created_at", () => {
      test("Should pass when given a date", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, created_at: new Date() });
        }).not.toThrow();
      });

      test("Should throw when given a null created_at", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, created_at: null });
        }).toThrow();
      });

      test("Should throw when given an undefined created_at", () => {
        expect(() => {
          AuthorSchema.getValidAuthor({ ...AUTHOR, created_at: undefined });
        }).toThrow();
      });
    });
  });
});
