from typing import List, Dict, Any
from adapters.csv_adapter import load_csv_schemes


def get_myscheme_schemes() -> List[Dict[str, Any]]:
    """
    Returns schemes from the Kaggle myScheme dataset.
    """
    return load_csv_schemes()