export function createSlide(slideName: string, caption: string) {
  // This is the JSON of a new slide. It is based on existing slides in the "Image Slideshow w/ Intro and Outro" template.
  // Refer to: https://creatomate.com/docs/json/introduction
  return {
    name: slideName,
    type: 'composition',
    track: 1,
    duration: 4,
    animations: [
      {
        type: 'fade',
        duration: 1,
        transition: true,
      },
    ],
    elements: [
      {
        name: `${slideName}-Image`,
        type: 'image',
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
        source: 'https://creatomate-static.s3.amazonaws.com/demo/samuel-ferrara-1527pjeb6jg-unsplash.jpg',
      },
      {
        name: `${slideName}-Text`,
        type: 'text',
        time: 0.5,
        duration: 3.5,
        y: '83.3107%',
        width: '70%',
        height: '10%',
        x_alignment: '50%',
        y_alignment: '100%',
        fill_color: '#ffffff',
        animations: [
          {
            time: 'start',
            duration: 1,
            easing: 'quadratic-out',
            type: 'text-slide',
            scope: 'split-clip',
            split: 'line',
            direction: 'up',
            background_effect: 'scaling-clip',
          },
          {
            easing: 'linear',
            type: 'scale',
            fade: false,
            scope: 'element',
            y_anchor: '100%',
            end_scale: '130%',
            start_scale: '100%',
          },
        ],
        text: caption,
        font_family: 'Roboto Condensed',
        font_weight: '700',
        background_color: 'rgba(220,171,94,1)',
        background_x_padding: '80%',
      },
    ],
  };
}
