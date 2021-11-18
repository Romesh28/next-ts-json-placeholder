const placeholder = (width: number, height: number) => `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">  
        <rect id="r" width="${width}" height="${height}" fill="#f3f5f7" rx="3" ry="3" />
        <animate xlink:href="#r" attributeName="opacity" from="1" to="0.6" dur="2s" repeatCount="indefinite"  />
    </svg>`;

const toBase64 = (str: string) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str);

export const ImagePlaceholder = (width: number, height: number) => {
    return `data:image/svg+xml;base64,${toBase64(placeholder(width, height))}`;
};
