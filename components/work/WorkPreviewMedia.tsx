/* eslint-disable @next/next/no-img-element -- SVG / object previews from public */

const cacheBust = process.env.NEXT_PUBLIC_BUILD_ID?.trim();

function withCacheBust(src: string) {
  if (!cacheBust) return src;
  const token = encodeURIComponent(cacheBust.slice(0, 12));
  return src.includes("?") ? `${src}&v=${token}` : `${src}?v=${token}`;
}

type Props = {
  src: string;
  alt: string;
  useObject?: boolean;
};

export function WorkPreviewMedia({ src, alt, useObject }: Props) {
  const resolved = withCacheBust(src);
  if (useObject) {
    return (
      <object
        className="bd-work-preview__img block h-auto w-full"
        data={resolved}
        type="image/svg+xml"
        width={640}
        height={360}
        aria-label={alt}
      >
        <img
          src={resolved}
          alt={alt}
          width={640}
          height={360}
          className="bd-work-preview__img block h-auto w-full"
          loading="lazy"
        />
      </object>
    );
  }
  return (
    <img
      src={resolved}
      alt={alt}
      width={640}
      height={360}
      className="bd-work-preview__img block h-auto w-full"
      loading="lazy"
      decoding="async"
    />
  );
}
