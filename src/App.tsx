import { useEffect, useState } from "react";
import type { Slides } from "../electron/lib/yaml";
import { svgToDataSrc } from "./lib/svg";

export default function App() {
    const [slides, setSlides] = useState<Slides>();

    useEffect(() => {
        async function getSlidesFromMain() {
            setSlides(await window.api.getSlides("./images/presentation/slides.yml"));
        }
        getSlidesFromMain();
    }, []);
    return (
        <ul>
            {slides?.slides.map((x) => (
                <li key={x.path}>
                    <img src={svgToDataSrc(x.content || "")} alt={x.path} />
                </li>
            ))}
        </ul>
    );
}
