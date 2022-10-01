#!/bin/bash

png="$1"

echo "Converting $png..."
convert -quality 90 "$png" "${png%.png}.jpg"
convert -quality 90 -define webp:lossless=true "$png" "${png%.png}.webp"
