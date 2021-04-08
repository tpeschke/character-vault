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
add column extrahonordice int,
add column temperament varchar(50),
add column drawback varchar(350), 
add column stressthreshold int, 
add column favormax int, 
add column contacts varchar(250),
add column abilitiesone varchar(500), add column abilitiestwo varchar(500), add column abilitiesthree varchar(500),
add column removedability varchar(50),
add column maxrange int,
add column crawl varchar(20), add column walk varchar(20), add column jog varchar(20), add column run varchar(20), add column sprint varchar(20),
add column generalnotes varchar(500),
add column copper int, add column silver int, add column gold int, add column platinium int,
add column vitality int, add column sizemod int, add column vitalityroll int, add column vitalitydice varchar(10);

insert into cvcharactermain (userid, name, race, primarya, secondarya, level) values 
(1, 'Luke', 'Human', 'Theif', 'Fighter', 2), (1, 'Martin', 'Minotaur', 'Champion', 'Assassin', 20), (1, 'Riley', 'Changeling', 'Runegalder', 'Runegalder', 5)

create table cvex (
    id serial primary key,
    extolevel int,
    level int
)

insert into cvex (extolevel, level) values (50, 1), (170, 2), (350, 3), (590, 4), (890, 5), (1250, 6), (1670, 7), (2150, 8), (2690, 9), (3290, 10), (3950, 11), (4670, 12), (5450, 13), (6290, 14), (7190, 15), (8150, 16), (9170, 17), (10250, 18), (11390, 19);

create table cvstr (
    id serial primary key,
    score int,
    damage int,
    carry int,
    skill int,
    confrontation varchar(10)
)

insert into cvstr (score, damage, carry, skill, confrontation) values 
(1, -4, 1, 0, 'n/a'),
(2, -3, 2, 0, 'n/a'),
(3, -3, 3, 0, 'n/a'),
(4, -3, 4, 0, 'n/a'),
(5, -2, 5, 0, 'n/a'),
(6, -2, 6, 0, 'n/a'),
(7, -1, 7, 0, 'n/a'),
(8, -1, 8, 0, 'n/a'),
(9, -1, 9, 1, 'n/a'),
(10, 0, 9, 1, 'n/a'),
(11, 1, 9, 1, 'n/a'),
(12, 1, 10, 1, 'D4!'),
(13, 1, 11, 1, 'D4!'),
(14, 2, 12, 2, 'D6!'),
(15, 2, 13, 2, 'D6!'),
(16, 2, 14, 2, 'D8!'),
(17, 3, 15, 2, 'D8!'),
(18, 3, 16, 2, 'D10!'),
(19, 3, 17, 3, 'D12!'),
(20, 4, 18, 3, 'D20!')

create table cvdex (
    id serial primary key,
    score int,
    attack int,
    defense int,
    init int,
    skill int,
    confrontation varchar(10)
);

insert into cvdex (score, attack, defense, init, skill, confrontation) values
(1, -3, -3, 4, 0, 'n/a'),
(2, -2, -2, 3, 0, 'n/a'),
(3, -2, -2, 2, 0, 'n/a'),
(4, -2, -2, 2, 0, 'n/a'),
(5, -2, -2, 1, 0, 'n/a'),
(6, -1, -1, 1, 0, 'n/a'),
(7, -1, -1, 1, 0, 'n/a'),
(8, -1, -1, 0, 0, 'n/a'),
(9, -1, -1, 0, 1, 'n/a'),
(10, 0, 0, 0, 1, 'n/a'),
(11, 1, 1, 0, 1, 'n/a'),
(12, 1, 1, 0, 1, 'D4!'),
(13, 1, 1, 0, 1, 'D4!'),
(14, 1, 1, 0, 2, 'D6!'),
(15, 2, 2, 0, 2, 'D6!'),
(16, 2, 2, -1, 2, 'D8!'),
(17, 2, 2, -1, 2, 'D8!'),
(18, 2, 2, -1, 2, 'D10!'),
(19, 2, 3, -2, 3, 'D12!'),
(20, 3, 3, -3, 3, 'D20!')

create table cvcon (
    id serial primary key,
    score int,
    vitalitymin int,
    encumb int,
    skill int,
    confrontation varchar(10)
);

insert into cvcon (score, vitalitymin, encumb, skill, confrontation) values
(1, 1, 10, 0, 'n/a'),
(2, 1, 9, 0, 'n/a'),
(3, 1, 8, 0, 'n/a'),
(4, 1, 7, 0, 'n/a'),
(5, 1, 6, 0, 'n/a'),
(6, 2, 6, 0, 'n/a'),
(7, 2, 6, 0, 'n/a'),
(8, 2, 5, 0, 'n/a'),
(9, 2, 5, 1, 'n/a'),
(10, 3, 5, 1, 'n/a'),
(11, 3, 4, 1, 'n/a'),
(12, 4, 4, 1, 'D4!'),
(13, 5, 4, 1, 'D4!'),
(14, 6, 4, 2, 'D6!'),
(15, 7, 3, 2, 'D6!'),
(16, 8, 3, 2, 'D8!'),
(17, 9, 2, 2, 'D8!'),
(18, 10, 2, 2, 'D10!'),
(19, 11, 1, 3, 'D12!'),
(20, 12, 1, 3, 'D20!')

