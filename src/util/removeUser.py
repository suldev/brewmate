import pymongo

def remove_user(username):
    # MongoDB connection string
    mongo_uri = "mongodb://192.168.1.10:27017/admin"

    # Connect to MongoDB
    client = pymongo.MongoClient(mongo_uri)

    # Specify the admin database
    admin_db = client.admin

    # Remove the user
    admin_db.command('dropUser', username)

    # Close the connection
    client.close()

# Specify the username to remove
username_to_remove = "brewmate"

# Remove the user
remove_user(username_to_remove)

print(f"User '{username_to_remove}' removed from the MongoDB database.")
