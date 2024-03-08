from .imports import *

@api_view(['GET'])
def CheckoutView(request):
    check = Checkout.objects.all()
    seri = CheckoutSerializer(check,many=True)
    return Response(seri.data,status=200)

@api_view(['POST'])
def CheckoutCreate(request):
    seri = CheckoutSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    else:
        return Response(seri.errors,status=500)
    
@api_view(['GET'])
def CheckoutDetail(request,che_id):
    try:
        check = Checkout.objects.get(id = che_id)
    except Exception:
        return Response({"message:erro"},status=404)
    seri = CheckoutSerializer(check)
    return Response(seri.data,status=200)

@api_view(['DELETE'])
def CheckoutDelete(request,che_id):
    try:
        check = Checkout.objects.get(id = che_id)
    except Exception:
        return Response({"msg":"error"},status=500)
    check.delete()
    return Response({"msg":"delete"},status=200)