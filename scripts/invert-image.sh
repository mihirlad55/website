#!/bin/bash

png="$1"

echo "Converting $png..."
convert "$png" -channel RGB -negate "$png"
