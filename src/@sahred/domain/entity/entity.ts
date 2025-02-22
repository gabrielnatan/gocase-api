import { ValueObject } from "../value-object/value-object.js";

export abstract class Entity {
  abstract get entity_id(): ValueObject;
  abstract toJSON(): any;
}
