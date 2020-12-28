import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import api from "../../services/api";
import Moment from "react-moment"
import { useHistory } from "react-router-dom";
import { KeyboardDatePicker } from "@material-ui/pickers"
import { Button, TextField } from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import ButtonComponent from "components/CustomButtons/Button.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    }
  },
  buttonDelete: {
    backgroundColor: "transparent",
    border: "none",
    "&:hover": {
      background: "black",
      boxShadow: "2px 2px 4px grey"
    }
  }
};

const useStyles = makeStyles(styles);

export default function EntryReport() {
  const [EntryReports, setEntryReport] = useState([]);
  const [searchReports, setSearchReport] = useState([]);

  const [search, setSearch] = useState("")
  const [msgError, setMsgError] = useState(false);

  const token = localStorage.getItem("token");
  const history = useHistory();

  const authHeader = "Bearer " + token


  async function handleSearch(e) {
    e.preventDefault();

    await api.post('api/v1/report/entry-search', { search }, {
      headers: {
        Authorization: authHeader
      }
    }).then(res => {
      if (res.data.length < 1) {
        alert("não encontrado")
      }
      setSearchReport(res.data)
    })
  }

  useEffect(() => {

    api.get('api/v1/report/entry', {
      headers: {
        Authorization: authHeader
      }
    }).then(res => setEntryReport(res.data)).catch(err => {
      alert('Você não tem autorização')
      history.push('/admin/dashboard')
    }).catch(err => {
      if (err) return setMsgError(true);
    })
  }, []);


  const classes = useStyles();
  return (
    <GridContainer>
      {msgError ? (
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Você não tem autorização para acessar.</h4>

        </CardHeader>) : (<GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="black">
              <h4 className={classes.cardTitleWhite}>Relátorios de Entrada</h4>
            </CardHeader>

            <form onSubmit={handleSearch}>
              <div className={classes.searchWrapper} style={{ marginTop: 20, marginLeft: 20 }}>
                <TextField
                  type="date"
                  id="date"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className={classes.textField}
                />
                <Button color="white" aria-label="edit" justIcon round type="submit">
                  <Search />
                </Button>

              </div>
            </form>

            <CardBody>
              {
                searchReports.length < 1 ? (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Nome", "Data de Entrada", "Código Produto", "Nome Produto"]}
                    tableData={
                      EntryReports.map(entryReport => (
                        [ `${entryReport.first_name} 
                        ${entryReport.last_name} `,
                        <Moment format="YYYY/MM/DD">
                          {entryReport.created_at}
                        </Moment>,
                        entryReport.cod_product,
                        entryReport.name_product,
                        ]
                      ))}

                  />
                ) : (
                    <div>
                      <ButtonComponent color="black" aria-label="edit" onClick={() => setSearchReport([])} type="submit">
                        Listar todos
                     </ButtonComponent>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Nome", "Sobrenome", "Data de Entrada", "Código Produto", "Nome Produto"]}
                        tableData={
                          searchReports.map(i => (
                            [i.first_name,
                            i.last_name,
                            <Moment format="YYYY/MM/DD">
                              {i.created_at}
                            </Moment>,
                            i.cod_product,
                            i.name_product,
                            ]
                          ))}

                      />
                    </div>

                  )
              }



            </CardBody>
          </Card>
        </GridItem>)}

    </GridContainer>
  );
}
