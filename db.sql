CREATE TABLE Author (
  id_author INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(64) NOT NULL,
  last_name VARCHAR(64) NOT NULL,
  display_name VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Account (
  id_account INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_author INT NOT NULL,
  email VARCHAR(128)  NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
  FOREIGN KEY (id_author) REFERENCES Author (id_author) ON DELETE CASCADE
);

CREATE TABLE Document (
  id_document INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_author INT NOT NULL,
  title VARCHAR(128) NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_author) REFERENCES Author (id_author) ON DELETE CASCADE
);

CREATE VIEW Profile AS
SELECT
  A.id_author,
  ACC.id_account,
  A.name,
  A.last_name,
  A.display_name,
  ACC.email,
  ACC.created_at
FROM Author A
JOIN Account ACC ON ACC.id_author = A.id_author;

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
