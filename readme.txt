# Vehicle Cost Estimator (Service) 

This is a side project I created based on other simulators I have made for other compaines. 
It uses Puppeteerto search Edmunds for similar vehicles so users can get an idea of how much other sales.
This project is a back-end application built with [Express](http://expressjs.com/), [React](https://reactjs.org/), and [TypeScript](https://www.typescriptlang.org/). 
It serves as the service for a vehicle cost estimator simulator and is designed to work with the `vehicle-sim-react-client` repository.

## Features

- ⚡ **Express** - Fast, optimized bundling and development.
- ⚛️ **React** - Efficient UI building.
- 💅 **SCSS** - Built-in support for SCSS for styling.
- 🤖 **Puppeteer** - Web scraping and automation for data extraction.


## Future Features

- 🚗 **Enhanced Vehicle Data** - Add trim selection and integration with more comprehensive vehicle data sources.
- 📊 **Advanced Analytics** - Vehicle loan calculator along with more vehicle statistics like resale and number still on the road/registered
- 📱 **Mobile Compatibility** - Improved compatibility with mobile devices.
- 🔄 **Convert to TypeScript** - Convert the entire codebase to TypeScript for better type safety and maintainability.

### Prerequisites

Ensure Node.js and npm are installed on your machine. Download [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Japapino/vehicle-sim-node-server.git
   cd vehicle-sim-node-server
   ```
2. Install dependencies
    ```bash
    npm install
    ```
    2a. First run through requires import of vehicle make and model data
    ```bash
    npm import
    ```
3. Start application
    ```bash
    npm run start
    ```
4. Start node server (see vehicle-sim-react-client repo)

### Related Repositories

vehicle-sim-react-client: The React client that to be used in conjunction with this microservice.

