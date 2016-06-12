import * as THREE from 'three';
import Physijs from '../physics/physi.js';

import {Shape} from '../core/Shape';
import {extend} from '../extras/api';

class Tetrahedron extends Shape {
  constructor(params = {}) {
    super(params, 'tetrahedron');

    extend(params.geometry, {
      radius: 1,
      detail: 0
    });

    if (params.build) {
      this.build(params);
      super.wrap();
    }
  }

  build(params = {}) {
    const _scope = this,
      Mesh = this.physics ? Physijs.ConvexMesh : THREE.Mesh,
      material = super._initMaterial(params.material);

    return new Promise((resolve) => {
      _scope.setNative(new Mesh(
        this.buildGeometry(params),
        material,
        params.mass
      ));

      resolve();
    });
  }

  buildGeometry(params = {}) {
    return new THREE.TetrahedronGeometry(
      params.geometry.radius,
      params.geometry.detail
    );
  }

  clone() {
    return new Tetrahedron({build: false}).copy(this);
  }
}

export {
  Tetrahedron
};
