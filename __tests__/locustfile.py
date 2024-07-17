from locust import HttpUser, between, task

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)
    host = "http://localhost:3600"

    @task
    def get_home(self):
        self.client.get("/home")

    @task
    def get_restaurant(self):
        self.client.get("/restaurants/1")

    @task
    def get_dishes(self):
        self.client.get("/dishes")
