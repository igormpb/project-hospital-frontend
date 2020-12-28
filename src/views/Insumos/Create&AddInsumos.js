import React, { useState } from "react";
// @material-ui/core components


import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import TextField from "@material-ui/core/TextField"
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";



import api from "services/api";
import decodedJwt from "services/decodedJwt";



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

export default function Isumos() {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(0);
  const [codProduct, setCodProduct] = useState("");
  const [quantityUpdate, setQuantityUpdate] = useState(0);
  const [codProductUpdate, setCodProductUpdate] = useState("");


  const [msgError, setMsgError] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);
  const [msgErrorUpdate, setMsgErrorUpdate] = useState(false);
  const [msgSuccessUpdate, setMsgSuccessUpdate] = useState(false);

  var ValidField1 = false

  if (name && minimumQuantity && value && codProduct) {
    ValidField1 = true
  }
  var ValidFiled2 = false

  if (codProductUpdate && quantityUpdate) {
    ValidFiled2 = true
  }
  const token = localStorage.getItem("token");

  const authHeadar = "Bearer " + token
  const decoded = decodedJwt(token);

  const classes = useStyles();

  async function handleCreateInsumo(e) {
    setMsgSuccess(false);
    setMsgError(false);

    e.preventDefault();
    const data = {
      name,
      value,
      quantity,
      minimumQuantity,
      codProduct,
    }
    try {
      await api.post('api/v1/supplies/create', data, {
        headers: {
          Authorization: authHeadar
        },
      })
      setMsgSuccess(true);

    }
    catch (err) {
      if (err) return setMsgError(true);
    }

  }
  async function handleAddQuantity(e) {
    
    e.preventDefault();
    setMsgSuccessUpdate(false);
    setMsgErrorUpdate(false);
    const data = {
      quantityUpdate,
      codProductUpdate
    }
    try {
        await api.patch('api/v1/supplies/add_quantity', data, {
        headers: {
          Authorization: authHeadar
        },
      })
      setMsgSuccessUpdate(true);

    }
    catch (err) {
      if (err) return setMsgErrorUpdate(true);
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

        {decoded.roleAuth === "ADMIN" || decoded.roleAuth === "ADMIN_MASTER" ? (
          <div> <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="black">
                <h4 className={classes.cardTitleWhite}>Criar Insumo</h4>
  
              </CardHeader>
              <form onSubmit={handleCreateInsumo}>
  
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Código do produto"
                        id="cod_product"
                        type="text"
                        value={codProduct} onChange={e => setCodProduct(e.target.value)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Nome"
                        id="name"
                        value={name} onChange={e => setName(e.target.value)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Valor"
                        id="value"
                        type="number"
                        value={value} onChange={e => setValue(e.target.value)}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
  
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField style={{ marginTop: 16 }}
                        label="Quantidade"
                        type="number"
                        id="quantity"
  
                        value={quantity} onChange={e => setQuantity(e.target.value)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField style={{ marginTop: 16 }}
                        label="Quantidade minima"
                        id="minimum_quantity"
                        type="number"
                        formControlProps={{
                          fullWidth: true
                        }}
                        value={minimumQuantity} onChange={e => setMinimumQuantity(e.target.value)}
                      />
  
                    </GridItem>
                  </GridContainer>
  
                </CardBody>
                <CardFooter>
                  {
                    (!ValidField1) ? (
                      <Button type="submit" color="black" disabled >Adicionar</Button>
  
                    ) : (
                        <Button type="submit" color="black" >Adicionar</Button>
                      )
                  }
                </CardFooter>
              </form>
            </Card>
          </GridItem>
  
        </GridContainer>
  
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="black">
                <h4 className={classes.cardTitleWhite}>Adicionar quantidade</h4>
  
              </CardHeader>
              <form onSubmit={handleAddQuantity}>
  
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Código do produto"
                        id="cod_product"
                        type="text"
                        value={codProductUpdate} onChange={e => setCodProductUpdate(e.target.value)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Quantidade"
                        id="value"
                        type="number"
                        value={quantityUpdate} onChange={e => setQuantityUpdate(e.target.value)}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {
                    !ValidFiled2 ? (
                      <Button type="submit" color="black" disabled >Adicionar</Button>
  
                    ) : (
                        <Button type="submit" color="black" >Adicionar</Button>
                      )
                  }
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          {msgErrorUpdate ? (
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Falha ao adicionar no estoque, tente novamente.</h4>
  
            </CardHeader>) : (msgSuccessUpdate) ? (<CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Adicionado com sucesso.</h4>
            </CardHeader>) : (null)}
        </GridContainer> </div>
        ) : (<div> <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="black">
                <h4 className={classes.cardTitleWhite}>Adicionar quantidade</h4>
  
              </CardHeader>
              <form onSubmit={handleAddQuantity}>
  
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Código do produto"
                        id="cod_product"
                        type="text"
                        value={codProductUpdate} onChange={e => setCodProductUpdate(e.target.value)}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        label="Quantidade"
                        id="value"
                        type="number"
                        value={quantityUpdate} onChange={e => setQuantityUpdate(e.target.value)}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  {
                    !ValidFiled2 ? (
                      <Button type="submit" color="black" disabled >Adicionar</Button>
  
                    ) : (
                        <Button type="submit" color="black" >Adicionar</Button>
                      )
                  }
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          {msgErrorUpdate ? (
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Falha ao adicionar no estoque, tente novamente.</h4>
  
            </CardHeader>) : (msgSuccessUpdate) ? (<CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Adicionado com sucesso.</h4>
            </CardHeader>) : (null)}
        </GridContainer></div>)}
      
    </div>
  );
}
