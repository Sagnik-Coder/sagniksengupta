const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('./texture/normalmap.png')
const RockyTexture = textureLoader.load('./texture/mountain.png')
const height = textureLoader.load('./texture/DisplacementMap.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Canvas2
const canvas2 = document.querySelector('canvas.webgl_2')

// Canvas3
const canvas3 = document.querySelector('canvas.webgl_3')

// Scene
const scene = new THREE.Scene();

// Scene2
const scene2 = new THREE.Scene()

// Scene3
const scene3 = new THREE.Scene()
 
// Objects
const geometry = new THREE.TorusKnotGeometry( .5, .15, 15, 200 );

// Objects2
const geometry2 = new THREE.TorusGeometry( .5, .35, 80, 300 );

// Objects3
const geometry3 = new THREE.PlaneBufferGeometry( 1, 2.2, 100, 100 );

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.8;
material.roughness = 0.15;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929)

// Materials2
const material2 = new THREE.PointsMaterial({
    size: 0.001,
    transparent: true
})

// Materials3
const material3 = new THREE.MeshStandardMaterial({
    color: 'grey',
    map: RockyTexture,
    displacementMap: height,
    displacementScale: 0.9,
    transparent: true,
    depthTest: false
})

// Mesh
const tkg = new THREE.Mesh(geometry,material)
scene.add(tkg)

// Mesh2
const sphere2 = new THREE.Points(geometry2,material2)
scene2.add(sphere2)

// Mesh3
const plane = new THREE.Mesh(geometry3,material3)
plane.rotation.x = 181
scene3.add(plane)


// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.set(2,3,4)
scene.add(pointLight)
scene2.add(pointLight)

// Lights {Scene: 3}
const pointLightPlane = new THREE.PointLight('#00b3ff', 2)
pointLightPlane.position.set(2,3,4)
scene3.add(pointLightPlane)

//Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2.2)
pointLight2.position.set(-6,3,-4.6);
pointLight2.intensity = 10;
scene.add(pointLight2)

//Light 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2.2)
pointLight3.position.set(6,-3,-6);
pointLight3.intensity = 10;
scene.add(pointLight3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Second -----------------------------------------------------------------------

    // Update camera
    camera2.aspect = sizes.width / sizes.height
    camera2.updateProjectionMatrix()

    // Update renderer
    renderer2.setSize(sizes.width, sizes.height)
    renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Third -----------------------------------------------------------------------

    // Update camera
    camera3.aspect = sizes.width / sizes.height
    camera3.updateProjectionMatrix()

    // Update renderer
    renderer3.setSize(sizes.width, sizes.height)
    renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Base camera2
const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera2.position.x = 0
camera2.position.y = 0
camera2.position.z = 2
scene2.add(camera2)

// Base camera2
const camera3 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera3.position.x = 0
camera3.position.y = 0
camera3.position.z = 2
scene3.add(camera3)


/**
 * Renderer
 */

// 1
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 2
const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true
})
renderer2.setSize(sizes.width, sizes.height)
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// 2
const renderer3 = new THREE.WebGLRenderer({
    canvas: canvas3,
    alpha: true
})
renderer3.setSize(sizes.width, sizes.height)
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener("mousemove", animateTerrain);

let mouseY, mouseX= 0;

function animateTerrain(event){
    mouseY = event.clientY
    mouseX = event.clientX
}

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
        // obj 1
    tkg.rotation.y = 0.5 * elapsedTime
    tkg.rotation.z = 0.5 * elapsedTime

        // obj2
    sphere2.rotation.y = .5 * elapsedTime

        //Obj3
    plane.rotation.z = .5 * elapsedTime;
    plane.material.displacementScale = .1 + mouseY * 0.002;


    // Render
    renderer.render(scene, camera)

    // Render2
    renderer2.render(scene2, camera2)

    // Render3
    renderer3.render(scene3, camera3)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()