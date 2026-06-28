from django.db import models

class Pokemon(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=50)
    weight = models.FloatField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    picture = models.ImageField(upload_to='pokemons/', null=True, blank=True)

    def __str__(self):
        return self.name