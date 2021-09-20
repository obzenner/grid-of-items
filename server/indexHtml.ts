// Root index file for the application

export default (rootCompoment: string, data: string) => { 
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>37</title>
        <script>window.INITIAL_DATA = ${data}</script>
      </head>
      <body>
        <div id="root">${rootCompoment}</div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;

    return html;
};