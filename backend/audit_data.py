import sys
import os
from sqlalchemy import func, String

# Add project root to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models.food import Food

# POF Group Mapping (Mirroring Frontend Logic)
POF_GROUP_MAPPING = {
    "63": "CEREAIS/LEGUM.",
    "64": "HORTALIÇAS",
    "65": "CEREAIS/LEGUM.",
    "66": "CEREAIS/LEGUM.",
    "67": "HORTALIÇAS",
    "68": "FRUTAS",
    "69": "AÇÚCARES",
    "70": "SAIS/CONDIM.",
    "71": "CARNES",
    "72": "PESCADOS",
    "74": "PESCADOS",
    "76": "PESCADOS",
    "77": "SAIS/CONDIM.",
    "78": "CARNES",
    "79": "LATICÍNIOS",
    "80": "PANIFICADOS",
    "81": "EMBUTIDOS",
    "82": "BEBIDAS",
    "83": "BEBIDAS",
    "84": "ÓLEOS/GORD.",
    "85": "PANIFICADOS",
    "88": "HORTALIÇAS"
}

def get_category(pof_code):
    s = str(pof_code)
    prefix = s[:2]
    if prefix == "85":
        sub = s[2:4]
        if sub in ["71", "78"]: return "CARNES"
        if sub in ["72", "74", "76"]: return "PESCADOS"
        if sub == "79": return "LATICÍNIOS"
        return "PANIFICADOS"
    return POF_GROUP_MAPPING.get(prefix, "OUTROS")

def run_audit():
    db = SessionLocal()
    try:
        print("--- INICIANDO AUDITORIA DE CATEGORIZAÇÃO ---\n")
        
        # Test Sample
        items = db.query(Food).order_by(func.random()).limit(30).all()
        
        errors = 0
        for item in items:
            cat = get_category(item.pof_code)
            print(f"[{cat}] {item.name[:40]:<40} (POF: {item.pof_code})")
            
            # Simple heuristic check
            if cat == "CARNES" and "CARNE" not in item.name and "FRANGO" not in item.name and "BOI" not in item.name and "FILE" not in item.name and "HAMBURGUER" not in item.name:
                # This could be a false positive (ex: Costela), but worth checking
                pass
        
        print("\n--- TESTE DE ITENS CRÍTICOS ---")
        critical = ["CARNE COM LEGUMES", "SALGADINHO", "PAO FRANCES", "ALFACE", "REFRIGERANTE"]
        for name in critical:
            item = db.query(Food).filter(Food.name.ilike(f"%{name}%")).first()
            if item:
                cat = get_category(item.pof_code)
                print(f"CRÍTICO: {name:<20} -> {cat} (POF: {item.pof_code})")

    finally:
        db.close()

if __name__ == "__main__":
    run_audit()
