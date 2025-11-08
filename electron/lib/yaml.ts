import { readFileSync } from "node:fs";
import p from "node:path";
import { cwd } from "node:process";
import * as v from "valibot";
import * as y from "yaml";

const slidesYamlScheme = v.object({
    slides: v.array(
        v.object({
            path: v.string(),
        }),
    ),
});

export type Slides = {
    base_dir: string;
    slides: {
        path: string;
        content?: string;
    }[];
};

export function readAndParseYaml(yaml_name: string): Slides {
    const base_dir = p.dirname(yaml_name);
    const yaml_text = readFileSync(yaml_name).toString();
    return parseYaml(yaml_text, base_dir);
}

export function parseYaml(yaml_text: string, base_dir: string): Slides {
    return { base_dir, ...v.parse(slidesYamlScheme, y.parse(yaml_text)) };
}

export function readAllSlides(slides: Slides): Slides {
    return {
        base_dir: slides.base_dir,
        slides: slides.slides.map(({ path }) => ({
            path,
            content: readFileSync(p.join(slides.base_dir, path)).toString(),
        })),
    };
}

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

// for test
export function presenPath(file: string = ""): string {
    return p.join(cwd(), "images/presentation", file);
}
