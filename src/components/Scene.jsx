import { useEffect } from 'react'
import { ThreeExperience } from './Script'

export default function Scene() {
  const three = new ThreeExperience()

  useEffect(() => {
    three.initScene()
    return () => {
      three.cleanUp()
      console.log('first')
    }
  }, [])

  return (
    <>
      <div id="container3D" className="scene_container"></div>
    </>
  )
}
