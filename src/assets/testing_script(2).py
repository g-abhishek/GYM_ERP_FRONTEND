import os

BASE_DIR = os.getcwd()
ISL_DIR = os.path.join(BASE_DIR, 'ISL_animations')

# Fixed the names to LOWER CASE for the words in Dictionary COMMIT_NAME Testing #3
with os.scandir(ISL_DIR) as entries:
    for entry in entries:
        pres_name = entry.name
        new_name = entry.name
        new_name = new_name.lower()
        os.renames(os.path.join(ISL_DIR, pres_name), os.path.join(ISL_DIR, new_name))

