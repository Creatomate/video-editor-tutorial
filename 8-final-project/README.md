# Video Preview Demo

Add video rendering to your web apps! Seamlessly integrate our video renderer into your software and provide your users with video editing functionality – right in the browser.

This is a demo application showing how a dynamic video can be previewed in the browser using the [Preview SDK](https://creatomate.com/javascript-video-sdk). The code can be used as a basis for creating your own video editor applications using Creatomate's API.

## Demo

Try it out live: https://video-preview-demo.vercel.app

The **Create Video** button is disabled in the live demo as this requires an API key. To run the example with your own API key, follow the instructions below.

## Usage

### Running this demo application

This demo uses a video template from your account. The example code demonstrates a few features that require a specific template, so be sure to follow the instructions carefully:

1. Create a free account [here](https://creatomate.com/sign-in).
2. Go to your project settings, and copy your **API Key** and **Video Player Token** under *Programmatic Access*:<br/><br/>![Screenshot](https://user-images.githubusercontent.com/44575638/227715496-5ae23468-c047-4ab8-beb2-e21b6c65d74b.png)<br/><br/>
3. In your dashboard, go to **My Templates**, click **New**, go to the **Storytelling** category, and choose the **"Image Slideshow w/ Intro and Outro"** template, then click **Create Template**:<br/><br/>![Screenshot](https://user-images.githubusercontent.com/44575638/227714779-31292519-3a75-40a4-8c3f-549e28100a48.jpg)<br/><br/>
4. From the address bar, copy the ID of the newly created template:<br/><br/>![Screenshot](https://user-images.githubusercontent.com/44575638/227736758-f9d522c3-3bbb-4b7b-92c7-e004e9dc16e5.png)<br/><br/>
5. Create a new file called `.env.local` in the root of the project, providing the **API Key**, **Video Player Token**, and **Template ID** from the previous steps:

```
CREATOMATE_API_KEY=...
NEXT_PUBLIC_VIDEO_PLAYER_TOKEN=...
NEXT_PUBLIC_TEMPLATE_ID=...
```

6. Install all NPM dependencies using the following command:

```bash
npm install
```

7. The demo can then be run using:

```bash
npm run dev
```

8. Now visit the URL that is displayed in your console, which is by default: `http://localhost:3000`

### Using this code in your own projects

Install the Preview SDK using the following command:

```bash
npm install @creatomate/preview
```

Please refer to [App.tsx](https://github.com/Creatomate/video-preview-demo/blob/main/components/App.tsx) to see an example of how to initialize the SDK.

## Issues & Comments

Feel free to contact us if you encounter any issues with this demo or Creatomate API at [support@creatomate.com](mailto:support@creatomate.com).

## License

This demo is licensed under the MIT license. Please refer to the [LICENSE](https://github.com/Creatomate/video-preview-demo/blob/main/LICENSE) for more information.
