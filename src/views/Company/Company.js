import React, { useState, useEffect } from "react";
// @material-ui/core components
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from "@material-ui/core/TextField"
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";



import api from "services/api";
import { cardHeader } from "assets/jss/material-dashboard-react";



const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Company() {

  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [number, setnumber] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [state, setState] = useState("");
  const [pais, setPais] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [contact1, setContact1] = useState("");
  const [msgError, setMsgError] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);

  var validField = false;

  if (name && cep && street && number && neighborhood && state && city && contact && contact1) {
    validField = true
  }

  const token = localStorage.getItem("token");

  const authHeadar = "Bearer " + token

  const classes = useStyles();

  async function handleCreateRunning(e) {
    e.preventDefault();

    setMsgSuccess(false);
    setMsgError(false);

    const data = {
      name,
      cep,
      number,
      street,
      neighborhood,
      state,
      pais,
      city,
      contact,
      contact1
    }
    try {
      await api.post('api/v1/company/create', data, {
        headers: {
          Authorization: authHeadar
        }

      }).then(setMsgSuccess(true))
    } catch (err) {
      if (err) return setMsgError(true);
    }
  }

  return (
    <div>

      {msgError ? (
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Falha ao cadastrar, tente novamente.</h4>

        </CardHeader>) : (msgSuccess) ? (<CardHeader color="success">
          <h4 className={classes.cardTitleWhite}>Criado com sucesso.</h4>

        </CardHeader>) : (null)}


      <GridContainer>

        <GridItem xs={12} sm={2} md={12}>
          <Card>
            <CardHeader color="black">
              <h4 className={classes.cardTitleWhite}>Cadastrar empresa</h4>

            </CardHeader>
            <form onSubmit={handleCreateRunning} >


              <CardBody>
                <GridContainer >
                  <GridItem xs={12} sm={2} md={12}>
                    <TextField
                      label="Nome"
                      id="name"
                      className={classes.textField}
                      value={name} onChange={e => setName(e.target.value)}
                    />
                  </GridItem>

                </GridContainer>

                <GridContainer style={{ marginTop: 16 }}>

                  <GridItem xs={12} sm={2} md={3}>
                    <TextField
                      label="País"
                      id="pais"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={pais} onChange={e => setPais(e.target.value)}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={2} md={3}>
                    <TextField
                      label="Estado"
                      id="state"
                      value={state} onChange={e => setState(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={3}>
                    <TextField
                      label="Cidade"
                      id="city"
                      type="text"
                      value={city} onChange={e => setCity(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={3}>
                    <TextField
                      label="Rua"
                      type="text"
                      id="street"

                      value={street} onChange={e => setStreet(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>

                <GridContainer >

                  <GridItem xs={12} sm={2} md={3}>
                    <TextField style={{ marginTop: 16 }}
                      label="Bairro"
                      id="pais"
                      type="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={neighborhood} onChange={e => setNeighborhood(e.target.value)}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={2} md={3}>
                    <TextField style={{ marginTop: 16 }}
                      label="Cep"
                      id="Cep"
                      type="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={cep} onChange={e => setCep(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={2} md={3} >
                    <TextField style={{ marginTop: 16 }}
                      label="Número"
                      id="number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={number} onChange={e => setnumber(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={2} md={2}>
                    <TextField style={{ marginTop: 16 }}
                      label="Contato 1"
                      id="contact"
                      type="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={contact} onChange={e => setContact(e.target.value)}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <TextField style={{ marginTop: 16 }}
                      label="Contato 2"
                      id="contact1"
                      type="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={contact1} onChange={e => setContact1(e.target.value)}
                    />

                  </GridItem>
                </GridContainer>

              </CardBody>
              <CardFooter>
                {
                  !validField ? (
                    <Button type="submit" color="black" disabled>Criar</Button>
                  ) : (
                      <Button type="submit" color="black">Criar</Button>
                    )
                }
              </CardFooter>
            </form>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
        </GridItem>
      </GridContainer>
    </div>
  );
}
