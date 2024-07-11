from rest_framework import routers

from app.views import PersonModelViewSet

router = routers.SimpleRouter()

router.register("persons", PersonModelViewSet)

urlpatterns = [] + router.urls
