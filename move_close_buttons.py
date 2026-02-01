import os

path = r"e:\PATI GROUP\im8health-clone\index.html"

def process_moves():
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # (start_line_1_indexed, end_line_1_indexed, target_line_1_indexed, name)
    # Order: Bottom to Top to avoid index shifting issues affecting subsequent moves?
    # Actually, if we use the logic inside the loop (calculating shift), we can do any order?
    # But doing bottom to top is safest because the line numbers for the upper ones won't change when we edit the lower ones.
    # Simon Hill is at 24209
    # Darshan Shah is at 23758
    # Ara Suppiah is at 23306
    
    moves = [
        (24209, 24315, 24321, "Simon Hill"), 
        (23758, 23864, 23870, "Dr. Darshan Shah"), 
        (23306, 23412, 23418, "Dr. Ara Suppiah"), 
    ]

    for start, end, target, name in moves:
        s, e, t = start-1, end-1, target-1
        
        # Validation
        if "mainclose_new" not in lines[s]:
            print(f"Error for {name}: Line {start} does not contain mainclose_new. Found: {lines[s].strip()}")
            return
        if "mainrows_new" not in lines[t]:
            print(f"Error for {name}: Line {target} does not contain mainrows_new. Found: {lines[t].strip()}")
            return
            
        print(f"Processing {name}...")
        
        # Capture content
        content = lines[s:e+1]
        
        # The block to remove is BEFORE the target.
        # Original: [Block s...e] ... [Target t]
        # We delete s...e.
        # Target t shifts down by len(content).
        
        del lines[s:e+1]
        
        removed_count = e - s + 1
        new_t = t - removed_count
        
        # Insert AFTER the target line (new_t)
        # We want it to be the first child of mainrows_new.
        lines[new_t+1:new_t+1] = content
        
        print(f"  Moved {removed_count} lines from {start} to inside mainrows at {target} (new line {new_t+2})")

    with open(path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("Success: File updated.")

if __name__ == "__main__":
    process_moves()
