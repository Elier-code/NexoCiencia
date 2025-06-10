// Get DOM elements
const container = document.getElementById('rotationCanvas');
const velocitySlider = document.getElementById('angularVelocity');
const radiusSlider = document.getElementById('radius');
const rotationAxisSelect = document.getElementById('rotationAxis');
const velocityValue = document.getElementById('velocityValue');
const radiusValue = document.getElementById('radiusValue');
const angularPositionDisplay = document.getElementById('angularPosition');
const angularDisplacementDisplay = document.getElementById('angularDisplacement');
const periodDisplay = document.getElementById('period');
const frequencyDisplay = document.getElementById('frequency');

// Initialize Three.js scene
const { scene, camera, renderer, controls } = createScene(container);

// Simulation parameters
let angularVelocity = 1.0;
let radius = 2.0;
let angle = 0;
let initialAngle = 0;
let lastTime = performance.now();
let rotationAxis = 'y';

// Create objects for the simulation
const axis = createAxis(10, 0.05);
scene.add(axis);

// Create rotating object
const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xe74c3c });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Create orbit path
const orbitGeometry = new THREE.BufferGeometry();
const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x3498db });
const orbitPoints = [];
for (let i = 0; i <= 64; i++) {
    const t = (i / 64) * Math.PI * 2;
    orbitPoints.push(new THREE.Vector3(
        radius * Math.cos(t),
        0,
        radius * Math.sin(t)
    ));
}
orbitGeometry.setFromPoints(orbitPoints);
const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
scene.add(orbit);

// Create velocity vector
const velocityArrow = createArrow(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0x27ae60
);
scene.add(velocityArrow);

// Event listeners
velocitySlider.addEventListener('input', (e) => {
    angularVelocity = parseFloat(e.target.value);
    velocityValue.textContent = `${angularVelocity.toFixed(1)} rad/s`;
    updatePeriodAndFrequency();
});

radiusSlider.addEventListener('input', (e) => {
    radius = parseFloat(e.target.value);
    radiusValue.textContent = `${radius.toFixed(1)} m`;
    updateOrbit();
});

rotationAxisSelect.addEventListener('change', (e) => {
    rotationAxis = e.target.value;
    updateOrbit();
});

function updatePeriodAndFrequency() {
    if (angularVelocity === 0) {
        periodDisplay.textContent = "∞";
        frequencyDisplay.textContent = "0";
    } else {
        const period = (2 * Math.PI / angularVelocity).toFixed(2);
        const frequency = (angularVelocity / (2 * Math.PI)).toFixed(2);
        periodDisplay.textContent = `${period} s`;
        frequencyDisplay.textContent = `${frequency} Hz`;
    }
}

function updateOrbit() {
    // Update orbit path
    const points = [];
    for (let i = 0; i <= 64; i++) {
        const t = (i / 64) * Math.PI * 2;
        let x, y, z;
        switch (rotationAxis) {
            case 'x':
                x = 0;
                y = radius * Math.cos(t);
                z = radius * Math.sin(t);
                break;
            case 'y':
                x = radius * Math.cos(t);
                y = 0;
                z = radius * Math.sin(t);
                break;
            case 'z':
                x = radius * Math.cos(t);
                y = radius * Math.sin(t);
                z = 0;
                break;
        }
        points.push(new THREE.Vector3(x, y, z));
    }
    orbitGeometry.setFromPoints(points);
}

function updateSimulation(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    
    // Update angle
    angle += angularVelocity * deltaTime;
    
    // Update sphere position
    switch (rotationAxis) {
        case 'x':
            sphere.position.set(
                0,
                radius * Math.cos(angle),
                radius * Math.sin(angle)
            );
            break;
        case 'y':
            sphere.position.set(
                radius * Math.cos(angle),
                0,
                radius * Math.sin(angle)
            );
            break;
        case 'z':
            sphere.position.set(
                radius * Math.cos(angle),
                radius * Math.sin(angle),
                0
            );
            break;
    }
    
    // Update velocity vector
    const tangentAngle = angle + Math.PI / 2;
    let velocityDirection;
    switch (rotationAxis) {
        case 'x':
            velocityDirection = new THREE.Vector3(
                0,
                -Math.sin(angle),
                Math.cos(angle)
            );
            break;
        case 'y':
            velocityDirection = new THREE.Vector3(
                -Math.sin(angle),
                0,
                Math.cos(angle)
            );
            break;
        case 'z':
            velocityDirection = new THREE.Vector3(
                -Math.sin(angle),
                Math.cos(angle),
                0
            );
            break;
    }
    velocityArrow.position.copy(sphere.position);
    velocityArrow.setDirection(velocityDirection);
    velocityArrow.setLength(angularVelocity / 2);
    
    // Update displays
    angularPositionDisplay.textContent = (angle % (2 * Math.PI)).toFixed(2);
    angularDisplacementDisplay.textContent = (angle - initialAngle).toFixed(2);
    
    // Render
    renderer.render(scene, camera);
    requestAnimationFrame(updateSimulation);
}

// Initialize
updatePeriodAndFrequency();
updateOrbit();
animate();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateSimulation(performance.now());
} 