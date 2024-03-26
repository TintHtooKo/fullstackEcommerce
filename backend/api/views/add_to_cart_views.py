from .imports import *

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_cart(request, product_id):
    # Create the cart
    cart = Cart.objects.create()
    
    # Assuming there's an authenticated user
    user = request.user
    
    # Add product to the cart
    product = get_object_or_404(Product, pk=product_id)
    CartItem.objects.create(cart=cart, product=product, quantity=1, user=user)

    return Response({'cart_id': cart.id}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    user = request.user  # Get the current user
    cart_items = CartItem.objects.filter(user=user)  # Filter cart items based on the current user
    cart_data = []

    for item in cart_items:
        product_image_url = item.product.image.url if item.product.image else None
        cart_data.append({
            'id': item.id,  # Include the ID of the cart item
            'pro_id':item.product.id,
            'product': item.product.name,
            'quantity': item.quantity,
            'price': item.product.new_price,
            'image': product_image_url
        })

    return Response(cart_data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_cart_item(request, item_id):
    try:
        cart_item = CartItem.objects.get(id=item_id, user=request.user)  # Ensure the cart item belongs to the current user
        cart_item.delete()
        return Response({'message': 'Cart item deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    except CartItem.DoesNotExist:
        return Response({'error': 'Cart item does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
