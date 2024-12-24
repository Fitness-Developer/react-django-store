from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Items, Likes,Drawer,Orders
from .serializers import ItemsSerializer, LikesSerializer,DrawerSerializer,OrdersSerializer
from django.db import transaction
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

class ItemsViewSet(viewsets.ReadOnlyModelViewSet): # ReadOnly, так как админ не должен менять элементы через этот endpoint
    serializer_class = ItemsSerializer
    permission_classes = [AllowAny] # Или добавить custom permission для админа
    def get_queryset(self):
        admin_user = User.objects.get(id=1)  # Или используйте метод для поиска администратора
        return Items.objects.filter(user=admin_user)

class LikesViewSet(viewsets.ModelViewSet):
    serializer_class = LikesSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def get_queryset(self):
        return Likes.objects.filter(user=self.request.user)

class DrawerViewSet(viewsets.ModelViewSet):
    serializer_class = DrawerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def get_queryset(self):
        return Drawer.objects.filter(user=self.request.user)

class OrdersViewSet(viewsets.ModelViewSet):
    serializer_class = OrdersSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Orders.objects.filter(user=self.request.user)

