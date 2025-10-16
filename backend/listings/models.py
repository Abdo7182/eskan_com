import uuid
from django.db import models

class Area(models.Model):
    name = models.CharField(max_length=100, unique=True)
    name_en = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.name

class Property(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    name_en = models.CharField(max_length=200, blank=True)
    area = models.ForeignKey(Area, on_delete=models.SET_NULL, null=True, related_name='properties')
    address = models.CharField(max_length=300, blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    rooms = models.IntegerField(default=1)
    bathrooms = models.IntegerField(default=1)
    size = models.IntegerField(null=True, blank=True)
    floor = models.IntegerField(null=True, blank=True)
    furnished = models.BooleanField(default=False)
    type = models.CharField(max_length=50, blank=True)
    type_en = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)
    description_en = models.TextField(blank=True)
    contact = models.CharField(max_length=50, blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='property_images/')
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"Image for {{self.property_id}} (order={{self.order}})"


class PropertyVideo(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='videos')
    video = models.FileField(upload_to='property_videos/')
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"Video for {self.property_id} (order={self.order})"
