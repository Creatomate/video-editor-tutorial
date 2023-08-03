import { Preview } from '@creatomate/preview';

// Sets the text styling properties
// For a full list of text properties, refer to: https://creatomate.com/docs/json/elements/text-element
export async function setTextStyle(
  preview: Preview,
  selector: string,
  style: string,
  modifications: Record<string, any>,
) {
  if (style === 'block-text') {
    modifications[`${selector}.background_border_radius`] = '0%';
  } else if (style === 'rounded-text') {
    modifications[`${selector}.background_border_radius`] = '50%';
  }

  await preview.setModifications(modifications);
}
