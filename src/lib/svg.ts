export function svgToDataSrc(svg: string): string {
    const encoder = new TextEncoder();
    const svg_data = encoder.encode(svg).toBase64();
    return `data:image/svg+xml;base64,${svg_data}`;
}
