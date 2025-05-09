"""
URL configuration for backstore project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.db import router
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from items.views import ItemsViewSet, LikesViewSet,DrawerViewSet,OrdersViewSet

router = routers.DefaultRouter()
router.register('items', ItemsViewSet, basename='items')
router.register('likes', LikesViewSet, basename='likes')
router.register('drawer', DrawerViewSet, basename='drawer')
router.register('orders', OrdersViewSet, basename='orders')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/account/', include('account.urls')),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
