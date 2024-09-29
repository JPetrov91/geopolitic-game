-- data.sql

INSERT INTO regions (name) VALUES
                               ('Valoria Highlands'),
                               ('Zephyros Wastes'),
                               ('Eldaraen Forest'),
                               ('Drakmir Peaks'),
                               ('Thaloria Coastlands'),
                               ('Vyrnoth Plains'),
                               ('Myrnathian Isles'),
                               ('Frostspire Expanse'),
                               ('The Sunless Marshes'),
                               ('Arcanthian Ridge')
ON CONFLICT (name) DO NOTHING;

INSERT INTO factions (name, description, created_at, updated_at) VALUES
                                                                    ('Warriors', 'Группа бесстрашных воинов, защищающих королевство.', NOW(), NOW()),
                                                                     ('Mages', 'Орден магов, изучающих древние заклинания и магию.', NOW(), NOW()),
                                                                     ('Thieves', 'Секретная организация воров, контролирующая ночные улицы.', NOW(), NOW()),
                                                                     ('Merchants', 'Гильдия торговцев, управляющая экономикой королевства.', NOW(), NOW());

