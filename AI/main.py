import warnings

warnings.simplefilter("ignore")

import joblib
import librosa
import numpy as np
import sounddevice as sd
import requests
import PCF8574 from PCF8574
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

# FOR BUZZER
# GPIO.setup(17, GPIO.OUT)

GPIO.setup(4, GPIO.OUT)
i2c_port_num = 1
pcf_address = 0x20
pcf = PCF8574(i2c_port_num, pcf_address)

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

RATE = 44100
CHUNK_DURATION = 5
CHUNK_SIZE = int(RATE * CHUNK_DURATION)


def extract_single_audio_features(y, RATE):
    """Extracts various audio features including MFCCs, spectral contrast, chroma features, and more."""

    # Extract MFCCs (Mel-frequency cepstral coefficients)
    mfccs = librosa.feature.mfcc(y=y, sr=RATE, n_mfcc=13)

    # Extract Spectral Contrast
    spectral_contrast = librosa.feature.spectral_contrast(y=y, sr=RATE)

    # Extract Chroma Features
    chroma = librosa.feature.chroma_stft(y=y, sr=RATE)

    # Extract Zero Crossing Rate
    zero_crossing_rate = librosa.feature.zero_crossing_rate(y)

    # Extract Spectral Centroid
    spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=RATE)

    # Extract Spectral Bandwidth
    spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=RATE)

    # Extract Root Mean Square Energy (RMSE)
    rmse = librosa.feature.rms(y=y)

    # Extract Spectral Roll-off
    spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=RATE)

    # Extract Tempo (Beats Per Minute)
    onset_env = librosa.onset.onset_strength(y=y, sr=RATE)
    tempo = librosa.beat.tempo(onset_envelope=onset_env, sr=RATE)

    # Concatenate all the features into a single feature vector
    feature_vector = np.hstack(
        [
            np.mean(mfccs, axis=1),  # MFCCs
            np.mean(spectral_contrast, axis=1),  # Spectral Contrast
            np.mean(chroma, axis=1),  # Chroma
            np.mean(zero_crossing_rate),  # Zero Crossing Rate
            np.mean(spectral_centroid),  # Spectral Centroid
            np.mean(spectral_bandwidth),  # Spectral Bandwidth
            np.mean(rmse),  # RMSE
            np.mean(spectral_rolloff),  # Spectral Roll-off
            tempo,  # Tempo (BPM)
        ]
    )

    return feature_vector


def callback(indata, frames, time, status):
    if status:
        print(f"Status: {status}")

    # Process the incoming audio chunk
    audio_chunk = indata[:, 0]  # Use the first channel
    features = extract_single_audio_features(audio_chunk, RATE=RATE)

    # Scale the features and make a prediction
    features = features.reshape(1, -1)
    scaled_features = scaler.transform(features)
    prediction = model.predict(scaled_features)

    if prediction == 1:
        print("Y", end="")
        GPIO.output(4, GPIO.HIGH)
        pcf.port = [False] * 8
        requests.get('http://sardines.thddns.net:7277/piReport/:deviceID/detected')
    else:
        print("N", end="")
        pcf.port = [True] * 8
        requests.get('http://sardines.thddns.net:7277/piReport/:deviceID/online')


with sd.InputStream(
    callback=callback, channels=1, samplerate=RATE, blocksize=CHUNK_SIZE, device="PnP"
):
    print("Listening for screams...")
    while True:
        pcf.port[7] = True
        sd.sleep(int(CHUNK_DURATION * 1000))  # Wait for the chunk duration
        print("L", end="")
