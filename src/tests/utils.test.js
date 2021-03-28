import * as utils from "../utils";
import { createCanvas } from "canvas";

test("test pin generation", async () => {
  let canvas = createCanvas(50, 50);

  const data = await utils.generatePinIcon(canvas, "#a83232");
  // expect(data).toBe('peanut butter');

  // expect(location).toStrictEqual([0,0])
});
