/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Notices from 'views/Notices';
import Notice from 'views/Notice.jsx';
import Error404 from './views/Error404';
import Candidature from './views/Candidature';
import Rankings from './views/Rankings';
import Users from './views/Users';
import Assignmets from './views/Assignments';
import ManageNotice from './views/ManageNotice';
import DraftNotice from './views/DraftNotice';
import UpdateCandidatura from './views/UpdateCandidatura';
import UserProfile from './views/UserProfile';
import UploadNotice from './views/UploadNotice';
import UploadRanking from './views/UploadRanking';
import Valutation from './views/Valutation';

const dashboardRoutes = {
  home: [
    {
      path: '/detailNotices/:id',
      name: 'Dettaglio bando',
      component: Notice
    },

    {
      path: '',
      name: 'Bandi',
      component: Notices
    }
  ],
  student: [
    {
      path: '/profile',
      name: 'Profilo',
      component: UserProfile
    },
    {
      path: '/notices',
      name: 'Bandi',
      component: Notices
    },

    {
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: Notice
    },

    {
      path: '/assignments',
      name: 'Incarichi',
      component: Assignmets
    },

    {
      path: '/candidature',
      name: 'Candidature',
      component: Candidature
    },
    {
      path: '/modificaCandidatura/:id',
      name: 'Modifica candidatura',
      component: UpdateCandidatura
    },
    {
      path: '/*',
      component: Error404
    }
  ],

  professor: [
    {
      path: '/profile',
      name: 'Profilo',
      component: UserProfile
    },
    {
      path: '/notices',
      name: 'Bandi',
      component: Notices
    },

    {
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: Notice
    },

    {
      path: '/*',
      component: Error404
    }
  ],

  ddi: [
    {
      path: '/notices',
      name: 'Bandi',
      component: Notices
    },

    {
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: Notice
    },

    {
      path: '/uploadNotice/:id',
      name: 'Carica Bando',
      component: UploadNotice
    },
    {
      path: '/uploadRanking/:id',
      name: 'Carica graduatoria',
      component: UploadRanking
    },
    {
      path: '/rankings',
      name: 'Graduatorie',
      component: Rankings
    },
    {
      path: '/*',
      component: Error404
    }
  ],

  admin: [
    {
      path: '/notices',
      name: 'Bandi',
      component: Notices
    },
    {
      path: '/valutations/:id',
      name: 'Valutazioni',
      component: Valutation
    },

    {
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: Notice
    },
    {
      path: '/draftNotice',
      name: 'Bozza Bando',
      component: DraftNotice
    },
    {
      path: '/manageNotice/:id',
      name: 'Gestione Bando',
      component: ManageNotice
    },

    {
      path: '/users',
      name: 'Utenti',
      component: Users
    },
    {
      path: '/assignments',
      name: 'Assegni',
      component: Assignmets
    },

    {
      path: '/candidatures/:id',
      name: 'Candidature',
      component: Candidature
    },

    {
      path: '/*',
      component: Error404
    }
  ]
};

export default dashboardRoutes;
