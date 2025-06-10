// Get DOM elements
const container = document.getElementById('motionCanvas');
const initialVelocitySlider = document.getElementById('initialVelocity');
const accelerationSlider = document.getElementById('acceleration');
const radiusSlider = document.getElementById('radius');
const rotationAxisSelect = document.getElementById('rotationAxis');
const initialVelocityValue = document.getElementById('initialVelocityValue');
const accelerationValue = document.getElementById('accelerationValue');
const radiusValue = document.getElementById('radiusValue');
const currentVelocityDisplay = document.getElementById('currentVelocity');
const currentAccelerationDisplay = document.getElementById('currentAcceleration');
const centripetalAccelerationDisplay = document.getElementById('centripetalAcceleration');

// Initialize Three.js scene
const { scene, camera, renderer, controls } = createScene(container);

// Simulation parameters
let initialVelocity = 2.0;
let angularAcceleration = 1.0;
let radius = 2.0;
let currentVelocity = initialVelocity;
let angle = 0;
let time = 0;
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

// Create acceleration vector
const accelerationArrow = createArrow(
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(0, 0, 0),
    1,
    0xe67e22
);
scene.add(accelerationArrow);

// Initialize Chart.js graphs
const velocityCtx = document.getElementById('velocityGraph').getContext('2d');
const accelerationCtx = document.getElementById('accelerationGraph').getContext('2d');

const velocityChart = new Chart(velocityCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Velocidad Angular (rad/s)',
            data: [],
            borderColor: '#27ae60',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Velocidad (rad/s)'
                }
            }
        }
    }
});

const accelerationChart = new Chart(accelerationCtx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Aceleración Angular (rad/s²)',
            data: [],
            borderColor: '#e67e22',
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Tiempo (s)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Aceleración (rad/s²)'
                }
            }
        }
    }
});

// Event listeners
initialVelocitySlider.addEventListener('input', (e) => {
    initialVelocity = parseFloat(e.target.value);
    currentVelocity = initialVelocity;
    initialVelocityValue.textContent = `${initialVelocity.toFixed(1)} rad/s`;
    resetSimulation();
});

accelerationSlider.addEventListener('input', (e) => {
    angularAcceleration = parseFloat(e.target.value);
    accelerationValue.textContent = `${angularAcceleration.toFixed(1)} rad/s²`;
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

function resetSimulation() {
    time = 0;
    angle = 0;
    currentVelocity = initialVelocity;
    velocityChart.data.labels = [];
    velocityChart.data.datasets[0].data = [];
    accelerationChart.data.labels = [];
    accelerationChart.data.datasets[0].data = [];
    velocityChart.update();
    accelerationChart.update();
}

function updateOrbit() {
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

function updateGraphs() {
    const maxPoints = 100;
    
    velocityChart.data.labels.push(time.toFixed(1));
    velocityChart.data.datasets[0].data.push(currentVelocity);
    
    accelerationChart.data.labels.push(time.toFixed(1));
    accelerationChart.data.datasets[0].data.push(angularAcceleration);
    
    if (velocityChart.data.labels.length > maxPoints) {
        velocityChart.data.labels.shift();
        velocityChart.data.datasets[0].data.shift();
        accelerationChart.data.labels.shift();
        accelerationChart.data.datasets[0].data.shift();
    }
    
    velocityChart.update();
    accelerationChart.update();
}

function updateSimulation(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000;
    lastTime = currentTime;
    time += deltaTime;
    
    // Update physics
    currentVelocity += angularAcceleration * deltaTime;
    angle += currentVelocity * deltaTime;
    
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
    velocityArrow.setLength(Math.abs(currentVelocity) / 2);
    
    // Update acceleration vector
    accelerationArrow.position.copy(sphere.position);
    accelerationArrow.setDirection(velocityDirection);
    accelerationArrow.setLength(Math.abs(angularAcceleration) / 2);
    
    // Calculate centripetal acceleration
    const centripetalAcc = Math.pow(currentVelocity, 2) * radius;
    
    // Update displays
    currentVelocityDisplay.textContent = currentVelocity.toFixed(2);
    currentAccelerationDisplay.textContent = angularAcceleration.toFixed(2);
    centripetalAccelerationDisplay.textContent = centripetalAcc.toFixed(2);
    
    // Update graphs
    updateGraphs();
    
    // Render
    renderer.render(scene, camera);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    updateSimulation(performance.now());
}

// Initialize
resetSimulation();
updateOrbit();
animate(); 