create table cvint (
    id serial primary key,
    score int,
    attack int,
    lvlcrp int,
    skill int,
    confrontation varchar(10)
);

insert into cvint (score, attack, lvlcrp, skill, confrontation) values
(1, -4, 15, 0, 'n/a'),
(2, -3, 16, 0, 'n/a'),
(3, -3, 17, 0, 'n/a'),
(4, -3, 18, 0, 'n/a'),
(5, -2, 18, 0, 'n/a'),
(6, -2, 19, 0, 'n/a'),
(7, -1, 19, 0, 'n/a'),
(8, -1, 20, 0, 'n/a'),
(9, -1, 20, 1, 'n/a'),
(10, 0, 20, 1, 'n/a'),
(11, 1, 20, 1, 'n/a'),
(12, 1, 20, 1, 'D4!'),
(13, 1, 21, 1, 'D4!'),
(14, 2, 21, 2, 'D6!'),
(15, 2, 22, 2, 'D6!'),
(16, 2, 22, 2, 'D8!'),
(17, 3, 23, 2, 'D8!'),
(18, 3, 23, 2, 'D10!'),
(19, 3, 24, 3, 'D12!'),
(20, 4, 25, 3, 'D20!')

create table cvwis (
    id serial primary key,
    score int,
    defense int,
    encumb int,
    init int,
    skill int,
    confrontation varchar(10)
);

insert into cvwis (score, defense, encumb, init, skill, confrontation) values
(1, -4, 7, 5, 0, 'n/a'),
(2, -3, 7, 4, 0, 'n/a'),
(3, -3, 7, 3, 0, 'n/a'),
(4, -3, 7, 3, 0, 'n/a'),
(5, -2, 6, 2, 0, 'n/a'),
(6, -2, 6, 2, 0, 'n/a'),
(7, -1, 6, 1, 0, 'n/a'),
(8, -1, 6, 1, 0, 'n/a'),
(9, -1, 6, 1, 1, 'n/a'),
(10, 0, 5, 0, 1, 'n/a'),
(11, 1, 5, 0, 1, 'n/a'),
(12, 1, 5, 0, 1, 'D4!'),
(13, 1, 5, 0, 1, 'D4!'),
(14, 2, 5, 0, 2, 'D6!'),
(15, 2, 4, -1, 2, 'D6!'),
(16, 2, 4, -1, 2, 'D8!'),
(17, 3, 4, -2, 2, 'D8!'),
(18, 3, 4, -2, 2, 'D10!'),
(19, 3, 3, -3, 3, 'D12!'),
(20, 4, 3, -4, 3, 'D20!')

create table cvcha (
    id serial primary key,
    score int,
    favor int,
    honorstart int,
    skill int,
    confrontation varchar(10)
);

insert into cvcha (score, favor, honorstart, skill, confrontation) values
(1, 1, 5, 0, 'n/a'),
(2, 1, 10, 0, 'n/a'),
(3, 1, 10, 0, 'n/a'),
(4, 1, 10, 0, 'n/a'),
(5, 1, 15, 0, 'n/a'),
(6, 1, 15, 0, 'n/a'),
(7, 2, 15, 0, 'n/a'),
(8, 2, 15, 0, 'n/a'),
(9, 2, 15, 1, 'n/a'),
(10, 2, 15, 1, 'n/a'),
(11, 3, 15, 1, 'n/a'),
(12, 3, 15, 1, 'D4!'),
(13, 4, 15, 1, 'D4!'),
(14, 4, 15, 2, 'D6!'),
(15, 5, 15, 2, 'D6!'),
(16, 6, 15, 2, 'D8!'),
(17, 7, 20, 2, 'D10!'),
(18, 8, 20, 2, 'D12!'),
(19, 8, 20, 3, 'D20!'),
(20, 9, 25, 3, 'D20!+d4!')

create table cvgoals (
    id serial primary key,
    characterId int,
    goal varchar(250)
)

create table cvdevotions (
    id serial primary key,
    characterid int,
    title varchar(50),
    value varchar(25)
);

create table cvflaws (
    id serial primary key,
    characterid int,
    title varchar(50),
    value varchar(25)
);

create table cvtraits (
    id serial primary key,
    characterid int,
    title varchar(50),
    value varchar(25)
);

create table cvreputation (
    id serial primary key,
    characterId int,
    value varchar(250)
);

create table cvgearone (
    id serial primary key,
    characterid int,
    title varchar(150),
    value varchar(50)
);
create table cvgeartwo (
    id serial primary key,
    characterid int,
    title varchar(150),
    value varchar(50)
);
create table cvgearthree (
    id serial primary key,
    characterid int,
    title varchar(150),
    value varchar(50)
);
create table cvgearfour (
    id serial primary key,
    characterid int,
    title varchar(150),
    value varchar(50)
);

create table weaponone (
    oneweaponid serial primary key,
    characterid int UNIQUE,
    onetrainattack int,
    onetrainparry int,
    onetrainrecovery int,
    onetraindamage int,
    onemiscattack int,
    onemiscparry int,
    onemiscrecovery int,
    onemiscdamage int,
    onemiscinit int,
    onename varchar(50),
    onebasedamage varchar(50),
    onebaserecovery int,
    onebaseparry int,
    onebasemeasure varchar(10),
    onetype varchar(1),
    onebonus varchar(100),
    onetraits VARCHAR(50),
    onesize varchar(1)
);