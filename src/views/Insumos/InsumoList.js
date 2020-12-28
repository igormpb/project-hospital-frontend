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
import api from '../../services/api'
import { useHistory } from "react-router-dom";
import decodedJwt from '../../services/decodedJwt';
import Search from "@material-ui/icons/Search";

import ButtonComponent from "components/CustomButtons/Button.js";

import DeleteIcon from '@material-ui/icons/Delete';

import { TextField, Button } from "@material-ui/core";
import { useConfirm,ConfirmProvider } from "material-ui-confirm"

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

export default function TableList() {


  const [insumos, setIsumos] = useState([]);
  const [searchSupplies, setSearchSupplies] = useState([]);

  const [search, setSearch] = useState("");

  const [msgError, setMsgError] = useState(false);

  const token = localStorage.getItem("token");
  const history = useHistory();

  const authHeader = "Bearer " + token
  const decoded = decodedJwt(token);
  async function handleSearch(e) {
    e.preventDefault();

    await api.post('api/v1/supplies/search', { search }, {
      headers: {
        Authorization: authHeader
      }
    }).then(res => {
      if (res.data.length < 1) {
        alert("não encontrado");
      }
      setSearchSupplies(res.data)

    })

  }

  useEffect(() => {
    api.get('api/v1/supplies/all', {
      headers: {
        Authorization: authHeader
      }
    }).then(res => setIsumos(res.data)).catch(err => {
      alert('Você não tem autorização')
      history.push('/admin/dashboard')
    }).catch(err => {
      if (err) return setMsgError(true);
    })
  }, []);


  async function handleDeleteInsumo(id){

         api.delete(`api/v1/supplies/delete/${id}`, {
          headers: {
            Authorization: authHeader
          }
  
        });
  
        setIsumos(insumos.filter(i => i.id !== id))

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
              <h4 className={classes.cardTitleWhite}>Insumos</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem>

                  <form onSubmit={handleSearch}>
                    <div className={classes.searchWrapper} >
                      <TextField
                        label="Buscar por código"
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={classes.textField}
                      />
                      <Button color="white" aria-label="edit" justIcon round type="submit" style={{ marginTop: 15 }}>
                        <Search />
                      </Button>
                    </div>
                  </form>
                </GridItem>

              </GridContainer>
              <ConfirmProvider>

              {
                searchSupplies.length < 1 ? (
                  decoded.roleAuth === "ADMIN" || decoded.roleAuth === "ADMIN_MASTER" ? (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Nome", "Código", "Valor", "quantidade", "Quantidade mínima", "Delete"]}
                      tableData={

                        insumos.map(insumo => (
                       
                    
                          [insumo.name,
                             insumo.cod_product,
                             <p>R$ {insumo.value}/Un</p>, 
                            insumo.quantity, , 
                            insumo.minimum_quantity, 
                            <button className={classes.buttonDelete}
                             onClick={() => handleDeleteInsumo(insumo.id)}><DeleteIcon style={{ color: "red" }} />
                             </button>
                          ]

                        ))}
                        
                    />

                  ) : (
                      <Table
                        tableHeaderColor="primary"
                        tableHead={["Nome", "Código", "Valor", "quantidade", "Quantidade mínima"]}
                        tableData={
                          insumos.map(insumo => (
                            [insumo.name, insumo.cod_product, <p>R$ {insumo.value}/Un</p>, insumo.quantity, insumo.minimum_quantity]
                          ))}
                      />
                    )
                ) : (
                    decoded.roleAuth === "ADMIN" || decoded.roleAuth === "ADMIN_MASTER" ? (
                      <div>
                        <ButtonComponent color="black" aria-label="edit" onClick={() => setSearchSupplies([])}  type="submit">
                          Listar todos
                        </ButtonComponent>

                        <Table
                          tableHeaderColor="primary"
                          tableHead={["Nome", "Código", "Valor", "quantidade", "Quantidade mínima", "Delete"]}
                          tableData={
                            searchSupplies.map(insumo => (
                              [insumo.name, insumo.cod_product, <p>R$ {insumo.value}/Un</p>, insumo.quantity, , insumo.minimum_quantity, <button className={classes.buttonDelete} onClick={() => handleDeleteInsumo(insumo.id)}><DeleteIcon style={{ color: "red" }} /></button>]
                            ))}
                        />
                      </div>
                    ) : (
                        <div>
                          <ButtonComponent color="black" aria-label="edit" onClick={() => setSearchSupplies([])} type="submit">
                            Listar todos
                        </ButtonComponent>
                          <Table
                            tableHeaderColor="primary"
                            tableHead={["Nome", "Código", "Valor", "quantidade", "Quantidade mínima"]}
                            tableData={
                              searchSupplies.map(insumo => (
                                [insumo.name, insumo.cod_product, <p>R$ {insumo.value}/Un</p>, insumo.quantity, insumo.minimum_quantity]
                              ))}
                          />
                        </div>

                      )
                  )
              }
                 </ConfirmProvider>

            </CardBody>
          </Card>
        </GridItem>)}

    </GridContainer>
  );
}
