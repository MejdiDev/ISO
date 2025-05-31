import React, { useRef } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Navbar from "components/Navbars/AuthNavbar.js";
import Login from "../views/auth/Login";
import Forget from "../views/auth/forget";
import Register from "../views/auth/Register";
import AnimatedLoginRegister from "../views/auth/AnimatedLoginRegister"; 

import "../styles/animations.css";

export default function Auth() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen overflow-hidden">
          {/* ✅ Fond animé style cyber */}
          <div className="auth-background"></div>

          {/* ✅ Image floutée */}
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${require("../assets/img/log.jpg")})`,
              zIndex: -1,
              opacity: 0.25,
              filter: "blur(1px)",
            }}
          ></div>

          {/* ✅ Transition avec animation */}
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.key}
              classNames="fade"
              timeout={300}
              nodeRef={nodeRef}
            >
              <div ref={nodeRef}>
                <Switch location={location}>
                  <Route path="/auth/animated" component={AnimatedLoginRegister} />
                  <Route path="/auth/login" component={Login} />
                  <Route path="/auth/forget" component={Forget} />
                  <Route path="/auth/register" component={Register} />
                  <Redirect from="/auth" to="/auth/login" />
                </Switch>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </section>
      </main>
    </>
  );
}
