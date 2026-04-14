/* eslint-disable @next/next/no-img-element -- SVG / object previews from public */
type Props = {
  src: string;
  alt: string;
  useObject?: boolean;
};

export function WorkPreviewMedia({ src, alt, useObject }: Props) {
  if (useObject) {
    return (
      <object
        className="bd-work-preview__img block h-auto w-full"
        data={src}
        type="image/svg+xml"
        width={640}
        height={360}
        aria-label={alt}
      >
        <img src={src} alt={alt} width={640} height={360} className="bd-work-preview__img block h-auto w-full" loading="lazy" />
      </object>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      width={640}
      height={360}
      className="bd-work-preview__img block h-auto w-full"
      loading="lazy"
      decoding="async"
    />
  );
}
