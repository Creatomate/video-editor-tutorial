import React, { useRef, useState } from 'react';
import { Inter } from 'next/font/google';
import { Preview, PreviewState } from '@creatomate/preview';
import { SettingsPanel } from '@/components/SettingsPanel';
import { useWindowWidth } from '@/utility/useWindowWidth';
import styles from '@/styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export const Main: React.FC = () => {
  // React Hook to update the component when the window width changes
  const windowWidth = useWindowWidth();

  // Video aspect ratio that can be calculated once the video is loaded
  const [videoAspectRatio, setVideoAspectRatio] = useState<number>();

  // Reference to the preview
  const previewRef = useRef<Preview>();

  // Current state of the preview
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentState, setCurrentState] = useState<PreviewState>();

  // This sets up the video player in the provided HTML DIV element
  const setUpPreview = (htmlElement: HTMLDivElement) => {
    if (previewRef.current) {
      previewRef.current.dispose();
      previewRef.current = undefined;
    }

    // Initialize a preview
    const preview = new Preview(htmlElement, 'player', process.env.NEXT_PUBLIC_VIDEO_PLAYER_TOKEN!);

    // Once the SDK is ready, load a template from our project
    preview.onReady = async () => {
      await preview.loadTemplate(process.env.NEXT_PUBLIC_TEMPLATE_ID!);
      setIsReady(true);
    };

    preview.onLoad = () => {
      setIsLoading(true);
    };

    preview.onLoadComplete = () => {
      setIsLoading(false);
    };

    // Listen for state changes of the preview
    preview.onStateChange = (state) => {
      setCurrentState(state);
      setVideoAspectRatio(state.width / state.height);
    };

    previewRef.current = preview;
  };

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.wrapper}>
        <div
          className={styles.container}
          ref={(htmlElement) => {
            if (htmlElement && htmlElement !== previewRef.current?.element) {
              setUpPreview(htmlElement);
            }
          }}
          style={{
            height:
              videoAspectRatio && windowWidth && windowWidth < 768 ? window.innerWidth / videoAspectRatio : undefined,
          }}
        />
      </div>

      <div className={styles.panel}>
        {isReady && (
          <div className={styles.panelContent} id='panel'>
            <SettingsPanel preview={previewRef.current!} currentState={currentState} />
          </div>
        )}
      </div>

      {isLoading && <div className={styles.loadIndicator}>Loading...</div>}
    </main>
  );
};
