from rest_framework import viewsets

from app.models import Person

from app.serializers import PersonModelSerializer

class PersonModelViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonModelSerializer
