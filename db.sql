CREATE TABLE Author (
  id_author SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  last_name VARCHAR(64) NOT NULL,
  display_name VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE Document (
  id_document SERIAL NOT NULL PRIMARY KEY,
  id_author INT NOT NULL,
  title VARCHAR(128) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_author) REFERENCES Author (id_author)
);

CREATE VIEW CompleteDocumentView AS
  SELECT 
    Doc.id_document,
    Doc.id_author,
    Doc.title,
    Doc.content,
    A.name as author_name,
    A.last_name as author_last_name,
    A.display_name as author_display_name,
    Doc.created_at
  FROM Document Doc
  JOIN Author A ON A.id_author = Doc.id_author; 