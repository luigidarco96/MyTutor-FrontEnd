export const StateNoticeDictionary = {
  Draft: 'Bozza',
  'In Acceptance': 'In accettazione',
  Accepted: 'Accettato',
  'In Approval': 'In Approvazione',
  Approved: 'Approvato',
  Published: 'Pubblicato',
  Expired: 'Scaduto',
  'Waiting for Graded List': 'In attesa della graduatoria',
  Closed: 'Chiuso'
};

export const StateAssignmentDictionary = {
  Unassigned: 'Non assegnato',
  Waiting: 'Richiesto',
  Booked: 'Prenotato',
  Assigned: 'Assegnato',
  Over: 'Terminato'
};

export const UserRole = {
  Student: 'Studente',
  Professor: 'Professore'
};

export const NoticeType = {
  'Help Teaching': 'Help Teaching',
  Tutoring: 'Tutorato'
};

export const UserNoticeLists = {
  Student: ['Pubblicato','Scaduto', 'In attesa della graduatoria','Chiuso'],
  DDI: [
    'In Approvazione',
    'In attesa della graduatoria',
    'Approvato',
    'Pubblicato',
    'Scaduto',
    'Chiuso'
  ],
  Professor: [
    'In accettazione',
    'Accettato',
    'Pubblicato',
    'Scaduto',
    'In attesa della graduatoria',
    'Chiuso'
  ],
  'Teaching Office': [
    'Bozza',
    'Accettato',
    'Approvato',
    'Pubblicato',
    'Scaduto',
    'In attesa della graduatoria',  
    'Chiuso'
  ]
};

export const UserAssignmentLists = {
  Student: ['Richiesto', 'Assegnato'],
  'Teaching Office': ['Assegnato', 'Terminato']
};
