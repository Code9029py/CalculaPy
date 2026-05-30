import { Route, Routes } from "react-router-dom";

import { SiteLayout } from "../components/layout/SiteLayout";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { CalculatorsIndexPage } from "../pages/calculators/CalculatorsIndexPage";
import { IvaPage } from "../pages/calculators/IvaPage";

export function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calculadoras" element={<CalculatorsIndexPage />} />
        <Route path="/calculadoras/iva" element={<IvaPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
