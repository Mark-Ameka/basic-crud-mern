import { Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UpdateProduct from "./pages/UpdateProduct";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/update-product/:id" element={<UpdateProduct />} />

      {/* default route */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
