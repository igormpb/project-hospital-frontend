import React, { useState } from "react";
// @material-ui/core components
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
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


import decodedJwt from "services/decodedJwt";
import api from "services/api";
import { string } from "prop-types";
import { FormControl, NativeSelect } from "@material-ui/core";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 2,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [msgError, setMsgError] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);

  const token = localStorage.getItem("token");
  const decoded = decodedJwt(token);

  const authToken = "Bearer " + token
  var validField = false
  if (role, email, username, firstName, lastName, password, password2) {
    validField = true
  }
  const classes = useStyles();

  async function handleCreateUser(e) {
    e.preventDefault();
    setMsgSuccess(false);
    setMsgError(false);
    if (password !== password2) return alert("senhas não são iguais.");

    const data = {
      email,
      role,
      username,
      firstName,
      lastName,
      password,
      password2
    }
    try {
      await api.post('api/v1/users/create', data, {
        headers: {
          Authorization: authToken
        }
      })
      setMsgSuccess(true);
    } catch (err) {

      if (err) return setMsgError(true);
    }

  }
  return (
    <div>
      {msgError ? (
        <CardHeader color="danger">
          <h4 className={classes.cardTitleWhite}>Falha ao criar, tente novamente.</h4>

        </CardHeader>) : (msgSuccess) ? (<CardHeader color="success">
          <h4 className={classes.cardTitleWhite}>Criado com sucesso.</h4>

        </CardHeader>) : (null)}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="black">
              <h4 className={classes.cardTitleWhite}>Criar usuário</h4>

            </CardHeader>
            <form onSubmit={handleCreateUser} >

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>

                    <InputLabel id="label">Função</InputLabel>

                    {decoded.roleAuth === "ADMIN_MASTER" ? (

                      <NativeSelect
                        id="demo-customized-select-native"
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        input={<BootstrapInput />}
                      >
                        <option value="" > - </option>

                        <option value="EMPLOYEE">FUNCIONÁRIO</option>
                        <option value="ADMIN">ADMIN</option>

                      </NativeSelect>
                    ) :
                      (
                        <NativeSelect
                          id="demo-customized-select-native"
                          value={role}
                          onChange={e => setRole(e.target.value)}
                          input={<BootstrapInput />}
                        >
                          <option value="" >None</option>
                          <option value="EMPLOYEE">FUNCIONÁRIO</option>


                        </NativeSelect>)}
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="Usuário"
                      id="username"

                      formControlProps={{
                        fullWidth: true
                      }}
                      value={username} onChange={e => setUsername(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="Email"
                      id="email-address"


                      value={email} onChange={e => setEmail(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField style={{ marginTop: 16 }}
                      label="Nome"
                      id="first-name"

                      value={firstName} onChange={e => setFirstName(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField style={{ marginTop: 16 }}
                      label="Sobrenome"
                      id="lastName"

                      value={lastName} onChange={e => setLastName(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField style={{ marginTop: 16 }}
                      label="Senha"
                      id="password"
                      type="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={password} onChange={e => setPassword(e.target.value)}
                    />

                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField style={{ marginTop: 16 }}
                      label="Repetir senha"
                      id="password2"
                      type="password"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={password2} onChange={e => setPassword2(e.target.value)}

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
