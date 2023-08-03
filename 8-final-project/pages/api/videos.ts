import { NextApiRequest, NextApiResponse } from 'next';
import { Client, RenderOutputFormat } from 'creatomate';

const client = new Client(process.env.CREATOMATE_API_KEY!);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise<void>((resolve) => {
    if (req.method === 'POST') {
      // Return an HTTP 401 response when the API key was not provided
      if (!process.env.CREATOMATE_API_KEY) {
        res.status(401).end();
        resolve();
        return;
      }

      /** @type {import('creatomate').RenderOptions} */
      const options = {
        // outputFormat: 'mp4' as RenderOutputFormat,
        source: req.body.source,
      };

      client
        .render(options)
        .then((renders) => {
          res.status(200).json(renders[0]);
          resolve();
        })
        .catch(() => {
          res.status(400).end();
          resolve();
        });
    } else {
      res.status(404).end();
      resolve();
    }
  });
}
