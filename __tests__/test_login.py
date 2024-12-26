import unittest
import requests

class TestLogin(unittest.TestCase):
    def setUp(self):
        self.url = "http://127.0.0.1:8000/auth/login/"
        self.valid_data = {
            "username": "mourad",
            "password": "12345678"
        }
        self.invalid_data = {
            "username": "invalid_user",
            "password": "wrong_password"
        }
        self.headers = {
            "Content-Type": "application/json",
        }

    def test_valid_login(self):
        response = requests.post(self.url, json=self.valid_data, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertIn("key", response.json())
        self.assertIn("user", response.json())

    def test_invalid_login(self):
        response = requests.post(self.url, json=self.invalid_data, headers=self.headers)
        self.assertEqual(response.status_code, 401)
        self.assertIn("detail", response.json())
        self.assertEqual(response.json()["detail"], "Invalid username or password.")

if __name__ == "__main__":
    unittest.main()
