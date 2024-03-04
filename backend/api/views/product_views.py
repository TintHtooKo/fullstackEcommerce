from .imports import *

@api_view(['GET'])
def ProductView(request):
    product = Product.objects.all()
    seri = ProductSerializer(product, many=True)
    return Response(seri.data,status=200)

@api_view(['POST'])
def ProductCreate(request):
    seri = ProductSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    else:
        return Response(seri.errors,status=500)
    
@api_view(['GET'])
def ProductDetail(request,pro_id):
    try:
        product = Product.objects.get(id=pro_id)
    except Exception:
        return Response({"message":"nothing"},status=500)
    seri = ProductSerializer(product)
    return Response(seri.data,status=200)

@api_view(['PUT'])
def ProductUpdate(request,pro_id):
    try:
        product = Product.objects.get(id=pro_id)
    except Exception:
        return Response({"messgae":"nothing"},status=500)
    seri = ProductSerializer(product,data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    else:
        return Response(seri.errors,status=500)

@api_view(['DELETE'])
def ProductDelete(request,pro_id):
    try:
        product = Product.objects.get(id=pro_id)
    except Exception:
        return Response({"message":"nothing"},status=500)
    product.delete()
    return Response({"message":"delete"},status=200)