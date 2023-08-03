// This is the source code for a simple video with two text elements and a background image.
// Learn more about this here: https://creatomate.com/docs/json/introduction
// If you want to edit it, copy-paste it into the template editor: https://creatomate.com/docs/template-editor/source-editor
export function getBasicComposition() {
  return {
    output_format: 'mp4',
    width: 1920,
    height: 1080,
    elements: [
      {
        id: '48734f5c-8c90-41ac-a059-e949e733936b',
        name: 'Main-Image',
        type: 'image',
        track: 1,
        time: 0,
        color_overlay: 'rgba(0,0,0,0.25)',
        animations: [
          {
            easing: 'linear',
            type: 'scale',
            fade: false,
            scope: 'element',
            end_scale: '130%',
            start_scale: '100%',
          },
        ],
        source: 'https://creatomate.com/files/assets/5bc5ed6f-26e6-4c3a-8d03-1b169dc7f983.jpg',
      },
      {
        id: '72ec46a3-610c-4b46-86ef-c9bbc337f012',
        name: 'Tagline',
        type: 'text',
        track: 2,
        time: 1,
        duration: 2.5,
        y: '73.71%',
        width: '69.79%',
        height: '12.56%',
        x_alignment: '50%',
        fill_color: '#ffffff',
        animations: [
          {
            time: 'start',
            duration: 1,
            easing: 'quadratic-out',
            type: 'text-slide',
            scope: 'split-clip',
            split: 'word',
            direction: 'up',
          },
        ],
        text: 'Enter your tagline here',
        font_family: 'Oswald',
        font_weight: '600',
        text_transform: 'uppercase',
      },
      {
        id: '04b59bd6-b9df-439f-9586-2d5095c9f959',
        name: 'Title',
        type: 'text',
        track: 3,
        time: 0,
        y: '41.41%',
        width: '69.79%',
        height: '47.61%',
        x_alignment: '50%',
        fill_color: '#ffffff',
        animations: [
          {
            time: 'start',
            duration: 1,
            easing: 'quadratic-out',
            type: 'text-appear',
            split: 'line',
          },
        ],
        text: 'Lorem ipsum dolor sit amet',
        font_family: 'Oswald',
        font_weight: '600',
        text_transform: 'uppercase',
      },
    ],
  };
}
