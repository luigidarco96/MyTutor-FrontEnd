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
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Upgrade from "views/Upgrade.jsx";
import Notices from "views/Notices";
import DetailsNotice from "views/DetailsNotice.jsx";
import Error404 from "./views/Error404";
import Candidature from "./views/Candidature";
import Rankings from "./views/Rankings";
import Users from "./views/Users";
import Assignmets from "./views/Assignments";
import Tasks from "./views/Tasks";

const dashboardRoutes = {
  "home":[
    {
      path: "/detailNotices",
      name:"Dettaglio bando",
      component: DetailsNotice,
    },

    {
      path: "",
      name:"Bandi",
      component: Notices,
    },

  ],
  "student": [
    {
      path: "/notices",
      name:"Bandi",
      component: Notices,
    },

    {
      path: "/detailNotices/:id",
      name: "Dettaglio Bando",
      component: DetailsNotice,
    },

    {
      path: "/tasks",
      name:"Incarichi",
      component: Tasks,
    },

    {
      path:"/candidature",
      name:"Candidature",
      component: Candidature,
    },
    {
      path: "/*",
      component: Error404,
    },
  ],

  "professor": [
    {
      path: "/notices",
      name:"Bandi",
      component: Notices,
    },
    
    {
      path: "/detailNotices/:id",
      name: "Dettaglio Bando",
      component: DetailsNotice,
    },

    {
      path: "/*",
      component: Error404,
    },
  ],

  "ddi": [
    {
      path: "/notices",
      name: "Bandi",
      component: Notices,
    },
    
    {
      path: "/detailNotices/:id",
      name: "Dettaglio Bando",
      component: DetailsNotice,
    },

    {
      path: "/rankings",
      name: "Graduatorie",
      component: Rankings,
    },
    {
      path: "/*",
      component: Error404,
    },
  ],

  "admin": [
    {
      path: "/notices",
      name: "Bandi",
      component: Notices,
    },
    
    {
      path: "/detailNotices/:id",
      name: "Dettaglio Bando",
      component: DetailsNotice,
    },

    {
      path: "/users",
      name: "Utenti",
      component: Users,
    },
    {
      path:"/assignments",
      name: "Assegni",
      component: Assignmets,
    },
    {
      path: "/*",
      component: Error404,
    },
    
  ]
}

export default dashboardRoutes;
