import random

def generate_random_data(rows_count):
    data = []
    for i in range(1, rows_count + 1):
        row = {
            'id': i,
            'col1': f'Item {i}',
            'col2': f'Owner {i}',
            'col3': f'Month {i}',
            'col4': round(random.uniform(0, 100), 1),
            'col5': random.randint(0, 1000000),
            'col6': random.randint(0, 1000000),
            'col7': 'Received' if random.random() < 0.5 else 'Not Received',
            'col8': f'Owner {i}',
        }
        data.append(row)
    return data


seed_data = generate_random_data(25)

for row in seed_data:
    print(row)