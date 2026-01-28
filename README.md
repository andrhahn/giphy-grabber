# giphy-grabber

### Project Structure Overview: Giphy Grabber

This project is a React-based web application that allows users to search for and view GIFs using the Giphy API. It is built with **TypeScript** and follows a component-based architecture. Given this project requires a Giphy API key, it is recommended to send requests to a backend to avoid exposing environment variables.

#### 1. Directory Structure
The codebase is organized into several key directories within `src/`:

*   **`src/component/`**: This is the heart of the application, containing all React components and their associated styles (`.scss` files).
    *   `App.tsx`: The entry point component.
    *   `GifGrabber.tsx`: A container component that manages the search state and coordinates between the search and display logic.
    *   `GifSearch.tsx`: Handles the user input, search history, and Giphy API interactions for fetching data.
    *   `GifRenderer.tsx`: Responsible for displaying the search results in a grid format using `@giphy/react-components`.
*   **`src/service/`**: Intended for business logic or API abstraction.
    *   `GifService.ts`: Currently contains a "todo" placeholder, but suggests a plan to centralize API calls.
*   **`public/`**: Contains static assets like `index.html`, logos, and icons.

#### 2. Key Architectural Decisions

*   **Component Composition**: This uses a clear hierarchical structure. `App` renders `GifGrabber`, which in turn coordinates `GifSearch` and `GifRenderer`. This separates the search input concerns from the results display.
*   **State Management**: Instead of using a heavy state management library like Redux, I've opted for **React Hooks** (`useState`, `useEffect`). State (specifically the search function and timestamp) is lifted to the `GifGrabber` component to sync the search bar with the results grid.
*   **API Integration**: I am using the official `@giphy/js-fetch-api` for searching and `@giphy/react-components` for the UI grid, which ensures high performance and consistent behavior with Giphy's ecosystem.
*   **Styling**: I've chosen **SCSS** for styling, with each component having its own dedicated stylesheet (e.g., `GifSearch.scss`). It also utilizes **Bootstrap** (via `reactstrap`) for layout and basic components.
*   **Environment Configuration**: The project uses `.env.local` to manage sensitive or environment-specific configuration, such as the `REACT_APP_GIPHY_APP_ID` (do not commit this file to source control!).

#### 3. Features Implemented
*   **Trending GIFs**: Loads trending GIFs by default on startup.
*   **Search History**: Tracks and displays "Previous Searches," allowing users to re-trigger them easily.
*   **Responsive Design**: Includes logic to detect mobile devices (`react-device-detect`) and adjust the grid columns and widths accordingly.
*   **Dynamic Results**: Uses a timestamp-based keying strategy on the results grid to force a re-render and refresh the content whenever a new search is performed.

##### Setup
    # clone repo
    git clone https://github.com/andrhahn/giphy-grabber.git

    # install node
    nvm install 19.1.0

    # install yarn
    brew install yarn

    # install dependencies
    yarn install

    # create .env.local file with the following
    NODE_PATH=src/
    CI=true

    REACT_APP_GIPHY_APP_ID=...

##### Use
    # development server
    npm start

    # format
    npm run format

    # golden
    npm run golden

### License

[The MIT License](http://opensource.org/licenses/MIT)
