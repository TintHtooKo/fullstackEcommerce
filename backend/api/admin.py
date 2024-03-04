from django.contrib import admin
from .models import *

admin.site.register(Category)
admin.site.register(Collection)
admin.site.register(Product)
admin.site.register(Action)
admin.site.register(Checkout)
admin.site.register(Payment)
