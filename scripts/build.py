#!/usr/bin/env python3
"""Build only the public homepage assets; keep source CVs and drafts private."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'dist'
PUBLIC_FILES = (
    'index.html', 'other-than-academic.html', 'stylesheet.css', 'script.js',
    'images/favicon.svg', 'images/profile-placeholder.svg',
)
IMAGE_SUFFIXES = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.svg'}
publication_images = tuple(
    str(path.relative_to(ROOT))
    for path in sorted((ROOT / 'images/publications').glob('*'))
    if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
)
personal_images = tuple(
    str(path.relative_to(ROOT))
    for path in sorted((ROOT / 'images/personal').rglob('*'))
    if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
)
profile_images = tuple(
    str(path.relative_to(ROOT))
    for path in sorted((ROOT / 'images').glob('profile.*'))
    if path.is_file() and path.suffix.lower() in IMAGE_SUFFIXES
)
public_files = PUBLIC_FILES + publication_images + profile_images + personal_images
for filename in public_files:
    if (ROOT / filename).is_symlink():
        raise RuntimeError(f'Public assets must be regular files: {filename}')
    if not (ROOT / filename).is_file():
        raise FileNotFoundError(f'Missing public asset: {filename}')
if OUTPUT.is_symlink():
    raise RuntimeError('Refusing to replace a symlinked output directory.')
if OUTPUT.exists():
    shutil.rmtree(OUTPUT)
for filename in public_files:
    destination = OUTPUT / filename
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / filename, destination)
(OUTPUT / '.nojekyll').touch()
print(f'Built {len(public_files) + 1} public files in {OUTPUT}')
