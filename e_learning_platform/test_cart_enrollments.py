import requests

# API endpoint
url = "http://127.0.0.1:8000/api/cart-enrollments/"

# Replace with your actual JWT token
access_token = "YOUR_ACCESS_TOKEN"

# Data for the POST request (replace 'COURSE_ID' with an actual course ID)
data = {
    "course_id": 1  # Example course ID
}

# Headers with authorization
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json",
}

try:
    # Sending POST request
    response = requests.post(url, json=data, headers=headers)

    # Printing response
    if response.status_code == 201:
        print("Success: Enrollment created!")
        print(response.json())
    else:
        print(f"Failed: {response.status_code}")
        print(response.json())
except Exception as e:
    print(f"Error: {str(e)}")