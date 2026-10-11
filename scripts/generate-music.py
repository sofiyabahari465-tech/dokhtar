"""
Generate a soft, romantic royalty-free instrumental track for Girls Day.
Creates a 45-second ambient pad with gentle piano-like notes.
Completely original — no copyright issues.
"""
import numpy as np
import wave
import os

SAMPLE_RATE = 44100
DURATION = 45  # seconds — gentle, sustained melody
TOTAL_SAMPLES = SAMPLE_RATE * DURATION

NOTES = {
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23,
    'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'G5': 783.99,
}

melody = [
    ('E5', 1.2), ('D5', 0.6), ('C5', 1.0), ('G4', 0.8),
    ('A4', 1.0), ('E5', 0.8), ('D5', 1.0), ('C5', 1.4),
    ('G4', 0.8), ('A4', 1.0), ('C5', 0.8), ('D5', 1.0),
    ('E5', 1.2), ('G5', 0.8), ('E5', 1.0), ('D5', 1.4),
    ('C5', 1.0), ('A4', 0.8), ('G4', 1.0), ('E4', 1.2),
    ('C4', 1.6), ('rest', 0.8),
    ('E5', 1.0), ('C5', 0.8), ('G4', 1.0), ('A4', 1.2),
    ('C5', 0.8), ('D5', 1.0), ('E5', 1.4), ('C5', 1.6),
    ('rest', 2.0),
]

harmony = [
    ('C4', 4.0), ('A4', 4.0), ('F4', 4.0), ('G4', 4.0),
    ('C4', 4.0), ('A4', 4.0), ('F4', 4.0), ('G4', 4.0),
    ('C4', 4.0), ('G4', 4.0), ('C4', 5.0),
]

def adsr_envelope(length, attack=0.05, decay=0.1, sustain=0.7, release=0.3):
    samples = int(length)
    env = np.ones(samples)
    a = int(samples * attack)
    d = int(samples * decay)
    r = int(samples * release)
    s = samples - a - d - r
    if a > 0:
        env[:a] = np.linspace(0, 1, a)
    if d > 0:
        env[a:a+d] = np.linspace(1, sustain, d)
    if s > 0:
        env[a+d:a+d+s] = sustain
    if r > 0:
        env[-r:] = np.linspace(sustain, 0, r)
    return env

def make_tone(freq, duration, vol=0.3):
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    wave_signal = (
        np.sin(2 * np.pi * freq * t) * 0.7 +
        np.sin(2 * np.pi * freq * 2 * t) * 0.2 +
        np.sin(2 * np.pi * freq * 3 * t) * 0.1
    )
    env = adsr_envelope(n)
    return wave_signal * env * vol

def make_pad(freq, duration, vol=0.12):
    n = int(SAMPLE_RATE * duration)
    t = np.linspace(0, duration, n, endpoint=False)
    signal = (
        np.sin(2 * np.pi * freq * t) +
        np.sin(2 * np.pi * freq * 1.005 * t) +
        np.sin(2 * np.pi * freq * 0.995 * t) +
        np.sin(2 * np.pi * freq * 2 * t) * 0.3
    ) / 4
    env = adsr_envelope(n, attack=0.2, decay=0.2, sustain=0.8, release=0.4)
    return signal * env * vol

melody_track = np.zeros(TOTAL_SAMPLES)
pos = 0
for note, dur in melody:
    if note != 'rest' and pos < TOTAL_SAMPLES:
        freq = NOTES[note]
        tone = make_tone(freq, dur)
        end = min(pos + len(tone), TOTAL_SAMPLES)
        melody_track[pos:end] += tone[:end-pos]
    pos += int(SAMPLE_RATE * dur)

harmony_track = np.zeros(TOTAL_SAMPLES)
pos = 0
for note, dur in harmony:
    if pos < TOTAL_SAMPLES:
        freq = NOTES[note]
        pad = make_pad(freq, dur)
        end = min(pos + len(pad), TOTAL_SAMPLES)
        harmony_track[pos:end] += pad[:end-pos]
    pos += int(SAMPLE_RATE * dur)

combined = melody_track + harmony_track

delay_samples = int(SAMPLE_RATE * 0.15)
if len(combined) > delay_samples:
    reverb = np.zeros_like(combined)
    reverb[delay_samples:] = combined[:-delay_samples] * 0.25
    combined = combined + reverb

max_val = np.max(np.abs(combined))
if max_val > 0:
    combined = combined / max_val * 0.85

fade_len = int(SAMPLE_RATE * 1.5)
combined[:fade_len] *= np.linspace(0, 1, fade_len)
combined[-fade_len:] *= np.linspace(1, 0, fade_len)

combined_int16 = (combined * 32767).astype(np.int16)

output_path = '/home/z/my-project/public/audio/girls-day-music.wav'
with wave.open(output_path, 'w') as wf:
    wf.setnchannels(1)
    wf.setsampwidth(2)
    wf.setframerate(SAMPLE_RATE)
    wf.writeframes(combined_int16.tobytes())

print(f"Generated music: {output_path}")
print(f"Duration: {DURATION}s")
print(f"Size: {os.path.getsize(output_path)} bytes ({os.path.getsize(output_path)/1024:.1f} KB)")
