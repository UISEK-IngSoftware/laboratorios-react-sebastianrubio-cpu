from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # Rutas para obtener, refrescar y revocar tokens
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('', include('pokedex.urls')), 
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)