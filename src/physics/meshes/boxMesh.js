import {Mesh} from '../core/mesh';

export class BoxMesh extends Mesh {
  constructor(geometry, material, params = {}) {
    super(geometry, material, params.mass);

    if (!geometry.boundingBox) geometry.computeBoundingBox();

    const width = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const height = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    const depth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

    this._physijs.type = 'box';
    this._physijs.width = width;
    this._physijs.height = height;
    this._physijs.depth = depth;
    this._physijs.mass = (typeof params.mass === 'undefined') ? width * height * depth : params.mass;
  }
}
