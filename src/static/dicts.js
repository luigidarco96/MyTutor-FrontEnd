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
  Student: ['Pubblicato', 'Chiuso', 'Scaduto', 'In attesa della graduatoria'],
  DDI: [
    'Pubblicato',
    'Chiuso',
    'Scaduto',
    'In attesa della graduatoria',
    'In Approvazione',
    'Approvato'
  ],
  Professor: [
    'Pubblicato',
    'Chiuso',
    'Scaduto',
    'In attesa della graduatoria',
    'In accettazione',
    'Accettato'
  ],
  'Teaching Office': [
    'Bozza',
    'Pubblicato',
    'Chiuso',
    'Scaduto',
    'In attesa della graduatoria',
    'Accettato',
    'Approvato'
  ]
};

export const UserAssignmentLists = {
  Student: ['Richiesto', 'Assegnato'],
  'Teaching Office': ['Assegnato', 'Terminato']
};
