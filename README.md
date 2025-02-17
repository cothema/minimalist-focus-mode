# Minimalist Focus Mode for Deep Work – Stay Focused, Stay Productive

Minimalist Focus Mode is a Chrome extension designed to help users stay focused by hiding distracting elements. This
extension allows users to toggle focus mode, which hides specific elements.

### Features

🔹 Hide distracting elements on social media

🔹 Block news and adult websites

🔹 Multiple focus modes for different activities

🔹 One-click toggle for distraction-free browsing

### Focus Modes

🔹 **Creativity & Deep Work** – Block all distractions and get into the zone.

🔹 **Networking & Friends** – Hide unnecessary clutter while staying social.

🔹 **Inspiration & News** – Curate only the content that fuels your mind.

🔹 **Analytics** – Stay focused on insights and data without distractions.

🔹 **Fun & Games** – Enjoy entertainment without getting overwhelmed.

### Supported Websites for Focus Modes

🔹 **LinkedIn**
🔹 **Facebook**
🔹 **YouTube**

## Development

### 1./A Installation (without Docker)

- Ensure you have **Node.js (>=20.x)** and **npm** installed.
- Run the following command to install project dependencies:

```sh
    npm install
```

- Try building the project to ensure everything is working.

```sh
    npm run build
```

If everything works correctly, you should see a `dist/` folder created and build
files in it and zipped build in `output` folder.

### 1./B Installation (via Docker)

You can also run this project inside a Docker container for consistent development environment.

```sh
    docker compose up -d
```

Project is continuously built via `npm run watch` inside the container and files are synced with the host machine.

You can use Docker Desktop to access the container terminal or use the following command:

```sh
    docker exec -it minimalist-focus-mode /bin/bash
```

### 2. Browser Setup for Development

1. Open Chrome browser and navigate to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click on **Load unpacked** and select the `dist/` folder.
4. The extension should be loaded and ready to use.
5. Pin the extension to the browser toolbar for easy access.

### 3. Watch files and rebuild automatically

To watch files and rebuild automatically without starting a server:

```sh
    npm run watch
```

If using Docker, this is already running inside the container.

In most cases, you will not need to reload the extension in browser manually.
If necessary (e.g. `manifest.json` changes), you can reload the extension in `chrome://extensions/` by clicking on the
reload icon in the extension
tile.

### 4. Building for Production

This generates optimized assets in the `dist/` folder and pack it to a zip file in the `output/` folder.

```sh
    npm run build
```

### Export code for AI assistant

You can export the source code without dependencies for the AI assistant by running the following command.
Exported `.zip` file will be saved in the `output/` folder.
You can attach it to your AI prompt for context.

```sh
    npm run ai
```

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
