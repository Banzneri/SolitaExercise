CREATE TABLE "farm_data" (
  "id" SERIAL PRIMARY KEY,
  "farm_id" int NOT NULL,
  "time" timestamp NOT NULL,
  "sensor_type" varchar NOT NULL,
  "value" decimal NOT NULL
);

CREATE TABLE "farms" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "location" varchar NOT NULL
);

CREATE TABLE "sensors" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL
);

ALTER TABLE "farm_data" ADD FOREIGN KEY ("farm_id") REFERENCES "farms" ("id");

INSERT INTO farms (name, location)
VALUES 
    ('Noora''s farm', 'Suomi'),
    ('Friman Metsola collective', 'Ruotsi'),
    ('PartialTech Research Farm', 'Yhdysvallat'),
    ('Organic Ossi''s Impact That Lasts plantase', 'Suomi');