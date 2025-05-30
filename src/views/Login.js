import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import du composant Link de React Router pour la navigation
import {  useHistory } from "react-router-dom";
// Import de la fonction login depuis le dossier services
import { login } from "../../Services/ApiUsers"; // adapter le chemin selon ton projet

export default function Login() {
  // Ã‰tat local pour stocker les donnÃ©es du formulaire (email, mot de passe)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Hook de navigation de React Router (pour rediriger aprÃ¨s connexion)
  const history = useHistory();
  // Fonction appelÃ©e Ã  chaque modification d'un champ (email ou mot de passe)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mise Ã  jour dynamique du champ concernÃ© dans le state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction appelÃ©e lors du clic sur le bouton "Se connecter"
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   // Validation simple
  //   if (!formData.email || !formData.password) {
  //     toast.error('Veuillez remplir tous les champs');
  //     return;
  //   }
  //   try {
  //     // Appel de l'API backend via le service login (axios POST)
  //     const response = await login(formData);

  //     if (response.status === 200) {
  //       // âœ… Connexion rÃ©ussie
  //       toast.success("Connexion rÃ©ussie !");
  //       console.log("Connexion rÃ©ussie :", response.data);

  //       // Exemple : enregistrer un token dans localStorage si nÃ©cessaire
  //       // localStorage.setItem("token", response.data.token);

  //       // Redirection vers une autre page aprÃ¨s connexion (exemple : tableau de bord)
  //       navigate("/dashboard");
  //     } else {
  //       // Si le backend ne renvoie pas 200, on affiche une alerte
  //       alert("Ã‰chec de la connexion. Veuillez rÃ©essayer.");
  //       toast.error("Ã‰chec de la connexion.");
  //     }
  //   } catch (error) {
  //     // Gestion des erreurs (ex : mauvais identifiants ou erreur serveur)
  //     console.error("Erreur lors de la tentative de connexion :", error);
  //     alert("Email ou mot de passe incorrect.");
  //     toast.error("Email ou mot de passe incorrect.");
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await login(formData);

      // Debug: Affiche la rÃ©ponse complÃ¨te
      console.log("RÃ©ponse complÃ¨te:", response);

      if (response.token) {
        localStorage.setItem('token', response.token);
        toast.success("Connexion rÃ©ussie !");
        history.push("/dashboard");
      }
    } catch (error) {
      console.error("Erreur dÃ©taillÃ©e:", error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Se connecter avec
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  {/* <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700
                    font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2
                     mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button> */}
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Ou connectez-vous avec des identifiants</small>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      required
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Mot de passe
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Mot de passe"
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        MÃ©moriser le mot de passe
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold
                      uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Se connecter
                    </button>
                    <div></div>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link to="/auth/forget" className="text-blueGray-200">
                  <small>Mot de passe oubliÃ©?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-blueGray-200">
                  <small>CrÃ©er un naouveau compte</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// // Import des hooks React nÃ©cessaires
// import React, { useState } from "react";

//   return (
//     <>
//       <div className="container mx-auto px-4 h-full">
//         <div className="flex content-center items-center justify-center h-full">
//           <div className="w-full lg:w-4/12 px-4">
//             <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
//               <div className="rounded-t mb-0 px-6 py-6">
//                 <div className="text-center mb-3">
//                   <h6 className="text-blueGray-500 text-sm font-bold">
//                     Se connecter avec
//                   </h6>
//                 </div>
//                 <div className="btn-wrapper text-center">
//                   {/* Bouton Google (non fonctionnel ici, juste pour l'apparence) */}
//                   <button
//                     className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
//                     type="button"
//                   >
//                     <img
//                       alt="..."
//                       className="w-5 mr-1"
//                       src={require("assets/img/google.svg").default}
//                     />
//                     Google
//                   </button>
//                 </div>
//                 <hr className="mt-6 border-b-1 border-blueGray-300" />
//               </div>

//               {/* Formulaire de connexion */}
//               <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
//                 <div className="text-blueGray-400 text-center mb-3 font-bold">
//                   <small>Ou connectez-vous avec vos identifiants</small>
//                 </div>
//                 <form onSubmit={(e) => e.preventDefault()}>
//                   {/* Champ Email */}
//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="email"
//                     >
//                       Email
//                     </label>
//                     <input
//
//                     />
//                   </div>

//                   {/* Champ Mot de passe */}
//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
//                       htmlFor="password"
//                     >
//                       Mot de passe
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
//                       placeholder="Mot de passe"
//                       required
//                     />
//                   </div>

//                   {/* Checkbox MÃ©moriser mot de passe */}
//                   <div>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         id="customCheckLogin"
//                         type="checkbox"
//                         className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
//                       />
//                       <span className="ml-2 text-sm font-semibold text-blueGray-600">
//                         MÃ©moriser le mot de passe
//                       </span>
//                     </label>
//                   </div>

//                   {/* Bouton de soumission du formulaire */}
//                   <div className="text-center mt-6">
//                     <button
//                       className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
//                       type="submit"
//                       onClick={handleLogin}
//                     >
//                       Se connecter
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Liens vers mot de passe oubliÃ© et crÃ©ation de compte */}
//             <div className="flex flex-wrap mt-6 relative">
//               <div className="w-1/2">
//                 <Link to="/auth/forget" className="text-blueGray-200">
//                   <small>Mot de passe oubliÃ© ?</small>
//                 </Link>
//               </div>
//               <div className="w-1/2 text-right">
//                 <Link to="/auth/register" className="text-blueGray-200">
//                   <small>CrÃ©er un nouveau compte</small>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }