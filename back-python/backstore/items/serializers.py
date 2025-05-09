from rest_framework import serializers
from .models import Items,Likes,Drawer,Orders

class ItemsSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Items
        fields = '__all__'

class LikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Likes
        fields = '__all__'
        read_only_fields = ['user']

class DrawerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawer
        fields = '__all__'
        read_only_fields = ['user']

class OrdersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = '__all__'
        read_only_fields = ['user']