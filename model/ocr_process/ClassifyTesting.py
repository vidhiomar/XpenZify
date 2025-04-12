import os
import pandas as pd
import re

# Define the path to your input CSV file
input_csv_path = "C:/Users/harshada/Downloads/XenZify/salaryOutput/8s.csv"  # Change this to your file path

# ─── Load the CSV file ───────────────────────────────────────────────
df = pd.read_csv(input_csv_path)

# ─── Rename columns for consistency (convert headers to lowercase) ──
df.columns = [col.strip().lower() for col in df.columns]
df.rename(columns={'field': 'text', 'value': 'amount'}, inplace=True)

# ─── Create a column to hold the raw (original) amount value ─────────
df['raw_amount'] = df['amount']

# ─── Define keyword lists for classification ─────────────────────────
allowance_keywords = ["allowance", "hra", "house rent allowance", "conveyance allowance", 
                      "special allowance", "bonus", "perks", "incentive"]
deduction_keywords = ["deduction" or ["tax", "insurance", "advance", "pf", "deduction", "repayment"]]
net_pay_keywords    = ["gross" or"salary"or "Take Home Pay"]

# ─── Function: Clean and convert a value to a float (for numeric rows) ──
def extract_amount(val):
    try:
        # Remove non-numeric characters except dot and minus
        val = re.sub(r'[^\d.-]', '', str(val))
        return float(val)
    except:
        return 0.0

# ─── Create a new column "amount_numeric" only for rows that are not the Date row ──
df['amount_numeric'] = df.apply(
    lambda row: extract_amount(row['amount']) if str(row['text']).strip().lower() != "date" else None, axis=1
)

# ─── Clean the text column (convert to lowercase, strip whitespace) ──
df['text'] = df['text'].astype(str).str.lower().str.strip()

# ─── Function: Extract month and year from a row ──────────────────────
def extract_month_year(row):
    text = row['text']
    # Case 1: If this row is the "date" row, return its raw value directly.
    if text == "date":
        # Return the original value (e.g., "Oct 2022")
        return str(row['raw_amount']).strip()
    
    # Case 2: If the row contains "pay slip", look for a month and use the numeric year.
    if "Pay Slip" or "Date" in text:
        month_names = ["jan", "feb", "mar", "apr", "may", "jun", 
                       "jul", "aug", "sep", "oct", "nov", "dec"]
        for m in month_names:
            if m in text:
                month_found = m.capitalize()
                try:
                    numeric_year = int(row['amount_numeric'])
                    if numeric_year > 1000:  # basic check for a plausible year
                        return f"{month_found} {numeric_year}"
                except:
                    pass
    
    # Case 3: Fallback: Use regex to find a month and a four-digit year in the text.
    pattern = r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*[\s,]+(\d{4})\b'
    match = re.search(pattern, text, re.IGNORECASE)
    if match:
        month = match.group(1).capitalize()
        year  = match.group(2)
        return f"{month} {year}"
    
    # No date found in this row
    return None

# ─── Create a new column "extracted_date" using the extraction function ──
df['extracted_date'] = df.apply(extract_month_year, axis=1)

# ─── Classification: Create boolean masks based on keywords ───────────
df['is_allowance'] = df['text'].apply(lambda x: any(k in x for k in allowance_keywords))
df['is_deduction'] = df['text'].apply(lambda x: any(k in x for k in deduction_keywords))
df['is_netpay']    = df['text'].apply(lambda x: any(k in x for k in net_pay_keywords))

# ─── Calculate totals using only the numeric amounts (skip non-numeric "date" row) ──
total_allowance = df[df['is_allowance']]['amount_numeric'].sum(min_count=1)
total_deduction = df[df['is_deduction']]['amount_numeric'].sum(min_count=1)
total_netpay    = df[df['is_netpay']]['amount_numeric'].sum(min_count=1)

# ─── Extract a unique date from the "extracted_date" column (ignoring any None values) ──
unique_dates = df['extracted_date'].dropna().unique()
extracted_date = unique_dates[0] if len(unique_dates) > 0 else None

# ─── Build the summary dictionary; include Date if one was extracted ──
summary_data = {
    'Net Pay': total_netpay,
    'Allowances': total_allowance,
    'Deductions': total_deduction
}
if extracted_date:
    summary_data['Date'] = extracted_date

summary = pd.DataFrame([summary_data])

# ─── Save the summary to a CSV file ───────────────────────────────────
output_folder = "C:/Users/harshada/Downloads/XenZify/classified/salary"
os.makedirs(output_folder, exist_ok=True)

# Modify the file name to append "_c_s"
base_name = os.path.splitext(os.path.basename(input_csv_path))[0]
output_file = f"{base_name.replace('s', 'c_s')}.csv"
output_path = os.path.join(output_folder, output_file)

summary.to_csv(output_path, index=False)
print(f"Processed and saved to: {output_path}")
