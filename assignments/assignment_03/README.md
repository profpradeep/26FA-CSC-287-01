### Homework Assignment #4: Building a Python Script to Batch Update User Profiles

#### **Objective:**
Create a Python script that processes user profile data stored as JSON files in a directory structure. The script should apply a series of transformations to the user data and write the updated profiles into a new output directory. 

#### **Requirements:**

1. **Directory Structure**: 
    - You will be working with the directory called `user_profiles` (included in this repo), that contains sub-directories such as `admins`, `editors`, `viewers`, etc.
    - Each sub-directory contains JSON files that represent individual user profiles (e.g., `admin1.json`, `editor1.json`).

2. **Task Overview**:
    - Write a Python script that reads each JSON file, performs specific updates to the contents, and writes the modified profiles into a new output folder. The output folder should include a timestamp in its name.
  
3. **Required Functionality**:

    a. **Command-line Argument**:
       - The script must accept the path to the `user_profiles` directory as a command-line argument.

    b. **Email Replacement**:
       - All email addresses ending in `@company.com` must be replaced with `@newcompany.com`.

    c. **Value Replacement**:
       - The script should replace specific values in the JSON files based on a predefined map of replacements. 
       - For example:
         - The value `"enabled"` should be replaced by an object: `{"status": "enabled", "since": "2024-10-01"}`.
         - The value `"manage_users"` should be replaced by an object containing permission details: `{"permission": "manage_users", "granted_at": "2024-10-05", "level": "full"}`.

    d. **Output Directory**:
       - The modified JSON files should be written into a new folder with the current timestamp in the format: `user_profiles_updated_YYYYMMDD_HHMMSS`.

4. **Exceptions**:
    - Handle edge cases, such as missing keys in the JSON files, and ensure your script is robust to errors (e.g., using try-except blocks). Files that are not processable for any reason should be copied as-is to the destination folder.

#### **Example Folder Structure:**
```plaintext
user_profiles/
├── admins/
│   ├── admin1.json
│   ├── admin2.json
├── editors/
│   ├── editor1.json
│   ├── editor2.json
├── viewers/
│   ├── viewer1.json
│   ├── viewer2.json
```

#### **Replacement Map Example:**

- **Emails**: Replace all emails ending in `@company.com` with `@newcompany.com`.
- **Other Replacements**:
    - `"enabled"` → `{"status": "enabled", "since": "2024-10-01"}`
    - `"disabled"` → `{"status": "disabled", "since": "2024-10-01"}`
    - `"manage_users"` → `{"permission": "manage_users", "granted_at": "2024-10-05", "level": "full"}`
    - `"view_content"` → `{"permission": "view_content", "granted_at": "2024-09-25", "level": "read-only"}`

#### **Output Example:**
If your script is run on `2025-10-11`, the output folder could be named `user_profiles_updated_20251011_143500`, with the modified JSON files inside.

#### **Submission:**
1. Create a Homework 4 folder in your homework repository
1. Add your Python script (`batch_update_profiles.py`).
2. A sample output folder containing the updated JSON files.

#### Hints and Suggestions 

1. You may want to use one or more of these packages:
    os, [json](https://docs.python.org/3/library/json.html), [shutil](https://docs.python.org/3/library/shutil.html), sys, datetime.

<details>
  <summary>
    Try to solve on your own first without looking at the rest of the hints
  </summary>

1. Define a dictionary of the mappings
1. Copy all the files in the source directory to the destination first, preserving the folder structure.
    1. shutil.copytree() might help here.
1. For each JSON file, open and read the contents. 
1. Apply the replacements as specified in the dictionary.
1. Write the file back out.
1. Handle edge cases, such as missing keys in the JSON files, and ensure your script is robust to errors (e.g., using try-except blocks).

</details>


### This assignment is due by Oct 19th, midnight 
