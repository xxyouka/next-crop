"""Prepare the Kaiping Sentinel-2 context image. Requires rasterio and Pillow."""
from pathlib import Path

from PIL import Image
import rasterio
from rasterio.enums import Resampling
from rasterio.warp import transform_bounds
from rasterio.windows import from_bounds

URL = (
    "https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/"
    "49/Q/FE/2025/1/S2A_49QFE_20250103_0_L2A/TCI.tif"
)
BOUNDS = (112.548, 22.440, 112.655, 22.519)

with rasterio.Env(GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR"):
    with rasterio.open(URL) as source:
        bounds = transform_bounds("EPSG:4326", source.crs, *BOUNDS)
        window = from_bounds(*bounds, transform=source.transform)
        rgb = source.read((1, 2, 3), window=window, out_shape=(3, 850, 1080), resampling=Resampling.average)
Image.fromarray(rgb.transpose(1, 2, 0)).save(
    Path(__file__).resolve().parents[1] / "assets/kaiping.webp", quality=89, method=6,
)
