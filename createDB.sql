-- Disallow new connections
UPDATE pg_database SET datallowconn = 'false' WHERE datname = 'code';
ALTER DATABASE code CONNECTION LIMIT 1;

-- Terminate existing connections
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'code';


DROP DATABASE IF EXISTS	code;
DROP USER IF EXISTS code;

CREATE USER code with password 'code';
CREATE DATABASE code OWNER code ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8' TEMPLATE template0;

GRANT ALL ON ALL TABLES IN SCHEMA public TO code;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO code;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO code;
