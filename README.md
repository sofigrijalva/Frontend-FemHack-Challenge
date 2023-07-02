# Frontend FemHack II

A repository for the frontend challende of the International Woman Hackathon.

## Usage & Installation guide

- Make sure you are running the [backend](https://github.com/nuwe-reports/femhack-II-frontend-challenge) locally on port `8080`
- on the root folder run `npm install`
- after install run `npm start`

## Tech Stack

- `React`
- `TailwindCSS`

## Additional Libraries

`useSWR` This library was chosen for data fetching as it provides a simple and efficient way to handle data fetching, caching, and revalidation.

What is great about it, is that we don't need that initial `useEffect` in every component to fetch data. I made the cutomHook `useRequest` to make it even more generic as easier to fetch data.

`react-vector-maps` This library was used to integrate interactive maps into the project. I was looking for a library that didn't need me to create an account or need a token. This library seemed very easy to implement, an it was! HOWEVER, makeing every country a different color had to be done with CSS or at least it wasn't clear how to do it, which made me go for a "hacky" way of doing it with `emotion/styled`.

`classnames` This library was utilized to join multiple styles together. It simplifies the process of dynamically applying different CSS classes based on conditions or user interactions.

`recharts` This library was employed to create visually appealing and interactive graphs to represent the internet adoption trends over time. It provides a wide range of chart types and customization options, making it suitable for presenting complex data in a user-friendly manner. I lost a lot of time trying to use `chartjs` I was surprised about this library.

`headlessUI` This library was used to implement dropdown components in the project. Lets be honest, I used some components of the TailwindUI library and this was needed to support them.

`heroIcons` This library offers a collection of icons that can be easily integrated into the project. I only used 1 icon, maybe it wasn't needed. I thought I was going to use more, but no.

`emotion/styled` This library was used to create components with custom CSS styling. I used it to set the colors in the map dynamicatly from the component.

## Description

![Screenshot](public\screenshots\screenshot1.png)

For my hackathon solution, I decided to create a visually engaging landing page inspired by the dark mode aesthetic commonly seen on platforms like GitHub. The design has a tech-oriented look and feel, which aligns with the theme of the project.

The landing page consists of different sections that present the internet adoption data in an interactive manner. The key focus was on providing users with an intuitive and user-friendly experience.

To achieve this, I incorporated interactive graphs throughout the website. Users can interact with these graphs to explore and analyze the data more effectively. The goal was to make the data easily understandable and visually appealing to the users.

Overall, the solution aims to create a dynamic and engaging experience for users, combining an attractive dark mode design, tech-inspired visuals, and interactive graphs to present the internet adoption data in a user-friendly manner.

### Decision Making

#### Task 1 - 2: Displaying charts and animations

**Setup development environment and implement Backend connection**

I used docker to setup the backend. I think many of us had issues with cors as it was on the backend area. However, I managed to fix it on the python backend. I also shared my fix in the chat and it seemed the fixed was already pushed to the repo, felt that I missed the notification of this changed and wasted some time.

**Create and implement chart displaying Internet Users x Year**

The main section of the website showcases an animated area graph, illustrating the growth of internet users over the years. The graph employs interactive features such as hover and click functionality (on mobile), enabling users to explore the specific data points for each year in detail. By hovering or clicking on the graph, users can access data specific to their selected time period.

In addition to the graph, I have implemented a top analytics section that dynamically updates, however I would have liked to make it update when users hover over a specific year on the graph.

[![UsersxYears](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/usersxyears.mp4)](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/usersxyears.mp4)

**Create and implement chart displaying Internet Users x Year x Country**

The landing page includes a second graph that offers users the flexibility to customize the data they want to view. Users can select the desired country and year, and the graph dynamically updates to display the corresponding data. Notably, the graph incorporates animated transitions whenever users change the country or year selection, providing a smooth and visually appealing experience.

To handle scenarios where data is unavailable for a particular country or year, I implemented a graph state that displays a message indicating the absence of data for that specific period. This ensures transparency and helps users understand any gaps in the dataset.

Additionally, the labels on the graph adapt in real-time based on the user's country and year selections. This dynamic labeling feature further enhances the user experience by providing contextually relevant information alongside the graph.

[![UsersxYears](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/countryxyears.mp4)](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/countryxyears.mp4)

**Create and implement last chart displaying Top 10 Countries with the largest number of internet user per Year**

In this section of the website, I utilized the API https://flagsapi.com/ to fetch country flags. Instead of just adding the top 10 countries, I expanded the functionality by incorporating a radar graph that enables users to compare multiple countries. This radar graph dynamically updates as users change the selected year, providing a comprehensive visualization of the data.

[![TopCountries](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/topcountries.mp4)](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/topcountries.mp4)

To enhance the mobile experience and optimize screen space, I implemented a horizontal scrollable list for the country flags. This allows users to scroll through the list horizontally, ensuring efficient utilization of screen real estate and providing a seamless browsing experience on mobile devices.

[![TopCountriesMobile](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/topcountriesmobile.mp4)](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/topcountriesmobile.mp4)

#### Task 3: World Map

At this stage of development, due to time constraints, I opted for a heat map representation to display the countries based on their internet user counts. The heat map uses lighter colors for countries with larger user counts and darker colors for countries with lower counts. It incorporates hover styling, and clicking on a country reveals the specific data for that country.

To improve the user experience, I recommend implementing tooltips that display the name of each country when hovering over them. This will provide additional context and make it easier for users to identify specific countries.

Additionally, it would be beneficial to incorporate zoom capabilities for the map, especially for mobile devices where interacting with the map can be challenging due to limited screen space.

[![WorldMap](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/worldmap.mp4)](https://github.com/sofigrijalva/frontend-femhack-challenge/blob/master/public/videos/worldmap.mp4)

## Next Steps

- Improve Responsiveness: Address the issue with the non-responsive graph. Refactor the graph component to ensure it adapts correctly to different screen sizes and orientations. Test and verify that the graph remains visually appealing and functional when the page is resized.

- Refactor Code: Identify areas of code repetition and apply refactoring techniques to eliminate redundancy. This will help improve code maintainability, readability, and overall project organization. Consider creating reusable components and optimizing any inefficient code segments.

- Implement Tests and Storybook: Enhance the project's reliability and maintainability by adding tests to verify the correctness of the implemented functionality. Write unit tests for individual components and integration tests to cover different use cases. Additionally, consider implementing Storybook to showcase the components in isolation and facilitate their reusability.

- Enhance User Experience: Implement the recommended UX enhancements mentioned earlier, such as adding tooltips to provide country names on hover, incorporating zoom capabilities for mobile devices, and optimizing the interaction with the map. These improvements will make the website more user-friendly, intuitive, and accessible across different devices.

## Screenshots

### Desktop

![Screenshot](public\screenshots\FullPageDesktop.png)

### Desktop

![Screenshot](public\screenshots\FullPageMobile.png)
