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
import DetailsNotice from 'views/DetailsNotice.jsx';
import Error404 from './views/Error404';
import Candidature from './views/Candidature';
import Rankings from './views/Rankings';
import Users from './views/Users';
import Assignmets from './views/Assignments';
import Tasks from './views/Tasks';
import CreateNotice from './views/CreateNotice';
import UpdateCandidatura from './views/UpdateCandidatura';

const dashboardRoutes = {
  home: [
    {
      path: '/detailNotices/:id',
      name: 'Dettaglio bando',
      component: DetailsNotice
    },

    {
      path: '',
      name: 'Bandi',
      component: Notices
    }
  ],
  student: [
    {
      path: '/notices',
      name: 'Bandi',
      component: Notices
    },

    {
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: DetailsNotice
    },

    {
      path: '/tasks',
      name: 'Incarichi',
      component: Tasks
    },

    {
      path: '/candidature',
      name: 'Candidature',
      component: Candidature
    },
    {
      path: '/modificaCandidatura/:notice_protocol',
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
      path: '/notices',
      name: 'Bandi',
      component: Notices
    },

    {
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: DetailsNotice
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
      component: DetailsNotice
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
      path: '/detailNotices/:id',
      name: 'Dettaglio Bando',
      component: DetailsNotice
    },
    {
      path: '/createNotice',
      name: 'Crea Bando',
      component: CreateNotice
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
      path: '/*',
      component: Error404
    }
  ]
};

export default dashboardRoutes;
