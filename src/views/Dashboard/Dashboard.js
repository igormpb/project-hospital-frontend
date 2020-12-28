import React, { useState,useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {useHistory, Link } from "react-router-dom";

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import api from "services/api";
const useStyles = makeStyles(styles);

export default function Dashboard() {
const history = useHistory();
const [suppliesRunningOut, setSuppliesRunningOut] = useState([])
const auth = localStorage.getItem("auth");
const token = localStorage.getItem("token")
const authHeader = "Bearer " + token
if(!auth && !token){ 
     history.push('/')
  }

  useEffect(() => {
    api.get("api/v1/supplies/running-out",{
      headers:{
        Authorization: authHeader
      }
    }).then(res => setSuppliesRunningOut(res.data))
  })
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={12}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="warning">
                <Icon><Warning/></Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Produtos acabando</p>
              
              <h3 className={classes.cardTitle}>{suppliesRunningOut.length}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <Link to="/admin/insumos" >
                  Click para adicionar mais!!!
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Produtos abaixo da quantidade mínima</h4>
              <p className={classes.cardCategoryWhite}>
                Urgente!
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={["Nome", "Codigo do produto", "Quantidade", "Quantidade mínima"]}
                tableData={ suppliesRunningOut.map(supplie => [supplie.name,supplie.cod_product,supplie.quantity,supplie.minimum_quantity])}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
