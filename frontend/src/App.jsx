import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Closet from './pages/Closet'
import NuevaPrenda from './pages/NuevaPrenda'
import CrearOutfit from './pages/CrearOutfit'
import MisOutfits from './pages/MisOutfits'
import GenerarOutfit from './pages/GenerarOutfit'
import Perfil from './pages/Perfil'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/closet" element={<Closet />} />
      <Route path="/closet/nueva" element={<NuevaPrenda />} />
      <Route path="/crear-outfit" element={<CrearOutfit />} />
      <Route path="/mis-outfits" element={<MisOutfits />} />
      <Route path="/generar-outfit" element={<GenerarOutfit />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>

  )
}


