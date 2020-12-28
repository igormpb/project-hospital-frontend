/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ListAltIcon from '@material-ui/icons/ListAlt';
import BusinessIcon from '@material-ui/icons/Business';


// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard";
import CreateUser from "views/Users/UserCreate";
import AccountList from "views/Users/ListUsers";
import CreateAddInsumos from "views/Insumos/Create&AddInsumos";
import Company from "views/Company/Company";  
import IsumosList from "views/Insumos/InsumoList"
import ExitIsumos from "views/Insumos/ExitInsumos"
import ExitReport from "views/Reports/ExitReport"
import EntryReport from "views/Reports/EntryReport";


// core components/views for RTL layout



  

const dashboardRoutes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/users/create",
    name: "Criar Usuário",
    icon: Person,
    component: CreateUser,
    layout: "/admin"
  },
  {
    path: "/_users/all",
    name: "Listar usuários",
    icon: ListAltIcon,
    component: AccountList,
    layout: "/admin"
  },
  {
    path: "/_insumos/all",
    name: "Listar Insumos",
    icon: ListAltIcon,
    component: IsumosList,
    layout: "/admin"
  },
  {
    path: "/insumos",
    name: "Insumo",
    icon: "content_paste",
    component: CreateAddInsumos,
    layout: "/admin"
  },
  {
    path: "/exitInsumo",
    name: "Retirada",
    icon: "content_paste",
    component: ExitIsumos,
    layout: "/admin"
  },
  {
    path: "/empresas",
    name: "Cadastrar empresa",
    icon: BusinessIcon,
    component: Company,
    layout: "/admin"
  },
  {
    path: "/exitReport",
    name: "Relátorio de saída",
    icon: "content_paste",
    component: ExitReport,
    layout: "/admin"
  },
  {
    path: "/entryReport",
    name: "Relátorio de entrada",
    icon: "content_paste",
    component: EntryReport,
    layout: "/admin"
  },
  
  
];

export default dashboardRoutes;