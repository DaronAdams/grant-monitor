import os
import psycopg2

DB_HOST = "postgres://DaronAdams:20UpoQqnzvdx@ep-little-sea-14546908.us-east-2.aws.neon.tech/neondb"

def connect_to_database():
    try:
        connection = psycopg2.connect(
            host = DB_HOST,
            database = "neondb",
            user = os.environ["PGUSER"],
            password = os.environ["PGPASSWORD"],
        )
        return connection
    except Exception as ex:
        print(f"Error connecting to the database: {str(ex)}")
        return None

connection = connect_to_database()

cursor = connection.cursor()

# Testing database
cursor.execute('DROP TABLE IF EXISTS books;')
cursor.execute('CREATE TABLE books (id serial PRIMARY KEY,'
                                 'title varchar (150) NOT NULL,'
                                 'author varchar (50) NOT NULL,'
                                 'pages_num integer NOT NULL,'
                                 'review text,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

# Insert data into the table

cursor.execute('INSERT INTO books (title, author, pages_num, review)'
            'VALUES (%s, %s, %s, %s)',
            ('A Tale of Two Cities',
             'Charles Dickens',
             489,
             'A great classic!')
            )


cursor.execute('INSERT INTO books (title, author, pages_num, review)'
            'VALUES (%s, %s, %s, %s)',
            ('Anna Karenina',
             'Leo Tolstoy',
             864,
             'Another great classic!')
            )

connection.commit()

cursor.close()
connection.close()