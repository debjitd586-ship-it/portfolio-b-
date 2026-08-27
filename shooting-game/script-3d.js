const canvas = document.querySelector('#game-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07111d, 0.022);
const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const arena = new THREE.Group();
scene.add(arena);
scene.add(new THREE.HemisphereLight(0x9cecff, 0x09101c, 1.8));
const pinkLight = new THREE.PointLight(0xff197d, 22, 30);
pinkLight.position.set(-7, 6, -8);
scene.add(pinkLight);
const cyanLight = new THREE.PointLight(0x1fe6ff, 24, 34);
cyanLight.position.set(7, 4, 4);
scene.add(cyanLight);
const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: 0x081522, metalness: 0.72, roughness: 0.42 }));
floor.rotation.x = -Math.PI / 2;
arena.add(floor);
const grid = new THREE.GridHelper(80, 40, 0x1a6370, 0x0c2a38);
grid.position.y = 0.02;
arena.add(grid);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x0b2330, emissive: 0x04131d, metalness: 0.8 });
[[0, 3, -18, 36, 6, 1], [0, 3, 18, 36, 6, 1], [-18, 3, 0, 1, 6, 36], [18, 3, 0, 1, 6, 36]].forEach(([x, y, z, sx, sy, sz]) => {
  const wall = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), wallMaterial);
  wall.position.set(x, y, z);
  arena.add(wall);
});

const neonMaterial = new THREE.MeshStandardMaterial({ color: 0x285064, metalness: 0.68, roughness: 0.28, emissive: 0x0a2635, emissiveIntensity: 1.35 });
const cyanMaterial = new THREE.MeshStandardMaterial({ color: 0x70f6ff, emissive: 0x0b7e91, emissiveIntensity: 1.5, metalness: 0.4, roughness: 0.25 });
const pinkMaterial = new THREE.MeshStandardMaterial({ color: 0xff4fa3, emissive: 0x8e164f, emissiveIntensity: 1.4 });
const skinMaterial = new THREE.MeshStandardMaterial({ color: 0x9b5a4d, roughness: 0.72 });

function addBox(group, size, position, material, rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  group.add(mesh);
  return mesh;
}

function buildPlayer() {
  const root = new THREE.Group();
  root.position.set(0, 0, 7);
  const body = new THREE.Group();
  body.position.x = -1.45;
  body.visible = false;
  root.add(body);
  const pilotLight = new THREE.PointLight(0x70f6ff, 3.2, 8);
  pilotLight.position.set(0, 2.1, 2.3);
  root.add(pilotLight);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.72, 1.35, 6, 12), neonMaterial);
  torso.scale.set(1, 1, 0.58);
  torso.position.y = 1.55;
  body.add(torso);
  const chest = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.38, 0.08), cyanMaterial);
  chest.position.set(0, 1.75, 0.52);
  body.add(chest);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 14), skinMaterial);
  head.position.y = 2.85;
  body.add(head);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.54, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), neonMaterial);
  helmet.position.y = 2.92;
  body.add(helmet);
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.19, 0.08), pinkMaterial);
  visor.position.set(0, 2.82, 0.43);
  visor.rotation.x = -0.08;
  body.add(visor);
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.22, 8), cyanMaterial);
  antenna.position.set(0, 3.46, 0);
  body.add(antenna);
  const antennaLight = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), new THREE.MeshBasicMaterial({ color: 0xf5ff79 }));
  antennaLight.position.set(0, 3.58, 0);
  body.add(antennaLight);

  const leftArm = new THREE.Group();
  leftArm.position.set(-0.8, 2.1, 0.05);
  leftArm.rotation.z = -0.35;
  addBox(leftArm, [0.3, 1.05, 0.3], [0, -0.48, 0], neonMaterial, [0, 0, 0.08]);
  const rightArm = new THREE.Group();
  rightArm.position.set(0.8, 2.1, 0.05);
  rightArm.rotation.z = 0.35;
  addBox(rightArm, [0.3, 1.05, 0.3], [0, -0.48, 0], neonMaterial, [0, 0, -0.08]);
  body.add(leftArm, rightArm);

  const rifle = new THREE.Group();
  rifle.position.set(0, 1.62, 0.92);
  rifle.rotation.x = -0.06;
  addBox(rifle, [1.75, 0.25, 0.28], [0, 0, 0], neonMaterial, [0, 0, 0]);
  addBox(rifle, [1.1, 0.07, 0.08], [-0.05, 0.17, 0.16], pinkMaterial);
  addBox(rifle, [0.55, 0.12, 0.38], [-0.45, -0.2, 0], pinkMaterial, [0, 0, -0.18]);
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.68, 12), cyanMaterial);
  barrel.rotation.z = Math.PI / 2;
  barrel.position.set(1.12, 0, 0);
  rifle.add(barrel);
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 8), new THREE.MeshBasicMaterial({ color: 0xf5ff79 }));
  muzzle.position.set(1.48, 0, 0);
  muzzle.visible = false;
  rifle.add(muzzle);
  body.add(rifle);

  const hips = addBox(body, [1.02, 0.3, 0.65], [0, 0.72, 0], neonMaterial);
  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.34, 0.52, 0);
  leftLeg.rotation.z = -0.04;
  addBox(leftLeg, [0.34, 1.05, 0.38], [0, -0.52, 0], neonMaterial);
  addBox(leftLeg, [0.52, 0.2, 0.7], [0, -1.05, 0.1], cyanMaterial);
  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.34, 0.52, 0);
  rightLeg.rotation.z = 0.04;
  addBox(rightLeg, [0.34, 1.05, 0.38], [0, -0.52, 0], neonMaterial);
  addBox(rightLeg, [0.52, 0.2, 0.7], [0, -1.05, 0.1], cyanMaterial);
  body.add(hips, leftLeg, rightLeg);
  root.userData = { body, rifle, muzzle, baseY: 0 };
  return root;
}

