## Raspberry PI
- Raspberry pi OS Lite or Full is recommended.
- Install Python. python 3 from APT is recommended.
- Install packages, pip is the recommended packages manager.
```
pip install joblib Librosa numpy sounddevice requeset PCF8574 RPi.GPIO
```
- Connect the devices, sensors and module as the supplied schematics.
  
- run the main program
```
python3 main.py
```

## Dashboard and API
Go to each root folder and run to install packages
```
npm install
```

Run API part on the root API with
```
node index.js
```
And Frontend part on the root Dashboard directory with
```
npm run dev
```
