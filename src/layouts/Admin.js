import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import HeaderStats from "../components/Headers/HeaderStats.js";
import FooterAdmin from "../components/Footers/FooterAdmin.js";

// views
import Dashboard from "../views/admin/Dashboard.js";
import Maps from "../views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables.js";
import Documents from "../views/admin/Documents.js";
import ListAudit from "../views/admin/ListAudit.js";
import ListUsers from "../views/admin/ListUsers.js";
import CalenderAudit from "../views/admin/CalenderAudit.js";
import AuditChecklist from "../views/admin/AuditChecklist.js";
import Rapports from "../views/admin/Rapports.js";
import NonConformities from "../views/admin/NonConformities.js";
import PlanAction from "../views/admin/PlanAction.js";
// import Previlege from "../views/admin/Previlege";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/maps" component={Maps} />
            <Route path="/admin/settings" component={Settings} />
            <Route path="/admin/tables" component={Tables} />
            <Route path="/admin/AuditChecklist" component={AuditChecklist} />
            <Route path="/admin/Rapports" component={Rapports} />
            <Route path="/admin/NonConformities" component={NonConformities} />
            <Route path="/admin/PlanAction" component={PlanAction} />
            <Route path="/admin/Documents" component={Documents} />
            <Route path="/admin/ListAudit" component={ListAudit} />
            <Route path="/admin/ListUsers" component={ListUsers} />
            <Route path="/admin/calenderAudit" component={CalenderAudit} />
            {/* <Route path="/admin/previlege" component={Previlege} /> */}
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
