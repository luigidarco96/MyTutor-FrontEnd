import React, { Component, Fragment } from "react";
import NoticeInformation from "../components/NoticeInformation/NoticeInformation";
import Upload from "../components/UploadDocuments/Upload";
import notice from "../static/notice"
import { Col, Row, Grid } from 'react-bootstrap';
import CustomButton from '../components/CustomButton/CustomButton';
import Upload from '../components/UploadDocuments/Upload';
import TextField from '../components/TextField/TextField';
import Card from '../components/Card/Card.jsx';

// [
//   'Prot. n. 0274751',
//   null,
//   "AVVISO DI SELEZIONE PER TITOLI PER L'ATTRIBUZIONE DI No. 8 ASSEGNI PER LO SVOLGIMENTO DI ATTIVITÀ DI SUPPORTO ALLA DIDATTICA PER STUDENTI DIVERSAMENTE ABILI.",
//   "È indetta, per l'anno accademico 2019/2020, una selezione, per titoli e colloquio, per l'assegnazione di complessivi n. 8 (otto) assegni di cui n. 2 (due) da 26 ore, n. 2 (due) da 20 ore, n. 2 (due) da 18 ore n. 2 (due) da 10 ore, per lo svolgimento di attività di supporto alla didattica per studenti diversamente abili e con DSA. In particolare il destinatario dell'incarico dovrà offrire tutoraggio specializzato relativamente agli insegnamenti del corso di Laurea in Informatica (triennale). Gli assegni prevedono un compenso lordo percipiente orario di € 25,00 (euro venticinque/00) pari ad un compenso lordo percipiente complessivo di € 650,00 (euro seicentocinquanta/00) per gli assegni da 26 ore, € 500,00 (euro cinquecento/00) per gli assegni da 20 ore, € 450,00 (euro quattrocentocinquanta/00) per gli assegni da 18 ore e € 250,00 (euro duecentocinquanta/00) per gli assegni da 10 ore",
//   "Sono ammessi alla selezione gli studenti regolarmente iscritti al corso di Laurea Magistrale in Informatica (LM18) dell'Università degli Studi di Salerno.",
//   "Le domande di partecipazione alla selezione, redatte in carta libera secondo il fac-simile allegato, dovranno essere indirizzate al Direttore del Dipartimento di Informatica ed essere presentate, esclusivamente a mano all'Ufficio Didattica, Organi Collegiali, Alta Formazione, Carriere del Dipartimento di Informatica - via Giovanni Paolo Il 132-84084 Fisciano-piano IV-stecca VII- dal lunedì al venerdì dalle ore 09:30 alle ore 13:00, entro il termine perentorio del 25/10/2019 ore 13:00. \nAlla domanda dovrà essere allegata la seguente documentazione: \na) dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa all'avvenuto \nconseguimento del diploma di laurea di primo livello, alla votazione finale riportata ed alla data \ndel suo conseguimento; b) dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa all'iscrizione \nal Corso di Laurea Magistrale c) dichiarazione sostitutiva di certificazione, resa ai sensi del D.P.R. 445/2000, relativa ad altri titoli \nche si ritengono utili ai fini della selezione; d) copia di un valido documento di riconoscimento. \n",
//   "Il conferimento degli assegni per l'attività di tutorato avverrà sulla base di una selezione, per titoli e colloquio, operata da una Commissione giudicatrice, composta da 3 componenti nominati dal Direttore del Dipartimento di informatica. La Commissione giudicatrice prenderà in esame esclusivamente le domande dei candidati che siano in possesso dei requisiti di cui all'Art. 2. I colloqui avranno luogo il giorno 30/10/2019 alle ore 16:15 presso la Sala Riunioni del Dipartimento di Informatica dell'Università degli Studi di Salerno (Stanza 95 - stecca 7 - IV piano). La Commissione giudicatrice si riserva, inoltre, la possibilità di stabilire ulteriori date che verranno pubblicate sul sito web di Ateneo. Il presente bando, pertanto, è da considerarsi a tutti gli effetti quale convocazione. ",
//   "Per l'affidamento delle attività di cui al presente bando sarà comunicata la convocazione per la stipula del contratto di collaborazione. Colui che non si presenterà nei giorni utili indicati sarà automaticamente considerato rinunciatario. I candidati selezionati dovranno dichiarare la propria disponibilità per tutto il periodo previsto per l'attività di tutorato e di essere liberi da impegni o di non incorrere in incompatibilità che possano impedire una fattiva presenza e reperibilità all'interno della struttura universitaria. L'attività dei tutor sarà svolta sotto il coordinamento del Delegato alla Disabilità del Dipartimento di Informatica. L'attività del tutor dovrà terminare non oltre il 31 ottobre 2020. Gli orari di svolgimento delle attività di tutorato dovranno essere concordati con il Delegato alla Disabilità del Dipartimento di Informatica, al fine di garantire agli studenti l'effettiva fruibilità del servizio. Il compenso previsto per ciascun assegno verrà corrisposto al termine dell'incarico previa valutazione positiva dell'operato del tutor da parte del Delegato alla Disabilità del Dipartimento di Informatica. Entro 7 giorni dal termine dell'incarico il tutor è tenuto a compilare un registro delle attività svolte da restituire all'Ufficio Didattica 1, Organi collegiali, Alta formazione, Carriere CDS/DI del Dipartimento accompagnato da una relazione, controfirmata dal Delegato alla Disabilità del Dipartimento di Informatica.",
//   "L'assegno è compatibile con la fruizione di borse di studio; è incompatibile, a pena di decadenza, con le attività di collaborazione a tempo parziale (150 ore), con la partecipazione a Programmi comunitari di mobilità all'estero o soggiorni di studio all'estero. Gli studenti che, nel periodo di svolgimento delle attività in oggetto, dovessero conseguire il Diploma di Laurea Magistrale decadono dall'incarico.",
//   "L'incarico cessa nei seguenti casi: rinuncia del collaboratore; irrogazione di un provvedimento disciplinare: compimento di atti che, a insindacabile giudizio del Direttore, su segnalazione del Delegato alla Disabilità del Dipartimento di Informatica o degli utenti, risultino incompatibili con le finalità della \ncollaborazione; - astensione ingiustificata dalla collaborazione; - conseguimento titolo di laurea magistrale In caso di cessazione, al tutor sono corrisposte solo le prestazioni effettivamente svolte come risultanti dal registro delle attività. Il Direttore del Dipartimento di Informatica potrà sostituire il tutor attingendo dalla graduatoria di merito.",
//   "Il tutorato non configura in alcun modo un rapporto di lavoro subordinato e non comporta l'integrazione dei collaboratori nell'organizzazione del lavoro dei servizi amministrativi e didattici dell'Ateneo, né dà luogo ad alcuna valutazione ai fini dei pubblici concorsi. Su richiesta dell'interessato, alla fine del periodo di tutorato, sarà rilasciato dall'Ufficio Didattica, Organi Collegiali, Alta Formazione, Carriere del Dipartimento di Informatica dell'Università degli Studi di Salerno una certificazione attestante l'attività svolta. ",
//   "Eventuali borse non attribuite potranno essere utilizzate dal Dipartimento di Informatica su indicazione della Commissione giudicatrice, assegnando ulteriori assegni sempre seguendo le singole graduatorie distribuendo le ore previste tra le borse assegnate. In tal caso verrà rimodulato il numero di ore e l'importo economico (in misura di 25,00 euro/ora) di ciascuna delle borse assegnate. ",
//   'Il responsabile del procedimento amministrativo di cui al presente bando, ai sensi degli artt. 4, 5 e 6 della legge 7 agosto 1990, n. 241 e s.m.i., è la dott.ssa Carmela De Rosa - Capo Ufficio didattica, organi collegiali, alta formazione, carriere - CdS/DI. ',
//   '3700',
//   'Tutorato',
//   '2019-12-31 23:59:59'
// ];

class DetailsNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          noticeJSON: {}
        };
    }
    

    componentDidMount() {
        //Fetch file notice.json from Back-end github project
        fetch("https://raw.githubusercontent.com/fabiolademarco/MyTutorBack-End/master/static/notice.json")
        //Transform response text in json object
        .then(blob => blob.json())
        //set the json object in the state
        .then((result) => {
                this.setState({
                    isLoaded: true,
                    noticeJSON: result
                });
            },(error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            }
        )
    }

    render() {
        const{noticeJSON, isLoaded} = this.state;

        //check if the fetch of the JSON file it was successfull
        if(isLoaded) {
            //fill the notice object with the field of the JSON object
            notice["director"] = noticeJSON.director
            notice["decrees"] = noticeJSON.decrees
            notice["ratification"] =  noticeJSON.ratification
            notice["personal_data_treatment"] = noticeJSON.personal_data_treatment

            //recovery of the articles form JSON object
            var articlesJSON = this.state.noticeJSON;
            for (var obj in articlesJSON) {
                //check if the entry of JSON object is an article
                if(obj.startsWith("art")){
                    //check if the article is not the 13th
                    if(!obj.endsWith("13")) {
                        //add the attribute content at the article
                        articlesJSON[obj]["content"] = "Contenuto dell'articolo"
                    }
                    //add the articles in the notice
                    notice.articles.push(articlesJSON[obj])
                }
            }
            console.log(notice)
        }
        return(
            <Fragment>
                <NoticeInformation notice={notice}/>
                <Upload />
            </Fragment>
        );
    }
}

export default DetailsNotice;