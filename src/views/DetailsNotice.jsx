import React, { Component } from 'react';
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
  componentWillMount() {
    // TODO
    // Effettuare la fetch

    this.setState({
      notice: {
        protocol: 'Prot. n. 0274751',
        description:
          "AVVISO DI SELEZIONE PER TITOLI PER L'ATTRIBUZIONE DI No. 2 ASSEGNI PER LO SVOLGIMENTO DI ATTIVITÀ DIDATTICHE INTEGRATIVE PER L'INSEGNAMENTI DI BASI DI DATI DEL CORSI DI LAUREA IN INFORMATICA PRESSO IL DIPARTIMENTO DI INFORMATICA.",
        subject:
          "É indetta, nell'ambito del progetto Help Teaching Azione Laureati nei Termini, una selezione per titoli, per l'assegnazione di n. 2 (due) assegni, per lo svolgimento di attività didattiche integrative per l'insegnamento Basi di Dati a favore degli Studenti dei Corsi di Studio in Informatica presso il Dipartimento di Informatica, come di seguito indicato: ",
        admissionRequirements:
          "Sono ammessi a partecipare alla selezione i soggetti in possesso dei requisiti previsti dall'art. 1 del presente bando relativi all'insegnamento Basi di Dati. I requisiti prescritti devono essere posseduti alla data di presentazione della domanda di partecipazione. Non possono partecipare alle valutazioni comparative, a pena di esclusione: a) soggetti appartenenti al ruolo del personale docente e ricercatore delle Università Italiane; b) coloro che siano cessati volontariamente dal servizio presso enti pubblici o privati con diritto alla pensione anticipata di anzianità che abbiano avuto con l'Università degli Studi di Salerno rapporti di lavoro d'impiego nei cinque anni precedenti a quello di cessazione (Legge 23.12.1994 n 724, art. 25); c) coloro che siano stati destituiti dall'impiego presso una Pubblica Amministrazione per persistente insufficiente rendimento; d) coloro che siano stati dichiarati decaduti dall'impiego statale, ai sensi dell'art. 127, lettera d), del D.P.R. 10.01.1957, n 3; e) coloro che abbiano subito condanna penale, anche a pena accessoria, che siano interessate da misura di prevenzione, che in base alla normativa vigente precludano l'istaurazione di un rapporto di lavoro con la Pubblica Amministrazione;",
        assessableTitles:
          "Fermi i requisiti indicati all'art. 1 e 2 del presente bando, costituiscono ulteriori titoli valutabili ai fini della selezione, quelli sottoelencati attinenti al settore scientifico- disciplinare relativo all'incarico, con esclusione dei titoli richiesti come requisito per l'accesso: a) attività didattica e scientifica già svolto in ambito accademico; b) titoli di studio e professionali; c) iscrizione al Corso di Dottorato in Informatica d) eventuali pubblicazioni. Costituiscono titoli preferenziali: il possesso del titolo di dottore di ricerca, il possesso dell'abilitazione scientifica nazionale, ovvero il possesso di titoli equivalenti conseguiti all'estero.",
        howToSubmitApplications:
          "La domanda di partecipazione deve essere predisposta utilizzando esclusivamente il modello allegato alla presente selezione. La domanda di partecipazione deve essere presentata entro e non oltre il 7 novembre 2019, secondo una delle seguenti modalità: CONSEGNA A MANO Dal lunedì al venerdì, dalle ore 10.00 alle ore 13.00, presso l'Ufficio Didattica 1, Organi collegiali, Alta formazione, Carriere CDS/DI del Dipartimento di Informatica in Via Giovanni Paolo 11, 132 - 84084 Fisciano - Salerno, edificio F, stecca 7, piano 4 A MEZZO POSTA ELETTRONICA CERTIFICATA, inviando, dal proprio indirizzo PEC personale una e-mail all'indirizzo ammicent@pec.unisa.it contenente la domanda di partecipazione debitamente compilata e ogni altro documento richiesto, in formato pdf, unitamente alla scansione di un documento di identità in corso di validità, entro il termine di scadenza. La mail dovrà contenere nel campo Oggetto la seguente dicitura: Domanda di partecipazione al Bando Help Teaching – DI - Dipartimento di Informatica dovrà essere indicato il Dipartimento che ha richiesto l'Avviso di Selezione. Ai sensi dell'art.39 del DPR 28 dicembre 2000, n 445, non è richiesta l'autenticazione della sottoscrizione della domanda. In caso di invio tramite Posta Elettronica Certificata personale (PEC), l'obbligo di sottoscrizione autografa si intende assolto allegando alla domanda, debitamente compilata, la copia in formato PDF di un documento di identità in corso di validità. I candidati che intendono partecipare a più selezioni, possono presentare un'unica istanza, completa di allegati, indicando le attività per le quali intendono concorrere dovrà indicare nella domanda il codice degli assegni per i quali intende partecipare. Alla domanda, dovrà essere allegata la seguente documentazione: a. Fotocopia di un documento di riconoscimento in corso di validità; b. Curriculum dell'attività scientifica, didattica e professionale; C. Titoli di studio e professionali; d. Documenti attestanti l'attività di ricerca e l'esperienza didattica; e. Dichiarazione sostitutiva dell'atto di notorietà, ai sensi dell'art.47 del DPR n. 445/2000, con la quale si dichiara la conformità all'originale dei titoli e documenti prodotti .I titoli che il candidato intende sottoporre al giudizio della commissione ai fini della valutazione devono essere posseduti alla data di presentazione della domanda di partecipazione.",
        selectionBoard:
          "Il conferimento degli assegni per l'attività di tutorato avverrà sulla base di una selezione, per titoli e colloquio, operata da una Commissione giudicatrice, composta da 3 componenti nominati dal Direttore. La Commissione giudicatrice prenderà in esame esclusivamente le domande dei candidati che siano in possesso dei requisiti di cui all'art. 2. Il colloquio avrà luogo il giorno 31/10/2019 alle ore 16,00 presso la Sala Riunioni del Dipartimento di Informatica dell'Università degli Studi di Salerno (Stanza 95 - stecca 7 - IV piano). La Commissione giudicatrice si riserva, inoltre, la possibilità di stabilire ulteriori date che verranno pubblicate sul sito web di Ateneo.",
        acceptance:
          "Il Consiglio di Dipartimento procede alla valutazione comparativa delle domande presentate nominando un'apposita Commissione composta da tre membri. Preliminarmente, la Commissione nomina al suo interno il presidente e il segretario e, presa visione dell'elenco dei partecipanti alla selezione, sottoscrive una dichiarazione di non sussistenza di situazioni di incompatibilità tra i propri membri ed i candidati. La Commissione, nel rispetto di quanto indicato dall'art. 6 del regolamento, predetermina i criteri e i parametri ai quali intende attenersi nella valutazione dei titoli richiesti dal bando. La Commissione attribuisce ai titoli un punteggio massimo di 30 punti.",
        incompatibility:
          "Sono esclusi dall'attività: \n- coloro che siano già in possesso di una laurea di pari livello (seconda laurea); - i beneficiari, per lo stesso anno accademico, di assegni per le attività di collaborazione a tempo parziale (150 ore), attivate dall'Ateneo. Il tutorato non configura in alcun modo un rapporto di lavoro subordinato e non comporta l'integrazione dei collaboratori nell'organizzazione del lavoro dei servizi amministrativi e didattici dell'Ateneo, né dà luogo ad alcuna valutazione ai fini dei pubblici concorsi.",
        terminationOfTheAssignment:
          "Espletate le procedure, e salvo contezioso in atto, i candidati potranno procedere al ritiro dei titoli presso la struttura Dipartimentale, decorsi 90 giorni dall'approvazione degli atti ed entro i successivi 3 mesi. Decorso tale ultimo termine, il Dipartimento disporrà della documentazione secondo le proprie esigenze, senza che da ciò derivi alcuna responsabilità in merito alla conservazione del materiale.",
        natureOfAssignement:
          "Il tutorato non configura in alcun modo un rapporto di lavoro subordinato e non comporta l'integrazione dei collaboratori nell'organizzazione del lavoro dei servizi amministrativi e didattici dell'Ateneo, né dà luogo ad alcuna valutazione ai fini dei pubblici concorsi. Su richiesta dell'interessato, alla fine del periodo di tutorato, sarà rilasciato dall'Ufficio Didattica 1, Organi collegiali, Alta formazione, Carriere CDS/DI del Dipartimento, una certificazione attestante l'attività svolta. ",
        unusedFunds:
          'I fondi non utilizzati saranno usati per ribandire possibili nuovi incarichi.',
        responsibleForTheProcedure:
          'Il responsabile del procedimento amministrativo di cui al presente bando, ai sensi degli artt. 4, 5 e 6 della legge 7 agosto 1990, n. 241 e s.m.i., è la dott.ssa Carmela De Rosa - Capo Ufficio didattica, organi collegiali, alta formazione, carriere - CdS/DI.',
        state: 'Open',
        type: 'Help Teaching',
        deadline: '2019-12-31 23:59:59'
      }
    });
  }

  render() {
    const { notice } = this.state;

    return (
      <Grid style={{ margin: '20px' }} fluid>
        <Row>
          <Col xs={8}>
            <Card
              title={notice.protocol}
              ctTableResponsive
              ctTableFullWidth={false}
              content={
                <div>
                  <TextField heading='Descrizione' text={notice.description} />
                  <TextField
                    heading='Oggetto del bando'
                    text={notice.subject}
                  />
                  <TextField
                    heading='Requisiti di ammissione'
                    text={notice.admissionRequirements}
                  />
                  <TextField
                    heading='Titoli imponibili'
                    text={notice.assessableTitles}
                  />
                  <TextField
                    heading='Come sottomettere le applicazioni'
                    text={notice.howToSubmitApplications}
                  />
                  <TextField
                    heading='Tabella delle selezioni'
                    text={notice.selectionBoard}
                  />
                  <TextField heading='Accettazioni' text={notice.acceptance} />
                  <TextField
                    heading='Incompatibilità'
                    text={notice.incompatibility}
                  />
                  <TextField
                    heading='Termine del bando'
                    text={notice.terminationOfTheAssignment}
                  />
                  <TextField
                    heading="Natura dell'assegno"
                    text={notice.natureOfAssignement}
                  />
                </div>
              }
            />
          </Col>
          <Col xs={4}>
            <Row md={4}>
              <CustomButton fill={true}>Scarica bando</CustomButton>
            </Row>
            <br />
            <Row>
              <CustomButton fill={true}>Scarica graduatoria</CustomButton>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card content={<Upload />} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
export default DetailsNotice;
