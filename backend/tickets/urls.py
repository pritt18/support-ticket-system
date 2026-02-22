from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, classify_ticket

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='tickets')

urlpatterns = [
    path('tickets/classify/', classify_ticket),
]

urlpatterns += router.urls