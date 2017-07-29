import {
  Geometry,
  Material,
  Mesh,
  MeshStandardMaterial,
  JSONLoader,
  LineCurve3,
  Shape,
  Vector2,
  Vector3
} from 'three';

import {
  Loop,
  Component,
  App,
  CameraComponent,
  LightComponent,
  MeshComponent
} from "./core";

import {
  Box, 
  Cone,
  CubeCamera,
  Extrude,
  Group,
  Icosahedron,
  Importer,
  Lathe,
  Line,
  Octahedron,
  Parametric,
  Plane,
  Polyhedron,
  OrthographicCamera,
  PerspectiveCamera,
  Sphere
} from './components';

import {
  AmbientLight,
  AreaLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  SpotLight
} from './components/lights';

import {
  TextureModule,
} from './modules/mesh';

import {
  ControlsModule,
  ElementModule,
  EventsPatchModule,
  FogModule,
  OrbitControlsModule
} from './modules/app';

// Core
const app = new App();
app.start();

let loop = new Loop(() => {});
loop = new Loop(() => {}, true);

loop.start(app);
loop.stop(app);
loop.execute();

const component = new Component();
component.addTo(app);
component.clone();
const component2 = new Component();
component.copy(component2);

// Testing parent of component (ModuleSystem)
// TODO pass module type
component.integrateModules();
component.applyModule(null);
const map = component.applyBridge();
component.disposeModule(null);
component.disposeModules();
component.module(null).disposeModules();

const camera = new CameraComponent();
const clonedCamera = camera.clone();


// Meshes

const mesh = new MeshComponent({});
mesh.addTo(app);
mesh.clone();
mesh.copy({});
mesh.build();

const box = new Box({
  build: false,
  position: {
    x: 1
  },

  material: new MeshStandardMaterial()
});
box.build();
box.addTo(app);

const sphere = new Sphere({
  build: false,
  position: {
    x: 1
  },

  material: new MeshStandardMaterial()
});
sphere.buildGeometry({buffer: true});
sphere.addTo(app);

const cone = new Cone({build: false});
cone.buildGeometry({buffer: true});
cone.addTo(app);

const shape = new Shape([
  new Vector2(-4,-4),
  new Vector2(-2,0),
  new Vector2(-4,4),
  new Vector2(0,2),
  new Vector2(4,4),
  new Vector2(2,0),
  new Vector2(4,-4),
  new Vector2(0,-2)
]);

let extrude = new Extrude({
  build: false,
  geometry: {
    shapes: shape,
    options: {
      bevelEnabled: false,
      bevelSize: 0,
      amount: 2
    }
  }
});

extrude = new Extrude({
  geometry: {
    shapes: [shape, shape],
    options: {
      bevelEnabled: false,
      bevelSize: 0,
      amount: 2
    }
  }
});

let group = new Group();
const object3D = group.build();
sphere.addTo(group);

group = new Group(extrude, cone);

const icosahedron = new Icosahedron({
  geometry: {
    radius: 2,
    detail: 0.2
  }
});
icosahedron.addTo(app);

new Importer({
  loader: new JSONLoader(),

  url: 'some/path/model.json',

  onLoad: () => {
    console.log('on load');
  },

  onProgress: () => {
    console.log('loading in progress');
  },

  onError: () => {
    console.log('error loading with Importer');
  },

  parser(geometry: Geometry, material: Material) {
    return new Mesh(geometry, material);
  },

  useCustomMaterial: false
}).addTo(app);

const lathe = new Lathe({
  geometry: {
    points: [new Vector2(1, 1)]
  }
});
lathe.addTo(app);

const line = new Line({
  geometry: {
    curve: new LineCurve3(new Vector3(0, 0, 0), new Vector3(10, 0, 0)),
    points: 5
  },

  buffer: true
});
line.addTo(app);

const octahedron = new Octahedron({
  geometry: {
    radius: 1,
      detail: 0
  },

  buffer: true
});
octahedron.addTo(app);

const createParametric = (u: number, v: number) => {
  return new Vector3(u * 30, Math.random() * 5, v * 30);
};

const parametric = new Parametric({
  geometry: {
    func: createParametric,
    slices: 5,
    stacks: 8
  },

  buffer: true
});
parametric.addTo(app);

const plane = new Plane({
  geometry: {
    height: 3,
    width: 10,
    hSegments: 2,
    wSegments: 3
  },

  buffer: true
});
plane.addTo(app);

const polyhedron = new Polyhedron({
  geometry: {
    verticesOfCube: [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1,
      -1, -1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1
    ],

    indicesOfFaces: [
      2, 1, 0, 0, 3, 2,
      0, 4, 7, 7, 3, 0,
      0, 1, 5, 5, 4, 0,
      1, 2, 6, 6, 5, 1,
      2, 3, 7, 7, 6, 2,
      4, 5, 6, 6, 7, 4
    ],

    detail: 6,
    radius: 4,
  },

  buffer: true
});
polyhedron.addTo(app);

// Cameras

const cubeCamera = new CubeCamera({
  build: false,
  
  position: {
    x: 1,
    y: 10,
    z: 0
  }
});
const nativeCubeCamera = cubeCamera.build();

const orthographicCamera = new OrthographicCamera({
  build: false,
  far: 100
});
const orthographicCameraNative = orthographicCamera.build();

const perspectiveCamera = new PerspectiveCamera({
  build: false,
  far: 100
});
perspectiveCamera.wrap();
const perspectiveCameraNative = orthographicCamera.build();


// Lights

const light = new LightComponent({build: false});
light.build();
const clonedLight = light.clone();
const copiedLight = light.copy(clonedLight);
copiedLight.wrap();
copiedLight.addTo(app);

const ambientLight = new AmbientLight({
  color: 0xffffff,
  intensity: 0.5
});
ambientLight.addTo(app);

const areaLight = new AreaLight({build: false});
areaLight.build();
areaLight.addTo(app);

const hemisphereLight = new HemisphereLight({ 
  build: false
});
hemisphereLight.build();
hemisphereLight.addTo(app);

const pointLight = new PointLight({build: false});
pointLight.build();
pointLight.addTo(app);

const spotLight = new SpotLight({build: false});
spotLight.build();
spotLight.addTo(app);

// Mesh Modules

let textureModule = new TextureModule([{
    url: 'some/path',
    type: 'map'
  }]
);
textureModule = new TextureModule({
    url: 'some/path',
    type: 'bumpMap'
  }
);

// app Modules

const controlsModule = new ControlsModule();
const orbitControlsModule = new OrbitControlsModule();

const elementModule = new ElementModule(document.getElementById('app'));
elementModule.createElement();

const eventsPatchModule = new EventsPatchModule();
eventsPatchModule.patchEvents(null, null, ['mouseup', 'mousedown']);

const fogModule = new FogModule({}, 'linear');