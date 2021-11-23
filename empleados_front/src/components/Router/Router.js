import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../Auth/PrivateRoute";

import Login from "../Login/Login";
import Empleados from '../Empleados/index';


export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path={ [ "/", "/login" ] } component={ Login } />
                <PrivateRoute exact path={ [ "/empleados" ] } component={ Empleados } />

                {/* Ruta de página no encontrada (404) */}
                <Route path={ "*" } component={ () => (
                    <h1 style={{ marginTop: 300 }}>
                    404
                    <br/>
                    Página no encontrada
                    </h1>
                ) } />
            </Switch>
        </Router>
    )
}
