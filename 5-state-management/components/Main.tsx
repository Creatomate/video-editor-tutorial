import React, { useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import { Preview } from '@creatomate/preview';
import { getBasicComposition } from '@/utility/getBasicComposition';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(1);

  const [value, setValue] = useState();

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
      // Once the SDK is ready, create a basic video scene
      await preview.setSource(getBasicComposition());

      // Skip to 2 seconds into the video
      await preview.setTime(2);

      setIsLoading(false);
    };

    preview.onStateChange = async (state) => {
      // Find title element
      const element = preview.findElement((element) => element.source.name === 'Title');
      if (element) {
        setValue(element.source.text);
      }
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

        {value && <div>State: {value}</div>}

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
      </div>
    </main>
  );
};
