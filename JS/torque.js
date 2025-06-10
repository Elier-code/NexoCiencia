// Get DOM elements
const container = document.getElementById('torqueCanvas');
const forceSlider = document.getElementById('force');
const angleXZSlider = document.getElementById('angleXZ');
const angleYSlider = document.getElementById('angleY');
const radiusSlider = document.getElementById('radius');
const forceValue = document.getElementById('forceValue');
const angleXZValue = document.getElementById('angleXZValue');
const angleYValue = document.getElementById('angleYValue');
const radiusValue = document.getElementById('radiusValue');
const torqueValue = document.getElementById('torqueValue');
const perpForceValue = document.getElementById('perpForceValue');
const leverArmValue = document.getElementById('leverArmValue');

// Initialize Three.js scene
const { scene, camera, renderer, controls } = createScene(container);

// Simulation parameters
let force = 50;
let angleXZ = 45;
let angleY = 30;
let radius = 2;

// Create objects for the simulation
const axis = createAxis(10, 0.05);
scene.add(axis);

// Create arrows for vectors
const radiusArrow = createArrow(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    radius,
    0x3498db
);
scene.add(radiusArrow);

const forceArrow = createArrow(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(radius, 0, 0),
    force / 20,
    0xe74c3c
);
scene.add(forceArrow);

const torqueArrow = createArrow(
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0x27ae60
);
scene.add(torqueArrow);

// Event listeners
forceSlider.addEventListener('input', (e) => {
    force = parseFloat(e.target.value);
    forceValue.textContent = `${force} N`;
    updateSimulation();
});

angleXZSlider.addEventListener('input', (e) => {
    angleXZ = parseFloat(e.target.value);
    angleXZValue.textContent = `${angleXZ}°`;
    updateSimulation();
});

angleYSlider.addEventListener('input', (e) => {
    angleY = parseFloat(e.target.value);
    angleYValue.textContent = `${angleY}°`;
    updateSimulation();
});

radiusSlider.addEventListener('input', (e) => {
    radius = parseFloat(e.target.value);
    radiusValue.textContent = `${radius} m`;
    updateSimulation();
});

function updateSimulation() {
    // Update radius vector
    radiusArrow.setLength(radius);
    
    // Calculate force vector direction
    const angleXZRad = degToRad(angleXZ);
    const angleYRad = degToRad(angleY);
    const forceDirection = new THREE.Vector3(
        Math.cos(angleYRad) * Math.cos(angleXZRad),
        Math.sin(angleYRad),
        Math.cos(angleYRad) * Math.sin(angleXZRad)
    );
    
    // Update force vector
    forceArrow.position.set(
        radius * Math.cos(0),
        0,
        radius * Math.sin(0)
    );
    forceArrow.setDirection(forceDirection);
    forceArrow.setLength(force / 20);
    
    // Calculate torque
    const radiusVector = new THREE.Vector3(radius, 0, 0);
    const forceVector = forceDirection.multiplyScalar(force);
    const torqueVector = new THREE.Vector3();
    torqueVector.crossVectors(radiusVector, forceVector);
    
    // Update torque vector
    const torqueMagnitude = torqueVector.length();
    if (torqueMagnitude > 0) {
        torqueArrow.setDirection(torqueVector.normalize());
        torqueArrow.setLength(torqueMagnitude / 20);
    }
    
    // Calculate perpendicular component and lever arm
    const perpComponent = force * Math.sin(Math.acos(radiusVector.dot(forceVector) / (radius * force)));
    const leverArm = radius * Math.sin(Math.acos(radiusVector.dot(forceVector) / (radius * force)));
    
    // Update displays
    torqueValue.textContent = torqueMagnitude.toFixed(2);
    perpForceValue.textContent = perpComponent.toFixed(2);
    leverArmValue.textContent = leverArm.toFixed(2);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize
updateSimulation();
animate(); 