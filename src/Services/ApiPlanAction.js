useEffect(() => {
  fetch("http://localhost:5000/api/actions")
    .then(res => res.json())
    .then(data => setActions(data))
    .catch(err => console.error("Erreur chargement :", err));
}, []);

const handleDelete = (id) => {
  if (window.confirm("Supprimer cette action ?")) {
    fetch(`http://localhost:5000/api/actions/${id}`, { method: "DELETE" })
      .then(() => setActions(prev => prev.filter(a => a._id !== id)))
      .catch(err => console.error("Erreur suppression :", err));
  }
};

const handleAddAction = () => {
  const newAction = {
    action: "Nouvelle action", // tu peux ajouter un formulaire bien sûr
    responsible: "Nom Responsable",
    plannedDate: new Date().toISOString(),
    status: "À faire"
  };
  fetch("http://localhost:5000/api/actions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAction)
  })
    .then(res => res.json())
    .then(data => setActions(prev => [...prev, data.action]))
    .catch(err => console.error("Erreur ajout :", err));
};
