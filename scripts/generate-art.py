"""
Generate beautiful SVG-based artistic illustrations for the gallery.
Each image is a unique abstract feminine-themed illustration.
Completely original — no copyright issues.
"""
import os
import random

OUT_DIR = "/home/z/my-project/public/images/gallery"
os.makedirs(OUT_DIR, exist_ok=True)

random.seed(42)

ILLUSTRATIONS = [
    {"name": "blooming-girl", "title": "دخترِ شکوفا", "pal": ["#ffd9e8", "#ff8fb1", "#c44569", "#8b2c4d", "#4a1830"]},
    {"name": "moon-princess", "title": "شاهزاده‌ی ماه", "pal": ["#2d1b4e", "#6b4699", "#c44569", "#ffd700", "#fff5e0"]},
    {"name": "sunrise-warrior", "title": "جنگجوی طلوع", "pal": ["#ffd700", "#ff8c69", "#ff6b9d", "#c44569", "#7a1f3d"]},
    {"name": "butterfly-dreamer", "title": "رویای پروانه", "pal": ["#ffb3c6", "#c44569", "#f8b500", "#8b2c4d", "#4a1830"]},
    {"name": "rose-garden", "title": "باغِ گل‌ها", "pal": ["#ffe4ec", "#ff6b9d", "#c44569", "#8b2c4d", "#4a1830"]},
    {"name": "star-weaver", "title": "بافنده‌ی ستارگان", "pal": ["#4a3a7c", "#6b4699", "#c44569", "#ffd700", "#fff5e0"]},
]

def make_svg(name: str, title: str, pal: list, idx: int) -> str:
    rng = random.Random(idx)

    stops = "".join(
        f'<stop offset="{i*25}%" stop-color="{c}"/>'
        for i, c in enumerate(pal[:4])
    )

    petals = []
    for i in range(15):
        x = rng.randint(50, 750)
        y = rng.randint(50, 550)
        r = rng.randint(8, 20)
        opacity = rng.uniform(0.3, 0.7)
        petals.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="white" opacity="{opacity:.2f}"/>')

    stars = []
    for i in range(20):
        x = rng.randint(50, 750)
        y = rng.randint(50, 350)
        size = rng.randint(2, 6)
        stars.append(
            f'<polygon points="{x},{y-size} {x+size*0.3},{y-size*0.3} {x+size},{y} {x+size*0.3},{y+size*0.3} {x},{y+size} {x-size*0.3},{y+size*0.3} {x-size},{y} {x-size*0.3},{y-size*0.3}" fill="white" opacity="0.7"/>'
        )

    girl = """
    <g transform="translate(400, 400)">
      <circle cx="0" cy="-120" r="55" fill="white" opacity="0.95"/>
      <path d="M -50 -130 Q -80 -90 -75 -30 Q -70 30 -60 80 L -55 100 L -45 95 Q -50 50 -45 0 Q -40 -50 -40 -110 Z" fill="white" opacity="0.85"/>
      <path d="M 50 -130 Q 80 -90 75 -30 Q 70 30 60 80 L 55 100 L 45 95 Q 50 50 45 0 Q 40 -50 40 -110 Z" fill="white" opacity="0.85"/>
      <path d="M -30 -75 Q 0 -85 30 -75 L 80 200 Q 0 220 -80 200 Z" fill="white" opacity="0.92"/>
      <path d="M -25 -65 Q -55 -30 -70 30 Q -65 60 -55 75 L -50 60 Q -45 30 -35 -10 Z" fill="white" opacity="0.9"/>
      <path d="M 25 -65 Q 55 -30 70 30 Q 65 60 55 75 L 50 60 Q 45 30 35 -10 Z" fill="white" opacity="0.9"/>
    </g>
    """

    flowers = ""
    for i in range(6):
        x = 100 + i * 110
        y = 580 + rng.randint(-30, 30)
        c = ["#ff6b9d", "#ffd700", "#ff8c69", "#c44569", "#ffb3c6"][i % 5]
        flowers += f'''
        <g transform="translate({x},{y})">
          <circle cx="0" cy="-15" r="10" fill="{c}"/>
          <circle cx="-13" cy="-5" r="10" fill="{c}"/>
          <circle cx="13" cy="-5" r="10" fill="{c}"/>
          <circle cx="-8" cy="8" r="10" fill="{c}"/>
          <circle cx="8" cy="8" r="10" fill="{c}"/>
          <circle cx="0" cy="-2" r="6" fill="#ffd700"/>
          <path d="M 0 5 L 0 50" stroke="#4a8c2c" stroke-width="3" fill="none"/>
        </g>'''

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 700" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg{idx}" x1="0%" y1="0%" x2="100%" y2="100%">
      {stops}
    </linearGradient>
    <radialGradient id="glow{idx}" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="white" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="700" fill="url(#bg{idx})"/>
  <rect width="800" height="700" fill="url(#glow{idx})"/>
  {"".join(petals)}
  {"".join(stars)}
  {girl}
  {flowers}
  <text x="400" y="670" text-anchor="middle" font-family="Vazirmatn, sans-serif" font-size="28" font-weight="bold" fill="white" opacity="0.85">{title}</text>
</svg>'''
    return svg

for idx, ill in enumerate(ILLUSTRATIONS):
    svg = make_svg(ill["name"], ill["title"], ill["pal"], idx)
    path = os.path.join(OUT_DIR, f"{ill['name']}.svg")
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Created: {path} ({os.path.getsize(path)} bytes)")

print(f"\nAll illustrations saved to: {OUT_DIR}")
