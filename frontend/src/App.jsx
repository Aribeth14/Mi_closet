import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

import Landing from './pages/Landing'
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
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/closet" element={<ProtectedRoute><Layout><Closet /></Layout></ProtectedRoute>} />
      <Route path="/closet/nueva" element={<ProtectedRoute><Layout><NuevaPrenda /></Layout></ProtectedRoute>} />
      <Route path="/crear-outfit" element={<ProtectedRoute><Layout><CrearOutfit /></Layout></ProtectedRoute>} />
      <Route path="/mis-outfits" element={<ProtectedRoute><Layout><MisOutfits /></Layout></ProtectedRoute>} />
      <Route path="/generar-outfit" element={<ProtectedRoute><Layout><GenerarOutfit /></Layout></ProtectedRoute>} />
      <Route path="/perfil" element={<ProtectedRoute><Layout><Perfil /></Layout></ProtectedRoute>} />
    </Routes>
  )
}
