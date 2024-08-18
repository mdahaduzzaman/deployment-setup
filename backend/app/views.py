from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from app.models import Person

from app.serializers import PersonModelSerializer

class PersonModelViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonModelSerializer

    @action(detail=False, methods=['post'], url_path='bulk-create')
    def bulk_create(self, request, *args, **kwargs):
        data = request.data

        # Delegate data processing to the serializer
        persons_data = PersonModelSerializer.bulk_serialize(data)

        serializer =  self.get_serializer(data=persons_data, many=True)

        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)