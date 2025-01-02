const statTables = {
    strTable: {
        1: { damage: -4, carry: 1, skill: -3 },
        2: { damage: -3, carry: 2, skill: -2 },
        3: { damage: -3, carry: 3, skill: -2 },
        4: { damage: -3, carry: 4, skill: -1 },
        5: { damage: -2, carry: 5, skill: -1 },
        6: { damage: -2, carry: 6, skill: -1 },
        7: { damage: -1, carry: 7, skill: -1 },
        8: { damage: -1, carry: 8, skill: 0 },
        9: { damage: -1, carry: 9, skill: 0 },
        10: { damage: 0, carry: 9, skill: 0 },
        11: { damage: 1, carry: 9, skill: 0 },
        12: { damage: 1, carry: 11, skill: 0 },
        13: { damage: 1, carry: 13, skill: 1 },
        14: { damage: 2, carry: 15, skill: 1 },
        15: { damage: 2, carry: 17, skill: 1 },
        16: { damage: 2, carry: 19, skill: 1 },
        17: { damage: 3, carry: 21, skill: 1 },
        18: { damage: 3, carry: 24, skill: 2 },
        19: { damage: 3, carry: 27, skill: 2 },
        20: { damage: 4, carry: 36, skill: 3 },
        21: { damage: 4, carry: 39, skill: 3 },
        22: { damage: 4, carry: 42, skill: 3 },
        23: { damage: 4, carry: 45, skill: 3 },
    },
    dexTable: {
        1: { attack: -3, defense: -3, init: 4, skill: -3 },
        2: { attack: -2, defense: -2, init: 3, skill: -2 },
        3: { attack: -2, defense: -2, init: 2, skill: -2 },
        4: { attack: -2, defense: -2, init: 2, skill: -1 },
        5: { attack: -2, defense: -2, init: 1, skill: -1 },
        6: { attack: -1, defense: -1, init: 1, skill: -1 },
        7: { attack: -1, defense: -1, init: 1, skill: -1 },
        8: { attack: -1, defense: -1, init: 0, skill: 0 },
        9: { attack: -1, defense: -1, init: 0, skill: 0 },
        10: { attack: 0, defense: 0, init: 0, skill: 0 },
        11: { attack: 1, defense: 1, init: 0, skill: 0 },
        12: { attack: 1, defense: 1, init: 0, skill: 0 },
        13: { attack: 1, defense: 1, init: 0, skill: 1 },
        14: { attack: 1, defense: 1, init: 0, skill: 1 },
        15: { attack: 2, defense: 2, init: 0, skill: 1 },
        16: { attack: 2, defense: 2, init: -1, skill: 1 },
        17: { attack: 2, defense: 2, init: -1, skill: 1 },
        18: { attack: 2, defense: 2, init: -1, skill: 2 },
        19: { attack: 2, defense: 3, init: -2, skill: 2 },
        20: { attack: 3, defense: 3, init: -3, skill: 3 },
        21: { attack: 3, defense: 3, init: -3, skill: 3 },
        22: { attack: 3, defense: 3, init: -3, skill: 3 },
        23: { attack: 3, defense: 3, init: -3, skill: 3 },
    },
    conTable: {
        1: { vitalitymin: 1, encumb: 10, skill: -3 },
        2: { vitalitymin: 1, encumb: 9, skill: -2 },
        3: { vitalitymin: 1, encumb: 8, skill: -2 },
        4: { vitalitymin: 1, encumb: 7, skill: -1 },
        5: { vitalitymin: 1, encumb: 6, skill: -1 },
        6: { vitalitymin: 2, encumb: 6, skill: -1 },
        7: { vitalitymin: 2, encumb: 6, skill: -1 },
        8: { vitalitymin: 2, encumb: 5, skill: 0 },
        9: { vitalitymin: 2, encumb: 5, skill: 0 },
        10: { vitalitymin: 3, encumb: 5, skill: 0 },
        11: { vitalitymin: 3, encumb: 4, skill: 0 },
        12: { vitalitymin: 4, encumb: 4, skill: 0 },
        13: { vitalitymin: 5, encumb: 4, skill: 1 },
        14: { vitalitymin: 6, encumb: 4, skill: 1 },
        15: { vitalitymin: 7, encumb: 3, skill: 1 },
        16: { vitalitymin: 8, encumb: 3, skill: 1 },
        17: { vitalitymin: 9, encumb: 2, skill: 1 },
        18: { vitalitymin: 10, encumb: 2, skill: 2 },
        19: { vitalitymin: 11, encumb: 1, skill: 2 },
        20: { vitalitymin: 12, encumb: 1, skill: 3 }
    },
    intTable: {
        1: { attack: -4, lvlcrp: 15, skill: -3 },
        2: { attack: -3, lvlcrp: 16, skill: -2 },
        3: { attack: -3, lvlcrp: 17, skill: -2 },
        4: { attack: -3, lvlcrp: 18, skill: -1 },
        5: { attack: -2, lvlcrp: 18, skill: -1 },
        6: { attack: -2, lvlcrp: 19, skill: -1 },
        7: { attack: -1, lvlcrp: 19, skill: -1 },
        8: { attack: -1, lvlcrp: 20, skill: 0 },
        9: { attack: -1, lvlcrp: 20, skill: 0 },
        10: { attack: 0, lvlcrp: 20, skill: 0 },
        11: { attack: 1, lvlcrp: 20, skill: 0 },
        12: { attack: 1, lvlcrp: 20, skill: 0 },
        13: { attack: 1, lvlcrp: 21, skill: 1 },
        14: { attack: 2, lvlcrp: 21, skill: 1 },
        15: { attack: 2, lvlcrp: 22, skill: 1 },
        16: { attack: 2, lvlcrp: 22, skill: 1 },
        17: { attack: 3, lvlcrp: 23, skill: 1 },
        18: { attack: 3, lvlcrp: 23, skill: 2 },
        19: { attack: 3, lvlcrp: 24, skill: 2 },
        20: { attack: 4, lvlcrp: 25, skill: 3 }
    },
    wisTable: {
        1: { defense: -4, encumb: 7, init: 5, skill: -3 },
        2: { defense: -3, encumb: 7, init: 4, skill: -2 },
        3: { defense: -3, encumb: 7, init: 3, skill: -2 },
        4: { defense: -3, encumb: 7, init: 3, skill: -1 },
        5: { defense: -2, encumb: 6, init: 2, skill: -1 },
        6: { defense: -2, encumb: 6, init: 2, skill: -1 },
        7: { defense: -1, encumb: 6, init: 1, skill: -1 },
        8: { defense: -1, encumb: 6, init: 1, skill: 0 },
        9: { defense: -1, encumb: 6, init: 1, skill: 0 },
        10: { defense: 0, encumb: 5, init: 0, skill: 0 },
        11: { defense: 1, encumb: 5, init: 0, skill: 0 },
        12: { defense: 1, encumb: 5, init: 0, skill: 0 },
        13: { defense: 1, encumb: 5, init: 0, skill: 1 },
        14: { defense: 2, encumb: 5, init: 0, skill: 1 },
        15: { defense: 2, encumb: 4, init: -1, skill: 2 },
        16: { defense: 2, encumb: 4, init: -1, skill: 1 },
        17: { defense: 3, encumb: 4, init: -2, skill: 1 },
        18: { defense: 3, encumb: 4, init: -2, skill: 2 },
        19: { defense: 3, encumb: 3, init: -3, skill: 2 },
        20: { defense: 4, encumb: 3, init: -4, skill: 3 }
    },
    chaTable: {
        1: { favor: 1, honorstart: 5, skill: -3 },
        2: { favor: 1, honorstart: 10, skill: -2 },
        3: { favor: 1, honorstart: 10, skill: -2 },
        4: { favor: 1, honorstart: 10, skill: -1 },
        5: { favor: 1, honorstart: 15, skill: -1 },
        6: { favor: 1, honorstart: 15, skill: -1 },
        7: { favor: 2, honorstart: 15, skill: -1 },
        8: { favor: 2, honorstart: 15, skill: 0 },
        9: { favor: 2, honorstart: 15, skill: 0 },
        10: { favor: 2, honorstart: 15, skill: 0 },
        11: { favor: 3, honorstart: 15, skill: 0 },
        12: { favor: 3, honorstart: 15, skill: 0 },
        13: { favor: 4, honorstart: 15, skill: 1 },
        14: { favor: 4, honorstart: 15, skill: 1 },
        15: { favor: 5, honorstart: 15, skill: 1 },
        16: { favor: 6, honorstart: 15, skill: 1 },
        17: { favor: 7, honorstart: 20, skill: 1 },
        18: { favor: 8, honorstart: 20, skill: 2 },
        19: { favor: 8, honorstart: 20, skill: 2 },
        20: { favor: 9, honorstart: 25, skill: 3 }
    }
}

export default statTables