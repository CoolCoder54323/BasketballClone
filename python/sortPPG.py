import json

# Path to the JSON file
file_path = '../players.json'

# Read and parse the JSON file
with open(file_path, 'r') as file:
    data = json.load(file)

# Now you can process the data as required
# For example, to print the data
print(data)


# Sort the data by 'ppg' in descending order
sorted_data = sorted(data, key=lambda x: x['ppg'], reverse=False)

# Convert the sorted data back to JSON format
sorted_json = json.dumps(sorted_data, indent=4)

with open(file_path, 'w') as file:
    json.dump(sorted_data, file, indent=4)

# Print the sorted JSON data
print(sorted_json)
