# Usage (Pillow and the Montserrat TTFs are needed):
#   python3 -m venv .venv && .venv/bin/pip install pillow
#   mkdir -p fonts && for w in Light; do
#     curl -sL -o fonts/Montserrat-$w.ttf \
#       "https://github.com/JulietaUla/Montserrat/raw/master/fonts/ttf/Montserrat-$w.ttf"; done
#   .venv/bin/python _tools/og_card.py assets/img/avatar_gradient.jpg assets/img/og-card.jpg fonts

"""Renders the Open Graph card (1200x630) in the style of the site's splash."""
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops

SRC, OUT, FONTS = sys.argv[1], sys.argv[2], sys.argv[3]
W, H = 1200, 630

NEUTRAL_BLACK = (51, 51, 51)
BRAND_RED = (255, 16, 78)
BLUE = (0, 0, 255)

light = lambda s: ImageFont.truetype(f"{FONTS}/Montserrat-Light.ttf", s)


def cover(img, w, h, pos_x=0.6, pos_y=0.5):
    """object-fit: cover with object-position (pos_x, pos_y)."""
    scale = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * scale), round(img.height * scale)), Image.LANCZOS)
    x = round((img.width - w) * pos_x)
    y = round((img.height - h) * pos_y)
    return img.crop((x, y, x + w, y + h))


def text_width(text, font, tracking):
    return sum(font.getlength(c) + tracking for c in text) - tracking


def draw_tracked(draw, xy, text, font, fill, tracking):
    """Draws text with letter-spacing (Pillow has no tracking option)."""
    x, y = xy
    for c in text:
        draw.text((x, y), c, font=font, fill=fill)
        x += font.getlength(c) + tracking


def glow(mask):
    """White halo behind the text, like the splash title's text-shadow but
    stronger: a dense rim around the letters (dilated, slightly blurred) so
    they stay readable over dark areas of the photo, plus a wider soft glow."""
    rim = mask.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(2))
    near = mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(8))
    far = mask.filter(ImageFilter.GaussianBlur(18))
    a = ImageChops.add(rim, ImageChops.add(near, near))
    return ImageChops.add(a, ImageChops.add(far, far))


def horizontal_gradient(w, h, stops):
    """stops: list of (position 0..1, (r, g, b, a)), linearly interpolated."""
    grad = Image.new("RGBA", (w, h))
    px = grad.load()
    for x in range(w):
        t = x / (w - 1)
        for (p0, c0), (p1, c1) in zip(stops, stops[1:]):
            if p0 <= t <= p1 or (t < stops[0][0] and p0 == stops[0][0]) or (t > stops[-1][0] and p1 == stops[-1][0]):
                k = 0 if p1 == p0 else min(max((t - p0) / (p1 - p0), 0), 1)
                col = tuple(round(a + (b - a) * k) for a, b in zip(c0, c1))
                break
        for y in range(h):
            px[x, y] = col
    return grad


card = cover(Image.open(SRC).convert("RGB"), W, H).convert("RGBA")

# --- Bar: splash social bar gradient (red 10% -> 15% red 95%) over a 13% blue tint
bar_h, bar_bottom = 64, H - 64
bar_top = bar_bottom - bar_h
tint = Image.new("RGBA", (W, bar_h), BLUE + (round(0.13 * 255),))
red = horizontal_gradient(W, bar_h, [(0.10, BRAND_RED + (255,)), (0.95, BRAND_RED + (round(0.15 * 255),))])
bar = Image.alpha_composite(tint, red)
card.alpha_composite(bar, (0, bar_top))

pad_x = 72

# --- Title: kicker + headline, light weight, tight tracking, white glow
size = 84
font = light(size)
tracking = -0.05 * size
lines = ["Adrián Moreno", "Software Engineer"]
line_h = round(size * 1.18)
title_bottom = bar_top - 22
y0 = title_bottom - line_h * len(lines)

mask = Image.new("L", (W, H), 0)
mdraw = ImageDraw.Draw(mask)
for i, line in enumerate(lines):
    draw_tracked(mdraw, (pad_x, y0 + i * line_h), line, font, 255, tracking)

white = Image.new("RGBA", (W, H), (255, 255, 255, 0))
white.putalpha(glow(mask))
card.alpha_composite(white)

ink = Image.new("RGBA", (W, H), NEUTRAL_BLACK + (0,))
ink.putalpha(mask)
card.alpha_composite(ink)

card.convert("RGB").save(OUT, "JPEG", quality=88, optimize=True, progressive=True)
print(OUT, card.size)
