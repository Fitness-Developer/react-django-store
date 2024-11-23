from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Items, Likes,Drawer,Orders
from .serializers import ItemsSerializer, LikesSerializer,DrawerSerializer,OrdersSerializer
from django.db import transaction

class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer

class LikesViewSet(viewsets.ModelViewSet):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer


class DrawerViewSet(viewsets.ModelViewSet):
    queryset = Drawer.objects.all()
    serializer_class = DrawerSerializer

class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer

