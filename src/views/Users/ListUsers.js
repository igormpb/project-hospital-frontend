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
import decodedJwt from '../../services/decodedJwt'
import DeleteIcon from '@material-ui/icons/Delete';
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
  const [Users, setUsers] = useState([]);

  const [msgError, setMsgError] = useState(false);


  const token = localStorage.getItem("token");
  const history = useHistory();

  const authHeader = "Bearer " + token


  useEffect(() => {
    api.get('api/v1/users/all', {
      headers: {
        Authorization: authHeader
      }
    }).then(res => setUsers(res.data)).catch(err => {
      alert('Você não tem autorização')
      history.push('/admin/dashboard')
    }).catch(err => {
      if (err) return setMsgError(true);
    })
  }, []);

  async function UserDeleteUuid(uuid) {
    try {
      await api.delete(`api/v1/users/delete/${uuid}`, {
        headers: {
          Authorization: authHeader
        }

      });

      setUsers(Users.filter(u => u.uuid !== uuid))
    } catch (err) {
      if (err) return setMsgError(true);
    }
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
              <h4 className={classes.cardTitleWhite}>Contas</h4>
            </CardHeader>
            <CardBody>

              <Table
                tableHeaderColor="primary"
                tableHead={["Nome", "Sobrenome", "Email", "Role", "Delete"]}
                tableData={
                  Users.map(user => (
                    [user.first_name, user.last_name, user.email, user.role, <button className={classes.buttonDelete} onClick={() => UserDeleteUuid(user.uuid)}><DeleteIcon style={{ color: "red" }} /></button>]
                  ))}
              />
            </CardBody>
          </Card>
        </GridItem>)}

    </GridContainer>
  );
}
