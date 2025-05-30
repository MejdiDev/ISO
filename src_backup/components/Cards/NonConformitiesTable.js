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
