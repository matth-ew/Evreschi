import arciere from "../assets/heroes/arciere.png";
import druido from "../assets/heroes/druido.jpg";
import ranger from "../assets/heroes/ranger.jpg";
import berserker from "../assets/heroes/berserker.jpg";
import cavaliere from "../assets/heroes/cavaliere.jpg";
import tanker from "../assets/heroes/tanker.jpg";
import sciamana from "../assets/heroes/sciamana.jpg";
import mistico from "../assets/heroes/mistico.jpg";
import negromante from "../assets/heroes/negromante.jpg";

import arciere_testa from "../assets/heroes/arciere_testa.png";
import druido_testa from "../assets/heroes/druido_testa.jpg";
import ranger_testa from "../assets/heroes/ranger_testa.jpg";
import berserker_testa from "../assets/heroes/berserker_testa.jpg";
import cavaliere_testa from "../assets/heroes/cavaliere_testa.jpg";
import tanker_testa from "../assets/heroes/tanker_testa.jpg";
import sciamana_testa from "../assets/heroes/sciamana_testa.jpg";
import mistico_testa from "../assets/heroes/mistico_testa.jpg";
import negromante_testa from "../assets/heroes/negromante_testa.jpg";

const heroesList = {
  heroes: {
    "hero-1": { id: "hero-1", class: 'silvani', subclass: "Arciere", label: "Filottete", fp: 4, gender: 'M', image: arciere, head_image: arciere_testa, description: 'Noto ladro della zona, scaltro e senza veri amici. Fin dall’infanzia vive di sotterfugi e piccoli brogli, raggiunta l’età adulta abbandona la città con il suo fedele arco per girare il mondo e dimostrare le sue innate qualità.' },
    "hero-2": { id: "hero-2", class: 'silvani', subclass: "Arciere", label: "Kaizake", fp: 4, gender: 'M', image: arciere, head_image: arciere_testa, description: 'Un umile figlio di straniero, riservato ma onesto. Passa l’infanzia ad aiutare la sua famiglia che vive di coltivazioni ed allevamenti. Durante le lunghe attese si esercita con un rudimentale arco derivato da rami di quercia, acquisendo rapidità e precisione fuori dalla norma.' },
    "hero-3": { id: "hero-3", class: 'silvani', subclass: "Druida", label: "Brithem", fp: 3, gender: 'F', image: druido, head_image: druido_testa, description: 'Donna dal carattere forte ed austero, famosa nel regno perché ovunque passa causa una ricrescita anomala della vegetazione. Il suo unico vero amore è la natura, fin da bambina riesce a parlare con gli spiriti delle foreste ed ottenere la loro benevolenza.' },
    "hero-4": { id: "hero-4", class: 'silvani', subclass: "Druida", label: "Scelaige", fp: 4, gender: 'F', image: druido, head_image: druido_testa, description: 'Saggia abitante della foresta con una spiccata passione per le arti curative. All’età di 13 anni abbandona la zona civilizzata del regno per assecondare il suo sogno di curare e difendere la flora delle foreste di tutto il paese. Passa le giornate a parlare con alberi, piante e i loro spiriti.' },
    "hero-5": { id: "hero-5", class: 'silvani', subclass: "Ranger", label: "Zoroark", fp: 3, gender: 'M', image: ranger, head_image: ranger_testa, description: 'Un reietto, dal carattere riservato e cupo. Si circonda di bestie di ogni tipo per dimostrare le sue abilità di addestratore. Non si fa scrupolo ad usare gli animali per i suoi scopi e quando invecchiano troppo per essergli utili li lascia liberi andare.' },
    "hero-6": { id: "hero-6", class: 'silvani', subclass: "Ranger", label: "Fauno", fp: 4, gender: 'M', image: ranger, head_image: ranger_testa, description: 'Figlio della foresta, generoso e pieno di vita. Il suo rapporto con gli animali con cui cresce è armonioso, le belve feroci gli obbediscono perché lo ritengono un membro del branco e tra di essi esiste un rapporto di mutua fiducia.' },
    "hero-7": { id: "hero-7", class: 'guerrieri', subclass: "Berserker", label: "Eric", fp: 4, gender: 'M', image: berserker, head_image: berserker_testa, description: 'Discendente da numerose generazioni di combattenti, arrogante e sleale. Il suo addestramento quotidiano lo ha premiato con una capacità di gestire la rabbia e di scatenarla nel momento del bisogno. Molto geloso delle proprie armi ed armature, le porta con sé ovunque vada all’interno di un grosso baule di legno.' },
    "hero-8": { id: "hero-8", class: 'guerrieri', subclass: "Berserker", label: "Vendith", fp: 5, gender: 'M', image: berserker, head_image: berserker_testa, description: 'Un tipo solitario, abituato a cavarsela da sé. Abbandonato da piccolo a causa del suo turpe aspetto sviluppa un odio nei confronti di chiunque gli si avvicini. Non si fida che di se stesso, non ama dividere emozioni e glorie con nessuno, condannandosi ad una vita solitaria.' },
    "hero-9": { id: "hero-9", class: 'guerrieri', subclass: "Cavaliere", label: "Erasmo", fp: 4, gender: 'M', image: cavaliere, head_image: cavaliere_testa, description: 'Tipo fascinoso ma a molti sconosciuto, si dice dorma sul suo destriero. Ama farsi seguire da diversi scudieri ai quali insegna a combattere; una volta formato un gruppo nutrito parte per spedizioni sempre più avventurose per il solo gusto di mettersi alla prova.' },
    "hero-10": { id: "hero-10", class: 'guerrieri', subclass: "Cavaliere", label: "Taras", fp: 4, gender: 'M', image: cavaliere, head_image: cavaliere_testa, description: 'Un personaggio famoso nel regno per la sua lealtà e senso dell’onore. Inizialmente votato agli studi per diventare Curatore viene spinto dalla famiglia ad intraprendere la carriera da addestratore; le sue pregresse conoscenze gli consentono di individuare i punti deboli del bersaglio in pochi attimi.' },
    "hero-11": { id: "hero-11", class: 'guerrieri', subclass: "Tanker", label: "Volstagg", fp: 5, gender: 'M', image: tanker, head_image: tanker_testa, description: 'Disconosciuto dalla famiglia perché figlio illegittimo, emarginato e scontroso. Di sua spontanea volontà segue durissimi allenamenti per dimenticare il suo destino, questo aumenta la sua soglia di sopportazione del dolore fino a renderlo, a tratti, immune ad esso.' },
    "hero-12": { id: "hero-12", class: 'guerrieri', subclass: "Tanker", label: "Ynglingar", fp: 5, gender: 'M', image: tanker, head_image: tanker_testa, description: 'Di nobili origini, addestrato dai migliori combattenti del regno. Educato ad offrire sempre un aiuto ai più bisognosi, riesce ad essere utile anche nelle situazioni più difficili. Ama circondarsi di amici leali, condivide con loro ricchezze e conoscenze per vivere incredibili avventure.' },
    "hero-13": { id: "hero-13", class: 'maghi', subclass: "Sciamana", label: "Oren", fp: 3, gender: 'F', image: sciamana, head_image: sciamana_testa, description: 'Donna generosa ed informale, proveniente dalle terre orientali. È una sciamana di un villaggio remoto di cui nessuno ha mai sentito parlare. Si dice che in realtà sia una viaggiatrice temporale e che le sue abilità uniche derivino da studi che essa stessa ha completato molti secoli nel futuro.' },
    "hero-14": { id: "hero-14", class: 'maghi', subclass: "Sciamana", label: "Aster", fp: 4, gender: 'F', image: sciamana, head_image: sciamana_testa, description: 'Irascibile e scontrosa donna dai tratti asiatici. La sua vita non le riserva molte gioie, ripudiata dal marito perché incapace di dar luce ad un erede sceglie di fuggire dal regno e si dedica alle arti oscure. Il marito morirà in circostanze assai strane qualche anno dopo la loro separazione.' },
    "hero-15": { id: "hero-15", class: 'maghi', subclass: "Mistica", label: "Soana", fp: 4, gender: 'F', image: mistico, head_image: mistico_testa, description: 'Una donna avvolta dal mistero, introversa e silenziosa. Le storie raccontano del suo passato caratterizzato dallo studio della magia nera, che abbia accidentalmente ucciso la sua sorella gemella facendone uso e che da allora non si dia pace. Impara tutto quello che i saggi conoscono sulle magie curative e vaga per il regno cercando una redenzione che non troverà mai.' },
    "hero-16": { id: "hero-16", class: 'maghi', subclass: "Mistica", label: "Dana", fp: 3, gender: 'F', image: mistico, head_image: mistico_testa, description: 'Affascinante donna dal carattere timido e generoso. Viene educata dalla sua famiglia all’altruismo, ad aiutare tutti quelli che ne hanno bisogno. Durante la gioventù segue intensi corsi di magia curativa ed esercita le sue abilità su persone malate e senza speranza.' },
    "hero-17": { id: "hero-17", class: 'maghi', subclass: "Negromante", label: "Exumir", fp: 3, gender: 'F', image: negromante, head_image: negromante_testa, description: 'Spietata figura dall’aspetto terrificante. Allontanatasi dal villaggio di appartenenza in cerca di cibo finisce per visitare un antro maledetto dove la sua anima viene rapita da un essere maligno. Riceve il dono di poter sottrarre le anime alle creature e passa la sua giornata ad allenarlo per soddisfare la sua sete di potere.' },
    "hero-18": { id: "hero-18", class: 'maghi', subclass: "Negromante", label: "Xisetur", fp: 4, gender: 'F', image: negromante, head_image: negromante_testa, description: 'Una donna inquietante, dal riso isterico e senza età. Si dice discenda dal regno dei morti, non ha mai visto la luce del sole. Il suo lunghissimo vagare solitario la costringe a trovare compagnia tra le ombre, impara quindi ad invocare spiriti illusori con i quali terrorizza i malcapitati che la incrociano.' }
  },
  heroesIds: [
    "hero-1",
    "hero-2",
    "hero-3",
    "hero-4",
    "hero-5",
    "hero-6",
    "hero-7",
    "hero-8",
    "hero-9",
    "hero-10",
    "hero-11",
    "hero-12",
    "hero-13",
    "hero-14",
    "hero-15",
    "hero-16",
    "hero-17",
    "hero-18",
  ]
};
export default heroesList;
