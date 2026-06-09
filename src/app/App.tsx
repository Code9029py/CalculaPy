import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { SiteLayout } from "../components/layout/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CalculatorsIndexPage } from "../pages/calculators/CalculatorsIndexPage";
import { CombustiblePage } from "../pages/calculators/CombustiblePage";
import { CuotasPage } from "../pages/calculators/CuotasPage";
import { ImportacionPage } from "../pages/calculators/ImportacionPage";
import { IvaPage } from "../pages/calculators/IvaPage";
import { PresupuestoPage } from "../pages/calculators/PresupuestoPage";
import { ContactoPage } from "../pages/institucional/ContactoPage";
import { TransparenciaPage } from "../pages/institucional/TransparenciaPage";
import { recordCalculatorUse } from "../utils/recentCalculators";

const CALCULATOR_PATH_PATTERN = /^\/calculadoras\/([^/]+)$/;

function CalculatorVisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const match = location.pathname.match(CALCULATOR_PATH_PATTERN);
    if (match) {
      recordCalculatorUse(match[1]);
    }
  }, [location.pathname]);

  return null;
}

export function App() {
  return (
    <SiteLayout>
      <CalculatorVisitTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculadoras" element={<CalculatorsIndexPage />} />
        <Route path="/calculadoras/iva" element={<IvaPage />} />
        <Route path="/calculadoras/cuotas" element={<CuotasPage />} />
        <Route path="/calculadoras/presupuesto" element={<PresupuestoPage />} />
        <Route path="/calculadoras/combustible" element={<CombustiblePage />} />
        <Route path="/calculadoras/importacion" element={<ImportacionPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
