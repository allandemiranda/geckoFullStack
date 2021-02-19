from django.contrib import admin
from .models import Inspection
from .models import Maintenance


@admin.register(Inspection)
class InspectionAdmin(admin.ModelAdmin):
    pass


@admin.register(Maintenance)
class MaintenanceAdmin(admin.ModelAdmin):
    pass
