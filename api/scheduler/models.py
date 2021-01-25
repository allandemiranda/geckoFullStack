from django.db import models


class Inspection(models.Model):
    title = models.CharField(max_length=80)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title


class Maintenance(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return self.title
