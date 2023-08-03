import React, { useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import { Preview } from '@creatomate/preview';
import { ProgressControl } from '@/components/ProgressControl';
import { getBasicComposition } from '@/utility/getBasicComposition';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(1);

  // Reference to the preview
  const previewRef = useRef<Preview>();

  const setUpPreview = (htmlElement: HTMLDivElement) => {
    // Clean up an older instance of the preview SDK
    if (previewRef.current) {
      previewRef.current.dispose();
      previewRef.current = undefined;
    }

    // Initialize a preview. Make sure you provide your own public token, which can be found in your dashboard under Project Settings
    const preview = new Preview(htmlElement, 'interactive', 'public-0x6hcqpfhrhw16d67ogth7ry');

    preview.onReady = async () => {
      // Once the SDK is ready, create a basic video scene
      await preview.setSource(getBasicComposition());

      // Set the zoom mode so the user can pan, zoom in and out, but always keep the canvas in the middle
      await preview.setZoom('centered');

      // Skip to 2 seconds into the video
      await preview.setTime(2);

      setIsLoading(false);
    };

    previewRef.current = preview;
  };

  const changeTitle = async (value: string) => {
    // Note we're using 'applyModifications' instead of 'setModifications' for this example to show the undo/redo feature!
    await previewRef.current?.applyModifications({
      Title: value,
    });
  };

  return (
    <main className={`${styles.main} ${inter.className}`}>
      {isLoading && 'Loading...'}

      <div
        className={styles.container}
        ref={(htmlElement) => {
          if (htmlElement && htmlElement !== previewRef.current?.element) {
            setUpPreview(htmlElement);
          }
        }}
      />

      {previewRef.current && <ProgressControl preview={previewRef.current} />}

      <div className={styles.controls}>
        <button
          onClick={async () => {
            await changeTitle(`Title ${counter}`);
            setCounter(counter + 1);
          }}
        >
          Change Title
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.undo();
          }}
        >
          Undo
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.redo();
          }}
        >
          Redo
        </button>
      </div>
      <div className={styles.controls}>
        <button
          onClick={async () => {
            await previewRef.current?.play();
          }}
        >
          Play
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.pause();
          }}
        >
          Pause
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.setTime(0);
          }}
        >
          Seek to Start
        </button>
        &nbsp;
        <button
          onClick={async () => {
            const preview = previewRef.current;
            if (preview && preview.state) {
              // Move the time state right before the end
              await preview.setTime(preview.state.duration - 0.001);
            }
          }}
        >
          Seek to End
        </button>
      </div>
      <div className={styles.controls}>
        <button
          onClick={async () => {
            await previewRef.current?.setZoom('fixed', 0.5);
          }}
        >
          Zoom 50%
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.setZoom('fixed', 0.2);
          }}
        >
          Zoom 20%
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.setZoom('auto');
          }}
        >
          Zoom (Auto)
        </button>
        &nbsp;
        <button
          onClick={async () => {
            await previewRef.current?.setZoom('centered');
          }}
        >
          Zoom (User-Controlled)
        </button>
      </div>
    </main>
  );
};
