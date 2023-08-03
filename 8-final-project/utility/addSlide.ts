import { Preview } from '@creatomate/preview';
import { createSlide } from '@/utility/createSlide';
import { ensureElementVisibility } from '@/utility/ensureElementVisibility';

export async function addSlide(preview: Preview) {
  // Get the video source
  // Refer to: https://creatomate.com/docs/json/introduction
  const source = preview.getSource();

  // Delete the 'duration' and 'time' property values to make each element (Slide-1, Slide-2, etc.) autosize on the timeline
  delete source.duration;
  for (const element of source.elements) {
    delete element.time;
  }

  // Find the last slide element (e.g. Slide-3)
  const lastSlideIndex = source.elements.findLastIndex((element: any) => element.name?.startsWith('Slide-'));
  if (lastSlideIndex !== -1) {
    const slideName = `Slide-${lastSlideIndex}`;

    // Create a new slide
    const newSlideSource = createSlide(slideName, `This is the text caption for newly added slide ${lastSlideIndex}.`);

    // Insert the new slide
    source.elements.splice(lastSlideIndex + 1, 0, newSlideSource);

    // Update the video source
    await preview.setSource(source);

    // Jump to the time at which the text element is visible
    await ensureElementVisibility(preview, `${slideName}-Text`, 1.5);
  }
}
