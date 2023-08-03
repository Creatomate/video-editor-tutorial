import React, { useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import { Preview } from '@creatomate/preview';
import { getSlideshowComposition } from '@/utility/getSlideshowComposition';
import styles from '@/styles/Home.module.css';
import { addSlide } from '@/utility/addSlide';

const inter = Inter({ subsets: ['latin'] });

export const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Reference to the preview
  const previewRef = useRef<Preview>();

  const setUpPreview = (htmlElement: HTMLDivElement) => {
    // Clean up an older instance of the preview SDK
    if (previewRef.current) {
      previewRef.current.dispose();
      previewRef.current = undefined;
    }

    // Initialize a preview. Make sure you provide your own public token, which can be found in your dashboard under Project Settings
    const preview = new Preview(htmlElement, 'player', 'public-0x6hcqpfhrhw16d67ogth7ry');

    preview.onReady = async () => {
      // This is the source code of "Image Slideshow w/ Intro and Outro" template under the "Storytelling" category
      // See: https://user-images.githubusercontent.com/44575638/227714779-31292519-3a75-40a4-8c3f-549e28100a48.jpg
      await preview.setSource(getSlideshowComposition());

      setIsLoading(false);
    };

    previewRef.current = preview;
  };

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.center}>
        {isLoading && 'Loading...'}

        <div
          className={styles.container}
          ref={(htmlElement) => {
            if (htmlElement && htmlElement !== previewRef.current?.element) {
              setUpPreview(htmlElement);
            }
          }}
        />

        <div className={styles.controls}>
          <button
            onClick={async () => {
              if (previewRef.current) {
                await addSlide(previewRef.current);
              }
            }}
          >
            Add Slide
          </button>
        </div>
      </div>
    </main>
  );
};
