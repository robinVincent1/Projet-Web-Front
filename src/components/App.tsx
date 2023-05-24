import React, { useState } from "react";
import "../styles/App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { PageAccueil } from "./Accueil/PageAccueil";
import { Contact } from "./Contact/Contact";
import { ProgrammePage } from "./PageProgramme/Programme";
import { Performance } from "./PagePerformance/Performance";
import { PageConnexion } from "./Connexion/PageConnexion";
import { AuthProvider } from "./auth";

export const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<PageAccueil />} />
          <Route path="/Login" element={<PageConnexion />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Programme" element={<ProgrammePage />} />
          <Route path="/Performance" element={<Performance />} />
          <Route path="/Accueil" element={<PageAccueil />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
