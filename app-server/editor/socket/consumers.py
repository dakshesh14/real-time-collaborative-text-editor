from channels.generic.websocket import AsyncWebsocketConsumer


class EditorConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'editor_%s' % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, bytes_data):
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'editor_message',
                'bytes_data': bytes_data
            }
        )

    async def editor_message(self, event):
        bytes_data = event['bytes_data']

        # Send message to WebSocket
        await self.send(bytes_data=bytes_data)
