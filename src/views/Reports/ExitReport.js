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
import { TextField, Button } from "@material-ui/core";
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

export default function ExitReport() {
  const [exitReports, setExitReport] = useState([]);
  const [searchReports, setSearchReport] = useState([]);
  const [search, setSearch] = useState("");
  const [searchDestiny, setSearchDestiny] = useState("");
  const [msgError, setMsgError] = useState(false);

  const token = localStorage.getItem("token");
  const history = useHistory();

  const authHeader = "Bearer " + token


  useEffect(() => {
    api.get('api/v1/report/exit', {
      headers: {
        Authorization: authHeader
      }
    }).then(res => setExitReport(res.data)).catch(err => {
      alert('Você não tem autorização')
      history.push('/admin/dashboard')
    }).catch(err => {
      if (err) return setMsgError(true);
    })
  }, []);

  async function handleSearch(e) {
    e.preventDefault();

    await api.post('api/v1/report/exit-search', { search }, {
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

  async function handleDestinySearch(e) {
    e.preventDefault();

    await api.post('api/v1/report/destiny-search', { searchDestiny }, {
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

  const classes = useStyles();
  return (
    <GridContainer>
      {msgError ? (
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Você não tem autorização para acessar.</h4>

        </CardHeader>) : (<GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="black">
              <h4 className={classes.cardTitleWhite}>Relátorios de Saída</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4} >
                  <form onSubmit={handleSearch} style={{ marginTop: 16 }}>
                    <div className={classes.searchWrapper} >
                      <TextField
                        type="date"
                        id="date"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={classes.textField}
                      />
                      <Button color="black" aria-label="edit" justIcon round type="submit">
                        <Search />
                      </Button>

                    </div>
                  </form>
                </GridItem>

                <GridItem xs={12} sm={12} md={4}>

                  <form onSubmit={handleDestinySearch}>
                    <div className={classes.searchWrapper} >
                      <TextField
                        label="Procurar por empresa"
                        type="text"
                        value={searchDestiny}
                        onChange={e => setSearchDestiny(e.target.value)}
                        className={classes.textField}
                      />
                      <Button color="white" aria-label="edit" justIcon round type="submit" style={{ marginTop: 15 }}>
                        <Search />
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
              {
                searchReports.length < 1 ? (
                  <Table
                    tableHeaderColor="primary"
                    tableHead={["Nome", "Quantidade", "Valor", "destino", "Data da Retirada", "Código Produto", "Nome Produto"]}
                    tableData={
                      exitReports.map(exitReport => (
                        [`${exitReport.first_name} ${exitReport.last_name}`,
                        exitReport.quantity,
                        <p>R$ {exitReport.value}/Un</p>,
                        exitReport.destiny,
                        <Moment format="YYYY/MM/DD">
                          {exitReport.created_at}
                        </Moment>,
                        exitReport.cod_product,
                        exitReport.name_product,
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
                        tableHead={["Nome", "Quantidade", "valor", "destino", "Data da Retirada", "Código Produto", "Nome Produto"]}
                        tableData={
                          searchReports.map(s => (
                            [`${s.first_name} ${s.last_name}`,
                            s.quantity,
                            <p>R$ {s.value}/Un</p>,
                            s.destiny,
                            <Moment format="YYYY/MM/DD">
                              {s.created_at}
                            </Moment>,
                            s.cod_product,
                            s.name_product,
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
