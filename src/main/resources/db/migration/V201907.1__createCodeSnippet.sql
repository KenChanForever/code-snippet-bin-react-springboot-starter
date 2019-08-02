DROP TABLE IF EXISTS code_snippet;

CREATE TABLE code_snippet (
  id                           BIGSERIAL                NOT NULL,
  title                        TEXT                     NOT NULL,
  code                         TEXT                     NOT NULL,
  modified_time                TIMESTAMP                NOT NULL,
  is_deleted                   BOOLEAN,
  CONSTRAINT                   code_snippet_pkey  PRIMARY KEY (id)
);
