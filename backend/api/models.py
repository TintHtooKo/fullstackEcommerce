from django.db import models
from datetime import datetime

class Collection(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=10)
    def __str__(self):
        return self.name

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    image = models.ImageField()
    desc = models.TextField()
    category = models.ForeignKey(Category, on_delete = models.CASCADE)
    collection = models.ForeignKey(Collection, on_delete = models.CASCADE)
    old_price = models.IntegerField(blank=True, null=True)
    new_price = models.IntegerField()

# For Checkout
class Action(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name
    
class Checkout(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(default=None)
    phone = models.IntegerField(default=None)
    address = models.TextField()
    product = models.CharField(max_length=100)
    total_price = models.CharField(max_length=100)
    payment = models.ForeignKey(Payment,on_delete=models.CASCADE, default = '1')
    qty = models.IntegerField(default=None)
    action = models.ForeignKey(Action,on_delete = models.CASCADE, default = '1')
    created_at = models.DateTimeField(default=datetime.now)

    