import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Door textures
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Wall textures
const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

// Floor textures
const grassColorTexture = textureLoader.load('/textures/ground/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/ground/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/ground/normal.jpg')
const grassHeightTexture = textureLoader.load('/textures/ground/height.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/ground/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

// Bush textures
const bushColorTexture = textureLoader.load('./textures/bush/color.jpg')
const bushAmbientOcclusionTexture = textureLoader.load('./textures/bush/ambientOcclusion.jpg')
const bushNormalTexture = textureLoader.load('./textures/bush/normal.jpg')
const bushHeightTexture = textureLoader.load('./textures/bush/height.jpg')
const bushRoughnessTexture = textureLoader.load('./textures/bush/roughness.jpg')

bushColorTexture.repeat.set(2, 2)
bushAmbientOcclusionTexture.repeat.set(2, 2)
bushNormalTexture.repeat.set(2, 2)
bushHeightTexture.repeat.set(2, 2)
bushRoughnessTexture.repeat.set(2, 2)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping
bushHeightTexture.wrapS = THREE.RepeatWrapping
bushRoughnessTexture.wrapS = THREE.RepeatWrapping

bushColorTexture.wrapT = THREE.RepeatWrapping
bushAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
bushNormalTexture.wrapT = THREE.RepeatWrapping
bushHeightTexture.wrapT = THREE.RepeatWrapping
bushRoughnessTexture.wrapT = THREE.RepeatWrapping

// Grave textures
const graveColorTexture = textureLoader.load('./textures/grave/normal.jpg')
const graveAmbientOcclusionTexture = textureLoader.load('./textures/grave/ambientOcclusion.jpg')
const graveNormalTexture = textureLoader.load('./textures/grave/normal.jpg')
const graveHeightTexture = textureLoader.load('./textures/grave/height.jpg')
const graveRoughness = textureLoader.load('./textures/grave/roughness.jpg')

// Roof textures
const roofColorTexture = textureLoader.load('./textures/roof/color.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('./textures/roof/ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('./textures/roof/normal.jpg')
const roofHeightTexture = textureLoader.load('./textures/roof/height.jpg')
const roofRoughnessTexture = textureLoader.load('./textures/roof/roughness.jpg')

roofColorTexture.offset.y = 10
roofColorTexture.rotation = Math.PI * 0.25


roofColorTexture.repeat.set(3, 3)
roofAmbientOcclusionTexture.repeat.set(3, 3)
roofNormalTexture.repeat.set(3, 3)
roofHeightTexture.repeat.set(3, 3)
roofRoughnessTexture.repeat.set(3, 3)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping
roofHeightTexture.wrapS = THREE.RepeatWrapping
roofRoughnessTexture.wrapS = THREE.RepeatWrapping

roofColorTexture.wrapT = THREE.RepeatWrapping
roofAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
roofNormalTexture.wrapT = THREE.RepeatWrapping
roofHeightTexture.wrapT = THREE.RepeatWrapping
roofRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
// House Container
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 / 2

// Rooftop
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        // aoMap: roofAmbientOcclusionTexture,
        // normalMap: roofNormalTexture,
        // displacementMap: roofHeightTexture,
        // displacementScale: 1,
        // roughnessMap: roofRoughnessTexture
    })
)
roof.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(roof.geometry.attributes.uv.array, 2))
roof.rotation.y = Math.PI * 0.25
roof.position.y = 2.5 + (1 / 2)


// Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.12,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))
door.position.y = 1
door.position.z = 2 + 0.01

house.add(walls, roof, door)

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 100, 100)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColorTexture,
    aoMap: bushAmbientOcclusionTexture,
    normalMap: bushNormalTexture,
    displacementMap: bushHeightTexture,
    displacementScale: 0.4,
    roughnessMap: bushRoughnessTexture,
    roughness: 0

})

gui
    .add(bushMaterial, 'displacementScale').min(0).max(1).step(0.001)
gui
    .add(bushMaterial, 'roughness').min(0).max(1).step(0.001)


const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bush1.geometry.attributes.uv.array, 2))

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.4, 0.4, 0.4)
bush2.position.set(-0.8, 0.2, 2.2)
bush2.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bush2.geometry.attributes.uv.array, 2))

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.25, 0.25, 0.25)
bush3.position.set(1.4, 0.2, 2.2)
bush3.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bush3.geometry.attributes.uv.array, 2))

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.2, 0.2, 0.2)
bush4.position.set(-1.2, 0.1, 2.5)
bush4.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(bush4.geometry.attributes.uv.array, 2))

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2, 100, 100)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: graveNormalTexture,
    displacementMap: graveHeightTexture,
    displacementScale: 0,
    roughnessMap: graveRoughness,
})

gui
    .add(graveMaterial, 'displacementScale').min(0).max(1).step(0.0001).name('graveScale')

for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius

    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    grave.position.set(x, 0.3, z)

    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4

    grave.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(grave.geometry.attributes.uv.array, 2))

    graves.add(grave)
    grave.castShadow = true
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        displacementMap: grassHeightTexture,
        displacementScale: 0.005,
        roughnessMap: grassRoughnessTexture,
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = -Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, -2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(moonLight)

// Point light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

// Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

/**
 * Shadow
 */
renderer.shadowMap.enabled = true

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true
floor.receiveShadow = true

// Optimize shadow
moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

// ...

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

// ...

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

// ...

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

// ...

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7

// ...

renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = -elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = -elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
