import { Route, Routes } from "react-router-dom";

import { SiteLayout } from "../components/layout/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CalculatorsIndexPage } from "../pages/calculators/CalculatorsIndexPage";
import { CuotasPage } from "../pages/calculators/CuotasPage";
import { IvaPage } from "../pages/calculators/IvaPage";
import { PresupuestoPage } from "../pages/calculators/PresupuestoPage";
import { ContactoPage } from "../pages/institucional/ContactoPage";
import { TransparenciaPage } from "../pages/institucional/TransparenciaPage";

export function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculadoras" element={<CalculatorsIndexPage />} />
        <Route path="/calculadoras/iva" element={<IvaPage />} />
        <Route path="/calculadoras/cuotas" element={<CuotasPage />} />
        <Route path="/calculadoras/presupuesto" element={<PresupuestoPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/transparencia" element={<TransparenciaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
