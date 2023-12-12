# Raven Mobile Front

This project is the front-end for the Raven Social Network

## Technologies

- React-native
- Expo
- Axios

## Installation

In your terminal use the following commands:

- Clone the repository in your machine using Git:

```sh
git clone https://github.com/Huio-op/raven_mobile_front.git
```

- Enter the project directory (default name);

```
cd raven_mobile_front/
```

- Install the required dependencies:

```
npm install
```

- Run the project using

```
npm run start
```

- Scan the QR Code on your cell phone or use the Web version


## Build

- To generate a development build to test the app run: 
```
npx eas build -p android --profile development
```

- To generate the production apk run:
```
npx eas build -p android --profile preview
```