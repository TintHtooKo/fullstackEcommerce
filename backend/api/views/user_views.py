from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class UsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Retrieve the username of the authenticated user
        username = request.user.username
        return Response({'username': username})
