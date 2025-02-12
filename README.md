# Husarbeidslivsfag.com

## About

THis is the source code for the website [husarbeidslivsfag.com](https://husarbeidslivsfag.com). It was developed to serve as a homepage and resource portal for the "Arbeidslivsfag" classes at Helland Ungdomsskole.

## Functinality

- [x] Homepage
- [x] Grade based content and pages
- [x] Content management
- [x] User management
- [x] User authentication
- [x] User roles
- [x] Student Company Portals / Homepages
- [x] Company management
- [x] Overarching news system
- [x] Contact form

## Stack

- [x] Nuxt.js
- [x] Tailwind CSS
- [x] Express.js
- [x] MongoDB
- [x] Typescript
- [x] Axios
- [x] Docker
- [x] Digital Ocean Droplets

## Setup

### Prerequisites

- Node.js
- Docker

To run the project locally, you can use the docker-compose file to spin up the project, or alternativly:

- Install the dependencies using `npm install` for both client and server.
- Create a .env file in the server directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/abf
```

- Spin up a MongoDB instance using docker-compose:

```
docker pull mongo:latest
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

- Start the frontend and backend using `npm run dev` for both client and server.

## Contributing

Contributions are welcome, as long as they are relevant to the project. Please open an issue or pull request to discuss your changes before submitting them.

## Deployment

The project is deployed using Docker and Digital Ocean. The deployment process is managed by Martinus T. Slemmen (+47 90204605). If you have any questions or need assistance with the deployment process, please contact Martinus.

## License

This project is owned by Helland Ungdomsskole, in addtition to Newbyte Solutions EB. The code is only to be used by the school, and is not to be used for any other purpose. The code is not to be distributed or shared with any other parties. The code is not to be used for any commercial purposes.

## Contact

For any questions or inquiries, please contact Martinus T. Slemmen (+47 90204605) or Newbyte Solutions EB.
