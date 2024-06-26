# JET Restaurant Finder

JET Restaurant Finder is a React app that fetches restaurant details based on the user's input postcode. The application uses a JustEat API to obtain restaurant data.

## Demo

![ScreenRecording2024-04-18at15 53 22-ezgif com-video-to-gif-converter](https://github.com/c20chin/JET-Restaurant-Finder/assets/60973182/6f32d560-fea5-4b38-baeb-547ea8acddc1)


## Run on my free deployed website (performance may be delayed due to inactive use)
[https://celebrated-shortbread-42672f.netlify.app/](https://celebrated-shortbread-42672f.netlify.app/)

## Run on your local machine

Download this repository and follow these 3 steps to start the application:


1. Open the terminal window and navigate to JET-Restaurant-Finder folder.
2. Start the server
```bash
# Navigate to server folder
cd server

npm install

npm run start
```
3. Open another terminal window. Start the React App
```bash
# Navigate to frontend folder 'restaurant-finder'
cd restaurant-finder

npm install

npm run start
```

## Improvements & Next Steps
### 1. Performance:
Enhance data fetching performance by implementing lazy load or pagination if the data load becomes bigger.
### 2. Error input cases:
When a user enters inputs which return nothing, eg. non-existing postcode or special characters, the app should alert the user.



## License

[MIT](https://choosealicense.com/licenses/mit/)
