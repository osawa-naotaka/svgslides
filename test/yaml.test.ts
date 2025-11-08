import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { cwd } from "node:process";
import type { Slides } from "../electron/lib/yaml";
import { parseYaml, presenPath, readAndParseYaml } from "../electron/lib/yaml";

describe("basic yaml read and parse", () => {
    const yaml_name = presenPath("slides.yml");
    const yaml_text = readFileSync(yaml_name).toString();
    const slide_paths: Slides = {
        base_dir: path.join(cwd(), "images", "presentation"),
        slides: [
            {
                path: "./01_global_environment_comparison.svg",
            },
            {
                path: "./02_environment_separation_comparison.svg",
            },
            {
                path: "./03_version_coexistence.svg",
            },
            {
                path: "./04_flake_workflow.svg",
            },
        ],
    };
    test("read yaml and parse 1", () => {
        expect(parseYaml(yaml_text, presenPath())).toEqual(slide_paths);
    });
    test("read yaml and parse 2", () => {
        expect(readAndParseYaml(yaml_name)).toEqual(slide_paths);
    });
});
