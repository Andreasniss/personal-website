#!/usr/bin/env python3
"""Export reviewed editorial masters for web and social use (requires Pillow)."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/editorial'
WEB = ROOT / 'static/images/editorial'
SOCIAL = ROOT / 'static/images/social'

def main():
    WEB.mkdir(parents=True, exist_ok=True)
    SOCIAL.mkdir(parents=True, exist_ok=True)
    font = ImageFont.truetype('DejaVuSans.ttf', 16)
    for article in json.loads((SOURCE / 'manifest.json').read_text())['articles']:
        slug = article['slug']
        source = SOURCE / f'{slug}.webp'
        with Image.open(source) as original:
            art = ImageOps.contain(original.convert('RGB'), (1200, 575), Image.Resampling.LANCZOS)
        canvas = Image.new('RGB', (1200, 630), '#101b18')
        canvas.paste(art, ((1200-art.width)//2, (575-art.height)//2))
        draw = ImageDraw.Draw(canvas)
        draw.text((38, 596), 'ANDREAS NISSEN', font=font, fill='#f1eadb')
        draw.text((1162, 596), 'andreasnissen.dev', font=font, fill='#80c6b5', anchor='ra')
        canvas.save(WEB / f'{slug}-v1.webp', quality=86, method=6)
        canvas.save(SOCIAL / f'{slug}-editorial-v1.png', optimize=True)

if __name__ == '__main__':
    main()