const player = buildPlayer();
scene.add(player);
const keys = {};
const targets = [];
const raycaster = new THREE.Raycaster();
const clock = new THREE.Clock();
let running = false;
let score = 0;
let health = 100;
let ammo = 12;
let wave = 1;
let spawnTimer = 0;
let cooldown = 0;
let movingForward = false;
let movingBackward = false;
let movingLeft = false;
let movingRight = false;
let shooting = false;
let aimX = 0.5;
let aimY = 0.5;
const reticle = document.querySelector('.reticle');

function setAim(clientX, clientY) {
  aimX = THREE.MathUtils.clamp(clientX / innerWidth, 0.08, 0.92);
  aimY = THREE.MathUtils.clamp(clientY / innerHeight, 0.12, 0.84);
  reticle.style.left = `${aimX * 100}%`;
  reticle.style.top = `${aimY * 100}%`;
}

function target() {
  const group = new THREE.Group();
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 1), new THREE.MeshStandardMaterial({ color: 0xff4fa3, emissive: 0xff155f, emissiveIntensity: 2 }));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.045, 8, 32), new THREE.MeshBasicMaterial({ color: 0xf5ff79 }));
  ring.rotation.x = Math.PI / 2;
  group.add(core, ring);
  group.position.set((Math.random() - 0.5) * 27, 1.1 + Math.random() * 3.8, -3 - Math.random() * 11);
  group.userData.phase = Math.random() * 6;
  arena.add(group);
  targets.push(group);
}

function removeTarget(group) {
  arena.remove(group);
  const index = targets.indexOf(group);
  if (index >= 0) targets.splice(index, 1);
}

function hud() {
  document.querySelector('#score').textContent = String(score).padStart(6, '0');
  document.querySelector('#wave').textContent = String(wave).padStart(2, '0');
  document.querySelector('#ammo').textContent = String(ammo).padStart(2, '0');
  document.querySelector('#health').textContent = health;
  document.querySelector('#health-bar').style.width = `${health}%`;
}

