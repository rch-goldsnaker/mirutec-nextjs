import sys
from PIL import Image
from sklearn.cluster import KMeans
import numpy as np

def get_dominant_colors(image_path, n_colors=5):
    try:
        image = Image.open(image_path)
        image = image.convert('RGB')
        image = image.resize((150, 150)) # Resize for speed
        pixels = np.array(image).reshape(-1, 3)

        kmeans = KMeans(n_clusters=n_colors, random_state=42, n_init=10)
        kmeans.fit(pixels)
        
        colors = kmeans.cluster_centers_.astype(int)
        
        # Convert to hex
        hex_colors = ['#{:02x}{:02x}{:02x}'.format(c[0], c[1], c[2]) for c in colors]
        return hex_colors
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        colors = get_dominant_colors(image_path)
        print("Dominant Colors:", colors)
    else:
        print("Usage: python extract_colors.py <image_path>")
