import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('/Users/ccbaby/Desktop/Google_Ads_Assets', exist_ok=True)
os.makedirs('/Users/ccbaby/Desktop/regionalcredit-web/public/ads', exist_ok=True)

font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'

def get_font(size):
    try:
        return ImageFont.truetype(font_path, size)
    except:
        return ImageFont.load_default()

# 1. LOGO (512x512)
logo = Image.new('RGB', (512, 512), color=(15, 23, 42))
d_logo = ImageDraw.Draw(logo)

# Rounded outer border
d_logo.rounded_rectangle([15, 15, 497, 492], radius=32, fill=(15, 23, 42), outline=(30, 41, 59), width=4)

# Orange RC badge box
d_logo.rounded_rectangle([136, 80, 376, 310], radius=36, fill=(255, 107, 0))

f_logo_rc = get_font(130)
f_logo_text = get_font(38)
f_logo_sub = get_font(24)

d_logo.text((256, 185), 'RC', fill=(255, 255, 255), anchor='mm', font=f_logo_rc)
d_logo.text((256, 380), 'Regional Credit', fill=(255, 255, 255), anchor='mm', font=f_logo_text)
d_logo.text((256, 435), 'ACL #525087', fill=(148, 163, 184), anchor='mm', font=f_logo_sub)

logo.save('/Users/ccbaby/Desktop/Google_Ads_Assets/logo.png')
logo.save('/Users/ccbaby/Desktop/regionalcredit-web/public/ads/logo.png')

# 2. LANDSCAPE AD IMAGE (1200x628)
land = Image.new('RGB', (1200, 628), color=(15, 23, 42))
d_land = ImageDraw.Draw(land)

# Border
d_land.rectangle([10, 10, 1190, 618], outline=(30, 41, 59), width=3)

# Top Orange Badge
d_land.rounded_rectangle([60, 45, 520, 105], radius=20, fill=(255, 107, 0), outline=(255, 107, 0))
d_land.text((290, 75), 'REGIONAL SA ACCESS', fill=(255, 255, 255), anchor='mm', font=get_font(22))

# Headlines
d_land.text((60, 140), 'Personal Line of Credit', fill=(255, 255, 255), font=get_font(52))
d_land.text((60, 215), '$2,000 to $10,000', fill=(255, 107, 0), font=get_font(64))

# Bullet Points
bullets = [
    '•  $0 Establishment Fee & $0 Monthly Fees',
    '•  Pay Interest Only On What You Draw',
    '•  Fast 2-Minute Digital Pre-Approval',
    '•  Live Regional SA Credit Agent Callbacks'
]
f_bullet = get_font(28)
y_pos = 320
for b in bullets:
    d_land.text((60, y_pos), b, fill=(226, 232, 240), font=f_bullet)
    y_pos += 52

# Footer
d_land.line([60, 540, 1140, 540], fill=(30, 41, 59), width=2)
d_land.text((60, 565), 'Operating under Australian Credit Licence 525087', fill=(148, 163, 184), font=get_font(20))
d_land.text((1140, 565), 'regionalcredit.au', fill=(16, 185, 129), anchor='ra', font=get_font(24))

land.save('/Users/ccbaby/Desktop/Google_Ads_Assets/ad_landscape.png')
land.save('/Users/ccbaby/Desktop/regionalcredit-web/public/ads/ad_landscape.png')

# 3. SQUARE AD IMAGE (1080x1080)
sq = Image.new('RGB', (1080, 1080), color=(15, 23, 42))
d_sq = ImageDraw.Draw(sq)

# Outer Border
d_sq.rectangle([15, 15, 1065, 1065], outline=(30, 41, 59), width=3)

# Top Orange Badge
d_sq.rounded_rectangle([140, 70, 940, 150], radius=24, fill=(255, 107, 0))
d_sq.text((540, 110), '100% ONLINE PRE-APPROVAL', fill=(255, 255, 255), anchor='mm', font=get_font(34))

# Titles
d_sq.text((540, 220), 'Regional Credit SA', fill=(255, 255, 255), anchor='mm', font=get_font(54))
d_sq.text((540, 310), '$2,050 – $10,000', fill=(255, 107, 0), anchor='mm', font=get_font(72))

# Central Card
d_sq.rounded_rectangle([100, 410, 980, 820], radius=32, fill=(30, 41, 59), outline=(51, 65, 85), width=3)
d_sq.text((540, 470), 'FLEXIBLE PERSONAL LINE OF CREDIT', fill=(148, 163, 184), anchor='mm', font=get_font(28))

d_sq.text((540, 560), '$0 Setup Fee  •  $0 Monthly Fees', fill=(16, 185, 129), anchor='mm', font=get_font(42))
d_sq.text((540, 650), 'Redraw Funds Whenever You Need', fill=(255, 255, 255), anchor='mm', font=get_font(36))
d_sq.text((540, 740), 'Fast Live Agent Callback', fill=(56, 189, 248), anchor='mm', font=get_font(34))

# Footer
d_sq.text((540, 900), 'Australian Credit Licence 525087', fill=(255, 255, 255), anchor='mm', font=get_font(32))
d_sq.text((540, 960), 'Apply Online in 2 Mins @ regionalcredit.au', fill=(148, 163, 184), anchor='mm', font=get_font(26))

sq.save('/Users/ccbaby/Desktop/Google_Ads_Assets/ad_square.png')
sq.save('/Users/ccbaby/Desktop/regionalcredit-web/public/ads/ad_square.png')

print('Clean script generated images successfully!')
