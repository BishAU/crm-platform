import pandas as pd
import sys
import os

def convert_xlsx_to_csv(xlsx_path, csv_path):
    try:
        df = pd.read_excel(xlsx_path)
        df.to_csv(csv_path, index=False)
        print(f"Successfully converted {xlsx_path} to {csv_path}")
    except Exception as e:
        print(f"Error converting {xlsx_path} to {csv_path}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python convert_xlsx_to_csv.py <xlsx_path> <csv_path>")
        sys.exit(1)

    xlsx_path = sys.argv[1]
    csv_path = sys.argv[2]
    
    if not os.path.exists(xlsx_path):
        print(f"Error: {xlsx_path} does not exist")
        sys.exit(1)

    convert_xlsx_to_csv(xlsx_path, csv_path)