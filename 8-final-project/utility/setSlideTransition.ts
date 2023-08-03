import { Preview } from '@creatomate/preview';
import { deepClone } from '@/utility/deepClone';

// Sets the animation of a slide element
export async function setSlideTransition(preview: Preview, slideName: string, type: string) {
  // Make sure to clone the state as it's immutable
  const mutatedState = deepClone(preview.state);

  // Find element by name
  const element = preview.getElements(mutatedState).find((element) => element.source.name === slideName);
  if (element) {
    // Set the animation property
    // Refer to: https://creatomate.com/docs/json/elements/common-properties
    element.source.animations = [
      {
        type,
        duration: 1,
        transition: true,
      },
    ];

    // Update the video source
    // Refer to: https://creatomate.com/docs/json/introduction
    await preview.setSource(preview.getSource(mutatedState));
  }
}
