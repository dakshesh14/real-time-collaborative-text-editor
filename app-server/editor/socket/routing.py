from django.urls import path

from .consumers import EditorConsumer

websocket_urlpatterns = [
    path('ws/editor/<str:room_name>', EditorConsumer.as_asgi()),
]
