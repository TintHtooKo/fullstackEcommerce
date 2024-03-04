from .imports import *

@api_view(['GET'])
def CategoryView(request):
    category = Category.objects.all()
    seri  = CategorySerializer(category, many=True)
    return Response(seri.data, status=200)

@api_view(['POST'])
def CategoryCreate(request):
    seri = CategorySerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response (seri.data,status=200)
    else:
        return Response(seri.errors,status=500)
    
@api_view(['GET'])
def CategoryDetail(request,cate_id):
    try:
        category = Category.objects.get(id=cate_id)
    except Exception:
        return Response({"message":"Nothing"},status=500)
    seri = CategorySerializer(category)
    return Response(seri.data,status=200)

@api_view(['PUT'])
def CategoryUpdate(request,cate_id):
    try:
        category = Category.objects.get(id = cate_id)
    except Exception:
        return Response({"message":"Nothing"},status=500)
    seri = CategorySerializer(category, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    
@api_view(['DELETE'])
def CategoryDelete(request,cate_id):
    try:
        category = Category.objects.get(id=cate_id)
    except Exception:
        return Response({"message":"Nothing"},status=500)
    category.delete()
    return Response({"message":"Delete"},status=200)
    