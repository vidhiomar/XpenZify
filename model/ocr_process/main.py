import os
import cv2
import pytesseract
import pandas as pd
from kaggle.api.kaggle_api_extended import KaggleApi

# ------------------- CONFIGURATION -------------------

# Kaggle dataset and paths
DATASET_NAME = "mehaksingal/personal-financial-dataset-for-india"
INPUT_DIR = "uploaded_images"
OUTPUT_DIR = "salaryOutput"
OUTPUT_uDIR = "UtilityOutput"
  # Changed output folder name

# Create necessary directories
os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(OUTPUT_uDIR, exist_ok=True)

# ------------------- AUTHENTICATE & DOWNLOAD -------------------

api = KaggleApi()
api.authenticate()

# Download and unzip dataset into INPUT_DIR
api.dataset_download_files(DATASET_NAME, path=INPUT_DIR, unzip=True)

# (Optional) Configure tesseract path if needed (Windows only)
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# ------------------- IMAGE PROCESSING FUNCTION -------------------

def process_image(image_path):
    """Process a single image and return extracted DataFrame"""
    try:
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Image could not be read.")

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        text = pytesseract.image_to_string(gray)

        lines = text.split("\n")
        data = []

        for line in lines:
            line = line.strip()
            if not line:
                continue

            if ":" in line:
                key, value = line.split(":", 1)
                data.append([key.strip(), value.strip()])
            elif any(char.isdigit() for char in line) and not line.lower().startswith("amount"):
                parts = line.rsplit(maxsplit=1)
                if len(parts) == 2:
                    data.append([parts[0].strip(), parts[1].strip()])

        return pd.DataFrame(data, columns=["Field", "Value"])

    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")
        return pd.DataFrame()

# ------------------- PROCESSING LOOP -------------------
SALARY_FOLDER = os.path.join(INPUT_DIR, "Salary Slip")
UTILITY_FOLDER = os.path.join(INPUT_DIR, "Utility")

for file in os.listdir(SALARY_FOLDER):
    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(SALARY_FOLDER, file)
            df = process_image(image_path)

            if not df.empty:
                output_basename = os.path.splitext(file)[0]  # e.g., "1" from "1.jpg"
                output_filename = f"{output_basename}s.csv"
                output_path = os.path.join(OUTPUT_DIR, output_filename)
                df.to_csv(output_path, index=False)
                print(f"Processed {file} -> {output_filename}")


for file in os.listdir(UTILITY_FOLDER):
    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(SALARY_FOLDER, file)
            df = process_image(image_path)

            if not df.empty:
                output_basename = os.path.splitext(file)[0]  # e.g., "1" from "1.jpg"
                output_filename = f"{output_basename}s.csv"
                output_path = os.path.join(OUTPUT_uDIR, output_filename)
                df.to_csv(output_path, index=False)
                print(f"Processed {file} -> {output_filename}")

print("\n All files processed and saved!")



