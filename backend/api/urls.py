from django.urls import path
from api.views import forgetpw_views,user_views,signInUp_views,payment_views,checkout_views,action_views,kid_views,category_views,collections_views,product_views,newCollection_views,men_views,women_views

urlpatterns = [
    # category
    path('category/',category_views.CategoryView),
    path('category/create/',category_views.CategoryCreate),
    path('category/detail/<int:cate_id>',category_views.CategoryDetail),
    path('category/update/<int:cate_id>',category_views.CategoryUpdate),
    path('category/delete/<int:cate_id>',category_views.CategoryDelete),

    # collection
    path('collection/',collections_views.Collect),
    path('collection/create',collections_views.CollectCreate),
    path('collection/detail/<int:col_id>',collections_views.CollectDetail),
    path('collection/update/<int:col_id>',collections_views.CollectUpdate),
    path('collection/delete/<int:col_id>',collections_views.CollectDelete),

    # product
    path('product/',product_views.ProductView),
    path('product/create/',product_views.ProductCreate),
    path('product/detail/<int:pro_id>',product_views.ProductDetail),
    path('product/update/<int:pro_id>',product_views.ProductUpdate),
    path('product/delete/<int:pro_id>',product_views.ProductDelete),

    # new_collection
    path('new_collect/',newCollection_views.NewCollection),

    # men
    path('men/',men_views.MenView),

    # women
    path('women/',women_views.WomenView),

    # kid
    path('kid/',kid_views.KidView),

    # action
    path('action/',action_views.ActionView),

    # payment
    path('payment/',payment_views.PaymentView),

    # checkout
    path('checkout/',checkout_views.CheckoutView),
    path('checkout/create/',checkout_views.CheckoutCreate),
    path('checkout/detail/<int:che_id>',checkout_views.CheckoutDetail),
    path('checkout/delete/<int:che_id>',checkout_views.CheckoutDelete),
    path('checkout/history/',checkout_views.checkout_history),

    # register login logout
    path('register/',signInUp_views.user_registration),
    path('login/',signInUp_views.user_login),
    path('logout/',signInUp_views.user_logout),

    # check mail
    path('check_mail/<str:email>',signInUp_views.check_email),

    # user view
    path('user/',user_views.UserDetailView.as_view()),

    # forget password
    path('reset-password/',forgetpw_views.PasswordResetAPIView.as_view())
     

]