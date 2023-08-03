import { Preview } from '@creatomate/preview';

export async function finishVideo(preview: Preview) {
  const response = await fetch('/api/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: preview.getSource(),
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('No API key was provided. Please refer to the README.md for instructions.');
    } else {
      throw new Error(`The request failed with status code ${response.status}`);
    }
  }

  return await response.json();
}
