import json
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def clean_title(text):
    text = re.sub(r'^\d+\)\s*', '', text)
    text = re.sub(r':-*\s*$', '', text)
    return text.strip()

with open("d:/New-Impact-Care/docx_extract/structure.json", "r", encoding="utf-8") as f:
    items = json.load(f)

products = []
current_title = None
tables_with_headings = []

for item in items:
    if item["type"] == "paragraph":
        text = item["text"].strip()
        if re.match(r'^(\d+\)|R-LUME SUSPENSION\s*:-)', text) or re.search(r':-$', text) or re.search(r': -$', text):
            if "Desciption" not in text and "Description" not in text:
                current_title = clean_title(text)
        elif "– Short Description" in text:
            pass
        elif text.lower() == "desciption :-":
            pass
        elif text:
            # It's a description paragraph. We add it to the LAST table!
            if tables_with_headings:
                tables_with_headings[-1]["description"].append(text)
    elif item["type"] == "table":
        tables_with_headings.append({
            "title": current_title,
            "data": item["data"],
            "description": []
        })

img_counter = 1
for table_info in tables_with_headings:
    title = table_info["title"] or f"Product {img_counter}"
    data = table_info["data"]
    description = "\n\n".join(table_info["description"]).strip()
    description = re.sub(r'^Desciption\s*:-\s*', '', description, flags=re.IGNORECASE).strip()
    
    start_idx = 1 if (data and data[0] and "Brand Name" in data[0][0]) else 0
    
    combined_comp = []
    combined_pack = []
    for row in data[start_idx:]:
        if len(row) >= 3:
            comp = row[1].strip()
            pack = row[2].strip()
            if comp: combined_comp.append(comp)
            if pack: combined_pack.append(pack)
            
    slug = slugify(title)
    lower_title = title.lower()
    
    category = "Tablets"
    dosageForm = "Tablet"
    if "syrup" in lower_title or "suspension" in lower_title:
        dosageForm = "Syrup/Suspension"
        category = "Syrups & Suspensions"
    elif "injection" in lower_title:
        dosageForm = "Injection"
        category = "Injections"
    elif "cream" in lower_title or "ointment" in lower_title:
        dosageForm = "Cream/Jelly"
        category = "Creams & Ointments"
    elif "capsule" in lower_title:
        dosageForm = "Capsule"
        category = "Capsules"
    elif "drop" in lower_title:
        dosageForm = "Drops"
        category = "Drops"
    elif "kit" in lower_title:
        dosageForm = "Kit"
        category = "Kits"
        
    prod = {
        "id": img_counter,
        "title": title,
        "slug": slug,
        "category": category,
        "dosageForm": dosageForm,
        "composition": "\n\n---\n\n".join(combined_comp),
        "packDetail": "\n\n".join(combined_pack),
        "description": description,
        "imgSource": f"image{img_counter}.jpeg"
    }
    products.append(prod)
    img_counter += 1

with open("d:/New-Impact-Care/src/data/new_parsed_products.json", "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(products)} products!")
