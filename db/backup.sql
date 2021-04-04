create table cvcharactermain (
    id serial primary key,
    userId int,
    name varchar(250),
    race varchar(150),
    primaryA varchar(150),
    secondaryA VARCHAR(150),
    level int
)

insert into cvcharactermain (userid, name, race, primarya, secondarya, level) values 
(1, 'Luke', 'Human', 'Theif', 'Fighter', 2), (1, 'Martin', 'Minotaur', 'Champion', 'Assassin', 20), (1, 'Riley', 'Changeling', 'Runegalder', 'Runegalder', 5)