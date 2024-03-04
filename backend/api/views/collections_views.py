from .imports import *

@api_view(['GET'])
def Collect(request):
    collect = Collection.objects.all()
    seri = CollectionSerializer(collect,many=True)
    return Response(seri.data,status=200)

@api_view(['POST'])
def CollectCreate(request):
    seri = CollectionSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    else:
        return Response(seri.errors,status=500)

@api_view(['GET'])
def CollectDetail(request,col_id):
    try:
        collect = Collection.objects.get(id = col_id)
    except Exception:
        return Response({"message":"Nothing"},status=500)
    seri = CollectionSerializer(collect)
    return Response(seri.data,status=200)

@api_view(['PUT'])
def CollectUpdate(request,col_id):
    try:
        collect = Collection.objects.get(id = col_id)
    except Exception:
        return Response({"message","Nothign"},status=500)
    seri = CollectionSerializer(collect, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data,status=200)
    else:
        return Response(seri.errors,status=500)

@api_view(['DELETE'])
def CollectDelete(request,col_id):
    try:
        collect = Collection.objects.get(id=col_id)
    except Exception:
        return Response({"message":"Nothing"},status=500)
    collect.delete()
    return Response({"message":"delete"},status=200)