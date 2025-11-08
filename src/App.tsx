import { useEffect, useState } from "react";
import type { Slides } from "../electron/lib/yaml";

export default function App() {
    const [slides, setSlides] = useState<Slides>();

    useEffect(() => {
        // setSlides(window.app.getSlides("./images/presentation/slides.yml"));
        async function getSlidesFromMain() {
            setSlides(await window.api.getSlides("./images/presentation/slides.yml"));
        }
        getSlidesFromMain();
    }, []);
    return (
        <ul>
            {slides?.slides.map((x) => (
                <li key={x.path}>{x.path}</li>
            ))}
        </ul>
    );
}
