import aquila from '../assets/animals/Aquila.jpg'
import gorilla from '../assets/animals/Gorilla.jpg'
import lupo from '../assets/animals/Lupo.jpg'
import orso from '../assets/animals/Orso.jpg'
import pantera from '../assets/animals/Pantera.jpg'
import tigre from '../assets/animals/Tigre.jpg'


const animalsList = {
  animals:{
    'animal-1': {id: 'animal-1', label: 'Lupo', image: lupo },
    'animal-2': {id: 'animal-2', label: 'Orso', image: orso },
    'animal-3': {id: 'animal-3', label: 'Gorilla', image: gorilla },
    'animal-4': {id: 'animal-4', label: 'Aquila', image: aquila },
    'animal-5': {id: 'animal-5', label: 'Pantera', image: pantera },
    'animal-6': {id: 'animal-6', label: 'Tigre', image: tigre },
  },
  levels:{
    'level-0': {id: 'level-0', label: 'Livello 0', animals: {	'animal-1': { pv:	10	, def: 	1	}, 'animal-2': { pv: 	30	, def: 	3	}, 'animal-3': { pv: 	80	, def: 	5	}, 'animal-4': { pv: 	9	, def: 	1	}, 'animal-5': { pv: 	20	, def: 	2	}, 'animal-6': { pv: 	40	, def: 	3	}, }},
    'level-1': {id: 'level-1', label: 'Livello 1', animals: {	'animal-1': { pv:	18	, def: 	2	}, 'animal-2': { pv: 	45	, def: 	4	}, 'animal-3': { pv: 	110	, def: 	6	}, 'animal-4': { pv: 	23	, def: 	2	}, 'animal-5': { pv: 	35	, def: 	3	}, 'animal-6': { pv: 	65	, def: 	5	}, }},
    'level-2': {id: 'level-2', label: 'Livello 2', animals: {	'animal-1': { pv:	28	, def: 	3	}, 'animal-2': { pv: 	65	, def: 	5	}, 'animal-3': { pv: 	155	, def: 	8	}, 'animal-4': { pv: 	39	, def: 	3	}, 'animal-5': { pv: 	60	, def: 	5	}, 'animal-6': { pv: 	100	, def: 	7	}, }},
    'level-3': {id: 'level-3', label: 'Livello 3', animals: {	'animal-1': { pv:	40	, def: 	4	}, 'animal-2': { pv: 	90	, def: 	7	}, 'animal-3': { pv: 	215	, def: 	10	}, 'animal-4': { pv: 	57	, def: 	4	}, 'animal-5': { pv: 	95	, def: 	7	}, 'animal-6': { pv: 	150	, def: 	9	}, }},
    'level-4': {id: 'level-4', label: 'Livello 4', animals: {	'animal-1': { pv:	54	, def: 	5	}, 'animal-2': { pv: 	120	, def: 	9	}, 'animal-3': { pv: 	290	, def: 	13	}, 'animal-4': { pv: 	77	, def: 	6	}, 'animal-5': { pv: 	140	, def: 	9	}, 'animal-6': { pv: 	215	, def: 	12	}, }},
    'level-5': {id: 'level-5', label: 'Livello 5', animals: {	'animal-1': { pv:	70	, def: 	6	}, 'animal-2': { pv: 	155	, def: 	11	}, 'animal-3': { pv: 	380	, def: 	16	}, 'animal-4': { pv: 	100	, def: 	8	}, 'animal-5': { pv: 	195	, def: 	12	}, 'animal-6': { pv: 	295	, def: 	15	}, }},
    'level-6': {id: 'level-6', label: 'Livello 6', animals: {	'animal-1': { pv:	88	, def: 	7	}, 'animal-2': { pv: 	195	, def: 	14	}, 'animal-3': { pv: 	485	, def: 	20	}, 'animal-4': { pv: 	126	, def: 	10	}, 'animal-5': { pv: 	260	, def: 	15	}, 'animal-6': { pv: 	390	, def: 	19	}, }},
    'level-7': {id: 'level-7', label: 'Livello 7', animals: {	'animal-1': { pv:	108	, def: 	8	}, 'animal-2': { pv: 	240	, def: 	17	}, 'animal-3': { pv: 	605	, def: 	24	}, 'animal-4': { pv: 	156	, def: 	12	}, 'animal-5': { pv: 	335	, def: 	18	}, 'animal-6': { pv: 	500	, def: 	23	}, }},
    'level-8': {id: 'level-8', label: 'Livello 8', animals: {	'animal-1': { pv:	130	, def: 	10	}, 'animal-2': { pv: 	290	, def: 	20	}, 'animal-3': { pv: 	740	, def: 	29	}, 'animal-4': { pv: 	190	, def: 	14	}, 'animal-5': { pv: 	420	, def: 	22	}, 'animal-6': { pv: 	625	, def: 	28	}, }},
    'level-9': {id: 'level-9', label: 'Livello 9', animals: {	'animal-1': { pv:	154	, def: 	12	}, 'animal-2': { pv: 	345	, def: 	23	}, 'animal-3': { pv: 	890	, def: 	34	}, }},
    'level-10': {id: 'level-10', label: 'Livello 10', animals: {	'animal-1': { pv:	180	, def: 	14	}, 'animal-2': { pv: 	405	, def: 	27	}, 'animal-3': { pv: 	1055	, def: 	40	}, }},
    'level-11': {id: 'level-11', label: 'Livello 11', animals: {	'animal-1': { pv:	208	, def: 	16	}, 'animal-2': { pv: 	470	, def: 	31	}, 'animal-3': { pv: 	1235	, def: 	46	}, }},
    'level-12': {id: 'level-12', label: 'Livello 12', animals: {	'animal-1': { pv:	238	, def: 	18	}, 'animal-2': { pv: 	535	, def: 	35	}, 'animal-3': { pv: 	1450	, def: 	52	}, }},
  },
  animalsIds: ['animal-1','animal-2','animal-3','animal-4','animal-5','animal-6'],
  levelsIds: ['level-0',	'level-1',	'level-2',	'level-3',	'level-4',	'level-5',	'level-6',	'level-7',	'level-8',	'level-9',	'level-10',	'level-11',	'level-12',]
}
export default animalsList;
