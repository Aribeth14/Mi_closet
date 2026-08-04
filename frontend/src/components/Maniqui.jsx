import { Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const REFERENCIA = {
  estatura: 165,
  busto: 90,
  cintura: 70,
  cadera: 95
}

function ModeloManiqui({ medidas }) {
  const { scene } = useGLTF('/models/maniqui.glb')
  const interno = useRef()

  useEffect(() => {
    if (!interno.current) return

    // 1. Medimos el modelo tal como vino (sin saber sus unidades originales)
    const caja = new THREE.Box3().setFromObject(interno.current)
    const tamano = new THREE.Vector3()
    caja.getSize(tamano)

    // 2. Lo escalamos para que mida siempre 1.7 unidades de alto, sin importar el origen
    const alturaObjetivo = 1.7
    const factor = tamano.y > 0 ? alturaObjetivo / tamano.y : 1
    interno.current.scale.setScalar(factor)

    // 3. Recalculamos la caja ya escalada, y lo centramos + apoyamos los pies en el piso (y=0)
    const cajaFinal = new THREE.Box3().setFromObject(interno.current)
    interno.current.position.x -= (cajaFinal.min.x + cajaFinal.max.x) / 2
    interno.current.position.z -= (cajaFinal.min.z + cajaFinal.max.z) / 2
    interno.current.position.y -= cajaFinal.min.y
  }, [scene])

  const m = { ...REFERENCIA, ...medidas }
  const escalaAltura = m.estatura / REFERENCIA.estatura
  const promedioAncho =
    (m.busto / REFERENCIA.busto + m.cintura / REFERENCIA.cintura + m.cadera / REFERENCIA.cadera) / 3

  return (
    <group scale={[promedioAncho, escalaAltura, promedioAncho]} position={[0, -0.85, 0]}>
      <group ref={interno}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

export default function Maniqui({ medidas }) {
  return (
    <Canvas camera={{ position: [0, 0.15, 2.3], fov: 32 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 3]} intensity={1} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />

      <Suspense fallback={null}>
        <ModeloManiqui medidas={medidas} />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={1}
        maxDistance={5}
        target={[0, 0.35, 0]}
      />
    </Canvas>
  )
}

useGLTF.preload('/models/maniqui.glb')

