from django.db import models
from django.db import transaction

class Items(models.Model):
    title = models.CharField(max_length=255)
    price = models.IntegerField()
    image = models.ImageField(upload_to="img/store/", blank=True)

    def __str__(self):
        return self.title

class Likes(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE) # Связь с моделью Items
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Используем транзакцию для безопасного обновления
        with transaction.atomic():
            if not Likes.objects.exists():  # Проверяем, есть ли уже лайки
                self.id = 1  # Устанавливаем ID на 1, если это первый лайк
            else:
                # Если лайки уже существуют, получаем максимальный ID и увеличиваем его на 1
                max_id = Likes.objects.aggregate(models.Max('id'))['id__max']
                self.id = max_id + 1  # Увеличиваем ID на 1
            super().save(*args, **kwargs)  # Сохраняем объект

    def __str__(self):
        return f"лайкнул {self.item}"

class Drawer(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)  # Связь с моделью Items
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Используем транзакцию для безопасного обновления
        with transaction.atomic():
            if not Drawer.objects.exists():  # Проверяем, есть ли уже лайки
                self.id = 1  # Устанавливаем ID на 1, если это первый лайк
            else:
                # Если лайки уже существуют, получаем максимальный ID и увеличиваем его на 1
                max_id = Drawer.objects.aggregate(models.Max('id'))['id__max']
                self.id = max_id + 1  # Увеличиваем ID на 1
            super().save(*args, **kwargs)  # Сохраняем объект

    def __str__(self):
        return f"добавил {self.item}"

class Orders(models.Model):
    item = models.ForeignKey(Items, on_delete=models.CASCADE)  # Связь с моделью Items
    created_at = models.DateTimeField(auto_now_add=True)
    quantity = models.PositiveIntegerField(default=1)
    def save(self, *args, **kwargs):
        # Используем транзакцию для безопасного обновления
        with transaction.atomic():
            if not Orders.objects.exists():  # Проверяем, есть ли уже лайки
                self.id = 1  # Устанавливаем ID на 1, если это первый лайк
            else:
                # Если лайки уже существуют, получаем максимальный ID и увеличиваем его на 1
                max_id = Orders.objects.aggregate(models.Max('id'))['id__max']
                self.id = max_id + 1  # Увеличиваем ID на 1
            super().save(*args, **kwargs)  # Сохраняем объект

    def __str__(self):
        return f"Заказ: {self.item} (Количество: {self.quantity})"