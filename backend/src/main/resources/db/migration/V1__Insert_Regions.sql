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