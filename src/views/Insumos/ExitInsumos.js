import React, { useState, useEffect } from "react";
// @material-ui/core components

import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import TextField from "@material-ui/core/TextField"
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import api from "../../services/api"
import { NativeSelect } from "@material-ui/core";



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

export default function ExitInsumo() {
  const [namesCompanys, setNamesCompanys] = useState([]);
  const [destinyReport, setDestinyReport] = useState("");
  const [codProductOutput, setCodProductOutput] = useState("");
  const [quantityOutput, setQuantityOutput] = useState("");

  var validField = false;

  if (destinyReport != "" && codProductOutput, quantityOutput) {
    validField = true
  }
  console.log(destinyReport)
  const [msgError, setMsgError] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);

  const token = localStorage.getItem("token");


  const authHeader = "Bearer " + token

  const classes = useStyles();

  useEffect(() => {

    api.get('api/v1/company/name', {
      headers: {
        Authorization: authHeader
      }
    })
      .then(res => {
        setNamesCompanys(res.data)
      });
  }, [])

  async function handleCreateUser(e) {
    e.preventDefault();
    setMsgSuccess(false);
    setMsgError(false);


    const data = {
      destinyReport,
      codProductOutput,
      quantityOutput
    }
    try {
      await api.patch('api/v1/supplies/output', data, {
        headers: {
          Authorization: authHeader
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
          <h4 className={classes.cardTitleWhite}>Falha ao retirar, tente novamente.</h4>

        </CardHeader>) : (msgSuccess) ? (<CardHeader color="success">
          <h4 className={classes.cardTitleWhite}>Retirado com sucesso.</h4>

        </CardHeader>) : (null)}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="black">
              <h4 className={classes.cardTitleWhite}>Retirada de insumo</h4>

            </CardHeader>
            <form onSubmit={handleCreateUser} >

              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>

                    <InputLabel id="label">Empresas</InputLabel>

                    <NativeSelect
                      id="select"
                      value={destinyReport}
                      onChange={e => setDestinyReport(e.target.value)}
                      input={<BootstrapInput />}
                    >
                      <option value="" disabled> - </option>

                      {
                        namesCompanys.map(company => (
                          <option key={company.id} value={company.name}>
                            {company.name}
                          </option>
                        ))
                      }

                    </NativeSelect>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="Código do produto"
                      id="cod_product"
                      type="text"
                      formControlProps={{
                        fullWidth: true
                      }}
                      value={codProductOutput} onChange={e => setCodProductOutput(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="Quantidade retirada"
                      id="quantity"


                      value={quantityOutput} onChange={e => setQuantityOutput(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                {
                  !validField ? (
                    <Button type="submit" color="black" disabled>Retirar</Button>
                  ) : (
                      <Button type="submit" color="black">Retirar</Button>
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
