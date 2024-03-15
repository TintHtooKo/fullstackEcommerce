# Assuming you are using Django and Django REST Framework

from .imports import *

class UserDetailView(APIView):
    def get(self, request):
        user = request.user  # Assuming the user is authenticated
        serialized_user = UserSerializer(user)  # Serialize the user data
        return Response({
            'id': user.id,  # Include the id field in the response
            'username': serialized_user.data['username'],
            'email': serialized_user.data['email'],
            # Include other user fields as needed
        }, status=status.HTTP_200_OK)