function fire() {
  if (!running || cooldown > 0 || !ammo) return;
  ammo -= 1;
  cooldown = 0.22;
  hud();
  player.userData.muzzle.visible = true;
  setTimeout(() => { player.userData.muzzle.visible = false; }, 90);
  raycaster.setFromCamera(new THREE.Vector2(aimX * 2 - 1, -(aimY * 2 - 1)), camera);
  const hits = raycaster.intersectObjects(targets, true);
  if (hits.length) {
    const group = hits[0].object.parent;
    score += 100 * wave;
    removeTarget(group);
    if (!targets.length) wave += 1;
    hud();
  }
  if (!ammo) setTimeout(() => { ammo = 12; hud(); }, 650);
}

function reset() {
  targets.splice(0).forEach(removeTarget);
  score = 0; health = 100; ammo = 12; wave = 1; running = true; spawnTimer = 0;
  document.querySelector('#start-screen').classList.add('hidden');
  document.querySelector('#game-over').classList.add('hidden');
  hud();
  for (let index = 0; index < 3; index += 1) target();
}

function end() {
  running = false;
  document.querySelector('#final-score').textContent = String(score).padStart(6, '0');
  document.querySelector('#game-over').classList.remove('hidden');
}

function updateCamera() {
  camera.position.set(player.position.x * 0.22, 3.55, player.position.z + 10.8);
  camera.lookAt(player.position.x * 0.15, 1.9, player.position.z - 7);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05);
  cooldown = Math.max(0, cooldown - delta);
  if (running) {
    const direction = (keys.KeyW || movingForward ? -1 : 0) + (keys.KeyS || movingBackward ? 1 : 0);
    player.position.z = THREE.MathUtils.clamp(player.position.z + direction * delta * 4.2, 3, 12);
    player.position.x = THREE.MathUtils.clamp(player.position.x + ((keys.KeyD || movingRight ? 1 : 0) - (keys.KeyA || movingLeft ? 1 : 0)) * delta * 4.2, -12, 12);
    player.userData.body.position.y = Math.sin(clock.elapsedTime * 3.2) * 0.025;
    if (shooting) fire();
    spawnTimer -= delta;
    if (spawnTimer <= 0 && targets.length < Math.min(3 + wave, 8)) { target(); spawnTimer = 1.8; }
    targets.forEach((item) => {
      item.rotation.y += delta * 1.8;
      item.position.y += Math.sin(clock.elapsedTime * 2 + item.userData.phase) * delta * 0.55;
      if (item.position.distanceTo(player.position) < 2.4) {
        removeTarget(item); health = Math.max(0, health - 10); hud(); if (!health) end();
      }
    });
  }
  updateCamera();
  renderer.render(scene, camera);
}

addEventListener('keydown', (event) => { keys[event.code] = true; });
addEventListener('keyup', (event) => { keys[event.code] = false; });
canvas.addEventListener('mousemove', (event) => { if (running) setAim(event.clientX, event.clientY); });
canvas.addEventListener('mousedown', (event) => { if (running) { setAim(event.clientX, event.clientY); shooting = true; fire(); } });
addEventListener('mouseup', () => { shooting = false; });
canvas.addEventListener('touchmove', (event) => {
  if (!running || !event.touches.length) return;
  event.preventDefault();
  setAim(event.touches[0].clientX, event.touches[0].clientY);
}, { passive: false });
document.querySelector('#start-button').addEventListener('click', reset);
document.querySelector('#restart-button').addEventListener('click', reset);
const controls = [['#left-button', 'left'], ['#back-button', 'back'], ['#shoot-button', 'shoot'], ['#forward-button', 'forward'], ['#right-button', 'right']];
controls.forEach(([selector, control]) => {
  const button = document.querySelector(selector);
  const setState = (active) => {
    if (control === 'forward') movingForward = active;
    if (control === 'back') movingBackward = active;
    if (control === 'left') movingLeft = active;
    if (control === 'right') movingRight = active;
    if (control === 'shoot') { shooting = active; if (active) fire(); }
    button.classList.toggle('active', active);
  };
  button.addEventListener('pointerdown', (event) => { event.preventDefault(); setState(true); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((eventName) => button.addEventListener(eventName, () => setState(false)));
});
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
hud();
updateCamera();
animate();
