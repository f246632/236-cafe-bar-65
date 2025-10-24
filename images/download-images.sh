#!/bin/bash
cd "$(dirname "$0")/downloaded"

# Image URLs from CSV
urls=(
"https://lh3.googleusercontent.com/p/AF1QipOloVa-HVGMfGzLuVTjOaL0n4Ur8XpDhCoEmMg2=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipPPlCgxzCRTKUoiOnJS2VCNx66GIuuB2Kzls5zK=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4np-9r_bLJnka8n1MpCeH7e5K8vv1WqgEFgzBP-NyfWf9oIr-BvBo_8ri4iFSpZByRzUQylslzjsVIo810GkGMUzyHC5F-GMYitj3uacQh4l-6729svzPpr16sM1gxDm0b0K_M2F=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipPvxAucF4Au2eip1AyH034wvh42wtwWWWdszapc=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipNmnYb_VBntnT_jrk92z2dtGqCk8VVlWbARkp5F=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipOhdYkHpDBUr1DF-wqMtVRKSiNC6OIymlMgs2k4=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipNVk-VuWDNAj-6r9gahe637hrMiNUC6Q0mvcrQo=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/gps-cs-s/AC9h4npthg4GMSTiQaIBm1p6uCKy3n_ogP0owaAj3UBRBO-4btYDES9ZveMuypEC8YnZ0XNq8sjY46glFxWxZ1NRnoML1mbRRTRaqnBmXMPiV1g9HQ_-jezXj6oY-JslQb7VwW02JCk8=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipOs5QmG10MA-Sl4naHCzIpyGO8EgWa9VrH3zrE_=w1920-h1080-k-no"
"https://lh3.googleusercontent.com/p/AF1QipP9PcHaTcKLY9K2pMfYki-S1WmA36kegsb5XT9K=w1920-h1080-k-no"
)

# Download each image
for i in "${!urls[@]}"; do
  num=$((i + 1))
  echo "Downloading image $num..."
  curl -s -L "${urls[$i]}" -o "cafe-${num}.jpg"
done

echo "Downloaded ${#urls[@]} images"
