#!/bin/bash

readonly BASE_DIR="$( readlink -f "$(dirname "$0")" )"
readonly IMG_DIR="$BASE_DIR/../src/assets/img"

mapfile -t pngs < <(find "$IMG_DIR" -iname '*.png')

for png in "${pngs[@]}"; do
  echo "Converting $png..."
  convert -quality 90 "$png" "${png%.png}.jpg"
  convert -quality 90 -define webp:lossless=true "$png" "${png%.png}.webp"
done
