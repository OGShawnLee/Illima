import DocumentSchema from "@schema/DocumentSchema";
import { describe, expect, test } from "bun:test";

describe("DocumentSchema", () => {
  describe("getValidDocument", () => {
    const DOCUMENT: DocumentSchema.DocumentShape = {
      id_author: 1,
      id_document: 1,
      title: "The Beginning",
      content: "",
      created_at: new Date(),
    };

    test("Should return an DocumentShape when given valid data", () => {
      expect(DocumentSchema.getValidDocument(DOCUMENT)).toEqual(DOCUMENT);
    });

    describe("id_document", () => {
      test("Should throw when given a null id_document", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, id_document: null });
        }).toThrow();
      });

      test("Should throw when given an undefined id_document", () => {
        expect(() => {
          DocumentSchema.getValidDocument({
            ...DOCUMENT,
            id_document: undefined,
          });
        }).toThrow();
      });

      test("Should throw when given a non-numeric id_document", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, id_document: "1" });
        }).toThrow();
      });
    });

    describe("id_author", () => {
      test("Should return an IssueShape when given a numeric string", () => {
        expect(
          DocumentSchema.getValidDocument({ ...DOCUMENT, id_author: "1" })
        ).toEqual(DOCUMENT);
      });

      test("Should throw when given a null id_author", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, id_author: null });
        }).toThrow();
      });

      test("Should throw when given an undefined id_author", () => {
        expect(() => {
          DocumentSchema.getValidDocument({
            ...DOCUMENT,
            id_author: undefined,
          });
        }).toThrow();
      });

      test("Should throw when given a non-numeric id_author", () => {
        expect(() => {
          DocumentSchema.getValidDocument({
            ...DOCUMENT,
            id_author: "not-a-numeric-id",
          });
        }).toThrow();
      });
    });

    describe("title", () => {
      test("Should throw when given an empty title", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title: "" });
        }).toThrow();
      });

      test("Should throw when given a null title", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title: null });
        }).toThrow();
      });

      test("Should throw when given an undefined title", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title: undefined });
        }).toThrow();
      });

      test("Should throw when given a title too short (MIN--)", () => {
        const title = "A".repeat(DocumentSchema.MIN_TITLE_LENGTH - 1);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title });
        }).toThrow();
      });

      test("Should pass when given a title with the minimum length (MIN)", () => {
        const title = "A".repeat(DocumentSchema.MIN_TITLE_LENGTH);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title });
        }).not.toThrow();
      });

      test("Should pass when given a title with the minimum length + 1 (MIN++)", () => {
        const title = "A".repeat(DocumentSchema.MIN_TITLE_LENGTH + 1);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title });
        }).not.toThrow();
      });

      test("Should pass when given a title with the maximum length - 1 (MAX--)", () => {
        const title = "A".repeat(DocumentSchema.MAX_TITLE_LENGTH - 1);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title });
        }).not.toThrow();
      });

      test("Should pass when given a title with the maximum length (MAX)", () => {
        const title = "A".repeat(DocumentSchema.MAX_TITLE_LENGTH);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title });
        }).not.toThrow();
      });

      test("Should throw when given a title too large (MAX++)", () => {
        const title = "A".repeat(DocumentSchema.MAX_TITLE_LENGTH + 1);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, title });
        }).toThrow();
      });
    });

    describe("content", () => {
      test("Should not throw when given an empty content", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, content: "" });
        }).not.toThrow();
      });

      test("Should throw when given a null content", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, content: null });
        }).toThrow();
      });

      test("Should throw when given an undefined content", () => {
        expect(() => {
          DocumentSchema.getValidDocument({
            ...DOCUMENT,
            content: undefined,
          });
        }).toThrow();
      });

      test("Should pass when given a content with the maximum length - 1 (MAX--)", () => {
        const content = "A".repeat(DocumentSchema.MAX_CONTENT_LENGTH - 1);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, content });
        }).not.toThrow();
      });

      test("Should pass when given a content with the maximum length (MAX)", () => {
        const content = "A".repeat(DocumentSchema.MAX_CONTENT_LENGTH);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, content });
        }).not.toThrow();
      });

      test("Should throw when given a content too large (MAX++)", () => {
        const content = "A".repeat(DocumentSchema.MAX_CONTENT_LENGTH + 1);
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, content });
        }).toThrow();
      });
    });

    describe("created_at", () => {
      test("Should pass when given a date", () => {
        expect(() => {
          DocumentSchema.getValidDocument({
            ...DOCUMENT,
            created_at: new Date(),
          });
        }).not.toThrow();
      });

      test("Should throw when given a null created_at", () => {
        expect(() => {
          DocumentSchema.getValidDocument({ ...DOCUMENT, created_at: null });
        }).toThrow();
      });

      test("Should throw when given an undefined created_at", () => {
        expect(() => {
          DocumentSchema.getValidDocument({
            ...DOCUMENT,
            created_at: undefined,
          });
        }).toThrow();
      });
    });
  });
});
