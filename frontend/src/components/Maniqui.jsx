import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

const REFERENCIA = {
  estatura: 165,
  busto: 90,
  cintura: 70,
  cadera: 95
}

// Valores medidos directamente del archivo maniqui.glb (fijos)
const CENTRO_X = 6.3975
const CENTRO_Z = 0.0905
const PIE_Y = -0.002
const ALTO_ORIGINAL = 1.912
const ALTO_OBJETIVO = 1.7
const FACTOR = ALTO_OBJETIVO / ALTO_ORIGINAL

function ModeloManiqui({ medidas }) {
  const { scene } = useGLTF('/models/maniqui.glb')

  const m = { ...REFERENCIA, ...medidas }
  const escalaAltura = m.estatura / REFERENCIA.estatura
  const promedioAncho =
    (m.busto / REFERENCIA.busto + m.cintura / REFERENCIA.cintura + m.cadera / REFERENCIA.cadera) / 3

  // Escala ÚNICA (no distinta por eje) para no deformar el esqueleto interno del modelo
  const escalaGeneral = (escalaAltura + promedioAncho) / 2

  return (
    <group scale={escalaGeneral}>
      <group
        scale={FACTOR}
        position={[-CENTRO_X * FACTOR, -PIE_Y * FACTOR, -CENTRO_Z * FACTOR]}
      >
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default function Maniqui({ medidas }) {
  return (
    <Canvas camera={{ position: [0, 1, 2.3], fov: 30 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 3]} intensity={1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />

      <Suspense fallback={null}>
        <ModeloManiqui medidas={medidas} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={1}
        maxDistance={6}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        target={[0, 0.95, 0]}
      />
    </Canvas>
  )
}

useGLTF.preload('/models/maniqui.glb')
