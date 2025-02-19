import Image from 'next/image';
import { useState } from 'react';

interface ImageBlockProps {
  url: string;
  caption?: string;
  content?: string;
}

export default function ImageBlock({ url, caption }: ImageBlockProps) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  return (
    <figure className="w-full -my-4">
      <div className="w-full relative rounded-lg bg-zinc-100 dark:bg-zinc-800">
        {dimensions ? (
          <Image
            src={url}
            alt={caption || ''}
            width={dimensions.width}
            height={dimensions.height}
            className="rounded-lg w-full h-auto"
            priority
          />
        ) : (
          <Image
            src={url}
            alt={caption || ''}
            className="rounded-lg w-full h-auto"
            width={1200}
            height={675}
            onLoadingComplete={({ naturalWidth, naturalHeight }) => {
              setDimensions({ width: naturalWidth, height: naturalHeight });
            }}
            priority
          />
        )}
      </div>
      {caption && (
        <figcaption className="-mt-4 text-sm text-center text-zinc-500 dark:text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
