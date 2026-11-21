# Fake News Detector UI Prototype

A React mini-project exploring how a news-credibility interface might present results for pasted articles and social-media messages. The site is an educational demo. Use independent sources to check claims.

## Demo behavior

- Built-in examples display preset scores and example analysis.
- Custom input can receive randomized scores and labels. Scores are uncalibrated and have no measured predictive value.
- Model names and training-data figures shown in the demo UI are illustrative. The repository contains a browser app with no training pipeline or inference service.

## Project layout

- [src/index.js](src/index.js) mounts the app.
- [src/App.js](src/App.js) hosts the news interface.
- [src/MLEnhancedFakeNewsDetector.jsx](src/MLEnhancedFakeNewsDetector.jsx) contains sample inputs, simulated outputs, and the UI.
- [public](public) contains browser assets.

## Run locally

```bash
npm ci
npm start
```

Open http://localhost:3000. Run `npm run build` to create the static bundle.
