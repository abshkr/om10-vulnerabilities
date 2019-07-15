from tastypie.resources import ModelResource
from tastypie import fields
from django.core.paginator import Paginator
from django.conf.urls import url, include
from tastypie.utils import trailing_slash
from haystack.query import SearchQuerySet
from omega.serializers import FieldSerializer
from omega.models import Equipment, ExpiryDateDetails


"""
This class is responsible for the Resources Available within the OMEGA API.

Documentation: https://django-tastypie.readthedocs.io/en/latest/resources.html
"""


class EquipmentExpiry(ModelResource):

    class Meta:
        queryset = ExpiryDateDetails.objects.all()
        allowed_methods = ['get']


class EquipmentResource(ModelResource):

    """
    This class is written to handle the defaults given to a resource within OMEGA via django-tastypie.

    Here are the basic Options:
    queryset: Provides the Resource with the object that serves as the data source.
    allowed_methods: You may specify a list like ['get', 'post', 'put', 'delete', 'patch'] as a shortcut to prevent having to specify the other options.
    max_limit:Controls the maximum number of results the Resource will show at a time. Default Set in the settings.py to 1000.
    serializer: Controls which serializer class the Resource should use. Default is tastypie.serializers.Serializer().

    Documentation: https://django-tastypie.readthedocs.io/en/latest/resources.html#resource-options-aka-meta
    """

    class Meta:
        queryset = Equipment.objects.all()
        allowed_methods = ['get']
        max_limit = None
        serializer = FieldSerializer()

    def dehydrate(self, bundle):
        bundle.data['expiry'] = list(
            ExpiryDateDetails.objects.filter(id=bundle.data["id"]).values())
        return bundle

    """
    The prepend_urls function within the ModelResource Object to handle URL hooks to the given resource.
    In this case, we are adding a search path to the existing endpoint and assinging it to the get_search function
    and then re assigning it to the api_get_search namespace which comes from the django-haystack module. 

    This function takes self as its only parameter.
    Documentation: https://django-tastypie.readthedocs.io/en/latest/resources.html?highlight=prepend_urls#prepend-urls
    """

    def prepend_urls(self):
        return [
            url(r"^(?P<resource_name>%s)/search%s$" % (self._meta.resource_name,
                                                       trailing_slash()), self.wrap_view('get_search'), name="api_get_search"),
        ]

    """
    This function is fully custom method to handle searching of all fields and values within the Resource.
    With the help of django-haystack. We are deconstructing the given Object and searching for matching values.

    This function takes self, request and **kwargs as its parameters.
    Documentation: https://django-tastypie.readthedocs.io/en/latest/cookbook.html#adding-search-functionality
    """

    def get_search(self, request, **kwargs):

        # Only allowing the GET Method for the search endpoint.
        self.method_check(request, allowed=['get'])

        # Making sure the request is authenticated. https://django-tastypie.readthedocs.io/en/latest/authentication.html
        self.is_authenticated(request)

        # Making sure to check to see if the request follows the throttling rules. https://django-tastypie.readthedocs.io/en/latest/throttling.html
        self.throttle_check(request)

        # Do the query and extract the parameter from the request.
        sqs = SearchQuerySet().models(
            Equipment).load_all().auto_query(request.GET.get('query', ''))

        # Paginate the results to minify the payload.
        paginator = self._meta.paginator_class(request.GET, sqs,
                                               resource_uri=self.get_resource_uri(), limit=self._meta.limit,
                                               max_limit=self._meta.max_limit, collection_name=self._meta.collection_name)
        to_be_serialized = paginator.page()

        # Remodelling the data to fit the original format and filtering out unrelated data.
        bundles = [self.build_bundle(obj=result.object, request=request)
                   for result in to_be_serialized['objects']]

        to_be_serialized['objects'] = [
            self.full_dehydrate(bundle) for bundle in bundles]

        to_be_serialized = self.alter_list_data_to_serialize(
            request, to_be_serialized)

        # Returning the filtered data via a new response.
        return self.create_response(request, to_be_serialized)
