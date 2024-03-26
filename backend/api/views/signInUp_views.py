from .imports import *

@api_view(['POST'])
def user_registration(request): 
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
def send_verification_email(request, user):
    token_generator = default_token_generator
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = token_generator.make_token(user)

    # Construct verification URL
    verification_url = f"{request.build_absolute_uri('/')}/verify-email/{uid}/{token}/"

    # Email content
    email_subject = "Verify your email"
    email_body = f"Please click the following link to verify your email: {verification_url}"

    # Send email
    send_mail(email_subject, email_body, None, [user.email])
    
@api_view(['GET'])
def check_email(request, email):
    email_exists = User.objects.filter(email=email).exists()
    return Response({'exists': email_exists})

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                })
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_logout(request):
    if request.method == 'POST':
        logout(request)
        return Response(status=status.HTTP_200_OK)