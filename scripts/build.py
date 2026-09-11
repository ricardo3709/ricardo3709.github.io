#!/usr/bin/env python3
"""Build only the public homepage assets; keep source CVs and drafts private."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'dist'
PUBLIC_FILES = (
    'index.html', 'stylesheet.css', 'script.js', 'images/favicon.svg',
    'images/publications/rl-architecture.png',
    'images/publications/walking-networks.png',
    'images/publications/ferry-berths.png',
    'images/experience/background-960.webp',
    'images/experience/background-1440.webp',
    'images/experience/background-1920.webp',
    'images/experience/background.jpeg',
)
for filename in PUBLIC_FILES:
    if not (ROOT / filename).is_file():
        raise FileNotFoundError(f'Missing public asset: {filename}')
if OUTPUT.is_symlink():
    raise RuntimeError('Refusing to replace a symlinked output directory.')
if OUTPUT.exists():
    shutil.rmtree(OUTPUT)
for filename in PUBLIC_FILES:
    destination = OUTPUT / filename
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / filename, destination)
print(f'Built {len(PUBLIC_FILES)} public files in {OUTPUT}')
