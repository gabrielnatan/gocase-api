import { describe, expect, it } from "vitest";
import { Uuid } from "../uuid.entity.js";

describe("[Uuid entity]", () => {
    it("should create a valid Uuid", () => {
        const uuid = new Uuid();

        expect(uuid).toBeInstanceOf(Uuid);
        expect(uuid.id).toBeDefined();
        expect(typeof uuid.id).toBe("string");
        expect(uuid.toString()).toStrictEqual(uuid.id);
    });
});
