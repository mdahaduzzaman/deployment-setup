from rest_framework import serializers

from app.models import Person

class PersonModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'