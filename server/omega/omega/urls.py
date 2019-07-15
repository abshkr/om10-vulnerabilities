from django.http import HttpResponseRedirect
from django.conf.urls import url, include
from tastypie.api import Api
from omega.resources import EquipmentResource


v1_api = Api(api_name='v1')
v1_api.register(EquipmentResource())

urlpatterns = [
    # ...more URLconf bits here...
    # Then add:
    url(r'^$', lambda r: HttpResponseRedirect('api/v1/')),
    url(r'^api/', include(v1_api.urls)),

]
