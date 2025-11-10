import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { svgToDataSrc } from "../src/lib/svg";

describe("SVG image tests", () => {
    test("convert svg string to data: base64 scheme", () => {
        const svg_text = readFileSync("./images/sample.svg").toString();
        expect(svgToDataSrc(svg_text)).toBe(svgImgDataSrc());
    });
});

function svgImgDataSrc(): string {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iYmx1ZSIvPgo8L3N2Zz4K";
}
