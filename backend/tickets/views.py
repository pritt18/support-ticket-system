from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ticket
from .serializers import TicketSerializer



class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer

@api_view(['POST'])
def classify_ticket(request):
    description = request.data.get("description")

    if not description:
        return Response({"error": "Description is required"}, status=400)

    description_lower = description.lower()

    # Smart mock AI classification logic
    if any(word in description_lower for word in ["payment", "billing", "refund", "subscription"]):
        category = "billing"
        priority = "high"

    elif any(word in description_lower for word in ["error", "bug", "crash", "not working", "issue"]):
        category = "technical"
        priority = "medium"

    elif any(word in description_lower for word in ["login", "account", "password", "signup"]):
        category = "account"
        priority = "medium"

    else:
        category = "general"
        priority = "low"

    return Response({
        "suggested_category": category,
        "suggested_priority": priority
    })