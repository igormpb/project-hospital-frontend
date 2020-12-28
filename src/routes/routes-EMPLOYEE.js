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
import ListAltIcon from '@material-ui/icons/ListAlt';


// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import IsumosList from "views/Insumos/InsumoList"
import CreateAddInsumos from "views/Insumos/Create&AddInsumos";

// core components/views for RTL layout



  

const dashboardRoutesEMPLOYEE = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },{
    path: "/insumos/all",
    name: "Listar Insumos",
    icon: ListAltIcon,
    component: IsumosList,
    layout: "/admin"
  },{
    path: "/insumos",
    name: "Insumo",
    icon: "content_paste",
    component: CreateAddInsumos,
    layout: "/admin"
  },
];

export default dashboardRoutesEMPLOYEE;