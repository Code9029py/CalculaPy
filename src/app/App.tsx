import { Route, Routes } from "react-router-dom";

import { SiteLayout } from "../components/layout/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CalculatorsIndexPage } from "../pages/calculators/CalculatorsIndexPage";
import { IvaPage } from "../pages/calculators/IvaPage";
import { AvisoImportantePage } from "../pages/institucional/AvisoImportantePage";
import { ContactoPage } from "../pages/institucional/ContactoPage";
import { FuentesPage } from "../pages/institucional/FuentesPage";
import { MetodologiaPage } from "../pages/institucional/MetodologiaPage";
import { PrivacidadPage } from "../pages/institucional/PrivacidadPage";

export function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculadoras" element={<CalculatorsIndexPage />} />
        <Route path="/calculadoras/iva" element={<IvaPage />} />
        <Route path="/metodologia" element={<MetodologiaPage />} />
        <Route path="/fuentes" element={<FuentesPage />} />
        <Route path="/aviso-importante" element={<AvisoImportantePage />} />
        <Route path="/privacidad" element={<PrivacidadPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
