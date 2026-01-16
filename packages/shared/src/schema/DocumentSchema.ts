import * as v from "valibot";
import { getForeignKeySchema } from "@schema/Common";

export namespace DocumentSchema {
  export const MIN_TITLE_LENGTH = 8;
  export const MAX_TITLE_LENGTH = 128;
  export const MAX_CONTENT_LENGTH = 65535;

  const INSERT_DOCUMENT_SCHEMA = v.object({
    id_author: getForeignKeySchema("Author ID"),
    title: v.pipe(
      v.string("Document Title must be a string"),
      v.minLength(MIN_TITLE_LENGTH, "Document Title must be at least 8 characters long"),
      v.maxLength(MAX_TITLE_LENGTH, "Document Title must be at most 128 characters long"),
      v.trim()
    ),
    content: v.pipe(
      v.string("Document Content must be a string"),
      v.maxLength(MAX_CONTENT_LENGTH, "Document Content must be at most 65,525 characters long"),
      v.trim()
    ),
  });
  const DOCUMENT_SCHEMA = v.object({
    ...INSERT_DOCUMENT_SCHEMA.entries,
    id_document: v.number(),
    created_at: v.date(),
  });

  export type InsertDocumentShape = v.InferOutput<typeof INSERT_DOCUMENT_SCHEMA>;
  export type DocumentShape = v.InferOutput<typeof DOCUMENT_SCHEMA>;

  export function getValidDocument(data: unknown) {
    return v.parse(DOCUMENT_SCHEMA, data);
  }

  export function getValidInsertDocument(data: unknown) {
    return v.parse(INSERT_DOCUMENT_SCHEMA, data);
  }
}

export default DocumentSchema;
