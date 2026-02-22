from django.urls import path, include

urlpatterns = [
    path('api/', include('tickets.urls')),
]
from django.http import HttpResponse

def home(request):
    return HttpResponse("AI Support Ticket System is Live 🚀")

urlpatterns = [
    path('', home),
]