import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"


class ThreeExperience {
  constructor() {
    this.container = document.createElement('div')

    /* Camera */
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.set(0, 1, 8)
    this.scene = new THREE.Scene()
    this.scene.add(this.camera)

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.renderer.setAnimationLoop(this.render.bind(this))
    this.container.appendChild(this.renderer.domElement)

    /* LOAD MODEL 3D */
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/scene.gltf',
    (gltf) => {   //onLoad
      this.scene.add(gltf.scene)
    },
    () => {      //onProgress
      console.log("progress")
    },
    () => {       //error
      console.log("error")
    }
    )
    //Lights
    const light1 = new THREE.DirectionalLight(0xffffff,1)
    light1.position.set(6,6,6)
    this.scene.add(light1) 
    const al = new THREE.AmbientLight(0xffffff, 1)
    this.scene.add(al)


    /* Controls */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    /* Resize */
    window.addEventListener('resize', this.resize.bind(this))
  }

  initScene() {
    document.getElementById('container3D').appendChild(this.container)
  }

  render() {
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    const { clientWidth: width, clientHeight: height } =
      document.getElementById('container3D')
    this.renderer.setSize(width, height)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  cleanUp() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.dispose()
        child.geometry.dispose()
      }
    })

    document.getElementById('container3D').removeChild(this.container)
  }
}

export { ThreeExperience }
