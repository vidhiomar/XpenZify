# ── Imports ────────────────────────────────────────────
import os
import pandas as pd
import re

# ── Input and Output Paths ─────────────────────────────
input_folder = r"model\salaryOutput"
output_folder = r"model\classified\salary"
os.makedirs(output_folder, exist_ok=True)

# ── Keywords for classification ────────────────────────
allowance_keywords = ["allowance", "hra", "house rent allowance", "conveyance allowance", 
                      "special allowance", "bonus", "perks", "incentive"]
deduction_keywords = ["deduction" or ["tax", "insurance", "advance", "pf", "deduction", "repayment"]]
net_pay_keywords    = ["gross" or"salary"or "Take Home Pay"]

# ── Helper function: clean and convert amounts ─────────
def extract_amount(val):
    try:
        val = re.sub(r'[^\d.-]', '', str(val))
        return float(val)
    except:
        return 0.0

# ── Helper function: extract month and year ────────────
def extract_month_year(row):
    text = row['text']
    if text == "date":
        return str(row['raw_amount']).strip()
    
    if "pay slip" in text:
        month_names = ["jan", "feb", "mar", "apr", "may", "jun", 
                       "jul", "aug", "sep", "oct", "nov", "dec"]
        for m in month_names:
            if m in text:
                month_found = m.capitalize()
                try:
                    numeric_year = int(row['amount_numeric'])
                    if numeric_year > 1000:
                        return f"{month_found} {numeric_year}"
                except:
                    pass
    
    pattern = r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s,]+(\d{4})\b'
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        month = match.group(1).capitalize()
        year  = match.group(2)
        return f"{month} {year}"
    
    return None

# ── Process all CSV files ending with 's.csv' ──────────
for file in os.listdir(input_folder):
    if file.endswith("s.csv"):
        file_path = os.path.join(input_folder, file)
        df = pd.read_csv(file_path)

        # Standardize columns
        df.columns = [col.strip().lower() for col in df.columns]
        df.rename(columns={'field': 'text', 'value': 'amount'}, inplace=True)

        if 'amount' not in df.columns:
            print(f"Skipped {file} -> 'amount' column not found.")
            continue

        df['raw_amount'] = df['amount']

        df['amount_numeric'] = df.apply(
            lambda row: extract_amount(row['amount']) if str(row['text']).strip().lower() != "date" else None, axis=1)


        # Clean text
        df['text'] = df['text'].astype(str).str.lower().str.strip()

        # Extract date
        df['extracted_date'] = df.apply(extract_month_year, axis=1)

        # Classification
        df['is_allowance'] = df['text'].apply(lambda x: any(k in x for k in allowance_keywords))
        df['is_deduction'] = df['text'].apply(lambda x: any(k in x for k in deduction_keywords))
        df['is_netpay']    = df['text'].apply(lambda x: any(k in x for k in net_pay_keywords))

        # Totals
        total_allowance = df[df['is_allowance']]['amount_numeric'].sum(min_count=1)
        total_deduction = df[df['is_deduction']]['amount_numeric'].sum(min_count=1)
        total_netpay    = df[df['is_netpay']]['amount_numeric'].sum(min_count=1)

        # Extract date
        unique_dates = df['extracted_date'].dropna().unique()
        extracted_date = unique_dates[0] if len(unique_dates) > 0 else None

        # Build summary
        summary_data = {
            'Net Pay': total_netpay,
            'Allowances': total_allowance,
            'Deductions': total_deduction
        }
        if extracted_date:
            summary_data['Date'] = extracted_date

        summary = pd.DataFrame([summary_data])

        # Create output filename
        base_name = os.path.splitext(file)[0]  # e.g., '1s'
        output_file = f"{base_name.replace('s', 'c_s')}.csv"  # e.g., '1c_s.csv'
        output_path = os.path.join(output_folder, output_file)

        # Save
        summary.to_csv(output_path, index=False)
        print(f"Processed {file} -> {output_file}")

print("All CSVs classified and saved .")
