from rest_framework import serializers

from app.models import Person

class PersonModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

    @classmethod
    def bulk_serialize(cls, data):

        print("data", data)
        persons_data = []
        i = 0
        while True:
            name_key = f'books[{i}][name]'
            image_key = f'books[{i}][image]'

            name = data.get(name_key)
            image = data.get(image_key)

            if name is None:
                break

            person = {
                'name': name,
                'image': image if image != "" else None
            }
            persons_data.append(person)
            i += 1

        return persons_data