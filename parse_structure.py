import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

with open("d:/New-Impact-Care/docx_extract/structure.json", "r", encoding="utf-8") as f:
    items = json.load(f)

products = []
current_products = []
description_buffer = []

def assign_description(prods, desc_lines):
    if not prods: return
    desc_text = "\n\n".join(desc_lines).strip()
    for p in prods:
        p["description"] = desc_text

img_counter = 0

for item in items:
    if item["type"] == "table":
        img_counter += 1  # Increment image counter per table (since there are 37 tables)
        if current_products and description_buffer:
            assign_description(current_products, description_buffer)
        
        current_products = []
        description_buffer = []
        
        data = item["data"]
        start_idx = 1 if (data and data[0] and "Brand Name" in data[0][0]) else 0
        
        for row in data[start_idx:]:
            if len(row) >= 3:
                brand = row[0].strip()
                comp = row[1].strip()
                pack = row[2].strip()
                if brand:
                    slug = slugify(brand)
                    category = "General"
                    if "syrup" in slug:
                        dosageForm = "Syrup/Suspension"
                    elif "injection" in slug:
                        dosageForm = "Injection"
                    elif "cream" in slug or "ointment" in slug:
                        dosageForm = "Cream/Jelly"
                    elif "capsule" in slug:
                        dosageForm = "Capsule"
                    elif "drops" in slug:
                        dosageForm = "Syrup/Suspension"
                    else:
                        dosageForm = "Tablet"
                        
                    prod = {
                        "id": len(products) + 1,
                        "title": brand,
                        "slug": slug,
                        "category": category,
                        "dosageForm": dosageForm,
                        "composition": comp,
                        "packDetail": pack,
                        "description": "",
                        "imgSource": f"image{img_counter}.jpeg"
                    }
                    current_products.append(prod)
                    products.append(prod)
                    
    elif item["type"] == "paragraph":
        text = item["text"].strip()
        if re.match(r'^\d+\)[\s\S]+(:-|: -)$', text) or re.match(r'^\d+\)', text):
            pass
        elif "– Short Description" in text:
            pass
        elif text.lower() == "desciption :-":
            pass
        elif text:
            description_buffer.append(text)

if current_products and description_buffer:
    assign_description(current_products, description_buffer)

for p in products:
    p["description"] = re.sub(r'^Desciption\s*:-\s*', '', p["description"], flags=re.IGNORECASE)
    # Remove weird whitespace in title
    p["title"] = re.sub(r'\s+', ' ', p["title"])

with open("d:/New-Impact-Care/src/data/new_parsed_products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(products)} products and max img_counter is {img_counter}")
