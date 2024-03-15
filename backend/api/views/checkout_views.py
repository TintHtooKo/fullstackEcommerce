from .imports import *

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CheckoutView(request):
    check = Checkout.objects.all()
    seri = CheckoutSerializer(check,many=True)
    return Response(seri.data,status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CheckoutCreate(request):
    seri = CheckoutSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    else:
        return Response(seri.errors,status=500)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CheckoutDetail(request,che_id):
    try:
        check = Checkout.objects.get(id = che_id)
    except Exception:
        return Response({"message:erro"},status=404)
    seri = CheckoutSerializer(check)
    return Response(seri.data,status=200)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def CheckoutDelete(request,che_id):
    try:
        check = Checkout.objects.get(id = che_id)
    except Exception:
        return Response({"msg":"error"},status=500)
    check.delete()
    return Response({"msg":"delete"},status=200)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def CheckoutHistory(request):
#     email = request.user.email
#     check = Checkout.objects.filter(email=email)
#     seri = CheckoutSerializer(check, many=True)
#     return Response(seri.data, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkout_history(request):
    user = request.user
    checkout_history = Checkout.objects.filter(user_id=user.id).select_related('action')
    serializer = CheckoutSerializer(checkout_history, many=True)
    return JsonResponse(serializer.data, safe=False)