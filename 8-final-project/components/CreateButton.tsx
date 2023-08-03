import React, { useState } from 'react';
import { Preview } from '@creatomate/preview';
import { finishVideo } from '@/utility/finishVideo';
import styles from '@/styles/Home.module.css';

interface CreateButtonProps {
  preview: Preview;
}

export const CreateButton: React.FC<CreateButtonProps> = (props) => {
  const [isRendering, setIsRendering] = useState(false);
  const [render, setRender] = useState<any>();

  if (isRendering) {
    return (
      <button className={styles.createButton} style={{ backgroundColor: '#e67e22' }}>
        Rendering...
      </button>
    );
  }

  if (render) {
    return (
      <button
        className={styles.createButton}
        style={{ backgroundColor: '#2ecc71' }}
        onClick={() => {
          window.open(render.url, '_blank');
          setRender(undefined);
        }}
      >
        Download
      </button>
    );
  }

  return (
    <button
      className={styles.createButton}
      style={{ display: 'block', marginLeft: 'auto' }}
      onClick={async () => {
        setIsRendering(true);

        try {
          const render = await finishVideo(props.preview);
          if (render.status === 'succeeded') {
            setRender(render);
          } else {
            window.alert(`Rendering failed: ${render.errorMessage}`);
          }
        } catch (error) {
          window.alert(error);
        } finally {
          setIsRendering(false);
        }
      }}
    >
      Create Video
    </button>
  );
};
