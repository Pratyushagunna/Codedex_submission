document.addEventListener("DOMContentLoaded", () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Attach the renderer to the #3d-menu div
    document.getElementById("3d-menu").appendChild(renderer.domElement);

    // Adding a light source
    const light = new THREE.PointLight(0xFFFFFF);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Food items to display
    const foodItems = [
        { name: "Boba Milk Tea", position: { x: -2, y: 2, z: -5 }, model: 'models/boba_milk_tea.glb' },
        { name: "Egg Waffle", position: { x: 2, y: 2, z: -5 }, model: 'models/egg_waffle.glb' },
        { name: "Matcha Latte", position: { x: -2, y: 0, z: -5 }, model: 'models/matcha_latte.glb' },
        { name: "Taro Smoothie", position: { x: 2, y: 0, z: -5 }, model: 'models/taro_smoothie.glb' },
        { name: "Mango Pudding", position: { x: 0, y: -2, z: -5 }, model: 'models/mango_pudding.glb' }
    ];

    const loader = new THREE.GLTFLoader();

    foodItems.forEach(item => {
        loader.load(item.model, (gltf) => {
            const model = gltf.scene;
            model.position.set(item.position.x, item.position.y, item.position.z);
            model.scale.set(0.5, 0.5, 0.5); // Adjust the scale as needed
            scene.add(model);
        }, undefined, (error) => {
            console.error('An error happened while loading the model', error);
        });
    });

    camera.position.z = 10;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
