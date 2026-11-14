import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import PlaceTabs from './components/PlaceTabs.jsx'
import Simulator3D from './components/Simulator3D.jsx'
import CameraCards from './components/CameraCards.jsx'
import Catalog from './components/Catalog.jsx'
import QuoteForm from './components/QuoteForm.jsx'
import Installation from './components/Installation.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { cargarEscena } from './scenes/index.js'

export default function App() {
  // Estado compartido: lugar elegido y cámara resaltada (null = todas).
  const [lugar, setLugar] = useState('local')
  const [camaraSel, setCamaraSel] = useState(null)
  // Datos de la escena cargada (cada escena se descarga solo cuando se elige).
  const [escena, setEscena] = useState(null)
  const visorRef = useRef(null)

  useEffect(() => {
    let vigente = true
    cargarEscena(lugar)
      .then((e) => {
        if (vigente) setEscena(e)
      })
      .catch((err) => console.error('No se pudo cargar la escena', err))
    return () => {
      vigente = false
    }
  }, [lugar])

  const cambiarLugar = useCallback((nuevo) => {
    setLugar(nuevo)
    setCamaraSel(null)
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero lugar={lugar} />
        <PlaceTabs lugar={lugar} onChange={cambiarLugar} />
        <Simulator3D
          lugar={lugar}
          escena={escena}
          camaraSel={camaraSel}
          onSelectCamara={setCamaraSel}
          visorRef={visorRef}
        />
        <CameraCards
          lugar={lugar}
          escena={escena}
          camaraSel={camaraSel}
          onSelectCamara={setCamaraSel}
          visorRef={visorRef}
        />
        <Catalog />
        <QuoteForm lugar={lugar} onChangeLugar={cambiarLugar} />
        <Installation />
        <HowWeWork />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
