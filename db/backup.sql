create table cvcharactermain (
    id serial primary key,
    userId int,
    name varchar(250),
    race varchar(150),
    primaryA varchar(150),
    secondaryA VARCHAR(150)
)

alter table cvcharactermain 
add column crp int, 
add column excurrent int, 
add column primarylevel int, add column secondarylevel int,
add column str int, add column dex int, add column con int, add column wis int, add column cha int, add column int int, 
add column honor int, 
add column drawback varchar(350), 
add column stressthreshold int, 
add column favormax int, 
add column vitality int, add column sizemod int, add column vitalityroll int, add column vitalitydice varchar(10);

insert into cvcharactermain (userid, name, race, primarya, secondarya, level) values 
(1, 'Luke', 'Human', 'Theif', 'Fighter', 2), (1, 'Martin', 'Minotaur', 'Champion', 'Assassin', 20), (1, 'Riley', 'Changeling', 'Runegalder', 'Runegalder', 5)